import React, { useEffect, useMemo, useState } from "react";
import {
  Anchor,
  Box,
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  GitCommit,
  GitMerge,
  Layers,
  Link2,
  Play,
  ShieldAlert,
  Tag,
} from "lucide-react";
import {
  ANNOTATION_TONE_OPTIONS,
  TRIAGE_STATUS_OPTIONS,
} from "../config/demoRepositorySnapshot";
import { openDirectoryInOs } from "../services/tauriGitClient";
import { useRepositoryStore } from "../stores/repositoryStore";
import {
  AnnotationTone,
  CommitDivergenceKind,
  CommitTriageStatus,
} from "../types/gitTypes";
import {
  formatRelativeOrShortTime,
  formatTimezoneBadgeLabel,
  isCommitTipConfirmed,
  resolveTriageBadgeSpec,
  stripRemotePrefix,
} from "../utils/formatters";
import { computeCommitLineageAndCluster } from "../utils/topologyGraphPipeline";

function formatDivergenceDescription(
  kind: CommitDivergenceKind | undefined
): string {
  switch (kind) {
    case "mainline":
      return "MAINLINE (On Selected Base Spine)";
    case "unmerged_tip":
      return "UNMERGED TIP (Branch Head Not Merged into Base)";
    case "diverged":
      return "UNMERGED LINEAGE (Commit on Unmerged Branch Below Tip)";
    case "merged":
      return "MERGED (Already Merged into Selected Base)";
    case "orphan_disconnected":
      return "ORPHAN (Disconnected Root Tree)";
    default:
      return "COMMIT";
  }
}

const SUGGESTED_TAG_PRESETS = [
  "replay system",
  "no-need-anymore",
  "useful-needs-catchup",
  "ui-plan-hold",
  "absorbed-in-mainline",
];

export const RightCommitInspector: React.FC = () => {
  const workspaceMeta = useRepositoryStore((s) => s.workspaceMeta);
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const layout = useRepositoryStore((s) => s.layout);
  const selectedCommitSha = useRepositoryStore((s) => s.selectedCommitSha);
  const lineageDepthMode = useRepositoryStore((s) => s.lineageDepthMode);
  const timezoneMode = useRepositoryStore((s) => s.timezoneMode);
  const isLoading = useRepositoryStore((s) => s.isLoading);
  const lastCheckoutOutcome = useRepositoryStore((s) => s.lastCheckoutOutcome);
  const selectCommit = useRepositoryStore((s) => s.selectCommit);
  const updateLocalBaseRef = useRepositoryStore((s) => s.updateLocalBaseRef);
  const updateCommitAnnotation = useRepositoryStore(
    (s) => s.updateCommitAnnotation
  );
  const batchUpdateCommitAnnotations = useRepositoryStore(
    (s) => s.batchUpdateCommitAnnotations
  );
  const runDetachedCheckout = useRepositoryStore((s) => s.runDetachedCheckout);
  const loadRepositoryByPath = useRepositoryStore(
    (s) => s.loadRepositoryByPath
  );

  const selectedRow =
    layout?.rows.find((r) => r.commit.sha === selectedCommitSha) ?? null;
  const selectedCommit =
    selectedRow?.commit ??
    snapshot?.commits.find((c) => c.sha === selectedCommitSha) ??
    null;

  const annotations = useMemo(
    () =>
      (snapshot &&
        workspaceMeta.repositories[snapshot.repoPath]?.commitAnnotations) ||
      {},
    [snapshot, workspaceMeta]
  );

  const existingAnnotation =
    (selectedCommit && annotations[selectedCommit.sha]) || null;

  const { unmergedCluster, reverseLinkedFromMap } = useMemo(
    () =>
      computeCommitLineageAndCluster({
        layout,
        selectedCommitSha,
        lineageDepthMode,
        annotations,
      }),
    [layout, selectedCommitSha, lineageDepthMode, annotations]
  );

  const existingTags = useMemo(() => {
    const set = new Set<string>(SUGGESTED_TAG_PRESETS);
    for (const ann of Object.values(annotations)) {
      if (ann.tagLabel?.trim()) {
        set.add(ann.tagLabel.trim());
      }
    }
    return Array.from(set);
  }, [annotations]);

  const [tagLabel, setTagLabel] = useState("");
  const [colorTone, setColorTone] = useState<AnnotationTone>("accent");
  const [triageStatus, setTriageStatus] =
    useState<CommitTriageStatus>("unconfirmed");
  const [linkedCommitInput, setLinkedCommitInput] = useState("");
  const [note, setNote] = useState("");
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setTagLabel(existingAnnotation?.tagLabel ?? "");
    setColorTone(existingAnnotation?.colorTone ?? "accent");
    setTriageStatus(
      existingAnnotation?.triageStatus ??
        (isCommitTipConfirmed(existingAnnotation ?? undefined)
          ? "useful"
          : "unconfirmed")
    );
    setLinkedCommitInput(existingAnnotation?.linkedCommitSha ?? "");
    setNote(existingAnnotation?.note ?? "");
    setSavedNotice(false);
  }, [
    selectedCommit?.sha,
    existingAnnotation?.tagLabel,
    existingAnnotation?.colorTone,
    existingAnnotation?.triageStatus,
    existingAnnotation?.linkedCommitSha,
    existingAnnotation?.note,
    existingAnnotation?.confirmed,
  ]);

  if (!snapshot || !selectedCommit) {
    return (
      <div style={{ padding: 16, color: "var(--fg-muted)", fontSize: 12 }}>
        Select a commit node in the topology graph to inspect its full commit
        description, merge parents, unmerged fork cluster, tip triage status,
        and detached checkout controls.
      </div>
    );
  }

  const isCurrentHead = selectedCommit.sha === snapshot.headSha;
  const isWorktreeClean = snapshot.workingTreeStatus.isClean;
  const isConfirmed = isCommitTipConfirmed(existingAnnotation ?? undefined);

  const resolveTargetShaFromInput = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed) {
      return "";
    }
    const stripped = stripRemotePrefix(trimmed);
    const exactOrPrefixCommit = snapshot.commits.find(
      (c) =>
        c.sha === trimmed ||
        c.sha.startsWith(trimmed) ||
        c.refs.some((r) => stripRemotePrefix(r) === stripped)
    );
    return exactOrPrefixCommit ? exactOrPrefixCommit.sha : trimmed;
  };

  const resolvedLinkedCommit = linkedCommitInput.trim()
    ? snapshot.commits.find(
        (c) =>
          c.sha === linkedCommitInput.trim() ||
          c.sha.startsWith(linkedCommitInput.trim())
      ) ?? null
    : null;

  const reverseLinkedSources =
    reverseLinkedFromMap.get(selectedCommit.sha) ?? [];

  const mainlineCandidateRows = (layout?.rows ?? [])
    .filter(
      (r) =>
        r.divergenceKind === "mainline" && r.commit.sha !== selectedCommit.sha
    )
    .slice(0, 18);

  const handleSaveAnnotation = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const resolvedLinked = resolveTargetShaFromInput(linkedCommitInput);
    const effectiveStatus: CommitTriageStatus =
      resolvedLinked && triageStatus === "unconfirmed"
        ? "absorbed"
        : triageStatus === "unconfirmed" && tagLabel.trim().length > 0
        ? "useful"
        : triageStatus;
    const confirmed =
      effectiveStatus !== "unconfirmed" ||
      Boolean(resolvedLinked) ||
      Boolean(tagLabel.trim());

    setTriageStatus(effectiveStatus);
    setLinkedCommitInput(resolvedLinked);
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: tagLabel.trim(),
      colorTone,
      note: note.trim(),
      confirmed,
      triageStatus: effectiveStatus,
      linkedCommitSha: resolvedLinked || undefined,
    });
    setSavedNotice(true);
  };

  const handleQuickStatusSelect = async (nextStatus: CommitTriageStatus) => {
    const opt = TRIAGE_STATUS_OPTIONS.find((o) => o.id === nextStatus);
    const nextTone = opt?.defaultTone ?? colorTone;
    setTriageStatus(nextStatus);
    setColorTone(nextTone);
    const resolvedLinked = resolveTargetShaFromInput(linkedCommitInput);
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: tagLabel.trim(),
      colorTone: nextTone,
      note: note.trim(),
      confirmed: nextStatus !== "unconfirmed",
      triageStatus: nextStatus,
      linkedCommitSha: resolvedLinked || undefined,
    });
    setSavedNotice(true);
  };

  const handleQuickTagClick = async (presetTag: string) => {
    const nextStatus =
      triageStatus === "unconfirmed" ? "useful" : triageStatus;
    setTagLabel(presetTag);
    setTriageStatus(nextStatus);
    const resolvedLinked = resolveTargetShaFromInput(linkedCommitInput);
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: presetTag,
      colorTone,
      note: note.trim(),
      confirmed: true,
      triageStatus: nextStatus,
      linkedCommitSha: resolvedLinked || undefined,
    });
    setSavedNotice(true);
  };

  const handleBatchTagClusterTips = async () => {
    if (!unmergedCluster || unmergedCluster.tipRows.length === 0) {
      return;
    }
    const effectiveTag = tagLabel.trim() || "cluster-group";
    const effectiveStatus: CommitTriageStatus =
      triageStatus === "unconfirmed" ? "useful" : triageStatus;
    const targetShas = new Set<string>(
      unmergedCluster.tipRows.map((r) => r.commit.sha)
    );
    targetShas.add(selectedCommit.sha);

    const items = Array.from(targetShas).map((sha) => {
      const prev = annotations[sha];
      return {
        commitSha: sha,
        tagLabel: effectiveTag,
        colorTone,
        note:
          sha === selectedCommit.sha
            ? note.trim()
            : prev?.note ||
              `Grouped with cluster commit ${selectedCommit.sha.slice(0, 8)} (${effectiveTag})`,
        confirmed: true,
        triageStatus: effectiveStatus,
        linkedCommitSha:
          sha === selectedCommit.sha
            ? resolveTargetShaFromInput(linkedCommitInput) || undefined
            : prev?.linkedCommitSha,
      };
    });
    await batchUpdateCommitAnnotations(items);
    setTagLabel(effectiveTag);
    setTriageStatus(effectiveStatus);
    setSavedNotice(true);
  };

  const handleClearAnnotation = async () => {
    setTagLabel("");
    setNote("");
    setTriageStatus("unconfirmed");
    setLinkedCommitInput("");
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: "",
      colorTone: "accent",
      note: "",
      confirmed: false,
      triageStatus: "unconfirmed",
      linkedCommitSha: undefined,
    });
    setSavedNotice(true);
  };

  const resolveSubmoduleFullPath = (subPath: string): string => {
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
        overflowX: "hidden",
        padding: "8px 8px 14px 8px",
        gap: 10,
      }}
    >
      {/* Local Tip Triage, Confirmation, Feature Tag & SHA Association Card */}
      <div className="primer-box">
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              minWidth: 0,
            }}
          >
            <Tag size={13} style={{ flexShrink: 0 }} />
            <span>Tip Triage &amp; Local SHA Tag</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {savedNotice && (
              <span className="primer-label primer-label-success">Saved</span>
            )}
            <span
              className={`primer-label ${
                isConfirmed
                  ? "primer-label-success"
                  : "primer-label-attention"
              }`}
            >
              {isConfirmed ? "CONFIRMED" : "UNCONFIRMED"}
            </span>
          </div>
        </div>
        <form
          onSubmit={(e) => void handleSaveAnnotation(e)}
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* 1-Click Disposition Buttons */}
          <div>
            <div
              className="primer-action-list-header"
              style={{ padding: "0 0 4px 0" }}
            >
              Disposition (1-Click Confirm by SHA)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {TRIAGE_STATUS_OPTIONS.map((opt) => {
                const isActive = triageStatus === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`primer-label primer-label-${opt.defaultTone}`}
                    style={{
                      cursor: "pointer",
                      padding: "3px 8px",
                      outline: isActive
                        ? "2px solid var(--fg-default)"
                        : "none",
                      opacity: isActive ? 1 : 0.78,
                    }}
                    onClick={() => void handleQuickStatusSelect(opt.id)}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Group Tag Input + Quick Chips */}
          <div>
            <div
              className="primer-action-list-header"
              style={{ padding: "0 0 4px 0" }}
            >
              Feature Group / Custom Tag
            </div>
            <input
              type="text"
              className="primer-input"
              placeholder="e.g. replay system, no-need-anymore, ui-plan-hold"
              value={tagLabel}
              onChange={(e) => {
                setTagLabel(e.target.value);
                setSavedNotice(false);
              }}
              style={{ fontSize: 11.5 }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginTop: 5,
              }}
            >
              {existingTags.slice(0, 8).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`primer-label ${
                    tagLabel === preset
                      ? "primer-label-accent"
                      : "primer-label-neutral"
                  }`}
                  style={{ cursor: "pointer", fontSize: 10 }}
                  onClick={() => void handleQuickTagClick(preset)}
                  title={`Assign tag "${preset}" and mark confirmed`}
                >
                  <Tag size={9} />
                  <span>{preset}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Linked Target Commit SHA (Rebase / Cherry-Pick / Absorbed Into) */}
          <div>
            <div
              className="primer-action-list-header"
              style={{ padding: "0 0 4px 0" }}
            >
              <Link2
                size={11}
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              Link Absorbed / Rebased Target (SHA or Branch)
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <input
                type="text"
                className="primer-input"
                placeholder="Target SHA or branch (e.g. 6bd41edd)"
                value={linkedCommitInput}
                onChange={(e) => {
                  setLinkedCommitInput(e.target.value);
                  setSavedNotice(false);
                }}
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono-stack)",
                  flex: 1,
                }}
              />
              {mainlineCandidateRows.length > 0 && (
                <select
                  className="primer-input"
                  style={{ width: 112, fontSize: 10.5, padding: "4px 6px" }}
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setLinkedCommitInput(e.target.value);
                      setTriageStatus("absorbed");
                      setColorTone("done");
                      setSavedNotice(false);
                    }
                  }}
                  title="Pick a Mainline commit that absorbed/reworked this branch"
                >
                  <option value="">Pick Mainline...</option>
                  {mainlineCandidateRows.map((r) => {
                    const bName = r.commit.refs[0]
                      ? stripRemotePrefix(r.commit.refs[0])
                      : r.commit.subject.slice(0, 24);
                    return (
                      <option key={r.commit.sha} value={r.commit.sha}>
                        {`{${r.commit.sha.slice(0, 8)}} ${bName}`}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            {resolvedLinkedCommit && (
              <button
                type="button"
                className="primer-snippet-row-btn"
                style={{ padding: "5px 8px", marginTop: 5 }}
                onClick={() => selectCommit(resolvedLinkedCommit.sha)}
                title="Jump to linked target commit in topology graph"
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 10.5,
                      fontFamily: "var(--font-mono-stack)",
                      color: "var(--fg-accent)",
                    }}
                  >
                    <Link2 size={10} />
                    <span>
                      Linked Target: {resolvedLinkedCommit.sha.slice(0, 8)}
                    </span>
                    {resolvedLinkedCommit.refs[0] && (
                      <span className="primer-label primer-label-accent">
                        {stripRemotePrefix(resolvedLinkedCommit.refs[0])}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      marginTop: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {resolvedLinkedCommit.subject}
                  </div>
                </div>
              </button>
            )}

            {reverseLinkedSources.length > 0 && (
              <div style={{ marginTop: 6 }}>
                <div
                  className="primer-action-list-header"
                  style={{ padding: "0 0 3px 0" }}
                >
                  Absorbed / Linked From ({reverseLinkedSources.length})
                </div>
                {reverseLinkedSources.map((srcSha) => {
                  const srcCommit = snapshot.commits.find(
                    (c) => c.sha === srcSha
                  );
                  return (
                    <button
                      key={srcSha}
                      type="button"
                      className="primer-snippet-row-btn"
                      style={{ padding: "4px 8px", marginTop: 3 }}
                      onClick={() => selectCommit(srcSha)}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            fontSize: 10.5,
                            fontFamily: "var(--font-mono-stack)",
                            color: "var(--fg-accent)",
                          }}
                        >
                          {srcSha.slice(0, 8)}{" "}
                          {srcCommit?.refs[0]
                            ? `(${stripRemotePrefix(srcCommit.refs[0])})`
                            : ""}
                        </div>
                        {srcCommit && (
                          <div
                            style={{
                              fontSize: 11,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {srcCommit.subject}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {ANNOTATION_TONE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`primer-label primer-label-${opt.id}`}
                style={{
                  cursor: "pointer",
                  padding: "2px 7px",
                  outline:
                    colorTone === opt.id
                      ? "2px solid var(--fg-default)"
                      : "none",
                }}
                onClick={() => {
                  setColorTone(opt.id);
                  setSavedNotice(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <textarea
            className="primer-textarea"
            rows={2}
            placeholder="Local triage notes for yourself or Coding Agent..."
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSavedNotice(false);
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: 6,
            }}
          >
            <button
              type="submit"
              className="primer-btn primer-btn-primary"
              style={{ flex: "1 1 110px" }}
            >
              Save &amp; Confirm
            </button>
            {existingAnnotation && (
              <button
                type="button"
                className="primer-btn primer-btn-danger"
                style={{ flex: "1 1 65px" }}
                onClick={() => void handleClearAnnotation()}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Unmerged Fork Cluster Discovery & Batch Tagging Card */}
      {unmergedCluster && (
        <div className="primer-box">
          <div
            className="primer-box-header"
            style={{ padding: "7px 10px", fontSize: 11.5 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                minWidth: 0,
              }}
            >
              <Layers size={13} style={{ flexShrink: 0 }} />
              <span>
                Unmerged Fork Cluster ({unmergedCluster.clusterShas.length}{" "}
                commits)
              </span>
            </span>
            <span className="primer-label primer-label-attention">
              {unmergedCluster.tipRows.length} Tip(s)
            </span>
          </div>
          <div
            className="primer-box-body"
            style={{
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
              Traces the full unmerged branch subtree connected to{" "}
              <code>{selectedCommit.sha.slice(0, 8)}</code> down to the Base
              spine fork boundary without bleeding into mainline history.
            </div>

            {unmergedCluster.tipRows.length > 1 && (
              <button
                type="button"
                className="primer-btn primer-btn-status-accent"
                style={{ width: "100%" }}
                onClick={() => void handleBatchTagClusterTips()}
                title="Apply current tag label and disposition to all unmerged tips in this fork cluster"
              >
                <Tag size={12} />
                <span>
                  Tag &amp; Confirm All {unmergedCluster.tipRows.length} Cluster
                  Tips as &ldquo;{tagLabel.trim() || "cluster-group"}&rdquo;
                </span>
              </button>
            )}

            {/* Unmerged Tips in this Cluster */}
            <div>
              <div
                className="primer-action-list-header"
                style={{ paddingLeft: 0 }}
              >
                Cluster Unmerged Tips ({unmergedCluster.tipRows.length})
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 3,
                }}
              >
                {unmergedCluster.tipRows.map((row) => {
                  const ann = annotations[row.commit.sha];
                  const badge = resolveTriageBadgeSpec(ann);
                  const branchName = row.commit.refs[0]
                    ? stripRemotePrefix(row.commit.refs[0])
                    : row.commit.sha.slice(0, 8);
                  const isCur = row.commit.sha === selectedCommit.sha;
                  return (
                    <button
                      key={row.commit.sha}
                      type="button"
                      className={`primer-snippet-row-btn ${
                        isCur ? "primer-snippet-row-selected" : ""
                      }`}
                      style={{ padding: "5px 8px" }}
                      onClick={() => selectCommit(row.commit.sha)}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono-stack)",
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: "var(--fg-accent)",
                            }}
                          >
                            {row.commit.sha.slice(0, 8)}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {branchName}
                          </span>
                          {badge ? (
                            <span
                              className={`primer-label primer-label-${badge.tone}`}
                            >
                              {badge.label}
                            </span>
                          ) : (
                            <span
                              className="primer-label primer-label-attention"
                              style={{ borderStyle: "dashed" }}
                            >
                              UNCONFIRMED
                            </span>
                          )}
                          {ann?.tagLabel && (
                            <span
                              className={`primer-label primer-label-${ann.colorTone}`}
                            >
                              {ann.tagLabel}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            color: "var(--fg-muted)",
                            marginTop: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.commit.subject}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Internal Unmerged Lineage Commits in this Cluster */}
            {unmergedCluster.internalRows.length > 0 && (
              <div>
                <div
                  className="primer-action-list-header"
                  style={{ paddingLeft: 0 }}
                >
                  Shared Unmerged Fork Lineage (
                  {unmergedCluster.internalRows.length})
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    marginTop: 3,
                  }}
                >
                  {unmergedCluster.internalRows.map((row) => {
                    const ann = annotations[row.commit.sha];
                    const branchName = row.commit.refs[0]
                      ? stripRemotePrefix(row.commit.refs[0])
                      : "";
                    const isCur = row.commit.sha === selectedCommit.sha;
                    return (
                      <button
                        key={row.commit.sha}
                        type="button"
                        className={`primer-snippet-row-btn ${
                          isCur ? "primer-snippet-row-selected" : ""
                        }`}
                        style={{ padding: "4px 8px" }}
                        onClick={() => selectCommit(row.commit.sha)}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono-stack)",
                                fontSize: 10.5,
                                color: "var(--fg-muted)",
                              }}
                            >
                              {row.commit.sha.slice(0, 8)}
                            </span>
                            {branchName && (
                              <span className="primer-label primer-label-accent">
                                {branchName}
                              </span>
                            )}
                            {ann?.tagLabel && (
                              <span
                                className={`primer-label primer-label-${ann.colorTone}`}
                              >
                                {ann.tagLabel}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 10.5,
                              marginTop: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.commit.subject}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Base Boundary Commit(s) where Cluster Forked Off */}
            {unmergedCluster.baseBoundaryRows.length > 0 && (
              <div>
                <div
                  className="primer-action-list-header"
                  style={{ paddingLeft: 0 }}
                >
                  Forked From Base / Merged Commit (
                  {unmergedCluster.baseBoundaryRows.length})
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    marginTop: 3,
                  }}
                >
                  {unmergedCluster.baseBoundaryRows.map((row) => (
                    <button
                      key={row.commit.sha}
                      type="button"
                      className="primer-snippet-row-btn"
                      style={{ padding: "4px 8px" }}
                      onClick={() => selectCommit(row.commit.sha)}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "var(--font-mono-stack)",
                            fontSize: 10.5,
                            color: "var(--fg-accent)",
                          }}
                        >
                          {row.divergenceKind === "mainline"
                            ? `{${row.commit.sha.slice(0, 8)}}`
                            : row.commit.sha.slice(0, 8)}{" "}
                          <span className="primer-label primer-label-neutral">
                            {row.divergenceKind.toUpperCase()}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            color: "var(--fg-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.commit.subject}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guarded Detached Checkout Card */}
      <div className="primer-box">
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              minWidth: 0,
            }}
          >
            <Play size={13} style={{ flexShrink: 0 }} />
            <span>Detached State &amp; Submodule Sync</span>
          </span>
          {isCurrentHead && (
            <span className="primer-label primer-label-success">
              ACTIVE HEAD
            </span>
          )}
        </div>
        <div
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--fg-muted)",
              lineHeight: 1.45,
              wordBreak: "break-word",
            }}
          >
            Synchronizes the entire repository and all submodules (
            <code>git checkout --detach</code> +{" "}
            <code>git submodule update --init --recursive --checkout</code>)
            without creating any local branch.
          </div>

          {!isWorktreeClean && (
            <div
              className="primer-banner primer-banner-warning"
              style={{ padding: "8px 10px" }}
            >
              <div className="primer-banner-main">
                <div className="primer-banner-icon">
                  <ShieldAlert size={15} />
                </div>
                <div className="primer-banner-content">
                  <div className="primer-banner-title">
                    Working Tree Dirty - Checkout Intercepted
                  </div>
                  <div className="primer-banner-description">
                    {snapshot.workingTreeStatus.summaryMessage}
                  </div>
                  {snapshot.workingTreeStatus.mainRepoDirtyFiles.length > 0 && (
                    <div
                      style={{
                        marginTop: 4,
                        fontFamily: "var(--font-mono-stack)",
                        fontSize: 10.5,
                        color: "var(--fg-danger)",
                        wordBreak: "break-all",
                      }}
                    >
                      Main dirty:{" "}
                      {snapshot.workingTreeStatus.mainRepoDirtyFiles
                        .slice(0, 4)
                        .join(", ")}
                    </div>
                  )}
                  {snapshot.workingTreeStatus.dirtySubmodules.length > 0 && (
                    <div
                      style={{
                        marginTop: 2,
                        fontFamily: "var(--font-mono-stack)",
                        fontSize: 10.5,
                        color: "var(--fg-danger)",
                        wordBreak: "break-all",
                      }}
                    >
                      Dirty submodules:{" "}
                      {snapshot.workingTreeStatus.dirtySubmodules.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {lastCheckoutOutcome && (
            <div
              className={`primer-banner ${
                lastCheckoutOutcome.success
                  ? "primer-banner-info"
                  : "primer-banner-warning"
              }`}
              style={{ padding: "8px 10px" }}
            >
              <div className="primer-banner-main">
                <div className="primer-banner-icon">
                  {lastCheckoutOutcome.success ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <ShieldAlert size={15} />
                  )}
                </div>
                <div className="primer-banner-content">
                  <div className="primer-banner-description">
                    {lastCheckoutOutcome.message}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: 6,
            }}
          >
            <button
              type="button"
              className="primer-btn primer-btn-primary"
              style={{ flex: "1 1 135px" }}
              disabled={isLoading || isCurrentHead || !isWorktreeClean}
              onClick={() => void runDetachedCheckout(selectedCommit.sha)}
            >
              <Play size={12} />
              <span>
                {isCurrentHead
                  ? "Already at This Commit"
                  : `Checkout ${selectedCommit.sha.slice(
                      0,
                      8
                    )} + Sync Submodules`}
              </span>
            </button>
            <button
              type="button"
              className="primer-btn"
              style={{ flex: "1 1 95px" }}
              onClick={() =>
                void updateLocalBaseRef(
                  selectedCommit.refs[0]?.replace(/^HEAD -> /, "") ??
                    selectedCommit.sha
                )
              }
              title="Pin this commit or its branch as the Local Visual Base spine"
            >
              <Anchor size={12} />
              <span>Set as Base</span>
            </button>
          </div>
        </div>
      </div>

      {/* Commit Details, Description & Merge Lineage */}
      <div className="primer-box">
        <div
          className="primer-box-header"
          style={{ padding: "7px 10px", fontSize: 11.5 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              minWidth: 0,
            }}
          >
            <GitCommit size={13} style={{ flexShrink: 0 }} />
            <span>Commit Message &amp; Metadata</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono-stack)",
              fontSize: 11,
              color: "var(--fg-accent)",
            }}
          >
            {selectedRow?.divergenceKind === "mainline"
              ? `{${selectedCommit.sha.slice(0, 8)}}`
              : selectedCommit.sha.slice(0, 8)}
          </span>
        </div>
        <div
          className="primer-box-body"
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 1.45,
              wordBreak: "break-word",
            }}
          >
            {selectedCommit.subject}
          </div>

          {selectedCommit.body && selectedCommit.body.trim().length > 0 && (
            <pre
              className="primer-readonly-field"
              style={{
                margin: 0,
                padding: "8px 10px",
                maxHeight: 180,
                overflowY: "auto",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                fontFamily: "var(--font-mono-stack)",
                fontSize: 11,
                lineHeight: 1.45,
                color: "var(--fg-muted)",
              }}
            >
              {selectedCommit.body}
            </pre>
          )}

          <div
            className="primer-readonly-field"
            style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10.5 }}
          >
            {selectedCommit.sha}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "72px minmax(0, 1fr)",
              rowGap: 4,
              columnGap: 6,
              fontSize: 11,
              wordBreak: "break-word",
            }}
          >
            <span style={{ color: "var(--fg-muted)" }}>Author:</span>
            <span>{selectedCommit.authorName}</span>
            <span style={{ color: "var(--fg-muted)" }}>Timestamp:</span>
            <span style={{ fontFamily: "var(--font-mono-stack)" }}>
              {formatRelativeOrShortTime(
                selectedCommit.timestamp,
                timezoneMode
              )}{" "}
              ({formatTimezoneBadgeLabel(timezoneMode)})
            </span>
            <span style={{ color: "var(--fg-muted)" }}>Role:</span>
            <span style={{ fontWeight: 600, fontSize: 10.5 }}>
              {formatDivergenceDescription(selectedRow?.divergenceKind)}
            </span>
          </div>

          {/* Parents (Who is merging with whom) */}
          <div>
            <div
              className="primer-action-list-header"
              style={{ paddingLeft: 0 }}
            >
              <GitMerge
                size={11}
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              Parent Lineage ({selectedCommit.parents.length})
            </div>
            {selectedCommit.parents.length === 0 ? (
              <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
                Root / Orphan Initial Commit (0 parents)
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 4,
                }}
              >
                {selectedCommit.parents.map((pSha, idx) => {
                  const parentNode = snapshot.commits.find(
                    (c) => c.sha === pSha
                  );
                  return (
                    <button
                      key={pSha}
                      type="button"
                      className="primer-snippet-row-btn"
                      style={{ padding: "5px 8px" }}
                      onClick={() => selectCommit(pSha)}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <span
                            className={`primer-label ${
                              idx === 0
                                ? "primer-label-accent"
                                : "primer-label-done"
                            }`}
                          >
                            {idx === 0
                              ? "Base Parent #1"
                              : `Merged Parent #${idx + 1}`}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-mono-stack)",
                              fontSize: 11,
                              color: "var(--fg-muted)",
                            }}
                          >
                            {pSha.slice(0, 8)}
                          </span>
                        </div>
                        {parentNode && (
                          <div
                            style={{
                              fontSize: 11,
                              marginTop: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {parentNode.subject}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Children (Branches/Commits that built upon or merged this commit) */}
          {selectedRow && selectedRow.childShas.length > 0 && (
            <div>
              <div
                className="primer-action-list-header"
                style={{ paddingLeft: 0 }}
              >
                Direct Children / Branched &amp; Merged Into (
                {selectedRow.childShas.length})
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 4,
                }}
              >
                {selectedRow.childShas.map((cSha) => {
                  const childNode = snapshot.commits.find(
                    (c) => c.sha === cSha
                  );
                  const isSecondParentMerge =
                    childNode &&
                    childNode.parents.length > 1 &&
                    childNode.parents.indexOf(selectedCommit.sha) > 0;
                  return (
                    <button
                      key={cSha}
                      type="button"
                      className="primer-snippet-row-btn"
                      style={{ padding: "5px 8px" }}
                      onClick={() => selectCommit(cSha)}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <span
                            className={`primer-label ${
                              isSecondParentMerge
                                ? "primer-label-sponsors"
                                : "primer-label-neutral"
                            }`}
                          >
                            {isSecondParentMerge
                              ? "Merged Into"
                              : "Forked Child"}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-mono-stack)",
                              fontSize: 11,
                              color: "var(--fg-muted)",
                            }}
                          >
                            {cSha.slice(0, 8)}
                          </span>
                        </div>
                        {childNode && (
                          <div
                            style={{
                              fontSize: 11,
                              marginTop: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {childNode.subject}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submodule Snapshot Pointers at This Commit */}
      {Object.keys(selectedCommit.submodulePointers).length > 0 && (
        <div className="primer-box">
          <div
            className="primer-box-header"
            style={{ padding: "7px 10px", fontSize: 11.5 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                minWidth: 0,
              }}
            >
              <Box size={13} style={{ flexShrink: 0 }} />
              <span>
                Submodule Pointers at {selectedCommit.sha.slice(0, 8)}
              </span>
            </span>
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
            {Object.entries(selectedCommit.submodulePointers).map(
              ([subPath, subSha]) => {
                const isModifiedHere =
                  selectedCommit.changedSubmodules.includes(subPath);
                const fullSubPath = resolveSubmoduleFullPath(subPath);
                return (
                  <div
                    key={subPath}
                    style={{
                      padding: "7px 8px",
                      borderRadius: 6,
                      border: "1px solid var(--border-default)",
                      backgroundColor: "var(--bg-canvas-subtle)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 11.5,
                          fontFamily: "var(--font-mono-stack)",
                          wordBreak: "break-all",
                        }}
                      >
                        {subPath}
                      </span>
                      {isModifiedHere && (
                        <span className="primer-label primer-label-attention">
                          Bumped in Commit
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono-stack)",
                        fontSize: 10.5,
                        color: "var(--fg-accent)",
                        wordBreak: "break-all",
                      }}
                    >
                      {subSha}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "stretch",
                        gap: 5,
                      }}
                    >
                      <button
                        type="button"
                        className="primer-btn primer-card-action-btn"
                        style={{ flex: "1 1 115px" }}
                        onClick={() =>
                          void loadRepositoryByPath(fullSubPath, true)
                        }
                      >
                        <ExternalLink size={11} />
                        <span>Open Submodule Graph</span>
                      </button>
                      <button
                        type="button"
                        className="primer-btn primer-card-action-btn"
                        style={{ flex: "1 1 95px" }}
                        onClick={() => void openDirectoryInOs(fullSubPath)}
                      >
                        <FolderOpen size={11} />
                        <span>Reveal Folder</span>
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

