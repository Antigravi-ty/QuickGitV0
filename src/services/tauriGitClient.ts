import { invoke } from "@tauri-apps/api/core";
import {
  DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
  DEMO_ROCKET_COMPANION_SNAPSHOT,
} from "../config/demoRepositorySnapshot";
import {
  AnnotationTone,
  AppWorkspaceMetadata,
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
  try {
    const raw = localStorage.getItem(BROWSER_FALLBACK_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AppWorkspaceMetadata;
    }
  } catch (_) {}
  const demoPath = DEMO_ROCKET_COMPANION_SNAPSHOT.repoPath;
  return {
    recentRepositories: [demoPath],
    activeRepositoryPath: demoPath,
    repositories: {
      [demoPath]: {
        repoPath: demoPath,
        localBaseRef: "z/phase1-lossless-merge",
        orphanHorizonCommitLimit: DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
        showArchivedOrphanTrees: false,
        commitAnnotations: {
          "0370bf1897bfb0fc842ea288dc3dda0ac7b5338f": {
            commitSha: "0370bf1897bfb0fc842ea288dc3dda0ac7b5338f",
            tagLabel: "Gen-3 Radar WS Merge",
            colorTone: "success",
            note: "Unified WS1 + WS4 + WS5 with RCUIModule 4c07185",
            updatedAt: 1793939500,
          },
          "07414349c40563fc0432bfe973de7f716a85bc4f": {
            commitSha: "07414349c40563fc0432bfe973de7f716a85bc4f",
            tagLabel: "Trail + Freeplay Candidate",
            colorTone: "sponsors",
            note: "3-way merge of NameTag, Freeplay decouple, and Supersonic Trail",
            updatedAt: 1793939320,
          },
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
  if (!meta.recentRepositories.includes(clean)) {
    meta.recentRepositories.unshift(clean);
  }
  meta.activeRepositoryPath = clean;
  if (!meta.repositories[clean]) {
    meta.repositories[clean] = {
      repoPath: clean,
      localBaseRef: null,
      orphanHorizonCommitLimit: DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
      showArchivedOrphanTrees: false,
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

export async function saveCommitAnnotation(params: {
  repoPath: string;
  commitSha: string;
  tagLabel: string;
  colorTone: AnnotationTone;
  note: string;
}): Promise<AppWorkspaceMetadata> {
  if (isTauriDesktopRuntime()) {
    return invoke<AppWorkspaceMetadata>("save_commit_annotation_cmd", params);
  }
  const meta = loadBrowserFallbackMetadata();
  const entry = ensureFallbackRepoEntry(meta, params.repoPath);
  if (!params.tagLabel.trim() && !params.note.trim()) {
    delete entry.commitAnnotations[params.commitSha];
  } else {
    entry.commitAnnotations[params.commitSha] = {
      commitSha: params.commitSha,
      tagLabel: params.tagLabel,
      colorTone: params.colorTone,
      note: params.note,
      updatedAt: Math.floor(Date.now() / 1000),
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
