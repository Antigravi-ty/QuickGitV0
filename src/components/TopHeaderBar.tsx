import React from "react";
import {
  ArrowLeft,
  CloudDownload,
  FolderGit2,
  FolderOpen,
  GitBranch,
  Layers,
  Moon,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useRepositoryStore } from "../stores/repositoryStore";
import { stripRemotePrefix } from "../utils/formatters";

export const TopHeaderBar: React.FC = () => {
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const resolvedBaseRefName = useRepositoryStore(
    (s) => s.layout?.resolvedBaseRefName ?? null
  );
  const parentRepoPathStack = useRepositoryStore((s) => s.parentRepoPathStack);
  const searchQuery = useRepositoryStore((s) => s.searchQuery);
  const filterCategory = useRepositoryStore((s) => s.filterCategory);
  const focusLineageOnly = useRepositoryStore((s) => s.focusLineageOnly);
  const isLoading = useRepositoryStore((s) => s.isLoading);
  const isSyncingOrigin = useRepositoryStore((s) => s.isSyncingOrigin);
  const theme = useRepositoryStore((s) => s.theme);
  const selectAndLoadRepositoryFolder = useRepositoryStore(
    (s) => s.selectAndLoadRepositoryFolder
  );
  const popParentRepository = useRepositoryStore((s) => s.popParentRepository);
  const refreshCurrentRepository = useRepositoryStore(
    (s) => s.refreshCurrentRepository
  );
  const syncCurrentRepositoryOrigin = useRepositoryStore(
    (s) => s.syncCurrentRepositoryOrigin
  );
  const setSearchQuery = useRepositoryStore((s) => s.setSearchQuery);
  const setFilterCategory = useRepositoryStore((s) => s.setFilterCategory);
  const toggleFocusLineageOnly = useRepositoryStore(
    (s) => s.toggleFocusLineageOnly
  );
  const toggleTheme = useRepositoryStore((s) => s.toggleTheme);

  const isClean = snapshot?.workingTreeStatus.isClean ?? true;

  return (
    <header className="primer-header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flex: 1,
          minWidth: 300,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 13.5,
            paddingRight: 4,
          }}
        >
          <FolderGit2 size={16} style={{ color: "var(--fg-accent)" }} />
          <span>QuickGit V0</span>
        </div>

        {parentRepoPathStack.length > 0 && (
          <button
            type="button"
            className="primer-btn primer-btn-status-accent"
            onClick={() => void popParentRepository()}
            title="Return to parent repository"
          >
            <ArrowLeft size={13} />
            <span>Back to Parent Repo</span>
          </button>
        )}

        <button
          type="button"
          className="primer-btn primer-btn-primary"
          onClick={() => void selectAndLoadRepositoryFolder()}
          disabled={isLoading}
          title="Open native folder picker to select and save a Git repository folder"
        >
          <FolderOpen size={13} />
          <span>Select Folder...</span>
        </button>

        {snapshot && (
          <button
            type="button"
            className="primer-btn"
            onClick={() => void selectAndLoadRepositoryFolder()}
            disabled={isLoading}
            title={`Active repository: ${snapshot.repoPath} (Click to switch folder)`}
            style={{
              maxWidth: 320,
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: "var(--font-mono-stack)",
              fontSize: 11.5,
            }}
          >
            <span style={{ fontWeight: 700, color: "var(--fg-accent)" }}>
              {snapshot.repoName}
            </span>
            <span
              style={{
                color: "var(--fg-muted)",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {snapshot.repoPath}
            </span>
          </button>
        )}

        <button
          type="button"
          className="primer-btn"
          onClick={() => void refreshCurrentRepository()}
          disabled={isLoading || !snapshot}
          title="Rescan local Git topology and working tree status"
        >
          <RefreshCw size={13} className={isLoading ? "spin-icon" : ""} />
          <span>Refresh</span>
        </button>

        <button
          type="button"
          className="primer-btn primer-btn-status-accent"
          onClick={() => void syncCurrentRepositoryOrigin()}
          disabled={isSyncingOrigin || isLoading || !snapshot}
          title="Fetch latest cloud origin history without pruning local branches, and mark local-only / cloud-deleted branches in gray"
        >
          <CloudDownload
            size={13}
            className={isSyncingOrigin ? "spin-icon" : ""}
          />
          <span>{isSyncingOrigin ? "Syncing Origin..." : "Sync Origin"}</span>
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {resolvedBaseRefName && (
          <span
            className="primer-badge primer-badge-accent"
            title="Local visual mainline base spine"
          >
            <GitBranch size={12} />
            <span>Base: {stripRemotePrefix(resolvedBaseRefName)}</span>
          </span>
        )}

        <span
          className={`primer-badge ${
            isClean ? "primer-badge-success" : "primer-badge-danger"
          }`}
          title={snapshot?.workingTreeStatus.summaryMessage}
        >
          {isClean ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
          <span>{isClean ? "Worktree Clean" : "Dirty (Checkout Locked)"}</span>
        </span>

        <div style={{ position: "relative", width: 205 }}>
          <Search
            size={13}
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--fg-muted)",
            }}
          />
          <input
            type="text"
            className="primer-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SHA, title, branch..."
            style={{ paddingLeft: 26, fontSize: 11.5 }}
          />
        </div>

        <div
          className="primer-segmented-control"
          style={{ width: "auto" }}
          title="Highlight specific commit categories in-place while keeping all commits visible in the graph"
        >
          {(
            [
              { id: "all", label: "All" },
              { id: "mainline", label: "Mainline" },
              { id: "unmerged_tip", label: "Unmerged" },
              { id: "multi_merged", label: "Merges" },
              { id: "submodule_bump", label: "Submodule Bumps" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`primer-segmented-button ${
                filterCategory === tab.id
                  ? "primer-segmented-button-active"
                  : ""
              }`}
              onClick={() => setFilterCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`primer-btn ${
            focusLineageOnly ? "primer-btn-sponsors" : ""
          }`}
          onClick={toggleFocusLineageOnly}
          title="Highlight only direct parents and children of the selected commit while desaturating unrelated branches"
        >
          <Layers size={13} />
          <span>{focusLineageOnly ? "Focus Lineage: ON" : "Focus Lineage"}</span>
        </button>

        <button
          type="button"
          className="primer-btn primer-btn-icon-only"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
};
