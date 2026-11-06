import React, { useMemo } from "react";
import {
  Box,
  GitMerge,
  Play,
  Tag,
} from "lucide-react";
import { LANE_COLOR_PALETTE } from "../config/demoRepositorySnapshot";
import { useRepositoryStore } from "../stores/repositoryStore";
import { GraphEdgeSegment, PositionedCommitRow } from "../types/gitTypes";
import { formatRelativeOrShortTime, stripRemotePrefix } from "../utils/formatters";

const ROW_HEIGHT = 36;
const LANE_SPACING = 16;
const GRAPH_PADDING_LEFT = 16;

function laneToX(laneIndex: number): number {
  return GRAPH_PADDING_LEFT + laneIndex * LANE_SPACING;
}

function rowToY(rowIndex: number): number {
  return rowIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
}

function buildOrthogonalPath(edge: GraphEdgeSegment): string {
  const x1 = laneToX(edge.fromLane);
  const y1 = rowToY(edge.fromRow);
  const x2 = laneToX(edge.toLane);
  const y2 = rowToY(edge.toRow);

  if (edge.fromLane === edge.toLane) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const cornerRadius = 6;
  const dirX = x2 > x1 ? 1 : -1;
  if (edge.isMergeEdge) {
    return `M ${x1} ${y1} L ${x2 - dirX * cornerRadius} ${y1} Q ${x2} ${y1} ${x2} ${y1 + cornerRadius} L ${x2} ${y2}`;
  }
  const turnY = y2 - cornerRadius;
  return `M ${x1} ${y1} L ${x1} ${turnY} Q ${x1} ${y2} ${x1 + dirX * cornerRadius} ${y2} L ${x2} ${y2}`;
}

export const TopologyGraphCanvas: React.FC = () => {
  const {
    workspaceMeta,
    snapshot,
    layout,
    selectedCommitSha,
    hoveredCommitSha,
    focusLineageOnly,
    selectCommit,
    setHoveredCommit,
    runDetachedCheckout,
  } = useRepositoryStore();

  const activeFocusSha = hoveredCommitSha ?? selectedCommitSha;

  const focusedConnectedShas = useMemo(() => {
    const set = new Set<string>();
    if (!activeFocusSha || !layout) {
      return set;
    }
    set.add(activeFocusSha);
    const row = layout.rows.find((r) => r.commit.sha === activeFocusSha);
    if (row) {
      for (const p of row.commit.parents) {
        set.add(p);
      }
      for (const c of row.childShas) {
        set.add(c);
      }
    }
    return set;
  }, [activeFocusSha, layout]);

  if (!snapshot || !layout) {
    return (
      <div style={{ padding: 24, color: "var(--fg-muted)" }}>
        Select or load a local Git repository to view its branch and merge topology.
      </div>
    );
  }

  const annotations =
    workspaceMeta.repositories[snapshot.repoPath]?.commitAnnotations ?? {};

  const graphColumnWidth = Math.max(
    110,
    Math.min(340, GRAPH_PADDING_LEFT * 2 + layout.maxLaneCount * LANE_SPACING)
  );
  const svgHeight = Math.max(ROW_HEIGHT, layout.rows.length * ROW_HEIGHT);

  const renderDivergenceBadge = (row: PositionedCommitRow) => {
    switch (row.divergenceKind) {
      case "mainline":
        return (
          <span className="primer-label primer-label-accent" title="On the selected Local Visual Base spine">
            MAINLINE
          </span>
        );
      case "unmerged_tip":
        return (
          <span className="primer-label primer-label-attention" title="Unmerged branch head relative to Local Base">
            UNMERGED TIP
          </span>
        );
      case "diverged":
        return (
          <span className="primer-label primer-label-severe" title="Diverged from Local Base and not yet merged">
            DIVERGED
          </span>
        );
      case "orphan_disconnected":
        return (
          <span className="primer-label primer-label-danger" title="Belongs to a disconnected orphan history tree">
            ORPHAN
          </span>
        );
      case "merged":
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        backgroundColor: "var(--bg-canvas-default)",
        overflow: "hidden",
      }}
    >
      {/* Table Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 32,
          borderBottom: "1px solid var(--border-default)",
          backgroundColor: "var(--bg-canvas-subtle)",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--fg-muted)",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: graphColumnWidth,
            paddingLeft: 12,
            flexShrink: 0,
            borderRight: "1px solid var(--border-muted)",
          }}
        >
          Spine &amp; Lanes ({layout.maxLaneCount})
        </div>
        <div style={{ flex: 1, paddingLeft: 12 }}>
          Commit Topology &amp; Merge Lineage ({layout.rows.length} shown)
        </div>
        <div style={{ width: 155, paddingLeft: 8, flexShrink: 0 }}>
          Submodules
        </div>
        <div style={{ width: 92, paddingLeft: 8, flexShrink: 0 }}>SHA</div>
        <div style={{ width: 125, paddingLeft: 8, flexShrink: 0 }}>
          Date (UTC)
        </div>
        <div style={{ width: 94, paddingRight: 10, textAlign: "right", flexShrink: 0 }}>
          Quick State
        </div>
      </div>

      {/* Scrollable Graph + Rows */}
      <div
        style={{
          position: "relative",
          flex: 1,
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: svgHeight,
            width: "100%",
          }}
        >
          {/* SVG Lane & Orthogonal Edge Layer */}
          <svg
            width={graphColumnWidth}
            height={svgHeight}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {/* Subtle vertical guide for Lane 0 (Mainline Spine) */}
            <line
              x1={laneToX(0)}
              y1={0}
              x2={laneToX(0)}
              y2={svgHeight}
              stroke="var(--border-muted)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />

            {/* Edges */}
            {layout.edges.map((edge, idx) => {
              const color =
                LANE_COLOR_PALETTE[edge.colorIndex % LANE_COLOR_PALETTE.length];
              const isDirectToActive =
                activeFocusSha !== null &&
                (edge.fromSha === activeFocusSha ||
                  edge.toSha === activeFocusSha);

              let opacity = edge.isMergeEdge ? 0.68 : 0.88;
              let strokeWidth = edge.fromLane === 0 && edge.toLane === 0 ? 2.4 : 1.75;

              if (focusLineageOnly && activeFocusSha) {
                if (isDirectToActive) {
                  opacity = 1;
                  strokeWidth = 2.6;
                } else {
                  opacity = 0.12;
                }
              } else if (activeFocusSha && isDirectToActive) {
                opacity = 1;
                strokeWidth = 2.5;
              }

              return (
                <path
                  key={`${edge.fromSha}-${edge.toSha}-${idx}`}
                  d={buildOrthogonalPath(edge)}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeOpacity={opacity}
                  strokeDasharray={edge.isMergeEdge ? "3 2" : undefined}
                />
              );
            })}

            {/* Commit Nodes */}
            {layout.rows.map((row) => {
              const cx = laneToX(row.laneIndex);
              const cy = rowToY(row.rowIndex);
              const color =
                LANE_COLOR_PALETTE[row.colorIndex % LANE_COLOR_PALETTE.length];
              const isHead = row.commit.sha === snapshot.headSha;
              const isSelected = row.commit.sha === selectedCommitSha;
              const isDimmed =
                focusLineageOnly &&
                activeFocusSha !== null &&
                !focusedConnectedShas.has(row.commit.sha);

              return (
                <g
                  key={row.commit.sha}
                  style={{ opacity: isDimmed ? 0.2 : 1 }}
                >
                  {isHead && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={7.5}
                      fill="none"
                      stroke="var(--fg-success)"
                      strokeWidth={2}
                    />
                  )}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6.5}
                      fill="none"
                      stroke="var(--fg-default)"
                      strokeWidth={1.6}
                    />
                  )}
                  {row.isMultiMergeTarget && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="none"
                      stroke="var(--fg-sponsors)"
                      strokeWidth={1.5}
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={row.isMergeCommit ? 4.6 : 4}
                    fill={row.isMergeCommit ? "var(--bg-canvas-default)" : color}
                    stroke={color}
                    strokeWidth={row.isMergeCommit ? 2.2 : 1.5}
                  />
                </g>
              );
            })}
          </svg>

          {/* Commit Rows */}
          {layout.rows.map((row) => {
            const { commit } = row;
            const isSelected = commit.sha === selectedCommitSha;
            const isHead = commit.sha === snapshot.headSha;
            const annotation = annotations[commit.sha];
            const isDimmed =
              focusLineageOnly &&
              activeFocusSha !== null &&
              !focusedConnectedShas.has(commit.sha);

            return (
              <div
                key={commit.sha}
                onClick={() => selectCommit(commit.sha)}
                onMouseEnter={() => setHoveredCommit(commit.sha)}
                onMouseLeave={() => setHoveredCommit(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: ROW_HEIGHT,
                  borderBottom: "1px solid var(--border-muted)",
                  backgroundColor: isSelected
                    ? "var(--selected-item-bg)"
                    : "transparent",
                  cursor: "pointer",
                  opacity: isDimmed ? 0.38 : 1,
                  transition: "background-color 0.08s ease, opacity 0.12s ease",
                }}
              >
                {/* Graph Lane Spacer */}
                <div
                  style={{
                    width: graphColumnWidth,
                    height: "100%",
                    flexShrink: 0,
                    borderRight: "1px solid var(--border-muted)",
                  }}
                />

                {/* Commit Badges + Subject */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    overflow: "hidden",
                  }}
                >
                  {isHead && (
                    <span className="primer-label primer-label-success">
                      HEAD
                    </span>
                  )}

                  {renderDivergenceBadge(row)}

                  {/* Local User Tag Badge */}
                  {annotation?.tagLabel && (
                    <span
                      className={`primer-label primer-label-${annotation.colorTone}`}
                      title={annotation.note || "Local-only commit tag"}
                    >
                      <Tag size={10} />
                      <span>{annotation.tagLabel}</span>
                    </span>
                  )}

                  {/* Multi-branch Fan-Out Badge (when merged into >= 2 branches) */}
                  {row.isMultiMergeTarget && (
                    <span
                      className="primer-label primer-label-sponsors"
                      title={`Shared base merged into ${row.mergedIntoCount} separate merge commits`}
                    >
                      Merged x{row.mergedIntoCount}
                    </span>
                  )}

                  {/* Explicit Merge Source Pill */}
                  {row.isMergeCommit && row.mergeSourceLabels.length > 0 && (
                    <span
                      className="primer-label primer-label-done"
                      title={`Merge parents: ${row.mergeSourceLabels.join(", ")}`}
                    >
                      <GitMerge size={10} />
                      <span>
                        Merge &lt;- {row.mergeSourceLabels.slice(0, 2).join(", ")}
                        {row.mergeSourceLabels.length > 2
                          ? ` +${row.mergeSourceLabels.length - 2}`
                          : ""}
                      </span>
                    </span>
                  )}

                  {/* Git Ref Pills */}
                  {commit.refs.slice(0, 2).map((refName) => (
                    <span
                      key={refName}
                      className="primer-label primer-label-neutral"
                      title={refName}
                    >
                      {stripRemotePrefix(refName)}
                    </span>
                  ))}
                  {commit.refs.length > 2 && (
                    <span
                      className="primer-label primer-label-neutral"
                      title={commit.refs.join(", ")}
                    >
                      +{commit.refs.length - 2} refs
                    </span>
                  )}

                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: row.divergenceKind === "mainline" ? 600 : 400,
                      color: "var(--fg-default)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={commit.subject}
                  >
                    {commit.subject}
                  </span>
                </div>

                {/* Submodule Pointers Column */}
                <div
                  style={{
                    width: 155,
                    paddingLeft: 8,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    overflow: "hidden",
                  }}
                >
                  {Object.entries(commit.submodulePointers).map(
                    ([subPath, subSha]) => {
                      const isBumped = commit.changedSubmodules.includes(subPath);
                      const shortSubName = subPath.split("/").pop() ?? subPath;
                      return (
                        <span
                          key={subPath}
                          className={`primer-label ${
                            isBumped
                              ? "primer-label-attention"
                              : "primer-label-neutral"
                          }`}
                          style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10 }}
                          title={`${subPath} @ ${subSha}${
                            isBumped ? " (Updated in this commit)" : ""
                          }`}
                        >
                          <Box size={9} />
                          <span>
                            {shortSubName}:{subSha.slice(0, 5)}
                          </span>
                        </span>
                      );
                    }
                  )}
                </div>

                {/* Short SHA */}
                <div
                  style={{
                    width: 92,
                    paddingLeft: 8,
                    flexShrink: 0,
                    fontFamily: "var(--font-mono-stack)",
                    fontSize: 11.5,
                    color: "var(--fg-muted)",
                  }}
                >
                  {commit.shortSha}
                </div>

                {/* Date */}
                <div
                  style={{
                    width: 125,
                    paddingLeft: 8,
                    flexShrink: 0,
                    fontSize: 11,
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono-stack)",
                  }}
                >
                  {formatRelativeOrShortTime(commit.timestamp)}
                </div>

                {/* Detached Checkout Action */}
                <div
                  style={{
                    width: 94,
                    paddingRight: 10,
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isHead ? (
                    <span className="primer-label primer-label-success">
                      Current
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="primer-btn primer-card-action-btn"
                      onClick={() => void runDetachedCheckout(commit.sha)}
                      title="Detached checkout this commit and recursively sync all submodules"
                    >
                      <Play size={10} />
                      <span>Checkout</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
