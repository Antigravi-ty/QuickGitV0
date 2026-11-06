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
            commit_annotations: HashMap::new(),
        })
}

pub fn upsert_commit_annotation(
    workspace: &mut AppWorkspaceMetadata,
    repo_path: &str,
    annotation: LocalCommitAnnotation,
) {
    let entry = ensure_repo_entry(workspace, repo_path);
    if annotation.tag_label.trim().is_empty() && annotation.note.trim().is_empty() {
        entry.commit_annotations.remove(&annotation.commit_sha);
    } else {
        entry
            .commit_annotations
            .insert(annotation.commit_sha.clone(), annotation);
    }
}
