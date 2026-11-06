pub mod commands {
    pub mod git_commands;
}
pub mod git_engine {
    pub mod repository_scanner;
}
pub mod models {
    pub mod git_models;
}
pub mod storage {
    pub mod local_metadata_store;
}

use commands::git_commands::{
    checkout_detached_commit_cmd, inspect_repository_cmd, load_workspace_metadata_cmd,
    open_app_config_dir_cmd, open_directory_in_os_cmd, remove_recent_repository_cmd,
    save_commit_annotation_cmd, set_local_base_branch_cmd, set_orphan_horizon_cmd,
};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            load_workspace_metadata_cmd,
            inspect_repository_cmd,
            set_local_base_branch_cmd,
            set_orphan_horizon_cmd,
            save_commit_annotation_cmd,
            remove_recent_repository_cmd,
            checkout_detached_commit_cmd,
            open_directory_in_os_cmd,
            open_app_config_dir_cmd
        ])
        .run(tauri::generate_context!())
        .expect("Failed to run QuickGit V0 Tauri application");
}
