import { invoke } from "@tauri-apps/api/core";
import {
  DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
  DEMO_ROCKET_COMPANION_SNAPSHOT,
  ROCKET_COMPANION_DEFAULT_ANNOTATIONS,
} from "../config/demoRepositorySnapshot";
import {
  AnnotationTone,
  AppWorkspaceMetadata,
  CommitTriageStatus,
  DetachedCheckoutOutcome,
  RepositoryLocalMetadata,
  RepositorySnapshot,
} from "../types/gitTypes";

const BROWSER_FALLBACK_STORAGE_KEY = "quickgit_v0_browser_workspace_meta";

export function isTauriDesktopRuntime(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const win = window as unknown as Record<string, unknown>;
  return Boolean(win.__TAURI_INTERNALS__ || win.__TAURI__);
}

function loadBrowserFallbackMetadata(): AppWorkspaceMetadata {
  const demoPath = DEMO_ROCKET_COMPANION_SNAPSHOT.repoPath;
  try {
    const raw = localStorage.getItem(BROWSER_FALLBACK_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppWorkspaceMetadata;
      const demoRepo = parsed.repositories?.[demoPath];
      if (demoRepo) {
        for (const [sha, defaultAnn] of Object.entries(
          ROCKET_COMPANION_DEFAULT_ANNOTATIONS
        )) {
          if (!demoRepo.commitAnnotations[sha]) {
            demoRepo.commitAnnotations[sha] = { ...defaultAnn };
          }
        }
      }
      return parsed;
    }
  } catch (_) {}
  return {
    recentRepositories: [demoPath],
    activeRepositoryPath: demoPath,
    repositories: {
      [demoPath]: {
        repoPath: demoPath,
        localBaseRef: null,
        orphanHorizonCommitLimit: DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
        showArchivedOrphanTrees: false,
        includeLocalStaleBranches: false,
        commitAnnotations: {
          ...ROCKET_COMPANION_DEFAULT_ANNOTATIONS,
        },
      },
    },
  };
}

function saveBrowserFallbackMetadata(meta: AppWorkspaceMetadata): void {
  try {
    localStorage.setItem(BROWSER_FALLBACK_STORAGE_KEY, JSON.stringify(meta));
  } catch (_) {}
}

function ensureFallbackRepoEntry(
  meta: AppWorkspaceMetadata,
  repoPath: string
): RepositoryLocalMetadata {
  const clean = repoPath.trim();
  meta.recentRepositories = meta.recentRepositories.filter((r) => r !== clean);
  meta.recentRepositories.unshift(clean);
  meta.activeRepositoryPath = clean;
  if (!meta.repositories[clean]) {
    meta.repositories[clean] = {
      repoPath: clean,
      localBaseRef: null,
      orphanHorizonCommitLimit: DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
      showArchivedOrphanTrees: false,
      includeLocalStaleBranches: false,
      commitAnnotations: {},
    };
  }
  return meta.repositories[clean];
}

export async function loadWorkspaceMetadata(): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("load_workspace_metadata_cmd");
  }
  return loadBrowserFallbackMetadata();
}

export async function pickRepositoryDirectory(): Promise<string | null> {
  if (isTauriDesktopRuntime()) {
    return invoke<string | null>("pick_repository_directory_cmd");
  }
  return DEMO_ROCKET_COMPANION_SNAPSHOT.repoPath;
}

export async function inspectRepository(
  repoPath: string
): Promise<RepositorySnapshot> {
  if (isTauriDesktopRuntime()) {
    return invoke<RepositorySnapshot>("inspect_repository_cmd", {
      repoPath,
    });
  }
  const meta = loadBrowserFallbackMetadata();
  ensureFallbackRepoEntry(meta, repoPath);
  saveBrowserFallbackMetadata(meta);
  return {
    ...DEMO_ROCKET_COMPANION_SNAPSHOT,
    repoPath: repoPath.trim() || DEMO_ROCKET_COMPANION_SNAPSHOT.repoPath,
  };
}

export async function syncRemoteOrigin(
  repoPath: string
): Promise<RepositorySnapshot> {
  if (isTauriDesktopRuntime()) {
    return invoke<RepositorySnapshot>("sync_remote_origin_cmd", {
      repoPath,
    });
  }
  return {
    ...DEMO_ROCKET_COMPANION_SNAPSHOT,
    repoPath: repoPath.trim() || DEMO_ROCKET_COMPANION_SNAPSHOT.repoPath,
    remoteSyncAvailable: true,
    lastRemoteSyncTimestamp: Math.floor(Date.now() / 1000),
  };
}

export async function setSidebarWidths(
  leftSidebarWidth: number,
  rightSidebarWidth: number
): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("set_sidebar_widths_cmd", {
      leftSidebarWidth: Math.round(leftSidebarWidth),
      rightSidebarWidth: Math.round(rightSidebarWidth),
    });
  }
  const meta = loadBrowserFallbackMetadata();
  meta.leftSidebarWidth = Math.round(leftSidebarWidth);
  meta.rightSidebarWidth = Math.round(rightSidebarWidth);
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function setLocalBaseBranch(
  repoPath: string,
  baseRef: string | null
): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("set_local_base_branch_cmd", {
      repoPath,
      baseRef,
    });
  }
  const meta = loadBrowserFallbackMetadata();
  const entry = ensureFallbackRepoEntry(meta, repoPath);
  entry.localBaseRef = baseRef;
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function setOrphanHorizon(
  repoPath: string,
  horizonCommitLimit: number,
  showArchivedOrphanTrees: boolean
): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("set_orphan_horizon_cmd", {
      repoPath,
      horizonCommitLimit,
      showArchivedOrphanTrees,
    });
  }
  const meta = loadBrowserFallbackMetadata();
  const entry = ensureFallbackRepoEntry(meta, repoPath);
  entry.orphanHorizonCommitLimit = horizonCommitLimit;
  entry.showArchivedOrphanTrees = showArchivedOrphanTrees;
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function setIncludeLocalStaleBranches(
  repoPath: string,
  includeLocalStaleBranches: boolean
): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>(
      "set_include_local_stale_branches_cmd",
      {
        repoPath,
        includeLocalStaleBranches,
      }
    );
  }
  const meta = loadBrowserFallbackMetadata();
  const entry = ensureFallbackRepoEntry(meta, repoPath);
  entry.includeLocalStaleBranches = includeLocalStaleBranches;
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function saveCommitAnnotation(params: {
  repoPath: string;
  commitSha: string;
  tagLabel: string;
  colorTone: AnnotationTone;
  note: string;
  confirmed?: boolean;
  triageStatus?: CommitTriageStatus;
  linkedCommitSha?: string;
}): Promise<AppWorkspaceMetadata> {
  const normalizedStatus = params.triageStatus;
  const normalizedLinked = params.linkedCommitSha?.trim() || undefined;
  const isConfirmed =
    params.confirmed ??
    Boolean(
      (normalizedStatus && normalizedStatus !== "unconfirmed") ||
        normalizedLinked ||
        params.tagLabel.trim()
    );

  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("save_commit_annotation_cmd", {
      repoPath: params.repoPath,
      commitSha: params.commitSha,
      tagLabel: params.tagLabel,
      colorTone: params.colorTone,
      note: params.note,
      confirmed: isConfirmed,
      triageStatus: normalizedStatus ?? null,
      linkedCommitSha: normalizedLinked ?? null,
    });
  }
  const meta = loadBrowserFallbackMetadata();
  const entry = ensureFallbackRepoEntry(meta, params.repoPath);
  const hasMeaningfulStatus =
    normalizedStatus && normalizedStatus !== "unconfirmed";
  if (
    !isConfirmed &&
    !hasMeaningfulStatus &&
    !normalizedLinked &&
    !params.tagLabel.trim() &&
    !params.note.trim()
  ) {
    delete entry.commitAnnotations[params.commitSha];
  } else {
    entry.commitAnnotations[params.commitSha] = {
      commitSha: params.commitSha,
      tagLabel: params.tagLabel.trim(),
      colorTone: params.colorTone,
      note: params.note.trim(),
      updatedAt: Math.floor(Date.now() / 1000),
      confirmed: isConfirmed,
      triageStatus: normalizedStatus,
      linkedCommitSha: normalizedLinked,
    };
  }
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function removeRecentRepository(
  repoPath: string
): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("remove_recent_repository_cmd", {
      repoPath,
    });
  }
  const meta = loadBrowserFallbackMetadata();
  meta.recentRepositories = meta.recentRepositories.filter(
    (r) => r !== repoPath.trim()
  );
  saveBrowserFallbackMetadata(meta);
  return meta;
}

export async function checkoutDetachedCommit(
  repoPath: string,
  targetSha: string
): Promise<DetachedCheckoutOutcome> {
  if (isTauriDesktopRuntime()) {
    return invoke<DetachedCheckoutOutcome>("checkout_detached_commit_cmd", {
      repoPath,
      targetSha,
    });
  }
  return {
    success: true,
    blockedByDirtyState: false,
    targetSha,
    message: `[Browser Preview] Checked out detached commit ${targetSha.slice(0, 8)} and recursively synced submodules (src/ui-core, public).`,
    syncedSubmodules: ["src/ui-core", "public"],
    workingTreeStatus: {
      isClean: true,
      mainRepoDirtyFiles: [],
      dirtySubmodules: [],
      summaryMessage:
        "Working tree and all submodules are clean. Ready for detached state inspection.",
    },
  };
}

export async function openDirectoryInOs(targetPath: string): Promise<void> {
  if (isTauriDesktopRuntime()) {
    await invoke("open_directory_in_os_cmd", { targetPath });
  }
}

export async function openAppConfigDirectory(): Promise<string> {
  if (isTauriDesktopRuntime()) {
    return invoke<string>("open_app_config_dir_cmd");
  }
  return "~/Library/Application Support/com.antigravity.quickgitv0";
}
