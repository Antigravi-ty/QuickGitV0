use crate::models::git_models::{
    AppWorkspaceMetadata, LocalCommitAnnotation, RepositoryLocalMetadata,
};
use std::collections::HashMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};
use tauri::{AppHandle, Manager};

static WRITE_SEQ: AtomicU64 = AtomicU64::new(1);

pub fn resolve_app_config_dir(app: &AppHandle) -> PathBuf {
    let dir = app
        .path()
        .app_config_dir()
        .or_else(|_| app.path().app_data_dir())
        .unwrap_or_else(|_| std::env::temp_dir().join("com.antigravity.quickgitv0"));
    let _ = fs::create_dir_all(&dir);
    dir
}

pub fn resolve_workspace_metadata_file(app: &AppHandle) -> PathBuf {
    resolve_app_config_dir(app).join("quickgit_workspace_v0.json")
}

fn write_atomic_json(path: &Path, content: &str) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .map_err(|e| format!("Failed to create config directory {:?}: {}", parent, e))?;
    }
    let seq = WRITE_SEQ.fetch_add(1, Ordering::Relaxed);
    let file_name = path
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("quickgit.json");
    let tmp_path = path.with_file_name(format!("{}.tmp.{}", file_name, seq));
    fs::write(&tmp_path, content)
        .map_err(|e| format!("Failed to write temp file {:?}: {}", tmp_path, e))?;
    fs::rename(&tmp_path, path).map_err(|e| {
        let _ = fs::remove_file(&tmp_path);
        format!("Failed to commit config file {:?}: {}", path, e)
    })?;
    Ok(())
}

pub fn load_workspace_metadata(app: &AppHandle) -> AppWorkspaceMetadata {
    let path = resolve_workspace_metadata_file(app);
    if !path.exists() {
        return AppWorkspaceMetadata::default();
    }
    match fs::read_to_string(&path) {
        Ok(raw) => serde_json::from_str::<AppWorkspaceMetadata>(&raw).unwrap_or_default(),
        Err(_) => AppWorkspaceMetadata::default(),
    }
}

pub fn save_workspace_metadata(
    app: &AppHandle,
    metadata: &AppWorkspaceMetadata,
) -> Result<(), String> {
    let path = resolve_workspace_metadata_file(app);
    let serialized = serde_json::to_string_pretty(metadata)
        .map_err(|e| format!("Failed to serialize workspace metadata: {}", e))?;
    write_atomic_json(&path, &serialized)
}

fn build_default_rocket_companion_annotations() -> HashMap<String, LocalCommitAnnotation> {
    let mut map = HashMap::new();
    let presets = [
        (
            "003346382265f81146827e45c668eb291bdbe771",
            "no-need-anymore",
            "danger",
            "Superseded by merge-five and merge-six; no longer needed.",
            "useless",
            None,
        ),
        (
            "24f420ddf5a904a5fbff4b976a63b4bbe95ddacc",
            "replay system",
            "accent",
            "Shared replay importer sync base for downstream replay system tips.",
            "useful",
            None,
        ),
        (
            "aac86091a28687e94b1da67c53a48ceb7bc9cdb2",
            "replay system",
            "accent",
            "Replay system tip (intervene + multi-car sync); pending replay cluster merge.",
            "useful",
            None,
        ),
        (
            "96910e4da9f8276aedda1db25d5cb2ab74d27fb1",
            "replay system",
            "accent",
            "Replay system tip (120Hz physics/boost timeline & intervene); merge with replay system cluster.",
            "useful",
            None,
        ),
        (
            "31dca9f572cdb0e74b9da70feca638713f8107ce",
            "replay system",
            "accent",
            "Replay system tip (wheel suspension droop & car hitboxes); merge with replay system cluster.",
            "useful",
            None,
        ),
        (
            "a04997be7d8ec5ce3eece52c4b16972578e3390c",
            "ui-plan-hold",
            "attention",
            "Selective RCUITuner 1b4c822 UI improvements; on hold pending newer UI plan.",
            "hold",
            None,
        ),
        (
            "11eef892205e22701b597a70668040add3eb04df",
            "absorbed-in-mainline",
            "done",
            "Name Tag aerial climb tracker & inward ring reworked and absorbed into mainline 6bd41edd.",
            "absorbed",
            Some("6bd41edd3700dec26783f73972326f93f15d490e"),
        ),
        (
            "654b88228d86f0a65e805e498a2dcd21365cee2c",
            "useful-needs-catchup",
            "success",
            "Useful pure module naming alignment; currently behind latest architecture and needs catch-up merge.",
            "useful",
            None,
        ),
    ];

    for (sha, tag, tone, note, status, linked) in presets {
        map.insert(
            sha.to_string(),
            LocalCommitAnnotation {
                commit_sha: sha.to_string(),
                tag_label: tag.to_string(),
                color_tone: tone.to_string(),
                note: note.to_string(),
                updated_at: 1793961600,
                confirmed: true,
                triage_status: Some(status.to_string()),
                linked_commit_sha: linked.map(|s| s.to_string()),
            },
        );
    }
    map
}

pub fn ensure_repo_entry<'a>(
    workspace: &'a mut AppWorkspaceMetadata,
    repo_path: &str,
) -> &'a mut RepositoryLocalMetadata {
    let normalized = repo_path.trim().to_string();
    workspace.recent_repositories.retain(|r| r != &normalized);
    workspace.recent_repositories.insert(0, normalized.clone());
    if workspace.recent_repositories.len() > 20 {
        workspace.recent_repositories.truncate(20);
    }
    workspace.active_repository_path = Some(normalized.clone());
    let is_rocket_companion = normalized.ends_with("/RocketCompanion")
        || normalized.ends_with("\\RocketCompanion")
        || normalized == "RocketCompanion";
    workspace
        .repositories
        .entry(normalized.clone())
        .or_insert_with(|| RepositoryLocalMetadata {
            repo_path: normalized,
            local_base_ref: None,
            orphan_horizon_commit_limit: 10,
            show_archived_orphan_trees: false,
            include_local_stale_branches: false,
            remote_live_refs: HashMap::new(),
            last_remote_sync_timestamp: None,
            commit_annotations: if is_rocket_companion {
                build_default_rocket_companion_annotations()
            } else {
                HashMap::new()
            },
        })
}

pub fn upsert_commit_annotation(
    workspace: &mut AppWorkspaceMetadata,
    repo_path: &str,
    annotation: LocalCommitAnnotation,
) {
    let entry = ensure_repo_entry(workspace, repo_path);
    let has_status = annotation
        .triage_status
        .as_deref()
        .map(|s| !s.trim().is_empty() && s.trim() != "unconfirmed")
        .unwrap_or(false);
    let has_linked = annotation
        .linked_commit_sha
        .as_deref()
        .map(|s| !s.trim().is_empty())
        .unwrap_or(false);
    if !annotation.confirmed
        && !has_status
        && !has_linked
        && annotation.tag_label.trim().is_empty()
        && annotation.note.trim().is_empty()
    {
        entry.commit_annotations.remove(&annotation.commit_sha);
    } else {
        entry
            .commit_annotations
            .insert(annotation.commit_sha.clone(), annotation);
    }
}
