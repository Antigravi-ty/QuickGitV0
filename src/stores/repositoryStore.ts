import { create } from "zustand";
import {
  DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT,
  ROCKET_COMPANION_DEFAULT_ANNOTATIONS,
} from "../config/demoRepositorySnapshot";
import {
  checkoutDetachedCommit,
  inspectRepository,
  loadWorkspaceMetadata,
  pickRepositoryDirectory,
  removeRecentRepository,
  saveCommitAnnotation,
  setIncludeLocalStaleBranches,
  setLocalBaseBranch,
  setOrphanHorizon,
  setSidebarWidths,
  syncRemoteOrigin,
} from "../services/tauriGitClient";
import {
  AnnotationTone,
  AppWorkspaceMetadata,
  CommitTriageStatus,
  ComputedTopologyLayout,
  DetachedCheckoutOutcome,
  LineageDepthMode,
  RepositorySnapshot,
  TimezoneDisplayMode,
  TopologyFilterCategory,
} from "../types/gitTypes";
import { computeTopologyLayout } from "../utils/topologyGraphPipeline";

export type { TopologyFilterCategory } from "../types/gitTypes";

export type ColorThemeMode = "dark" | "light";

const THEME_STORAGE_KEY = "quickgit_v0_theme_mode";
const TIMEZONE_STORAGE_KEY = "quickgit_v0_timezone_mode";
const SHOW_MERGE_PILLS_STORAGE_KEY = "quickgit_v0_show_merge_pills";
const LINEAGE_DEPTH_STORAGE_KEY = "quickgit_v0_lineage_depth_mode";
const LEFT_SIDEBAR_WIDTH_STORAGE_KEY = "quickgit_v0_left_sidebar_width";
const RIGHT_SIDEBAR_WIDTH_STORAGE_KEY = "quickgit_v0_right_sidebar_width";

const DEFAULT_LEFT_SIDEBAR_WIDTH = 185;
const DEFAULT_RIGHT_SIDEBAR_WIDTH = 205;

function clampLeftSidebarWidth(width: number): number {
  return Math.min(480, Math.max(185, Math.round(width)));
}

function clampRightSidebarWidth(width: number): number {
  return Math.min(540, Math.max(205, Math.round(width)));
}

function resolveInitialLeftSidebarWidth(): number {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LEFT_SIDEBAR_WIDTH_STORAGE_KEY);
      const parsed = raw ? Number(raw) : NaN;
      if (Number.isFinite(parsed) && parsed > 0) {
        const clamped = clampLeftSidebarWidth(parsed);
        document.documentElement.style.setProperty(
          "--left-sidebar-width",
          `${clamped}px`
        );
        return clamped;
      }
    } catch (_) {}
    document.documentElement.style.setProperty(
      "--left-sidebar-width",
      `${DEFAULT_LEFT_SIDEBAR_WIDTH}px`
    );
  }
  return DEFAULT_LEFT_SIDEBAR_WIDTH;
}

function resolveInitialRightSidebarWidth(): number {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(RIGHT_SIDEBAR_WIDTH_STORAGE_KEY);
      const parsed = raw ? Number(raw) : NaN;
      if (Number.isFinite(parsed) && parsed > 0) {
        const clamped = clampRightSidebarWidth(parsed);
        document.documentElement.style.setProperty(
          "--right-sidebar-width",
          `${clamped}px`
        );
        return clamped;
      }
    } catch (_) {}
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${DEFAULT_RIGHT_SIDEBAR_WIDTH}px`
    );
  }
  return DEFAULT_RIGHT_SIDEBAR_WIDTH;
}

function resolveInitialTheme(): ColorThemeMode {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        document.documentElement.setAttribute("data-color-mode", saved);
        return saved;
      }
    } catch (_) {}
    document.documentElement.setAttribute("data-color-mode", "light");
  }
  return "light";
}

function resolveInitialTimezoneMode(): TimezoneDisplayMode {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(TIMEZONE_STORAGE_KEY);
      if (saved === "utc8" || saved === "utc0" || saved === "local") {
        return saved;
      }
    } catch (_) {}
  }
  return "utc8";
}

function resolveInitialShowMergePills(): boolean {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(SHOW_MERGE_PILLS_STORAGE_KEY);
      if (saved === "false") {
        return false;
      }
      if (saved === "true") {
        return true;
      }
    } catch (_) {}
  }
  return true;
}

function resolveInitialLineageDepthMode(): LineageDepthMode {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LINEAGE_DEPTH_STORAGE_KEY);
      if (
        saved === "unmerged_cluster" ||
        saved === "1_hop" ||
        saved === "2_hops"
      ) {
        return saved;
      }
    } catch (_) {}
  }
  return "unmerged_cluster";
}

interface RepositoryStoreState {
  workspaceMeta: AppWorkspaceMetadata;
  snapshot: RepositorySnapshot | null;
  layout: ComputedTopologyLayout | null;
  parentRepoPathStack: string[];
  selectedCommitSha: string | null;
  hoveredCommitSha: string | null;
  searchQuery: string;
  filterCategory: TopologyFilterCategory;
  focusedSubmodulePath: string | null;
  focusLineageOnly: boolean;
  lineageDepthMode: LineageDepthMode;
  timezoneMode: TimezoneDisplayMode;
  showMergeSourcePills: boolean;
  isLoading: boolean;
  isSyncingOrigin: boolean;
  errorMessage: string | null;
  lastCheckoutOutcome: DetachedCheckoutOutcome | null;
  theme: ColorThemeMode;
  leftSidebarWidth: number;
  rightSidebarWidth: number;

  initializeWorkspace: () => Promise<void>;
  selectAndLoadRepositoryFolder: () => Promise<void>;
  loadRepositoryByPath: (
    repoPath: string,
    pushParentStack?: boolean
  ) => Promise<void>;
  popParentRepository: () => Promise<void>;
  refreshCurrentRepository: () => Promise<void>;
  syncCurrentRepositoryOrigin: () => Promise<void>;
  selectCommit: (sha: string | null) => void;
  setHoveredCommit: (sha: string | null) => void;
  updateLocalBaseRef: (baseRef: string | null) => Promise<void>;
  updateOrphanHorizon: (
    horizonLimit: number,
    showArchived: boolean
  ) => Promise<void>;
  updateIncludeLocalStaleBranches: (includeLocalStale: boolean) => Promise<void>;
  updateCommitAnnotation: (params: {
    commitSha: string;
    tagLabel: string;
    colorTone: AnnotationTone;
    note: string;
    confirmed?: boolean;
    triageStatus?: CommitTriageStatus;
    linkedCommitSha?: string;
  }) => Promise<void>;
  batchUpdateCommitAnnotations: (
    items: Array<{
      commitSha: string;
      tagLabel: string;
      colorTone: AnnotationTone;
      note: string;
      confirmed?: boolean;
      triageStatus?: CommitTriageStatus;
      linkedCommitSha?: string;
    }>
  ) => Promise<void>;
  applyRocketCompanionTriagePresets: () => Promise<void>;
  removeRepositoryFromRecent: (repoPath: string) => Promise<void>;
  runDetachedCheckout: (targetSha: string) => Promise<void>;
  clearCheckoutBanner: () => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: TopologyFilterCategory) => void;
  setFocusedSubmodulePath: (submodulePath: string | null) => void;
  toggleFocusLineageOnly: () => void;
  setLineageDepthMode: (mode: LineageDepthMode) => void;
  setTimezoneMode: (mode: TimezoneDisplayMode) => void;
  setShowMergeSourcePills: (show: boolean) => void;
  toggleTheme: () => void;
  setLeftSidebarWidth: (width: number) => void;
  setRightSidebarWidth: (width: number) => void;
}

function recomputeCurrentLayout(
  snapshot: RepositorySnapshot | null,
  workspaceMeta: AppWorkspaceMetadata,
  searchQuery: string,
  filterCategory: TopologyFilterCategory,
  focusedSubmodulePath: string | null
): ComputedTopologyLayout | null {
  if (!snapshot) {
    return null;
  }
  const repoMeta = workspaceMeta.repositories[snapshot.repoPath];
  const localBaseRef = repoMeta?.localBaseRef ?? null;
  const orphanHorizonCommitLimit =
    repoMeta?.orphanHorizonCommitLimit ?? DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT;
  const showArchivedOrphanTrees = repoMeta?.showArchivedOrphanTrees ?? false;
  const includeLocalStaleBranches =
    repoMeta?.includeLocalStaleBranches ?? false;
  const commitAnnotations = repoMeta?.commitAnnotations ?? {};

  return computeTopologyLayout({
    snapshot,
    localBaseRef,
    orphanHorizonCommitLimit,
    showArchivedOrphanTrees,
    includeLocalStaleBranches,
    searchQuery,
    filterCategory,
    focusedSubmodulePath,
    commitAnnotations,
  });
}

export const useRepositoryStore = create<RepositoryStoreState>((set, get) => ({
  workspaceMeta: {
    recentRepositories: [],
    activeRepositoryPath: null,
    repositories: {},
  },
  snapshot: null,
  layout: null,
  parentRepoPathStack: [],
  selectedCommitSha: null,
  hoveredCommitSha: null,
  searchQuery: "",
  filterCategory: "all",
  focusedSubmodulePath: null,
  focusLineageOnly: false,
  lineageDepthMode: resolveInitialLineageDepthMode(),
  timezoneMode: resolveInitialTimezoneMode(),
  showMergeSourcePills: resolveInitialShowMergePills(),
  isLoading: false,
  isSyncingOrigin: false,
  errorMessage: null,
  lastCheckoutOutcome: null,
  theme: resolveInitialTheme(),
  leftSidebarWidth: resolveInitialLeftSidebarWidth(),
  rightSidebarWidth: resolveInitialRightSidebarWidth(),

  initializeWorkspace: async () => {
    const currentTheme = get().theme;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-color-mode", currentTheme);
    }
    set({ isLoading: true, errorMessage: null });
    try {
      const meta = await loadWorkspaceMetadata();
      const restoredLeft = meta.leftSidebarWidth
        ? clampLeftSidebarWidth(meta.leftSidebarWidth)
        : get().leftSidebarWidth;
      const restoredRight = meta.rightSidebarWidth
        ? clampRightSidebarWidth(meta.rightSidebarWidth)
        : get().rightSidebarWidth;
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(
          "--left-sidebar-width",
          `${restoredLeft}px`
        );
        document.documentElement.style.setProperty(
          "--right-sidebar-width",
          `${restoredRight}px`
        );
      }
      try {
        localStorage.setItem(
          LEFT_SIDEBAR_WIDTH_STORAGE_KEY,
          String(restoredLeft)
        );
        localStorage.setItem(
          RIGHT_SIDEBAR_WIDTH_STORAGE_KEY,
          String(restoredRight)
        );
      } catch (_) {}
      set({
        workspaceMeta: meta,
        leftSidebarWidth: restoredLeft,
        rightSidebarWidth: restoredRight,
      });
      const initialPath =
        meta.activeRepositoryPath ?? meta.recentRepositories[0] ?? null;
      if (initialPath) {
        await get().loadRepositoryByPath(initialPath, false);
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      set({
        isLoading: false,
        errorMessage: err instanceof Error ? err.message : String(err),
      });
    }
  },

  selectAndLoadRepositoryFolder: async () => {
    try {
      const selectedPath = await pickRepositoryDirectory();
      if (selectedPath && selectedPath.trim()) {
        await get().loadRepositoryByPath(selectedPath.trim(), false);
      }
    } catch (err) {
      set({
        errorMessage: err instanceof Error ? err.message : String(err),
      });
    }
  },

  loadRepositoryByPath: async (repoPath: string, pushParentStack = false) => {
    const trimmed = repoPath.trim();
    if (!trimmed) {
      return;
    }
    const prevSnapshot = get().snapshot;
    const prevStack = get().parentRepoPathStack;

    set({
      isLoading: true,
      errorMessage: null,
      lastCheckoutOutcome: null,
    });
    try {
      const snapshot = await inspectRepository(trimmed);
      const workspaceMeta = await loadWorkspaceMetadata();
      const { searchQuery, filterCategory } = get();
      const layout = recomputeCurrentLayout(
        snapshot,
        workspaceMeta,
        searchQuery,
        filterCategory,
        null
      );
      const nextStack =
        pushParentStack &&
        prevSnapshot &&
        prevSnapshot.repoPath !== snapshot.repoPath
          ? [...prevStack, prevSnapshot.repoPath]
          : prevStack;

      const defaultSelectedSha =
        snapshot.headSha ||
        layout?.rows[0]?.commit.sha ||
        snapshot.commits[0]?.sha ||
        null;

      set({
        snapshot,
        workspaceMeta,
        layout,
        parentRepoPathStack: nextStack,
        selectedCommitSha: defaultSelectedSha,
        focusedSubmodulePath: null,
        isLoading: false,
        errorMessage: null,
      });
    } catch (err) {
      set({
        isLoading: false,
        errorMessage: err instanceof Error ? err.message : String(err),
      });
    }
  },

  popParentRepository: async () => {
    const stack = get().parentRepoPathStack;
    if (stack.length === 0) {
      return;
    }
    const parentPath = stack[stack.length - 1];
    set({ parentRepoPathStack: stack.slice(0, -1) });
    await get().loadRepositoryByPath(parentPath, false);
  },

  refreshCurrentRepository: async () => {
    const current = get().snapshot;
    if (!current) {
      return;
    }
    await get().loadRepositoryByPath(current.repoPath, false);
  },

  syncCurrentRepositoryOrigin: async () => {
    const current = get().snapshot;
    if (!current) {
      return;
    }
    set({ isSyncingOrigin: true, errorMessage: null });
    try {
      const snapshot = await syncRemoteOrigin(current.repoPath);
      const workspaceMeta = await loadWorkspaceMetadata();
      const { searchQuery, filterCategory, focusedSubmodulePath } = get();
      const layout = recomputeCurrentLayout(
        snapshot,
        workspaceMeta,
        searchQuery,
        filterCategory,
        focusedSubmodulePath
      );
      set({
        snapshot,
        workspaceMeta,
        layout,
        isSyncingOrigin: false,
      });
    } catch (err) {
      set({
        isSyncingOrigin: false,
        errorMessage: err instanceof Error ? err.message : String(err),
      });
    }
  },

  selectCommit: (sha: string | null) => {
    set({ selectedCommitSha: sha });
  },

  setHoveredCommit: (sha: string | null) => {
    if (get().hoveredCommitSha !== sha) {
      set({ hoveredCommitSha: sha });
    }
  },

  updateLocalBaseRef: async (baseRef: string | null) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const workspaceMeta = await setLocalBaseBranch(snapshot.repoPath, baseRef);
    const { searchQuery, filterCategory, focusedSubmodulePath } = get();
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      filterCategory,
      focusedSubmodulePath
    );
    set({ workspaceMeta, layout });
  },

  updateOrphanHorizon: async (horizonLimit: number, showArchived: boolean) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const workspaceMeta = await setOrphanHorizon(
      snapshot.repoPath,
      horizonLimit,
      showArchived
    );
    const { searchQuery, filterCategory, focusedSubmodulePath } = get();
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      filterCategory,
      focusedSubmodulePath
    );
    set({ workspaceMeta, layout });
  },

  updateIncludeLocalStaleBranches: async (includeLocalStale: boolean) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const workspaceMeta = await setIncludeLocalStaleBranches(
      snapshot.repoPath,
      includeLocalStale
    );
    const { searchQuery, filterCategory, focusedSubmodulePath } = get();
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      filterCategory,
      focusedSubmodulePath
    );
    set({ workspaceMeta, layout });
  },

  updateCommitAnnotation: async (params) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const workspaceMeta = await saveCommitAnnotation({
      repoPath: snapshot.repoPath,
      ...params,
    });
    const { searchQuery, filterCategory, focusedSubmodulePath } = get();
    const layout =
      searchQuery.trim().length > 0
        ? recomputeCurrentLayout(
            snapshot,
            workspaceMeta,
            searchQuery,
            filterCategory,
            focusedSubmodulePath
          )
        : get().layout;
    set({ workspaceMeta, layout });
  },

  batchUpdateCommitAnnotations: async (items) => {
    const snapshot = get().snapshot;
    if (!snapshot || items.length === 0) {
      return;
    }
    let latestMeta = get().workspaceMeta;
    for (const item of items) {
      latestMeta = await saveCommitAnnotation({
        repoPath: snapshot.repoPath,
        ...item,
      });
    }
    const { searchQuery, filterCategory, focusedSubmodulePath } = get();
    const layout =
      searchQuery.trim().length > 0
        ? recomputeCurrentLayout(
            snapshot,
            latestMeta,
            searchQuery,
            filterCategory,
            focusedSubmodulePath
          )
        : get().layout;
    set({ workspaceMeta: latestMeta, layout });
  },

  applyRocketCompanionTriagePresets: async () => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const commitSet = new Set(snapshot.commits.map((c) => c.sha));
    const items = Object.values(ROCKET_COMPANION_DEFAULT_ANNOTATIONS)
      .filter((ann) => commitSet.has(ann.commitSha))
      .map((ann) => ({
        commitSha: ann.commitSha,
        tagLabel: ann.tagLabel,
        colorTone: ann.colorTone,
        note: ann.note,
        confirmed: ann.confirmed,
        triageStatus: ann.triageStatus,
        linkedCommitSha: ann.linkedCommitSha,
      }));
    await get().batchUpdateCommitAnnotations(items);
  },

  removeRepositoryFromRecent: async (repoPath: string) => {
    const workspaceMeta = await removeRecentRepository(repoPath);
    set({ workspaceMeta });
  },

  runDetachedCheckout: async (targetSha: string) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    set({ isLoading: true, errorMessage: null });
    try {
      const outcome = await checkoutDetachedCommit(
        snapshot.repoPath,
        targetSha
      );
      if (outcome.success) {
        const refreshed = await inspectRepository(snapshot.repoPath);
        const {
          workspaceMeta,
          searchQuery,
          filterCategory,
          focusedSubmodulePath,
        } = get();
        const layout = recomputeCurrentLayout(
          refreshed,
          workspaceMeta,
          searchQuery,
          filterCategory,
          focusedSubmodulePath
        );
        set({
          snapshot: refreshed,
          layout,
          selectedCommitSha: targetSha,
          lastCheckoutOutcome: outcome,
          isLoading: false,
        });
      } else {
        set({
          snapshot: {
            ...snapshot,
            workingTreeStatus: outcome.workingTreeStatus,
          },
          lastCheckoutOutcome: outcome,
          isLoading: false,
        });
      }
    } catch (err) {
      set({
        isLoading: false,
        errorMessage: err instanceof Error ? err.message : String(err),
      });
    }
  },

  clearCheckoutBanner: () => {
    set({ lastCheckoutOutcome: null, errorMessage: null });
  },

  setSearchQuery: (searchQuery: string) => {
    const { snapshot, workspaceMeta, filterCategory, focusedSubmodulePath } =
      get();
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      filterCategory,
      focusedSubmodulePath
    );
    set({ searchQuery, layout });
  },

  setFilterCategory: (filterCategory: TopologyFilterCategory) => {
    set({ filterCategory });
  },

  setFocusedSubmodulePath: (focusedSubmodulePath: string | null) => {
    const nextFilter: TopologyFilterCategory = focusedSubmodulePath
      ? "submodule_bump"
      : get().filterCategory === "submodule_bump"
      ? "all"
      : get().filterCategory;
    set({
      focusedSubmodulePath,
      filterCategory: nextFilter,
    });
  },

  toggleFocusLineageOnly: () => {
    set({ focusLineageOnly: !get().focusLineageOnly });
  },

  setLineageDepthMode: (lineageDepthMode: LineageDepthMode) => {
    try {
      localStorage.setItem(LINEAGE_DEPTH_STORAGE_KEY, lineageDepthMode);
    } catch (_) {}
    set({ lineageDepthMode });
  },

  setTimezoneMode: (timezoneMode: TimezoneDisplayMode) => {
    try {
      localStorage.setItem(TIMEZONE_STORAGE_KEY, timezoneMode);
    } catch (_) {}
    set({ timezoneMode });
  },

  setShowMergeSourcePills: (showMergeSourcePills: boolean) => {
    try {
      localStorage.setItem(
        SHOW_MERGE_PILLS_STORAGE_KEY,
        String(showMergeSourcePills)
      );
    } catch (_) {}
    set({ showMergeSourcePills });
  },

  toggleTheme: () => {
    const nextTheme: ColorThemeMode =
      get().theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-color-mode", nextTheme);
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (_) {}
    set({ theme: nextTheme });
  },

  setLeftSidebarWidth: (width: number) => {
    const clamped = clampLeftSidebarWidth(width);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--left-sidebar-width",
        `${clamped}px`
      );
    }
    try {
      localStorage.setItem(LEFT_SIDEBAR_WIDTH_STORAGE_KEY, String(clamped));
    } catch (_) {}
    set({ leftSidebarWidth: clamped });
    void setSidebarWidths(clamped, get().rightSidebarWidth).then((meta) => {
      set({ workspaceMeta: meta });
    });
  },

  setRightSidebarWidth: (width: number) => {
    const clamped = clampRightSidebarWidth(width);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--right-sidebar-width",
        `${clamped}px`
      );
    }
    try {
      localStorage.setItem(RIGHT_SIDEBAR_WIDTH_STORAGE_KEY, String(clamped));
    } catch (_) {}
    set({ rightSidebarWidth: clamped });
    void setSidebarWidths(get().leftSidebarWidth, clamped).then((meta) => {
      set({ workspaceMeta: meta });
    });
  },
}));
