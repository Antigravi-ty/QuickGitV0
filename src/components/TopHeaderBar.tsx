import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudDownload,
  Copy,
  FileText,
  FolderGit2,
  FolderOpen,
  GitBranch,
  Layers,
  Moon,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useRepositoryStore } from "../stores/repositoryStore";
import {
  buildAgentTriageReportMarkdown,
  formatTimezoneBadgeLabel,
  isCommitTipConfirmed,
  stripRemotePrefix,
} from "../utils/formatters";

export const TopHeaderBar: React.FC = () => {
  const workspaceMeta = useRepositoryStore((s) => s.workspaceMeta);
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const layout = useRepositoryStore((s) => s.layout);
  const selectedCommitSha = useRepositoryStore((s) => s.selectedCommitSha);
  const parentRepoPathStack = useRepositoryStore((s) => s.parentRepoPathStack);
  const searchQuery = useRepositoryStore((s) => s.searchQuery);
  const filterCategory = useRepositoryStore((s) => s.filterCategory);
  const focusLineageOnly = useRepositoryStore((s) => s.focusLineageOnly);
  const lineageDepthMode = useRepositoryStore((s) => s.lineageDepthMode);
  const timezoneMode = useRepositoryStore((s) => s.timezoneMode);
  const showMergeSourcePills = useRepositoryStore(
    (s) => s.showMergeSourcePills
  );
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
  const selectCommit = useRepositoryStore((s) => s.selectCommit);
  const setSearchQuery = useRepositoryStore((s) => s.setSearchQuery);
  const setFilterCategory = useRepositoryStore((s) => s.setFilterCategory);
  const toggleFocusLineageOnly = useRepositoryStore(
    (s) => s.toggleFocusLineageOnly
  );
  const setLineageDepthMode = useRepositoryStore((s) => s.setLineageDepthMode);
  const setTimezoneMode = useRepositoryStore((s) => s.setTimezoneMode);
  const setShowMergeSourcePills = useRepositoryStore(
    (s) => s.setShowMergeSourcePills
  );
  const applyRocketCompanionTriagePresets = useRepositoryStore(
    (s) => s.applyRocketCompanionTriagePresets
  );
  const toggleTheme = useRepositoryStore((s) => s.toggleTheme);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<"md" | "json" | null>(null);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!settingsOpen) {
      return;
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [settingsOpen]);

  const annotations = useMemo(
    () =>
      (snapshot &&
        workspaceMeta.repositories[snapshot.repoPath]?.commitAnnotations) ||
      {},
    [snapshot, workspaceMeta]
  );

  const { unmergedTipRows, unconfirmedTipRows } = useMemo(() => {
    if (!layout) {
      return { unmergedTipRows: [], unconfirmedTipRows: [] };
    }
    const tips = layout.rows.filter(
      (r) => r.divergenceKind === "unmerged_tip"
    );
    const unconfirmed = tips.filter(
      (r) => !isCommitTipConfirmed(annotations[r.commit.sha])
    );
    return { unmergedTipRows: tips, unconfirmedTipRows: unconfirmed };
  }, [layout, annotations]);

  const resolvedBaseRefName = layout?.resolvedBaseRefName ?? null;
  const isClean = snapshot?.workingTreeStatus.isClean ?? true;

  const stepTargetRows =
    filterCategory === "unconfirmed"
      ? unconfirmedTipRows
      : filterCategory === "unmerged_tip"
      ? unmergedTipRows
      : [];

  const handleStepTip = (direction: -1 | 1) => {
    if (stepTargetRows.length === 0) {
      return;
    }
    const currentIndex = stepTargetRows.findIndex(
      (r) => r.commit.sha === selectedCommitSha
    );
    if (currentIndex === -1) {
      selectCommit(stepTargetRows[0].commit.sha);
      return;
    }
    const nextIndex =
      (currentIndex + direction + stepTargetRows.length) %
      stepTargetRows.length;
    selectCommit(stepTargetRows[nextIndex].commit.sha);
  };

  const agentReportMarkdown = useMemo(() => {
    if (!snapshot || !layout) {
      return "";
    }
    return buildAgentTriageReportMarkdown({
      snapshot,
      layout,
      annotations,
      timezoneMode,
    });
  }, [snapshot, layout, annotations, timezoneMode]);

  const handleCopyReport = async (mode: "md" | "json") => {
    if (!snapshot || !layout) {
      return;
    }
    const text =
      mode === "md"
        ? agentReportMarkdown
        : JSON.stringify(
            {
              repoName: snapshot.repoName,
              repoPath: snapshot.repoPath,
              baseRef: layout.resolvedBaseRefName,
              baseSha: layout.resolvedBaseSha,
              unmergedTipCount: unmergedTipRows.length,
              unconfirmedTipCount: unconfirmedTipRows.length,
              annotations,
            },
            null,
            2
          );
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(mode);
      setTimeout(() => setCopiedType(null), 1800);
    } catch (_) {}
  };

  return (
    <>
      <header className="primer-header">
        {/* Left Side: Settings Menu & Compact Status/Repo Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 700,
              fontSize: 13,
              paddingRight: 2,
              flexShrink: 0,
            }}
          >
            <FolderGit2 size={15} style={{ color: "var(--fg-accent)" }} />
            <span>QuickGit V0</span>
          </div>

          {/* Top-Left Settings Popover Trigger */}
          <div ref={settingsRef} style={{ position: "relative" }}>
            <button
              type="button"
              className={`primer-btn ${
                settingsOpen ? "primer-btn-status-accent" : ""
              }`}
              onClick={() => setSettingsOpen((prev) => !prev)}
              title="Open Repository, Display, Timezone (UTC+8), and Triage Settings"
            >
              <Settings size={13} />
              <span>Settings</span>
              {snapshot && (
                <span
                  style={{
                    color: "var(--fg-accent)",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono-stack)",
                    fontSize: 11,
                  }}
                >
                  [{snapshot.repoName}]
                </span>
              )}
              <ChevronDown size={12} />
            </button>

            {settingsOpen && (
              <div
                className="primer-select-panel-overlay"
                style={{
                  top: "calc(100% + 6px)",
                  left: 0,
                  width: 350,
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {/* Repository & Sync Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    paddingBottom: 8,
                    borderBottom: "1px solid var(--border-muted)",
                  }}
                >
                  <div className="primer-action-list-header" style={{ padding: 0 }}>
                    Repository &amp; Origin Sync
                  </div>
                  {snapshot && (
                    <div
                      className="primer-readonly-field"
                      style={{
                        fontSize: 10.5,
                        fontFamily: "var(--font-mono-stack)",
                        padding: "4px 8px",
                      }}
                    >
                      <div style={{ fontWeight: 700, color: "var(--fg-accent)" }}>
                        {snapshot.repoName}
                      </div>
                      <div style={{ color: "var(--fg-muted)" }}>
                        {snapshot.repoPath}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="primer-btn primer-btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setSettingsOpen(false);
                        void selectAndLoadRepositoryFolder();
                      }}
                      disabled={isLoading}
                    >
                      <FolderOpen size={12} />
                      <span>Select Folder...</span>
                    </button>
                    <button
                      type="button"
                      className="primer-btn"
                      onClick={() => void refreshCurrentRepository()}
                      disabled={isLoading || !snapshot}
                    >
                      <RefreshCw
                        size={12}
                        className={isLoading ? "spin-icon" : ""}
                      />
                      <span>Refresh</span>
                    </button>
                    <button
                      type="button"
                      className="primer-btn primer-btn-status-accent"
                      onClick={() => void syncCurrentRepositoryOrigin()}
                      disabled={isSyncingOrigin || isLoading || !snapshot}
                    >
                      <CloudDownload
                        size={12}
                        className={isSyncingOrigin ? "spin-icon" : ""}
                      />
                      <span>
                        {isSyncingOrigin ? "Syncing..." : "Sync Origin"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Timezone & Graph Row Display Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    paddingBottom: 8,
                    borderBottom: "1px solid var(--border-muted)",
                  }}
                >
                  <div className="primer-action-list-header" style={{ padding: 0 }}>
                    Date Timezone &amp; Row Badges
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11.5,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Clock size={12} />
                      <span>Date Column:</span>
                    </span>
                    <div
                      className="primer-segmented-control"
                      style={{ width: 185 }}
                    >
                      {(
                        [
                          { id: "utc8", label: "UTC+8" },
                          { id: "utc0", label: "UTC" },
                          { id: "local", label: "Local" },
                        ] as const
                      ).map((tz) => (
                        <button
                          key={tz.id}
                          type="button"
                          className={`primer-segmented-button ${
                            timezoneMode === tz.id
                              ? "primer-segmented-button-active"
                              : ""
                          }`}
                          style={{ padding: "3px 6px", fontSize: 11 }}
                          onClick={() => setTimezoneMode(tz.id)}
                        >
                          {tz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 11.5 }}>
                      Merge Source Tag (at row end):
                    </span>
                    <button
                      type="button"
                      className={`primer-btn primer-card-action-btn ${
                        showMergeSourcePills ? "primer-btn-status-accent" : ""
                      }`}
                      onClick={() =>
                        setShowMergeSourcePills(!showMergeSourcePills)
                      }
                    >
                      {showMergeSourcePills
                        ? "Shown at End"
                        : "Hidden (Graph Only)"}
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 11.5 }}>Focus Lineage Scope:</span>
                    <div
                      className="primer-segmented-control"
                      style={{ width: 200 }}
                    >
                      {(
                        [
                          { id: "unmerged_cluster", label: "Cluster" },
                          { id: "1_hop", label: "1 Hop" },
                          { id: "2_hops", label: "2 Hops" },
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          className={`primer-segmented-button ${
                            lineageDepthMode === mode.id
                              ? "primer-segmented-button-active"
                              : ""
                          }`}
                          style={{ padding: "3px 6px", fontSize: 11 }}
                          onClick={() => setLineageDepthMode(mode.id)}
                          title={
                            mode.id === "unmerged_cluster"
                              ? "Trace full unmerged fork subtree down to the Mainline/Base boundary"
                              : `Highlight ${mode.label} parents and children`
                          }
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 11.5 }}>Color Theme:</span>
                    <button
                      type="button"
                      className="primer-btn primer-card-action-btn"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
                      <span>
                        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Triage & Agent Export Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="primer-action-list-header" style={{ padding: 0 }}>
                    Tip Triage &amp; Agent Handoff
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      className="primer-btn primer-btn-status-accent"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setSettingsOpen(false);
                        setExportModalOpen(true);
                      }}
                    >
                      <FileText size={12} />
                      <span>Export Triage for Agent</span>
                    </button>
                    <button
                      type="button"
                      className="primer-btn"
                      onClick={() => {
                        void applyRocketCompanionTriagePresets();
                        setSettingsOpen(false);
                      }}
                      title="Seed default RocketCompanion triage annotations (useless, replay system, absorbed -> 6bd41edd, hold, useful)"
                    >
                      <Sparkles size={12} />
                      <span>Seed RC Presets</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {parentRepoPathStack.length > 0 && (
            <button
              type="button"
              className="primer-btn primer-btn-status-accent"
              onClick={() => void popParentRepository()}
              title="Return to parent repository"
            >
              <ArrowLeft size={13} />
              <span>Parent Repo</span>
            </button>
          )}

          <button
            type="button"
            className="primer-btn primer-btn-icon-only"
            onClick={() => void refreshCurrentRepository()}
            disabled={isLoading || !snapshot}
            title="Refresh local Git topology"
          >
            <RefreshCw size={13} className={isLoading ? "spin-icon" : ""} />
          </button>

          <button
            type="button"
            className="primer-btn primer-btn-icon-only"
            onClick={() => void syncCurrentRepositoryOrigin()}
            disabled={isSyncingOrigin || isLoading || !snapshot}
            title="Sync latest cloud origin refs (without pruning local history)"
          >
            <CloudDownload
              size={13}
              className={isSyncingOrigin ? "spin-icon" : ""}
            />
          </button>

          {resolvedBaseRefName && (
            <span
              className="primer-badge primer-badge-accent"
              title="Local visual mainline base spine (commits on spine show {SHA} in curly braces)"
            >
              <GitBranch size={11} />
              <span>{stripRemotePrefix(resolvedBaseRefName)}</span>
            </span>
          )}

          <span
            className={`primer-badge ${
              isClean ? "primer-badge-success" : "primer-badge-danger"
            }`}
            title={snapshot?.workingTreeStatus.summaryMessage}
          >
            {isClean ? <ShieldCheck size={11} /> : <ShieldAlert size={11} />}
            <span>{isClean ? "Clean" : "Dirty"}</span>
          </span>

          <button
            type="button"
            className="primer-btn"
            onClick={() => setExportModalOpen(true)}
            disabled={!snapshot || !layout}
            title="Export confirmed branch/tip triage report for Coding Agent"
          >
            <FileText size={12} />
            <span>Agent Report</span>
          </button>
        </div>

        {/* Right Side: Search + Segmented Control (with Unmerged Tip & Unconfirmed count) + Focus Lineage */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ position: "relative", width: 185 }}>
            <Search
              size={12}
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
              placeholder="Search SHA, branch, tag..."
              style={{ paddingLeft: 25, fontSize: 11.5 }}
            />
          </div>

          <div
            className="primer-segmented-control"
            style={{ width: "auto" }}
            title="Filter and highlight commit categories in-place"
          >
            {(
              [
                { id: "all", label: "All", count: null },
                { id: "mainline", label: "Mainline", count: null },
                { id: "unmerged_all", label: "Unmerged", count: null },
                {
                  id: "unmerged_tip",
                  label: "Unmerged Tip",
                  count: unmergedTipRows.length,
                },
                {
                  id: "unconfirmed",
                  label: "Unconfirmed",
                  count: unconfirmedTipRows.length,
                },
                { id: "multi_merged", label: "Merges", count: null },
                { id: "submodule_bump", label: "Submodules", count: null },
              ] as const
            ).map((tab) => {
              const isActive = filterCategory === tab.id;
              const isUnconfirmedTab = tab.id === "unconfirmed";
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`primer-segmented-button ${
                    isActive ? "primer-segmented-button-active" : ""
                  }`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 8px",
                    fontSize: 11.5,
                  }}
                  onClick={() => {
                    setFilterCategory(tab.id);
                    if (
                      tab.id === "unconfirmed" &&
                      unconfirmedTipRows.length > 0 &&
                      !unconfirmedTipRows.some(
                        (r) => r.commit.sha === selectedCommitSha
                      )
                    ) {
                      selectCommit(unconfirmedTipRows[0].commit.sha);
                    } else if (
                      tab.id === "unmerged_tip" &&
                      unmergedTipRows.length > 0 &&
                      !unmergedTipRows.some(
                        (r) => r.commit.sha === selectedCommitSha
                      )
                    ) {
                      selectCommit(unmergedTipRows[0].commit.sha);
                    }
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`primer-label ${
                        isUnconfirmedTab && tab.count > 0
                          ? "primer-label-attention"
                          : "primer-label-neutral"
                      }`}
                      style={{
                        padding: "0 5px",
                        fontSize: 10,
                        lineHeight: "14px",
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {stepTargetRows.length > 0 && (
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
              title="Step through filtered Unmerged Tips / Unconfirmed Tips"
            >
              <button
                type="button"
                className="primer-btn primer-btn-icon-only"
                onClick={() => handleStepTip(-1)}
              >
                <ChevronLeft size={13} />
              </button>
              <button
                type="button"
                className="primer-btn primer-btn-icon-only"
                onClick={() => handleStepTip(1)}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          )}

          <button
            type="button"
            className={`primer-btn ${
              focusLineageOnly ? "primer-btn-sponsors" : ""
            }`}
            onClick={toggleFocusLineageOnly}
            title={`Highlight ${
              lineageDepthMode === "unmerged_cluster"
                ? "entire unmerged fork cluster down to Base spine"
                : lineageDepthMode === "2_hops"
                ? "2-hop parents & children"
                : "direct parents & children"
            } of the selected commit`}
          >
            <Layers size={13} />
            <span>
              {focusLineageOnly
                ? `Lineage (${
                    lineageDepthMode === "unmerged_cluster"
                      ? "Cluster"
                      : lineageDepthMode === "2_hops"
                      ? "2-Hop"
                      : "1-Hop"
                  })`
                : "Lineage"}
            </span>
          </button>
        </div>
      </header>

      {/* Agent Triage Export Modal */}
      {exportModalOpen && snapshot && layout && (
        <div
          className="modal-backdrop"
          onClick={() => setExportModalOpen(false)}
        >
          <div
            className="primer-box"
            style={{
              width: "min(760px, 94vw)",
              maxHeight: "86vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "var(--overlay-shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="primer-box-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                }}
              >
                <FileText size={15} style={{ color: "var(--fg-accent)" }} />
                <span>
                  Branch &amp; Unmerged Tip Triage Report ({snapshot.repoName})
                </span>
                <span className="primer-label primer-label-accent">
                  {formatTimezoneBadgeLabel(timezoneMode)}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  type="button"
                  className="primer-btn primer-btn-primary"
                  onClick={() => void handleCopyReport("md")}
                >
                  {copiedType === "md" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span>
                    {copiedType === "md"
                      ? "Copied Markdown!"
                      : "Copy Markdown for Agent"}
                  </span>
                </button>
                <button
                  type="button"
                  className="primer-btn"
                  onClick={() => void handleCopyReport("json")}
                >
                  {copiedType === "json" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span>
                    {copiedType === "json" ? "Copied JSON!" : "Copy JSON"}
                  </span>
                </button>
                <button
                  type="button"
                  className="primer-btn primer-btn-icon-only"
                  onClick={() => setExportModalOpen(false)}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <div
              className="primer-box-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                overflowY: "auto",
              }}
            >
              <div style={{ fontSize: 11.5, color: "var(--fg-muted)" }}>
                Provide this locally curated report to your Coding Agent so it
                knows which unmerged branch tips are superseded/deletable,
                which were absorbed/rebased into mainline commits, and which
                feature clusters (e.g., <code>replay system</code>) should be
                merged or rebased forward.
              </div>
              <pre
                className="primer-readonly-field"
                style={{
                  margin: 0,
                  padding: 12,
                  maxHeight: "62vh",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  fontFamily: "var(--font-mono-stack)",
                  fontSize: 11.5,
                  lineHeight: 1.5,
                }}
              >
                {agentReportMarkdown}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

