import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  CloudOff,
  GitMerge,
  Link2,
  Maximize2,
  Play,
  Tag,
} from "lucide-react";
import { LANE_COLOR_PALETTE } from "../config/demoRepositorySnapshot";
import {
  TopologyFilterCategory,
  useRepositoryStore,
} from "../stores/repositoryStore";
import {
  GraphEdgeSegment,
  LocalCommitAnnotation,
  PositionedCommitRow,
} from "../types/gitTypes";
import {
  formatRelativeOrShortTime,
  formatTimezoneBadgeLabel,
  isCommitTipConfirmed,
  resolveTriageBadgeSpec,
  stripRemotePrefix,
} from "../utils/formatters";
import { computeCommitLineageAndCluster } from "../utils/topologyGraphPipeline";

const ROW_HEIGHT = 36;
const LANE_SPACING = 16;
const GRAPH_PADDING_LEFT = 16;
const VIRTUAL_OVERSCAN_ROWS = 18;
const MERGED_MUTED_STROKE = "#8b949e";
const EQUAL_TYPE_BADGE_WIDTH = 96;

function laneToX(laneIndex: number): number {
  return GRAPH_PADDING_LEFT + laneIndex * LANE_SPACING;
}

function rowToY(rowIndex: number): number {
  return rowIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
}

function buildDiagonalCurvePath(edge: GraphEdgeSegment): string {
  const x1 = laneToX(edge.fromLane);
  const y1 = rowToY(edge.fromRow);
  const xVia = laneToX(edge.viaLane);
  const x2 = laneToX(edge.toLane);
  const y2 = rowToY(edge.toRow);

  if (x1 === xVia && xVia === x2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  if (edge.toRow <= edge.fromRow + 1) {
    const midY = (y1 + y2) * 0.5;
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  }

  const transitionSpan = ROW_HEIGHT * 0.88;

  if (xVia === x1 && xVia !== x2) {
    const turnStartY = Math.max(y1, y2 - transitionSpan);
    const cp1Y = turnStartY + transitionSpan * 0.5;
    const cp2Y = y2 - transitionSpan * 0.4;
    return `M ${x1} ${y1} L ${x1} ${turnStartY} C ${x1} ${cp1Y}, ${x2} ${cp2Y}, ${x2} ${y2}`;
  }

  if (xVia === x2 && xVia !== x1) {
    const turnEndY = Math.min(y2, y1 + transitionSpan);
    const cp1Y = y1 + transitionSpan * 0.4;
    const cp2Y = turnEndY - transitionSpan * 0.5;
    return `M ${x1} ${y1} C ${x1} ${cp1Y}, ${x2} ${cp2Y}, ${x2} ${turnEndY} L ${x2} ${y2}`;
  }

  const topTurnEndY = Math.min(y2 - transitionSpan, y1 + transitionSpan * 0.85);
  const botTurnStartY = Math.max(topTurnEndY, y2 - transitionSpan * 0.85);
  const topMidY = (y1 + topTurnEndY) * 0.5;
  const botMidY = (botTurnStartY + y2) * 0.5;
  return `M ${x1} ${y1} C ${x1} ${topMidY}, ${xVia} ${topMidY}, ${xVia} ${topTurnEndY} L ${xVia} ${botTurnStartY} C ${xVia} ${botMidY}, ${x2} ${botMidY}, ${x2} ${y2}`;
}

function isRowHighlightedByCategory(
  row: PositionedCommitRow,
  category: TopologyFilterCategory,
  focusedSubmodulePath: string | null,
  annotations: Record<string, LocalCommitAnnotation>
): boolean {
  switch (category) {
    case "all":
      return true;
    case "mainline":
      return row.divergenceKind === "mainline";
    case "unmerged_all":
      return (
        row.divergenceKind === "unmerged_tip" ||
        row.divergenceKind === "diverged"
      );
    case "unmerged_tip":
      return row.divergenceKind === "unmerged_tip";
    case "unconfirmed":
      return (
        row.divergenceKind === "unmerged_tip" &&
        !isCommitTipConfirmed(annotations[row.commit.sha])
      );
    case "multi_merged":
      return row.isMergeCommit || row.isMultiMergeTarget;
    case "submodule_bump":
      if (focusedSubmodulePath) {
        return row.commit.changedSubmodules.includes(focusedSubmodulePath);
      }
      return row.commit.changedSubmodules.length > 0;
  }
}

export const TopologyGraphCanvas: React.FC = () => {
  const workspaceMeta = useRepositoryStore((s) => s.workspaceMeta);
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const layout = useRepositoryStore((s) => s.layout);
  const selectedCommitSha = useRepositoryStore((s) => s.selectedCommitSha);
  const filterCategory = useRepositoryStore((s) => s.filterCategory);
  const focusedSubmodulePath = useRepositoryStore(
    (s) => s.focusedSubmodulePath
  );
  const focusLineageOnly = useRepositoryStore((s) => s.focusLineageOnly);
  const lineageDepthMode = useRepositoryStore((s) => s.lineageDepthMode);
  const timezoneMode = useRepositoryStore((s) => s.timezoneMode);
  const showMergeSourcePills = useRepositoryStore(
    (s) => s.showMergeSourcePills
  );
  const selectCommit = useRepositoryStore((s) => s.selectCommit);
  const runDetachedCheckout = useRepositoryStore((s) => s.runDetachedCheckout);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const tableRootRef = useRef<HTMLDivElement | null>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(720);

  const [manualGraphColWidth, setManualGraphColWidth] = useState<number | null>(
    null
  );
  const [shaColWidth] = useState(96);
  const [submoduleColWidth, setSubmoduleColWidth] = useState(145);
  const [dateColWidth] = useState(124);

  const columnOffsetsRef = useRef({
    lanes: 0,
    title: 0,
    submodules: 0,
  });
  const [titleScrollOffset, setTitleScrollOffset] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) {
      return;
    }
    const updateSize = () => {
      setViewportHeight(el.clientHeight || 720);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleVerticalScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    []
  );

  const applyColumnScrollOffset = useCallback(
    (colKey: "lanes" | "title" | "submodules", nextOffset: number) => {
      const clamped = Math.max(0, Math.min(1200, Math.round(nextOffset)));
      columnOffsetsRef.current[colKey] = clamped;
      if (tableRootRef.current) {
        tableRootRef.current.style.setProperty(
          `--col-${colKey}-scroll-x`,
          `${-clamped}px`
        );
      }
      if (colKey === "title") {
        setTitleScrollOffset(clamped);
      }
    },
    []
  );

  const makeColumnWheelHandler = useCallback(
    (colKey: "lanes" | "title" | "submodules") =>
      (e: React.WheelEvent<HTMLDivElement>) => {
        const deltaX =
          Math.abs(e.deltaX) > Math.abs(e.deltaY)
            ? e.deltaX
            : e.shiftKey
            ? e.deltaY
            : 0;
        if (Math.abs(deltaX) > 0.5) {
          e.stopPropagation();
          applyColumnScrollOffset(
            colKey,
            columnOffsetsRef.current[colKey] + deltaX
          );
        }
      },
    [applyColumnScrollOffset]
  );

  const startColumnResize = useCallback(
    (
      e: React.MouseEvent,
      initialWidth: number,
      onWidthChange: (w: number) => void,
      minWidth: number,
      maxWidth: number
    ) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const onMove = (moveEvent: MouseEvent) => {
        const next = Math.min(
          maxWidth,
          Math.max(minWidth, Math.round(initialWidth + (moveEvent.clientX - startX)))
        );
        onWidthChange(next);
      };
      const onUp = () => {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    []
  );

  const annotations = useMemo(() => {
    if (!snapshot) {
      return {};
    }
    return workspaceMeta.repositories[snapshot.repoPath]?.commitAnnotations ?? {};
  }, [workspaceMeta, snapshot]);

  const reverseLinkedFromMap = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!layout) {
      return map;
    }
    for (const [sourceSha, ann] of Object.entries(annotations)) {
      const targetRef = ann.linkedCommitSha?.trim().toLowerCase();
      if (!targetRef) {
        continue;
      }
      for (const r of layout.rows) {
        if (
          r.commit.sha.toLowerCase() === targetRef ||
          r.commit.sha.toLowerCase().startsWith(targetRef)
        ) {
          const list = map.get(r.commit.sha) ?? [];
          list.push(sourceSha);
          map.set(r.commit.sha, list);
        }
      }
    }
    return map;
  }, [annotations, layout]);

  const { focusedConnectedShas } = useMemo(
    () =>
      computeCommitLineageAndCluster({
        layout,
        selectedCommitSha,
        lineageDepthMode,
        annotations,
      }),
    [layout, selectedCommitSha, lineageDepthMode, annotations]
  );

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !layout || !selectedCommitSha) {
      return;
    }
    const targetRow = layout.rows.find(
      (r) => r.commit.sha === selectedCommitSha
    );
    if (!targetRow) {
      return;
    }
    const targetTop = targetRow.rowIndex * ROW_HEIGHT;
    const targetBottom = targetTop + ROW_HEIGHT;
    const viewTop = el.scrollTop;
    const viewBottom = viewTop + el.clientHeight;
    if (targetTop < viewTop + ROW_HEIGHT || targetBottom > viewBottom - ROW_HEIGHT) {
      el.scrollTo({
        top: Math.max(0, targetTop - el.clientHeight / 3),
        behavior: "smooth",
      });
    }
  }, [selectedCommitSha, layout]);

  if (!snapshot || !layout) {
    return (
      <div style={{ padding: 24, color: "var(--fg-muted)" }}>
        Select a local Git repository folder to inspect its branch and merge
        topology.
      </div>
    );
  }

  const autoGraphWidth = Math.max(
    115,
    GRAPH_PADDING_LEFT * 2 + layout.maxLaneCount * LANE_SPACING
  );
  const graphColumnWidth = manualGraphColWidth ?? autoGraphWidth;
  const totalRowCount = layout.rows.length;
  const svgHeight = Math.max(ROW_HEIGHT, totalRowCount * ROW_HEIGHT);

  const visibleStartRow = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - VIRTUAL_OVERSCAN_ROWS
  );
  const visibleEndRow = Math.min(
    totalRowCount - 1,
    Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + VIRTUAL_OVERSCAN_ROWS
  );

  const visibleRows = layout.rows.slice(visibleStartRow, visibleEndRow + 1);
  const visibleEdges = layout.edges.filter(
    (edge) => edge.toRow >= visibleStartRow && edge.fromRow <= visibleEndRow
  );

  const baseTypeBadgeStyle: React.CSSProperties = {
    width: EQUAL_TYPE_BADGE_WIDTH,
    minWidth: EQUAL_TYPE_BADGE_WIDTH,
    maxWidth: EQUAL_TYPE_BADGE_WIDTH,
    justifyContent: "center",
    textAlign: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    padding: "1px 4px",
  };

  const renderDivergenceBadge = (row: PositionedCommitRow) => {
    switch (row.divergenceKind) {
      case "mainline":
        return (
          <span
            className="primer-label primer-label-accent"
            style={baseTypeBadgeStyle}
            title="On the selected Local Visual Base first-parent spine"
          >
            MAINLINE
          </span>
        );
      case "unmerged_tip":
        return (
          <span
            className="primer-label primer-label-attention"
            style={baseTypeBadgeStyle}
            title="Unmerged branch head (tip) relative to the selected Local Base"
          >
            UNMERGED TIP
          </span>
        );
      case "diverged":
        return (
          <span
            className="primer-label primer-label-severe"
            style={baseTypeBadgeStyle}
            title="Unmerged commit along an unmerged branch below its tip (not yet merged into Local Base)"
          >
            UNMERGED
          </span>
        );
      case "orphan_disconnected":
        return (
          <span
            className="primer-label primer-label-danger"
            style={baseTypeBadgeStyle}
            title="Belongs to a disconnected orphan history root tree"
          >
            ORPHAN
          </span>
        );
      case "merged":
      default:
        return (
          <span
            className="primer-label primer-label-neutral"
            title="Already merged into the selected Local Visual Base"
            style={{ ...baseTypeBadgeStyle, opacity: 0.78 }}
          >
            MERGED
          </span>
        );
    }
  };

  return (
    <div
      ref={tableRootRef}
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
          height: 34,
          borderBottom: "1px solid var(--border-default)",
          backgroundColor: "var(--bg-canvas-subtle)",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--fg-muted)",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {/* Spine & Lanes Column Header */}
        <div
          style={{
            position: "relative",
            width: graphColumnWidth,
            paddingLeft: 10,
            paddingRight: 8,
            flexShrink: 0,
            borderRight: "1px solid var(--border-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <span>Lanes ({layout.maxLaneCount})</span>
          {manualGraphColWidth !== null && (
            <button
              type="button"
              className="primer-btn primer-card-action-btn"
              style={{ padding: "1px 5px", fontSize: 10 }}
              onClick={() => {
                setManualGraphColWidth(null);
                applyColumnScrollOffset("lanes", 0);
              }}
              title="Auto-fit lane column width to widest branch lane"
            >
              <Maximize2 size={10} />
              <span>Auto</span>
            </button>
          )}
          <div
            onMouseDown={(e) =>
              startColumnResize(
                e,
                graphColumnWidth,
                (w) => setManualGraphColWidth(w),
                90,
                720
              )
            }
            onDoubleClick={() => {
              setManualGraphColWidth(null);
              applyColumnScrollOffset("lanes", 0);
            }}
            style={{
              position: "absolute",
              right: -3,
              top: 0,
              bottom: 0,
              width: 6,
              cursor: "col-resize",
              zIndex: 5,
            }}
            title="Drag to resize Lanes column (double-click to auto-fit)"
          />
        </div>

        {/* Commit Title Column Header with Synced Horizontal Scroll Slider */}
        <div
          style={{
            flex: 1,
            minWidth: 220,
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            borderRight: "1px solid var(--border-muted)",
            height: "100%",
          }}
        >
          <span>
            Commit Title &amp; Lineage ({layout.rows.length} shown)
          </span>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
            }}
            title="Horizontally scroll all commit titles in unison (or swipe horizontally on the column)"
          >
            <span>Scroll X</span>
            <input
              type="range"
              min={0}
              max={650}
              value={titleScrollOffset}
              onChange={(e) =>
                applyColumnScrollOffset("title", Number(e.target.value))
              }
              style={{ width: 76, cursor: "pointer" }}
            />
            {titleScrollOffset > 0 && (
              <button
                type="button"
                className="primer-btn primer-card-action-btn"
                style={{ padding: "0 4px", fontSize: 9.5 }}
                onClick={() => applyColumnScrollOffset("title", 0)}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* SHA Column Header */}
        <div
          style={{
            width: shaColWidth,
            paddingLeft: 8,
            flexShrink: 0,
            borderRight: "1px solid var(--border-muted)",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          SHA
        </div>

        {/* Submodules Column Header */}
        <div
          style={{
            position: "relative",
            width: submoduleColWidth,
            paddingLeft: 8,
            flexShrink: 0,
            borderRight: "1px solid var(--border-muted)",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Submodules</span>
          <div
            onMouseDown={(e) =>
              startColumnResize(
                e,
                submoduleColWidth,
                (w) => setSubmoduleColWidth(w),
                80,
                360
              )
            }
            style={{
              position: "absolute",
              right: -3,
              top: 0,
              bottom: 0,
              width: 6,
              cursor: "col-resize",
              zIndex: 5,
            }}
            title="Drag to resize Submodules column"
          />
        </div>

        {/* Date Column Header */}
        <div
          style={{
            width: dateColWidth,
            paddingLeft: 8,
            flexShrink: 0,
            borderRight: "1px solid var(--border-muted)",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Date ({formatTimezoneBadgeLabel(timezoneMode)})
        </div>

        {/* Quick State Checkout Header */}
        <div
          style={{
            width: 92,
            paddingRight: 10,
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          Quick State
        </div>
      </div>

      {/* Scrollable Virtualized Graph + Rows */}
      <div
        ref={scrollContainerRef}
        onScroll={handleVerticalScroll}
        style={{
          position: "relative",
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            height: svgHeight,
            width: "100%",
          }}
        >
          {/* SVG Graph Column Layer */}
          <div
            onWheel={makeColumnWheelHandler("lanes")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: graphColumnWidth,
              height: svgHeight,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <svg
              width={Math.max(graphColumnWidth, autoGraphWidth)}
              height={svgHeight}
              style={{
                transform: "translate3d(var(--col-lanes-scroll-x, 0px), 0, 0)",
              }}
            >
              {/* Subtle vertical guide for Lane 0 (Mainline Spine) */}
              <line
                x1={laneToX(0)}
                y1={visibleStartRow * ROW_HEIGHT}
                x2={laneToX(0)}
                y2={(visibleEndRow + 1) * ROW_HEIGHT}
                stroke="var(--border-muted)"
                strokeWidth={1}
                strokeDasharray="2 3"
              />

              {/* Visible Edges */}
              {visibleEdges.map((edge, idx) => {
                const rawColor =
                  LANE_COLOR_PALETTE[
                    edge.colorIndex % LANE_COLOR_PALETTE.length
                  ];
                const sourceRow = layout.rows[edge.fromRow];
                const targetRow = layout.rows[edge.toRow];

                const isDirectToSelected =
                  selectedCommitSha !== null &&
                  (edge.fromSha === selectedCommitSha ||
                    edge.toSha === selectedCommitSha);

                const isInFocusedCluster =
                  selectedCommitSha !== null &&
                  focusedConnectedShas.has(edge.fromSha) &&
                  focusedConnectedShas.has(edge.toSha);

                const matchesCategory =
                  filterCategory === "all"
                    ? true
                    : (sourceRow &&
                        isRowHighlightedByCategory(
                          sourceRow,
                          filterCategory,
                          focusedSubmodulePath,
                          annotations
                        )) ||
                      (targetRow &&
                        isRowHighlightedByCategory(
                          targetRow,
                          filterCategory,
                          focusedSubmodulePath,
                          annotations
                        ));

                const isAlreadyMerged =
                  edge.isMergedIntoBase &&
                  filterCategory !== "multi_merged" &&
                  !isDirectToSelected &&
                  !(focusLineageOnly && isInFocusedCluster);

                const strokeColor = isAlreadyMerged
                  ? MERGED_MUTED_STROKE
                  : !matchesCategory
                  ? MERGED_MUTED_STROKE
                  : rawColor;

                let opacity = isAlreadyMerged ? 0.35 : 0.9;
                let strokeWidth =
                  edge.fromLane === 0 && edge.toLane === 0 ? 2.5 : 1.95;

                if (filterCategory !== "all") {
                  if (matchesCategory) {
                    opacity = 0.98;
                    strokeWidth = 2.4;
                  } else {
                    opacity = 0.16;
                    strokeWidth = 1.4;
                  }
                }

                if (focusLineageOnly && selectedCommitSha) {
                  if (isDirectToSelected || isInFocusedCluster) {
                    opacity = 1;
                    strokeWidth = isDirectToSelected ? 2.7 : 2.35;
                  } else {
                    opacity = 0.12;
                  }
                } else if (selectedCommitSha && isDirectToSelected) {
                  opacity = 1;
                  strokeWidth = 2.6;
                }

                return (
                  <path
                    key={`${edge.fromSha}-${edge.toSha}-${edge.mergeParentIndex}-${idx}`}
                    d={buildDiagonalCurvePath(edge)}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                    strokeDasharray={edge.isMergeEdge ? "4 2" : undefined}
                  />
                );
              })}

              {/* Visible Commit Nodes */}
              {visibleRows.map((row) => {
                const cx = laneToX(row.laneIndex);
                const cy = rowToY(row.rowIndex);
                const rawColor =
                  LANE_COLOR_PALETTE[
                    row.colorIndex % LANE_COLOR_PALETTE.length
                  ];
                const isHead = row.commit.sha === snapshot.headSha;
                const isSelected = row.commit.sha === selectedCommitSha;
                const matchesCategory = isRowHighlightedByCategory(
                  row,
                  filterCategory,
                  focusedSubmodulePath,
                  annotations
                );
                const isMergedNode =
                  row.divergenceKind === "merged" &&
                  filterCategory !== "multi_merged" &&
                  !isSelected;

                const nodeColor =
                  isMergedNode || !matchesCategory
                    ? MERGED_MUTED_STROKE
                    : rawColor;

                const isLineageDimmed =
                  focusLineageOnly &&
                  selectedCommitSha !== null &&
                  !focusedConnectedShas.has(row.commit.sha);

                const nodeOpacity = isLineageDimmed
                  ? 0.18
                  : filterCategory !== "all" && !matchesCategory
                  ? 0.25
                  : isMergedNode
                  ? 0.55
                  : 1;

                return (
                  <g key={row.commit.sha} style={{ opacity: nodeOpacity }}>
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
                        strokeWidth={1.8}
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
                      r={row.isMergeCommit ? 4.6 : 4.2}
                      fill={
                        row.isMergeCommit
                          ? "var(--bg-canvas-default)"
                          : nodeColor
                      }
                      stroke={nodeColor}
                      strokeWidth={row.isMergeCommit ? 2.2 : 1.5}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Virtualized Commit Rows */}
          {visibleRows.map((row) => {
            const { commit } = row;
            const isSelected = commit.sha === selectedCommitSha;
            const isHead = commit.sha === snapshot.headSha;
            const annotation = annotations[commit.sha];
            const isConfirmedTip = isCommitTipConfirmed(annotation);
            const triageBadge = resolveTriageBadgeSpec(annotation);
            const reverseLinkedShas =
              reverseLinkedFromMap.get(commit.sha) ?? [];

            const matchesCategory = isRowHighlightedByCategory(
              row,
              filterCategory,
              focusedSubmodulePath,
              annotations
            );
            const isLineageDimmed =
              focusLineageOnly &&
              selectedCommitSha !== null &&
              !focusedConnectedShas.has(commit.sha);
            const isMergedRow = row.divergenceKind === "merged";

            let rowOpacity = 1;
            let rowFilter = "none";
            if (isLineageDimmed) {
              rowOpacity = 0.28;
              rowFilter = "grayscale(0.9)";
            } else if (filterCategory !== "all" && !matchesCategory) {
              rowOpacity = 0.34;
              rowFilter = "grayscale(0.92)";
            } else if (isMergedRow && !isSelected) {
              rowOpacity = 0.68;
              rowFilter = "grayscale(0.65)";
            }

            const deduplicatedRefs: string[] = [];
            for (const rawRef of commit.refs) {
              const stripped = stripRemotePrefix(rawRef);
              if (
                stripped &&
                stripped !== "HEAD" &&
                !deduplicatedRefs.includes(stripped)
              ) {
                deduplicatedRefs.push(stripped);
              }
            }
            const staleRefs = commit.staleRefs ?? [];
            const sha8 = commit.sha.slice(0, 8);
            const isMainlineCommit = row.divergenceKind === "mainline";

            return (
              <div
                key={commit.sha}
                onClick={() => selectCommit(commit.sha)}
                className="primer-datatable-row"
                style={{
                  position: "absolute",
                  top: row.rowIndex * ROW_HEIGHT,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  height: ROW_HEIGHT,
                  borderBottom: "1px solid var(--border-muted)",
                  backgroundColor: isSelected
                    ? "var(--selected-item-bg)"
                    : undefined,
                  cursor: "pointer",
                  opacity: rowOpacity,
                  filter: rowFilter,
                }}
              >
                {/* Graph Lane Spacer */}
                <div
                  onWheel={makeColumnWheelHandler("lanes")}
                  style={{
                    width: graphColumnWidth,
                    height: "100%",
                    flexShrink: 0,
                    borderRight: "1px solid var(--border-muted)",
                  }}
                />

                {/* Horizontally Scrollable Commit Badges + Title Column */}
                <div
                  onWheel={makeColumnWheelHandler("title")}
                  style={{
                    flex: 1,
                    minWidth: 220,
                    height: "100%",
                    padding: "0 12px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    borderRight: "1px solid var(--border-muted)",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      whiteSpace: "nowrap",
                      transform:
                        "translate3d(var(--col-title-scroll-x, 0px), 0, 0)",
                      willChange: "transform",
                    }}
                  >
                    {/* 1. Fixed Equal-Width Divergence / Type Badge */}
                    {renderDivergenceBadge(row)}

                    {/* 2. Branch Name Pills (Aligned immediately after equal-width Type badge) */}
                    {deduplicatedRefs.slice(0, 3).map((branchName) => (
                      <span
                        key={branchName}
                        className="primer-label primer-label-accent"
                        style={{
                          fontFamily: "var(--font-mono-stack)",
                          fontWeight: 600,
                        }}
                        title={`Branch on origin: ${branchName}`}
                      >
                        {branchName}
                      </span>
                    ))}
                    {deduplicatedRefs.length > 3 && (
                      <span
                        className="primer-label primer-label-neutral"
                        title={deduplicatedRefs.join(", ")}
                      >
                        +{deduplicatedRefs.length - 3} refs
                      </span>
                    )}

                    {/* Local-Only / Deleted on Origin Stale Ref Pills (Muted Gray) */}
                    {staleRefs.slice(0, 2).map((staleRef) => (
                      <span
                        key={staleRef}
                        className="primer-label primer-label-neutral"
                        style={{
                          opacity: 0.62,
                          borderStyle: "dashed",
                          fontFamily: "var(--font-mono-stack)",
                        }}
                        title={`Local / Unpruned ref (deleted on remote origin): ${staleRef}`}
                      >
                        <CloudOff size={9} />
                        <span>{stripRemotePrefix(staleRef)}</span>
                      </span>
                    ))}
                    {staleRefs.length > 2 && (
                      <span
                        className="primer-label primer-label-neutral"
                        style={{ opacity: 0.55, borderStyle: "dashed" }}
                        title={`Local / Unpruned refs: ${staleRefs.join(", ")}`}
                      >
                        +{staleRefs.length - 2} local
                      </span>
                    )}

                    {/* 3. HEAD Badge (Placed after branch name to preserve leading alignment) */}
                    {isHead && (
                      <span className="primer-label primer-label-success">
                        HEAD
                      </span>
                    )}

                    {/* 4. Local Tip Triage / Confirmation & Tag Badges (By SHA) */}
                    {row.divergenceKind === "unmerged_tip" &&
                      !isConfirmedTip && (
                        <span
                          className="primer-label primer-label-attention"
                          style={{ borderStyle: "dashed" }}
                          title="Unconfirmed unmerged tip: select this commit to confirm disposition (Useful, Useless, Absorbed, Hold) or assign a feature tag"
                        >
                          UNCONFIRMED
                        </span>
                      )}

                    {triageBadge && (
                      <span
                        className={`primer-label primer-label-${triageBadge.tone}`}
                        style={{
                          cursor: annotation?.linkedCommitSha
                            ? "pointer"
                            : undefined,
                        }}
                        onClick={(e) => {
                          if (annotation?.linkedCommitSha) {
                            e.stopPropagation();
                            const target = layout.rows.find((r) =>
                              r.commit.sha.startsWith(
                                annotation.linkedCommitSha ?? ""
                              )
                            );
                            if (target) {
                              selectCommit(target.commit.sha);
                            }
                          }
                        }}
                        title={
                          annotation?.note ||
                          (annotation?.linkedCommitSha
                            ? `Click to jump to linked commit ${annotation.linkedCommitSha.slice(
                                0,
                                8
                              )}`
                            : "Confirmed local triage disposition")
                        }
                      >
                        {annotation?.linkedCommitSha && <Link2 size={9} />}
                        <span>{triageBadge.label}</span>
                      </span>
                    )}

                    {annotation?.tagLabel && (
                      <span
                        className={`primer-label primer-label-${annotation.colorTone}`}
                        title={annotation.note || "Local-only commit tag"}
                      >
                        <Tag size={10} />
                        <span>{annotation.tagLabel}</span>
                      </span>
                    )}

                    {reverseLinkedShas.map((sourceSha) => (
                      <span
                        key={sourceSha}
                        className="primer-label primer-label-done"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectCommit(sourceSha);
                        }}
                        title={`Absorbed / linked from commit ${sourceSha.slice(
                          0,
                          8
                        )} (click to jump)`}
                      >
                        <Link2 size={9} />
                        <span>Linked &lt;- {sourceSha.slice(0, 8)}</span>
                      </span>
                    ))}

                    {/* 5. Commit Subject */}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight:
                          row.divergenceKind === "mainline" ||
                          row.divergenceKind === "unmerged_tip"
                            ? 600
                            : 400,
                        color: "var(--fg-default)",
                      }}
                    >
                      {commit.subject}
                    </span>

                    {/* 6. Trailing Merge Multi-Target & Merge Source Pills (At the very end of the row) */}
                    {row.isMultiMergeTarget && (
                      <span
                        className="primer-label primer-label-sponsors"
                        style={{ minWidth: 74, justifyContent: "center" }}
                        title={`Shared base merged into ${row.mergedIntoCount} separate merge commits`}
                      >
                        Merged x{row.mergedIntoCount}
                      </span>
                    )}

                    {showMergeSourcePills &&
                      row.isMergeCommit &&
                      row.mergeSourceLabels.length > 0 && (
                        <span
                          className="primer-label primer-label-done"
                          title={`Merge parents: ${row.mergeSourceLabels.join(
                            ", "
                          )}`}
                        >
                          <GitMerge size={10} />
                          <span>
                            Merge &lt;-{" "}
                            {row.mergeSourceLabels.slice(0, 2).join(", ")}
                            {row.mergeSourceLabels.length > 2
                              ? ` +${row.mergeSourceLabels.length - 2}`
                              : ""}
                          </span>
                        </span>
                      )}
                  </div>
                </div>

                {/* Short SHA Column (Mainline enclosed in curly braces {SHA}) */}
                <div
                  style={{
                    width: shaColWidth,
                    paddingLeft: 8,
                    flexShrink: 0,
                    fontFamily: "var(--font-mono-stack)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: isMainlineCommit
                      ? "var(--fg-accent)"
                      : "var(--fg-muted)",
                    borderRight: "1px solid var(--border-muted)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title={
                    isMainlineCommit
                      ? `Mainline Spine Commit: ${commit.sha}`
                      : commit.sha
                  }
                >
                  {isMainlineCommit ? `{${sha8}}` : `\u00A0${sha8}\u00A0`}
                </div>

                {/* Horizontally Scrollable Submodules Column */}
                <div
                  onWheel={makeColumnWheelHandler("submodules")}
                  style={{
                    width: submoduleColWidth,
                    padding: "0 8px",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRight: "1px solid var(--border-muted)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      whiteSpace: "nowrap",
                      transform:
                        "translate3d(var(--col-submodules-scroll-x, 0px), 0, 0)",
                    }}
                  >
                    {Object.entries(commit.submodulePointers).map(
                      ([subPath, subSha]) => {
                        const isBumped =
                          commit.changedSubmodules.includes(subPath);
                        const shortSubName =
                          subPath.split("/").pop() ?? subPath;
                        return (
                          <span
                            key={subPath}
                            className={`primer-label ${
                              isBumped
                                ? "primer-label-attention"
                                : "primer-label-neutral"
                            }`}
                            style={{
                              fontFamily: "var(--font-mono-stack)",
                              fontSize: 10,
                            }}
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
                </div>

                {/* Date Column (Defaults to UTC+8) */}
                <div
                  style={{
                    width: dateColWidth,
                    paddingLeft: 8,
                    flexShrink: 0,
                    fontSize: 11,
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono-stack)",
                    borderRight: "1px solid var(--border-muted)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatRelativeOrShortTime(commit.timestamp, timezoneMode)}
                </div>

                {/* Detached Checkout Action */}
                <div
                  style={{
                    width: 92,
                    paddingRight: 10,
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isHead ? (
                    <span className="primer-label primer-label-success">
                      HEAD
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
