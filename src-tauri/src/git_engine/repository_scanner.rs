use crate::models::git_models::{
    DetachedCheckoutOutcome, GitBranchRef, GitCommitNode, RepositorySnapshot,
    SubmoduleConfigEntry, WorkingTreeGuardStatus,
};
use std::collections::HashMap;
use std::path::Path;
use std::process::Command;

fn run_git_command(repo_path: &Path, args: &[&str]) -> Result<String, String> {
    let output = Command::new("git")
        .arg("-C")
        .arg(repo_path)
        .args(args)
        .env("GIT_TERMINAL_PROMPT", "0")
        .output()
        .map_err(|e| format!("Failed to invoke git {:?}: {}", args, e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
        return Err(if stderr.is_empty() {
            format!("git {:?} exited with {}", args, output.status)
        } else {
            stderr
        });
    }
    Ok(String::from_utf8_lossy(&output.stdout).to_string())
}

fn strip_branch_prefix(ref_label: &str) -> String {
    let trimmed = ref_label.trim().trim_start_matches("HEAD -> ").trim();
    if let Some(rest) = trimmed.strip_prefix("refs/heads/") {
        return rest.to_string();
    }
    if let Some(rest) = trimmed.strip_prefix("refs/remotes/origin/") {
        return rest.to_string();
    }
    if let Some(rest) = trimmed.strip_prefix("refs/tags/") {
        return rest.to_string();
    }
    if let Some(rest) = trimmed.strip_prefix("origin/") {
        return rest.to_string();
    }
    trimmed.to_string()
}

pub fn query_remote_origin_heads(
    repo_path: &Path,
    fetch_objects: bool,
) -> Result<HashMap<String, String>, String> {
    if fetch_objects {
        let _ = run_git_command(
            repo_path,
            &[
                "-c",
                "http.lowSpeedLimit=1000",
                "-c",
                "http.lowSpeedTime=8",
                "fetch",
                "origin",
                "--no-prune",
            ],
        );
    }

    let raw = run_git_command(
        repo_path,
        &[
            "-c",
            "http.lowSpeedLimit=1000",
            "-c",
            "http.lowSpeedTime=6",
            "ls-remote",
            "--heads",
            "--tags",
            "origin",
        ],
    )?;

    let mut live_refs = HashMap::new();
    for line in raw.lines() {
        let mut parts = line.split_whitespace();
        let sha = match parts.next() {
            Some(s) if !s.is_empty() => s.trim(),
            _ => continue,
        };
        let full_ref = match parts.next() {
            Some(r) if !r.is_empty() => r.trim(),
            _ => continue,
        };
        let clean_ref = full_ref.strip_suffix("^{}").unwrap_or(full_ref);
        if let Some(short) = clean_ref
            .strip_prefix("refs/heads/")
            .or_else(|| clean_ref.strip_prefix("refs/tags/"))
        {
            if !short.is_empty() && short != "HEAD" {
                live_refs.insert(short.to_string(), sha.to_string());
            }
        }
    }

    if live_refs.is_empty() {
        return Err("No remote heads returned from origin".to_string());
    }
    Ok(live_refs)
}

pub fn inspect_working_tree_guard(
    repo_path: &Path,
    submodules: &[SubmoduleConfigEntry],
) -> WorkingTreeGuardStatus {
    let mut main_dirty_files = Vec::new();
    let mut dirty_submodules = Vec::new();

    if let Ok(porcelain) = run_git_command(
        repo_path,
        &["status", "--porcelain", "--ignore-submodules=none"],
    ) {
        for line in porcelain.lines() {
            if line.len() > 3 {
                let entry_path = line[3..].trim().to_string();
                let is_sub = submodules.iter().any(|s| s.path == entry_path);
                if is_sub {
                    if !dirty_submodules.contains(&entry_path) {
                        dirty_submodules.push(entry_path);
                    }
                } else {
                    main_dirty_files.push(line.trim().to_string());
                }
            }
        }
    }

    for sub in submodules {
        if sub.is_dirty && !dirty_submodules.contains(&sub.path) {
            dirty_submodules.push(sub.path.clone());
        }
    }

    let is_clean = main_dirty_files.is_empty() && dirty_submodules.is_empty();
    let summary_message = if is_clean {
        "Working tree and all submodules are clean. Ready for detached state inspection.".to_string()
    } else {
        format!(
            "Checkout blocked: {} uncommitted file(s) in main repository and {} modified submodule(s). Resolve or stash changes in SourceTree before switching state.",
            main_dirty_files.len(),
            dirty_submodules.len()
        )
    };

    WorkingTreeGuardStatus {
        is_clean,
        main_repo_dirty_files: main_dirty_files,
        dirty_submodules,
        summary_message,
    }
}

fn parse_submodules(repo_path: &Path) -> Vec<SubmoduleConfigEntry> {
    let gitmodules_path = repo_path.join(".gitmodules");
    if !gitmodules_path.exists() {
        return Vec::new();
    }

    let raw = match run_git_command(
        repo_path,
        &[
            "config",
            "--file",
            ".gitmodules",
            "--get-regexp",
            "^submodule\\.",
        ],
    ) {
        Ok(out) => out,
        Err(_) => return Vec::new(),
    };

    let mut map: HashMap<String, SubmoduleConfigEntry> = HashMap::new();
    let mut order: Vec<String> = Vec::new();

    for line in raw.lines() {
        let mut parts = line.splitn(2, char::is_whitespace);
        let key = parts.next().unwrap_or("").trim();
        let val = parts.next().unwrap_or("").trim();
        if let Some(rest) = key.strip_prefix("submodule.") {
            if let Some(dot_idx) = rest.rfind('.') {
                let name = &rest[..dot_idx];
                let field = &rest[dot_idx + 1..];
                if !map.contains_key(name) {
                    order.push(name.to_string());
                    map.insert(
                        name.to_string(),
                        SubmoduleConfigEntry {
                            name: name.to_string(),
                            path: name.to_string(),
                            url: String::new(),
                            branch: None,
                            current_worktree_sha: None,
                            is_dirty: false,
                        },
                    );
                }
                if let Some(entry) = map.get_mut(name) {
                    match field {
                        "path" => entry.path = val.to_string(),
                        "url" => entry.url = val.to_string(),
                        "branch" => entry.branch = Some(val.to_string()),
                        _ => {}
                    }
                }
            }
        }
    }

    let mut result = Vec::new();
    for name in order {
        if let Some(mut entry) = map.remove(&name) {
            let sub_dir = repo_path.join(&entry.path);
            if sub_dir.exists() {
                if let Ok(head_out) = run_git_command(&sub_dir, &["rev-parse", "HEAD"]) {
                    let sha = head_out.trim().to_string();
                    if !sha.is_empty() {
                        entry.current_worktree_sha = Some(sha);
                    }
                }
                if let Ok(status_out) = run_git_command(&sub_dir, &["status", "--porcelain"]) {
                    entry.is_dirty = !status_out.trim().is_empty();
                }
            }
            result.push(entry);
        }
    }
    result
}

pub fn scan_repository(
    raw_repo_path: &str,
    cached_remote_refs: Option<&HashMap<String, String>>,
    last_sync_timestamp: Option<i64>,
) -> Result<(RepositorySnapshot, Option<(HashMap<String, String>, i64)>), String> {
    let repo_path = Path::new(raw_repo_path.trim());
    if !repo_path.exists() {
        return Err(format!("Repository path does not exist: {}", raw_repo_path));
    }

    let top_level = run_git_command(repo_path, &["rev-parse", "--show-toplevel"])?;
    let canonical_path = Path::new(top_level.trim());
    let repo_name = canonical_path
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("repository")
        .to_string();

    let head_sha = run_git_command(canonical_path, &["rev-parse", "HEAD"])
        .unwrap_or_default()
        .trim()
        .to_string();

    let symbolic_head = run_git_command(canonical_path, &["symbolic-ref", "--short", "-q", "HEAD"])
        .ok()
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());
    let is_detached_head = symbolic_head.is_none();

    let mut fresh_remote_sync: Option<(HashMap<String, String>, i64)> = None;
    let active_remote_map: Option<HashMap<String, String>> = match cached_remote_refs {
        Some(existing) if !existing.is_empty() => Some(existing.clone()),
        _ => match query_remote_origin_heads(canonical_path, false) {
            Ok(fetched) => {
                let now = std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .map(|d| d.as_secs() as i64)
                    .unwrap_or(0);
                fresh_remote_sync = Some((fetched.clone(), now));
                Some(fetched)
            }
            Err(_) => None,
        },
    };

    let remote_sync_available = active_remote_map.is_some();
    let effective_sync_ts = fresh_remote_sync
        .as_ref()
        .map(|(_, ts)| *ts)
        .or(last_sync_timestamp);

    let refs_raw = run_git_command(
        canonical_path,
        &[
            "for-each-ref",
            "--sort=-committerdate",
            "--format=%(refname)\x1f%(refname:short)\x1f%(objectname)\x1f%(committerdate:unix)\x1f%(subject)",
            "refs/heads",
            "refs/remotes",
            "refs/tags",
        ],
    )?;

    let mut branch_by_canonical: HashMap<String, GitBranchRef> = HashMap::new();
    let mut canonical_order: Vec<String> = Vec::new();

    for line in refs_raw.lines() {
        let fields: Vec<&str> = line.split('\x1f').collect();
        if fields.len() < 5 {
            continue;
        }
        let full_ref = fields[0].trim();
        let short_name = fields[1].trim();
        if full_ref.ends_with("/HEAD") || short_name == "origin" {
            continue;
        }
        let commit_sha = fields[2].trim().to_string();
        let timestamp = fields[3].trim().parse::<i64>().unwrap_or(0);
        let subject = fields[4].trim().to_string();
        let is_remote = full_ref.starts_with("refs/remotes/");
        let is_tag = full_ref.starts_with("refs/tags/");
        let is_local = full_ref.starts_with("refs/heads/");
        let canonical_name = strip_branch_prefix(short_name);

        let is_head = symbolic_head
            .as_ref()
            .map(|h| h == short_name || h == &canonical_name)
            .unwrap_or(false);

        let is_on_remote_origin = match &active_remote_map {
            Some(live_map) => live_map.contains_key(&canonical_name),
            None => is_remote,
        };

        if let Some(existing) = branch_by_canonical.get_mut(&canonical_name) {
            if is_local {
                existing.has_local_ref = true;
            }
            if is_remote {
                existing.is_remote = true;
                existing.name = short_name.to_string();
                existing.full_ref = full_ref.to_string();
                existing.commit_sha = commit_sha;
                existing.timestamp = timestamp;
                existing.subject = subject;
            }
            if is_head {
                existing.is_head = true;
            }
            if is_on_remote_origin {
                existing.is_on_remote_origin = true;
            }
        } else {
            canonical_order.push(canonical_name.clone());
            branch_by_canonical.insert(
                canonical_name,
                GitBranchRef {
                    name: short_name.to_string(),
                    full_ref: full_ref.to_string(),
                    commit_sha,
                    is_remote,
                    is_tag,
                    is_head,
                    is_on_remote_origin,
                    has_local_ref: is_local,
                    timestamp,
                    subject,
                },
            );
        }
    }

    let mut branches = Vec::new();
    for key in canonical_order {
        if let Some(branch) = branch_by_canonical.remove(&key) {
            branches.push(branch);
        }
    }

    let submodules = parse_submodules(canonical_path);
    let submodule_paths: Vec<String> = submodules.iter().map(|s| s.path.clone()).collect();

    let log_raw = run_git_command(
        canonical_path,
        &[
            "log",
            "--all",
            "--date-order",
            "--max-count=1200",
            "--format=%H\x1f%h\x1f%P\x1f%an\x1f%ae\x1f%ct\x1f%D\x1f%s\x1f%b\x1e",
        ],
    )?;

    let mut commits = Vec::new();
    let mut sha_to_index: HashMap<String, usize> = HashMap::new();

    for record in log_raw.split('\x1e') {
        let trimmed_record = record.trim();
        if trimmed_record.is_empty() {
            continue;
        }
        let fields: Vec<&str> = trimmed_record.split('\x1f').collect();
        if fields.len() < 8 {
            continue;
        }
        let sha = fields[0].trim().to_string();
        let short_sha = fields[1].trim().to_string();
        let parents: Vec<String> = fields[2]
            .split_whitespace()
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        let author_name = fields[3].trim().to_string();
        let author_email = fields[4].trim().to_string();
        let timestamp = fields[5].trim().parse::<i64>().unwrap_or(0);

        let raw_decorations: Vec<String> = fields[6]
            .split(',')
            .map(|r| r.trim().to_string())
            .filter(|r| !r.is_empty() && r != "origin" && !r.ends_with("/HEAD"))
            .collect();

        let mut live_refs = Vec::new();
        let mut stale_refs = Vec::new();
        let mut seen_canonical = Vec::new();

        for dec in raw_decorations {
            let is_head_dec = dec == "HEAD" || dec.starts_with("HEAD -> ");
            let canonical = strip_branch_prefix(&dec);
            if seen_canonical.contains(&canonical) && !is_head_dec {
                continue;
            }
            seen_canonical.push(canonical.clone());

            let is_live = is_head_dec
                || match &active_remote_map {
                    Some(live_map) => live_map.contains_key(&canonical),
                    None => true,
                };
            if is_live {
                live_refs.push(dec);
            } else {
                stale_refs.push(dec);
            }
        }

        let subject = fields[7].trim().to_string();
        let body = if fields.len() >= 9 {
            fields[8].trim().to_string()
        } else {
            String::new()
        };

        let idx = commits.len();
        sha_to_index.insert(sha.clone(), idx);
        commits.push(GitCommitNode {
            sha,
            short_sha,
            parents,
            author_name,
            author_email,
            timestamp,
            subject,
            body,
            refs: live_refs,
            stale_refs,
            submodule_pointers: HashMap::new(),
            changed_submodules: Vec::new(),
        });
    }

    if !submodule_paths.is_empty() && !commits.is_empty() {
        let mut sub_args = vec![
            "log",
            "--all",
            "-m",
            "--first-parent",
            "--root",
            "--raw",
            "--no-abbrev",
            "--format=COMMIT:%H",
            "--",
        ];
        for sp in &submodule_paths {
            sub_args.push(sp.as_str());
        }

        if let Ok(sub_raw) = run_git_command(canonical_path, &sub_args) {
            let mut deltas_by_sha: HashMap<String, HashMap<String, String>> = HashMap::new();
            let mut current_sha: Option<String> = None;

            for line in sub_raw.lines() {
                if let Some(rest) = line.strip_prefix("COMMIT:") {
                    let s = rest.trim().to_string();
                    deltas_by_sha.entry(s.clone()).or_default();
                    current_sha = Some(s);
                } else if line.starts_with(':') {
                    if let Some(ref c_sha) = current_sha {
                        let tab_parts: Vec<&str> = line.split('\t').collect();
                        if tab_parts.len() == 2 {
                            let meta: Vec<&str> = tab_parts[0].split_whitespace().collect();
                            let path_str = tab_parts[1].trim().to_string();
                            if meta.len() >= 5 {
                                let new_sha = meta[3].trim().to_string();
                                if let Some(entry) = deltas_by_sha.get_mut(c_sha) {
                                    entry.insert(path_str, new_sha);
                                }
                            }
                        }
                    }
                }
            }

            for idx in (0..commits.len()).rev() {
                let first_parent_pointers = commits[idx]
                    .parents
                    .first()
                    .and_then(|p_sha| sha_to_index.get(p_sha))
                    .map(|&p_idx| commits[p_idx].submodule_pointers.clone())
                    .unwrap_or_default();

                let mut pointers = first_parent_pointers;
                let mut changed = Vec::new();
                let c_sha = commits[idx].sha.clone();
                if let Some(deltas) = deltas_by_sha.get(&c_sha) {
                    for (sub_path, new_ptr) in deltas {
                        if new_ptr.chars().all(|c| c == '0') {
                            pointers.remove(sub_path);
                        } else {
                            pointers.insert(sub_path.clone(), new_ptr.clone());
                        }
                        changed.push(sub_path.clone());
                    }
                }
                changed.sort();
                commits[idx].submodule_pointers = pointers;
                commits[idx].changed_submodules = changed;
            }
        }
    }

    let working_tree_status = inspect_working_tree_guard(canonical_path, &submodules);

    Ok((
        RepositorySnapshot {
            repo_path: canonical_path.to_string_lossy().to_string(),
            repo_name,
            head_sha,
            head_ref_name: symbolic_head,
            is_detached_head,
            remote_sync_available,
            last_remote_sync_timestamp: effective_sync_ts,
            branches,
            submodules,
            commits,
            working_tree_status,
        },
        fresh_remote_sync,
    ))
}

pub fn checkout_detached_with_submodules(
    raw_repo_path: &str,
    target_sha: &str,
) -> Result<DetachedCheckoutOutcome, String> {
    let repo_path = Path::new(raw_repo_path.trim());
    if !repo_path.exists() {
        return Err(format!("Repository path does not exist: {}", raw_repo_path));
    }

    let submodules = parse_submodules(repo_path);
    let pre_guard = inspect_working_tree_guard(repo_path, &submodules);

    if !pre_guard.is_clean {
        return Ok(DetachedCheckoutOutcome {
            success: false,
            blocked_by_dirty_state: true,
            target_sha: target_sha.to_string(),
            message: pre_guard.summary_message.clone(),
            synced_submodules: Vec::new(),
            working_tree_status: pre_guard,
        });
    }

    run_git_command(repo_path, &["checkout", "--detach", target_sha.trim()])?;

    let mut synced_submodules = Vec::new();
    if !submodules.is_empty() {
        let _ = run_git_command(repo_path, &["submodule", "sync", "--recursive"]);
        run_git_command(
            repo_path,
            &[
                "submodule",
                "update",
                "--init",
                "--recursive",
                "--checkout",
            ],
        )?;
        for sub in &submodules {
            synced_submodules.push(sub.path.clone());
        }
    }

    let refreshed_submodules = parse_submodules(repo_path);
    let post_guard = inspect_working_tree_guard(repo_path, &refreshed_submodules);

    Ok(DetachedCheckoutOutcome {
        success: true,
        blocked_by_dirty_state: false,
        target_sha: target_sha.to_string(),
        message: if synced_submodules.is_empty() {
            format!(
                "Checked out detached commit {} cleanly.",
                &target_sha[..target_sha.len().min(8)]
            )
        } else {
            format!(
                "Checked out detached commit {} and synchronized {} submodule(s): {}.",
                &target_sha[..target_sha.len().min(8)],
                synced_submodules.len(),
                synced_submodules.join(", ")
            )
        },
        synced_submodules,
        working_tree_status: post_guard,
    })
}
