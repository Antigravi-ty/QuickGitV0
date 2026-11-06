import React, { useState } from "react";
import {
  ArrowLeft,
  FolderGit2,
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

export const TopHeaderBar: React.FC = () => {
  const {
    snapshot,
    layout,
    parentRepoPathStack,
    searchQuery,
    filterCategory,
    focusLineageOnly,
    isLoading,
    theme,
    loadRepositoryByPath,
    popParentRepository,
    refreshCurrentRepository,
    setSearchQuery,
    setFilterCategory,
    toggleFocusLineageOnly,
    toggleTheme,
  } = useRepositoryStore();

  const [pathInput, setPathInput] = useState(
    snapshot?.repoPath ?? "/Users/dev/Workspace/RocketCompanion"
  );

  React.useEffect(() => {
    if (snapshot?.repoPath) {
      setPathInput(snapshot.repoPath);
    }
  }, [snapshot?.repoPath]);

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathInput.trim()) {
      void loadRepositoryByPath(pathInput.trim(), false);
    }
  };

  const isClean = snapshot?.workingTreeStatus.isClean ?? true;

  return (
    <header className="primer-header">
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 320 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 13.5,
            paddingRight: 6,
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

        <form
          onSubmit={handleImportSubmit}
          style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, maxWidth: 520 }}
        >
          <input
            type="text"
            className="primer-input"
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
            placeholder="Local repository path (e.g. /Users/.../RocketCompanion)"
            style={{ fontFamily: "var(--font-mono-stack)", fontSize: 11.5 }}
          />
          <button
            type="submit"
            className="primer-btn primer-btn-primary"
            disabled={isLoading}
          >
            Load Repo
          </button>
        </form>

        <button
          type="button"
          className="primer-btn"
          onClick={() => void refreshCurrentRepository()}
          disabled={isLoading}
          title="Rescan Git topology and working tree status"
        >
          <RefreshCw size={13} className={isLoading ? "spin-icon" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {layout?.resolvedBaseRefName && (
          <span className="primer-badge primer-badge-accent" title="Local visual mainline base">
            <GitBranch size={12} />
            <span>Base: {layout.resolvedBaseRefName}</span>
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

        <div style={{ position: "relative", width: 210 }}>
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
            placeholder="Filter SHA, branch, submodule..."
            style={{ paddingLeft: 26, fontSize: 11.5 }}
          />
        </div>

        <div className="primer-segmented-control" style={{ width: "auto" }}>
          {(
            [
              { id: "all", label: "All" },
              { id: "mainline", label: "Mainline" },
              { id: "unmerged_tip", label: "Unmerged Tips" },
              { id: "multi_merged", label: "Merges" },
              { id: "submodule_bump", label: "Submodule Bumps" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`primer-segmented-button ${
                filterCategory === tab.id ? "primer-segmented-button-active" : ""
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
          title="Dim unrelated cross-lane merge lines and highlight only direct parents/children of the selected commit"
        >
          <Layers size={13} />
          <span>{focusLineageOnly ? "Focus Lineage: ON" : "Focus Lineage"}</span>
        </button>

        <button
          type="button"
          className="primer-btn primer-btn-icon-only"
          onClick={toggleTheme}
          title="Toggle color mode"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
};
