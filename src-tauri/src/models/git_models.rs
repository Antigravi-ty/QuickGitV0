use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GitBranchRef {
    pub name: String,
    pub full_ref: String,
    pub commit_sha: String,
    pub is_remote: bool,
    pub is_tag: bool,
    pub is_head: bool,
    #[serde(default = "default_true")]
    pub is_on_remote_origin: bool,
    #[serde(default)]
    pub has_local_ref: bool,
    pub timestamp: i64,
    pub subject: String,
}

fn default_true() -> bool {
    true
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SubmoduleConfigEntry {
    pub name: String,
    pub path: String,
    pub url: String,
    pub branch: Option<String>,
    pub current_worktree_sha: Option<String>,
    pub is_dirty: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GitCommitNode {
    pub sha: String,
    pub short_sha: String,
    pub parents: Vec<String>,
    pub author_name: String,
    pub author_email: String,
    pub timestamp: i64,
    pub subject: String,
    #[serde(default)]
    pub body: String,
    pub refs: Vec<String>,
    #[serde(default)]
    pub stale_refs: Vec<String>,
    pub submodule_pointers: HashMap<String, String>,
    pub changed_submodules: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkingTreeGuardStatus {
    pub is_clean: bool,
    pub main_repo_dirty_files: Vec<String>,
    pub dirty_submodules: Vec<String>,
    pub summary_message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RepositorySnapshot {
    pub repo_path: String,
    pub repo_name: String,
    pub head_sha: String,
    pub head_ref_name: Option<String>,
    pub is_detached_head: bool,
    #[serde(default)]
    pub remote_sync_available: bool,
    #[serde(default)]
    pub last_remote_sync_timestamp: Option<i64>,
    pub branches: Vec<GitBranchRef>,
    pub submodules: Vec<SubmoduleConfigEntry>,
    pub commits: Vec<GitCommitNode>,
    pub working_tree_status: WorkingTreeGuardStatus,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DetachedCheckoutOutcome {
    pub success: bool,
    pub blocked_by_dirty_state: bool,
    pub target_sha: String,
    pub message: String,
    pub synced_submodules: Vec<String>,
    pub working_tree_status: WorkingTreeGuardStatus,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalCommitAnnotation {
    pub commit_sha: String,
    pub tag_label: String,
    pub color_tone: String,
    pub note: String,
    pub updated_at: i64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RepositoryLocalMetadata {
    pub repo_path: String,
    pub local_base_ref: Option<String>,
    pub orphan_horizon_commit_limit: usize,
    pub show_archived_orphan_trees: bool,
    #[serde(default)]
    pub include_local_stale_branches: bool,
    #[serde(default)]
    pub remote_live_refs: HashMap<String, String>,
    #[serde(default)]
    pub last_remote_sync_timestamp: Option<i64>,
    pub commit_annotations: HashMap<String, LocalCommitAnnotation>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AppWorkspaceMetadata {
    pub recent_repositories: Vec<String>,
    pub active_repository_path: Option<String>,
    pub repositories: HashMap<String, RepositoryLocalMetadata>,
}
