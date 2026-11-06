use crate::git_engine::repository_scanner::{
    checkout_detached_with_submodules, scan_repository,
};
use crate::models::git_models::{
    AppWorkspaceMetadata, DetachedCheckoutOutcome, LocalCommitAnnotation, RepositorySnapshot,
};
use crate::storage::local_metadata_store::{
    ensure_repo_entry, load_workspace_metadata, resolve_app_config_dir, save_workspace_metadata,
    upsert_commit_annotation,
};
use std::process::Command;
use tauri::AppHandle;

#[tauri::command]
pub fn load_workspace_metadata_cmd(app: AppHandle) -> AppWorkspaceMetadata {
    load_workspace_metadata(&app)
}

#[tauri::command]
pub fn inspect_repository_cmd(
    app: AppHandle,
    repo_path: String,
) -> Result<RepositorySnapshot, String> {
    let snapshot = scan_repository(&repo_path)?;
    let mut workspace = load_workspace_metadata(&app);
    ensure_repo_entry(&mut workspace, &snapshot.repo_path);
    let _ = save_workspace_metadata(&app, &workspace);
    Ok(snapshot)
}

#[tauri::command]
pub fn set_local_base_branch_cmd(
    app: AppHandle,
    repo_path: String,
    base_ref: Option<String>,
) -> Result<AppWorkspaceMetadata, String> {
    let mut workspace = load_workspace_metadata(&app);
    let entry = ensure_repo_entry(&mut workspace, &repo_path);
    entry.local_base_ref = base_ref.filter(|s| !s.trim().is_empty());
    save_workspace_metadata(&app, &workspace)?;
    Ok(workspace)
}

#[tauri::command]
pub fn set_orphan_horizon_cmd(
    app: AppHandle,
    repo_path: String,
    horizon_commit_limit: usize,
    show_archived_orphan_trees: bool,
) -> Result<AppWorkspaceMetadata, String> {
    let mut workspace = load_workspace_metadata(&app);
    let entry = ensure_repo_entry(&mut workspace, &repo_path);
    entry.orphan_horizon_commit_limit = horizon_commit_limit.clamp(1, 200);
    entry.show_archived_orphan_trees = show_archived_orphan_trees;
    save_workspace_metadata(&app, &workspace)?;
    Ok(workspace)
}

#[tauri::command]
pub fn save_commit_annotation_cmd(
    app: AppHandle,
    repo_path: String,
    commit_sha: String,
    tag_label: String,
    color_tone: String,
    note: String,
) -> Result<AppWorkspaceMetadata, String> {
    let mut workspace = load_workspace_metadata(&app);
    let now = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0);
    upsert_commit_annotation(
        &mut workspace,
        &repo_path,
        LocalCommitAnnotation {
            commit_sha,
            tag_label,
            color_tone,
            note,
            updated_at: now,
        },
    );
    save_workspace_metadata(&app, &workspace)?;
    Ok(workspace)
}

#[tauri::command]
pub fn remove_recent_repository_cmd(
    app: AppHandle,
    repo_path: String,
) -> Result<AppWorkspaceMetadata, String> {
    let mut workspace = load_workspace_metadata(&app);
    let target = repo_path.trim();
    workspace.recent_repositories.retain(|r| r != target);
    if workspace.active_repository_path.as_deref() == Some(target) {
        workspace.active_repository_path = workspace.recent_repositories.first().cloned();
    }
    save_workspace_metadata(&app, &workspace)?;
    Ok(workspace)
}

#[tauri::command]
pub fn checkout_detached_commit_cmd(
    repo_path: String,
    target_sha: String,
) -> Result<DetachedCheckoutOutcome, String> {
    checkout_detached_with_submodules(&repo_path, &target_sha)
}

#[tauri::command]
pub fn open_directory_in_os_cmd(target_path: String) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        Command::new("open")
            .arg(&target_path)
            .spawn()
            .map_err(|e| format!("Failed to open Finder: {}", e))?;
    }
    #[cfg(target_os = "linux")]
    {
        Command::new("xdg-open")
            .arg(&target_path)
            .spawn()
            .map_err(|e| format!("Failed to open file manager: {}", e))?;
    }
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .arg(&target_path)
            .spawn()
            .map_err(|e| format!("Failed to open Explorer: {}", e))?;
    }
    Ok(())
}

#[tauri::command]
pub fn open_app_config_dir_cmd(app: AppHandle) -> Result<String, String> {
    let dir = resolve_app_config_dir(&app);
    let path_str = dir.to_string_lossy().to_string();
    let _ = open_directory_in_os_cmd(path_str.clone());
    Ok(path_str)
}
