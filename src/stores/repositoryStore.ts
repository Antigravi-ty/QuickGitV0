import { create } from "zustand";
import { DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT } from "../config/demoRepositorySnapshot";
import {
  checkoutDetachedCommit,
  inspectRepository,
  loadWorkspaceMetadata,
  removeRecentRepository,
  saveCommitAnnotation,
  setLocalBaseBranch,
  setOrphanHorizon,
} from "../services/tauriGitClient";
import {
  AnnotationTone,
  AppWorkspaceMetadata,
  ComputedTopologyLayout,
  DetachedCheckoutOutcome,
  RepositorySnapshot,
} from "../types/gitTypes";
import { computeTopologyLayout } from "../utils/topologyGraphPipeline";

export type TopologyFilterCategory =
  | "all"
  | "mainline"
  | "unmerged_tip"
  | "multi_merged"
  | "submodule_bump";

export type ColorThemeMode = "dark" | "light";

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
  isLoading: boolean;
  errorMessage: string | null;
  lastCheckoutOutcome: DetachedCheckoutOutcome | null;
  theme: ColorThemeMode;
  leftSidebarWidth: number;
  rightSidebarWidth: number;

  initializeWorkspace: () => Promise<void>;
  loadRepositoryByPath: (
    repoPath: string,
    pushParentStack?: boolean
  ) => Promise<void>;
  popParentRepository: () => Promise<void>;
  refreshCurrentRepository: () => Promise<void>;
  selectCommit: (sha: string | null) => void;
  setHoveredCommit: (sha: string | null) => void;
  updateLocalBaseRef: (baseRef: string | null) => Promise<void>;
  updateOrphanHorizon: (
    horizonLimit: number,
    showArchived: boolean
  ) => Promise<void>;
  updateCommitAnnotation: (params: {
    commitSha: string;
    tagLabel: string;
    colorTone: AnnotationTone;
    note: string;
  }) => Promise<void>;
  removeRepositoryFromRecent: (repoPath: string) => Promise<void>;
  runDetachedCheckout: (targetSha: string) => Promise<void>;
  clearCheckoutBanner: () => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: TopologyFilterCategory) => void;
  setFocusedSubmodulePath: (submodulePath: string | null) => void;
  toggleFocusLineageOnly: () => void;
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

  return computeTopologyLayout({
    snapshot,
    localBaseRef,
    orphanHorizonCommitLimit,
    showArchivedOrphanTrees,
    searchQuery,
    filterCategory,
    focusedSubmodulePath,
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
  isLoading: false,
  errorMessage: null,
  lastCheckoutOutcome: null,
  theme: "dark",
  leftSidebarWidth: 295,
  rightSidebarWidth: 375,

  initializeWorkspace: async () => {
    set({ isLoading: true, errorMessage: null });
    try {
      const meta = await loadWorkspaceMetadata();
      set({ workspaceMeta: meta });
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
        pushParentStack && prevSnapshot && prevSnapshot.repoPath !== snapshot.repoPath
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

  selectCommit: (sha: string | null) => {
    set({ selectedCommitSha: sha });
  },

  setHoveredCommit: (sha: string | null) => {
    set({ hoveredCommitSha: sha });
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

  updateCommitAnnotation: async (params) => {
    const snapshot = get().snapshot;
    if (!snapshot) {
      return;
    }
    const workspaceMeta = await saveCommitAnnotation({
      repoPath: snapshot.repoPath,
      ...params,
    });
    set({ workspaceMeta });
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
    const { snapshot, workspaceMeta, searchQuery, focusedSubmodulePath } =
      get();
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      filterCategory,
      focusedSubmodulePath
    );
    set({ filterCategory, layout });
  },

  setFocusedSubmodulePath: (focusedSubmodulePath: string | null) => {
    const { snapshot, workspaceMeta, searchQuery } = get();
    const nextFilter: TopologyFilterCategory = focusedSubmodulePath
      ? "submodule_bump"
      : get().filterCategory === "submodule_bump"
      ? "all"
      : get().filterCategory;
    const layout = recomputeCurrentLayout(
      snapshot,
      workspaceMeta,
      searchQuery,
      nextFilter,
      focusedSubmodulePath
    );
    set({
      focusedSubmodulePath,
      filterCategory: nextFilter,
      layout,
    });
  },

  toggleFocusLineageOnly: () => {
    set({ focusLineageOnly: !get().focusLineageOnly });
  },

  toggleTheme: () => {
    const nextTheme: ColorThemeMode =
      get().theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-color-mode", nextTheme);
    }
    set({ theme: nextTheme });
  },

  setLeftSidebarWidth: (width: number) => {
    const clamped = Math.min(480, Math.max(220, Math.round(width)));
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--left-sidebar-width",
        `${clamped}px`
      );
    }
    set({ leftSidebarWidth: clamped });
  },

  setRightSidebarWidth: (width: number) => {
    const clamped = Math.min(540, Math.max(260, Math.round(width)));
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--right-sidebar-width",
        `${clamped}px`
      );
    }
    set({ rightSidebarWidth: clamped });
  },
}));
