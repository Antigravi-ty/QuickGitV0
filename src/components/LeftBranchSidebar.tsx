import React, { useState } from "react";
import {
  Anchor,
  Box,
  Cloud,
  CloudOff,
  ExternalLink,
  Eye,
  EyeOff,
  FolderOpen,
  GitBranch,
  Plus,
  Trash2,
} from "lucide-react";
import { DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT } from "../config/demoRepositorySnapshot";
import { openAppConfigDirectory } from "../services/tauriGitClient";
import { useRepositoryStore } from "../stores/repositoryStore";
import { formatRelativeOrShortTime, stripRemotePrefix } from "../utils/formatters";

export const LeftBranchSidebar: React.FC = () => {
  const workspaceMeta = useRepositoryStore((s) => s.workspaceMeta);
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const layout = useRepositoryStore((s) => s.layout);
  const selectedCommitSha = useRepositoryStore((s) => s.selectedCommitSha);
  const focusedSubmodulePath = useRepositoryStore(
    (s) => s.focusedSubmodulePath
  );
  const selectAndLoadRepositoryFolder = useRepositoryStore(
    (s) => s.selectAndLoadRepositoryFolder
  );
  const loadRepositoryByPath = useRepositoryStore(
    (s) => s.loadRepositoryByPath
  );
  const selectCommit = useRepositoryStore((s) => s.selectCommit);
  const updateLocalBaseRef = useRepositoryStore((s) => s.updateLocalBaseRef);
  const updateOrphanHorizon = useRepositoryStore((s) => s.updateOrphanHorizon);
  const updateIncludeLocalStaleBranches = useRepositoryStore(
    (s) => s.updateIncludeLocalStaleBranches
  );
  const removeRepositoryFromRecent = useRepositoryStore(
    (s) => s.removeRepositoryFromRecent
  );
  const setFocusedSubmodulePath = useRepositoryStore(
    (s) => s.setFocusedSubmodulePath
  );

  const [branchFilter, setBranchFilter] = useState("");

  if (!snapshot || !layout) {
    return (
      <div style={{ padding: 14, color: "var(--fg-muted)", fontSize: 12 }}>
        No repository loaded. Click &ldquo;Select Folder...&rdquo; to open a Git
        repository.
      </div>
    );
  }

  const repoMeta = workspaceMeta.repositories[snapshot.repoPath];
  const horizonLimit =
    repoMeta?.orphanHorizonCommitLimit ?? DEFAULT_ORPHAN_HORIZON_COMMIT_LIMIT;
  const showArchived = repoMeta?.showArchivedOrphanTrees ?? false;
  const includeLocalStale = repoMeta?.includeLocalStaleBranches ?? false;

  const filteredBranches = layout.branchSummaries.filter((item) =>
    item.branch.name.toLowerCase().includes(branchFilter.trim().toLowerCase())
  );

  const unmergedBranches = filteredBranches.filter(
    (b) => b.category === "unmerged_tip"
  );
  const baseBranches = filteredBranches.filter((b) => b.category === "base");
  const mergedBranches = filteredBranches.filter(
    (b) => b.category === "merged"
  );
  const orphanBranches = filteredBranches.filter(
    (b) => b.category === "orphan_disconnected"
  );
  const localStaleBranches = filteredBranches.filter(
    (b) => b.category === "local_stale"
  );

  const totalCloudBranchCount = layout.branchSummaries.filter(
    (b) => b.isOnRemoteOrigin
  ).length;
  const totalStaleBranchCount = layout.branchSummaries.filter(
    (b) => !b.isOnRemoteOrigin
  ).length;

  const resolveSubmoduleRepoPath = (subPath: string): string => {
    const base = snapshot.repoPath.replace(/\/+$/, "");
    return `${base}/${subPath}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        padding: "10px 10px 16px 10px",
        gap: 12,
      }}
    >
      {/* Saved Workspace Repositories */}
      <div className="primer-box">
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <FolderOpen size={13} />
            <span>Workspace Space ({workspaceMeta.recentRepositories.length})</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              type="button"
              className="primer-btn primer-card-action-btn"
              onClick={() => void selectAndLoadRepositoryFolder()}
              title="Select and save a repository folder into workspace"
            >
              <Plus size={11} />
              <span>Add</span>
            </button>
            <button
              type="button"
              className="primer-btn primer-card-action-btn"
              onClick={() => void openAppConfigDirectory()}
              title="Open local metadata storage directory"
            >
              Config Dir
            </button>
          </div>
        </div>
        <div
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {workspaceMeta.recentRepositories.map((repoPath) => {
            const isCurrent = repoPath === snapshot.repoPath;
            const shortName =
              repoPath.split("/").filter(Boolean).pop() ?? repoPath;
            return (
              <div
                key={repoPath}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <button
                  type="button"
                  className={`primer-snippet-row-btn ${
                    isCurrent ? "primer-snippet-row-selected" : ""
                  }`}
                  style={{ padding: "5px 8px", flex: 1, minWidth: 0 }}
                  onClick={() => void loadRepositoryByPath(repoPath, false)}
                  title={repoPath}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 11.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shortName}
                  </span>
                  {isCurrent && (
                    <span className="primer-label primer-label-accent">
                      Active
                    </span>
                  )}
                </button>
                {workspaceMeta.recentRepositories.length > 1 && (
                  <button
                    type="button"
                    className="primer-btn primer-btn-icon-only"
                    onClick={() => void removeRepositoryFromRecent(repoPath)}
                    title="Remove from saved workspace list"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submodules & Companion Correlation */}
      {snapshot.submodules.length > 0 && (
        <div className="primer-box">
          <div
            className="primer-box-header"
            style={{ padding: "7px 10px", fontSize: 11.5 }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Box size={13} />
              <span>Submodules ({snapshot.submodules.length})</span>
            </span>
            {focusedSubmodulePath && (
              <button
                type="button"
                className="primer-btn primer-card-action-btn"
                onClick={() => setFocusedSubmodulePath(null)}
              >
                Clear Highlight
              </button>
            )}
          </div>
          <div
            className="primer-box-body"
            style={{
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {snapshot.submodules.map((sub) => {
              const isFocused = focusedSubmodulePath === sub.path;
              return (
                <div
                  key={sub.path}
                  style={{
                    padding: "7px 8px",
                    borderRadius: 6,
                    border: `1px solid ${
                      isFocused ? "var(--fg-accent)" : "var(--border-default)"
                    }`,
                    backgroundColor: isFocused
                      ? "var(--selected-item-bg)"
                      : "var(--bg-canvas-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 11.5,
                        fontFamily: "var(--font-mono-stack)",
                      }}
                    >
                      {sub.path}
                    </span>
                    <span
                      className={`primer-label ${
                        sub.isDirty
                          ? "primer-label-danger"
                          : "primer-label-success"
                      }`}
                    >
                      {sub.isDirty
                        ? "Dirty"
                        : sub.currentWorktreeSha
                        ? sub.currentWorktreeSha.slice(0, 7)
                        : "Synced"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--fg-muted)",
                      wordBreak: "break-all",
                    }}
                  >
                    {sub.url}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <button
                      type="button"
                      className={`primer-btn primer-card-action-btn ${
                        isFocused ? "primer-btn-status-accent" : ""
                      }`}
                      style={{ flex: 1 }}
                      onClick={() =>
                        setFocusedSubmodulePath(isFocused ? null : sub.path)
                      }
                    >
                      {isFocused ? "Highlighting Bumps" : "Highlight Bumps"}
                    </button>
                    <button
                      type="button"
                      className="primer-btn primer-card-action-btn"
                      style={{ flex: 1 }}
                      onClick={() =>
                        void loadRepositoryByPath(
                          resolveSubmoduleRepoPath(sub.path),
                          true
                        )
                      }
                      title="Open this submodule folder directly to inspect its own branch/merge tree"
                    >
                      <ExternalLink size={11} />
                      <span>Inspect Tree</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Orphan Branch Horizon Policy (10-commit rule) */}
      <div className="primer-box">
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span>Orphan Tree Horizon</span>
          <span className="primer-label primer-label-neutral">
            {layout.orphanComponents.length} root tree(s)
          </span>
        </div>
        <div
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11.5, color: "var(--fg-muted)" }}>
              Recent commit threshold:
            </span>
            <input
              type="number"
              min={1}
              max={100}
              className="primer-input"
              style={{
                width: 64,
                padding: "3px 6px",
                fontSize: 11.5,
                textAlign: "center",
              }}
              value={horizonLimit}
              onChange={(e) =>
                void updateOrphanHorizon(
                  Number(e.target.value) || 10,
                  showArchived
                )
              }
            />
          </div>
          <div
            style={{ fontSize: 11, color: "var(--fg-muted)", lineHeight: 1.4 }}
          >
            When the newest orphan tree has &lt; {horizonLimit} commits, the
            previous orphan tree stays visible. Once &gt;= {horizonLimit}{" "}
            commits, older orphan trees auto-hide.
          </div>
          {layout.hiddenOrphanTreeCount > 0 && (
            <button
              type="button"
              className={`primer-btn ${
                showArchived ? "primer-btn-status-attention" : ""
              }`}
              onClick={() =>
                void updateOrphanHorizon(horizonLimit, !showArchived)
              }
            >
              {showArchived ? <EyeOff size={12} /> : <Eye size={12} />}
              <span>
                {showArchived
                  ? `Hide ${layout.hiddenOrphanTreeCount} Archived Orphan Tree(s)`
                  : `Show ${layout.hiddenOrphanTreeCount} Archived Orphan Tree(s) (${layout.hiddenOrphanCommitCount} commits)`}
              </span>
            </button>
          )}
          {totalStaleBranchCount > 0 && (
            <button
              type="button"
              className={`primer-btn ${
                includeLocalStale ? "primer-btn-status-accent" : ""
              }`}
              onClick={() =>
                void updateIncludeLocalStaleBranches(!includeLocalStale)
              }
              title="Toggle visibility of commits belonging only to local or unpruned branches no longer present on origin"
            >
              {includeLocalStale ? <EyeOff size={12} /> : <Eye size={12} />}
              <span>
                {includeLocalStale
                  ? `Hide Local / Unpruned History (${totalStaleBranchCount} refs)`
                  : `Show Local / Unpruned History (${totalStaleBranchCount} refs${
                      layout.hiddenStaleCommitCount > 0
                        ? `, ${layout.hiddenStaleCommitCount} commits`
                        : ""
                    })`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Local Base & Branch Classification */}
      <div
        className="primer-box"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 260,
        }}
      >
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <GitBranch size={13} />
            <span>
              Origin Branches ({totalCloudBranchCount})
              {totalStaleBranchCount > 0
                ? ` + ${totalStaleBranchCount} Local`
                : ""}
            </span>
          </span>
          <span className="primer-label primer-label-attention">
            {unmergedBranches.length} Unmerged
          </span>
        </div>
        <div
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flex: 1,
            overflowY: "auto",
          }}
        >
          {snapshot.lastRemoteSyncTimestamp && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 10.5,
                color: "var(--fg-muted)",
                padding: "2px 4px",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <Cloud size={11} style={{ color: "var(--fg-success)" }} />
                <span>Origin synced (no local prune)</span>
              </span>
              <span>
                {formatRelativeOrShortTime(snapshot.lastRemoteSyncTimestamp)}
              </span>
            </div>
          )}

          <input
            type="text"
            className="primer-input"
            placeholder="Filter branches..."
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            style={{ fontSize: 11.5, padding: "4px 8px" }}
          />

          {/* Local Base Spine Section */}
          <div>
            <div className="primer-action-list-header">
              Local Visual Base (Spine)
            </div>
            {baseBranches.map(({ branch, isOnRemoteOrigin }) => (
              <div
                key={branch.fullRef}
                className="primer-snippet-row-btn primer-snippet-row-selected"
                style={{ padding: "5px 8px", marginTop: 3 }}
                onClick={() => selectCommit(branch.commitSha)}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 11.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stripRemotePrefix(branch.name)}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-mono-stack)",
                    }}
                  >
                    {branch.commitSha.slice(0, 8)}
                    {!isOnRemoteOrigin ? " (Local Only)" : ""}
                  </div>
                </div>
                <span className="primer-label primer-label-accent">BASE</span>
              </div>
            ))}
          </div>

          {/* Unmerged / Divergent Tips */}
          <div>
            <div className="primer-action-list-header">
              Unmerged Tips on Origin ({unmergedBranches.length})
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                marginTop: 3,
              }}
            >
              {unmergedBranches.map(({ branch, aheadCount }) => {
                const isSelected = selectedCommitSha === branch.commitSha;
                return (
                  <div
                    key={branch.fullRef}
                    className={`primer-snippet-row-btn ${
                      isSelected ? "primer-snippet-row-selected" : ""
                    }`}
                    style={{ padding: "5px 8px" }}
                  >
                    <div
                      style={{ minWidth: 0, flex: 1, cursor: "pointer" }}
                      onClick={() => selectCommit(branch.commitSha)}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 11.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={branch.name}
                      >
                        {stripRemotePrefix(branch.name)}
                      </div>
                      <div style={{ fontSize: 10.5, color: "var(--fg-muted)" }}>
                        +{aheadCount} unmerged commit(s)
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primer-btn primer-card-action-btn"
                      onClick={() => void updateLocalBaseRef(branch.name)}
                      title="Set as Local Visual Base Spine (local-only)"
                    >
                      <Anchor size={11} />
                      <span>Set Base</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Merged into Base */}
          <div>
            <div className="primer-action-list-header">
              Merged into Base ({mergedBranches.length})
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                marginTop: 3,
              }}
            >
              {mergedBranches.map(({ branch }) => {
                const isSelected = selectedCommitSha === branch.commitSha;
                return (
                  <div
                    key={branch.fullRef}
                    className={`primer-snippet-row-btn ${
                      isSelected ? "primer-snippet-row-selected" : ""
                    }`}
                    style={{ padding: "4px 8px", opacity: 0.72 }}
                  >
                    <div
                      style={{ minWidth: 0, flex: 1, cursor: "pointer" }}
                      onClick={() => selectCommit(branch.commitSha)}
                    >
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "var(--fg-muted)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={branch.name}
                      >
                        {stripRemotePrefix(branch.name)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primer-btn primer-card-action-btn"
                      onClick={() => void updateLocalBaseRef(branch.name)}
                      title="Set as Local Visual Base Spine"
                    >
                      <Anchor size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disconnected Orphan Branches */}
          {orphanBranches.length > 0 && (
            <div>
              <div className="primer-action-list-header">
                Disconnected Orphan Branches ({orphanBranches.length})
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  marginTop: 3,
                }}
              >
                {orphanBranches.map(({ branch }) => (
                  <div
                    key={branch.fullRef}
                    className="primer-snippet-row-btn"
                    style={{ padding: "4px 8px" }}
                    onClick={() => {
                      if (!showArchived) {
                        void updateOrphanHorizon(horizonLimit, true);
                      }
                      selectCommit(branch.commitSha);
                    }}
                  >
                    <span style={{ fontSize: 11.5 }}>
                      {stripRemotePrefix(branch.name)}
                    </span>
                    <span className="primer-label primer-label-severe">
                      Orphan
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local-Only / Deleted on Origin Branches (Muted Gray) */}
          {localStaleBranches.length > 0 && (
            <div>
              <div className="primer-action-list-header">
                Local-Only / Deleted on Origin ({localStaleBranches.length})
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  marginTop: 3,
                }}
              >
                {localStaleBranches.map(({ branch }) => {
                  const isSelected = selectedCommitSha === branch.commitSha;
                  return (
                    <div
                      key={branch.fullRef}
                      className={`primer-snippet-row-btn ${
                        isSelected ? "primer-snippet-row-selected" : ""
                      }`}
                      style={{
                        padding: "4px 8px",
                        opacity: 0.55,
                        filter: "grayscale(1)",
                      }}
                    >
                      <div
                        style={{ minWidth: 0, flex: 1, cursor: "pointer" }}
                        onClick={() => {
                          if (!includeLocalStale) {
                            void updateIncludeLocalStaleBranches(true);
                          }
                          selectCommit(branch.commitSha);
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--fg-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                          title={`${branch.name} (Present locally, no longer on remote origin)`}
                        >
                          <CloudOff size={10} />
                          <span>{stripRemotePrefix(branch.name)}</span>
                        </div>
                      </div>
                      <span className="primer-label primer-label-neutral">
                        LOCAL
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
