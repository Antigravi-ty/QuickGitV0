import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  GitCommit,
  GitMerge,
  Play,
  ShieldAlert,
  Tag,
} from "lucide-react";
import { ANNOTATION_TONE_OPTIONS } from "../config/demoRepositorySnapshot";
import { openDirectoryInOs } from "../services/tauriGitClient";
import { useRepositoryStore } from "../stores/repositoryStore";
import { AnnotationTone, CommitDivergenceKind } from "../types/gitTypes";
import { formatRelativeOrShortTime } from "../utils/formatters";

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

export const RightCommitInspector: React.FC = () => {
  const workspaceMeta = useRepositoryStore((s) => s.workspaceMeta);
  const snapshot = useRepositoryStore((s) => s.snapshot);
  const layout = useRepositoryStore((s) => s.layout);
  const selectedCommitSha = useRepositoryStore((s) => s.selectedCommitSha);
  const isLoading = useRepositoryStore((s) => s.isLoading);
  const lastCheckoutOutcome = useRepositoryStore((s) => s.lastCheckoutOutcome);
  const selectCommit = useRepositoryStore((s) => s.selectCommit);
  const updateLocalBaseRef = useRepositoryStore((s) => s.updateLocalBaseRef);
  const updateCommitAnnotation = useRepositoryStore(
    (s) => s.updateCommitAnnotation
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

  const existingAnnotation =
    (snapshot &&
      selectedCommit &&
      workspaceMeta.repositories[snapshot.repoPath]?.commitAnnotations[
        selectedCommit.sha
      ]) ||
    null;

  const [tagLabel, setTagLabel] = useState("");
  const [colorTone, setColorTone] = useState<AnnotationTone>("accent");
  const [note, setNote] = useState("");
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setTagLabel(existingAnnotation?.tagLabel ?? "");
    setColorTone(existingAnnotation?.colorTone ?? "accent");
    setNote(existingAnnotation?.note ?? "");
    setSavedNotice(false);
  }, [
    selectedCommit?.sha,
    existingAnnotation?.tagLabel,
    existingAnnotation?.colorTone,
    existingAnnotation?.note,
  ]);

  if (!snapshot || !selectedCommit) {
    return (
      <div style={{ padding: 16, color: "var(--fg-muted)", fontSize: 12 }}>
        Select a commit node in the topology graph to inspect its full commit
        description, merge parents, submodule state, and detached checkout
        controls.
      </div>
    );
  }

  const isCurrentHead = selectedCommit.sha === snapshot.headSha;
  const isWorktreeClean = snapshot.workingTreeStatus.isClean;

  const handleSaveAnnotation = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: tagLabel.trim(),
      colorTone,
      note: note.trim(),
    });
    setSavedNotice(true);
  };

  const handleClearAnnotation = async () => {
    setTagLabel("");
    setNote("");
    await updateCommitAnnotation({
      commitSha: selectedCommit.sha,
      tagLabel: "",
      colorTone: "accent",
      note: "",
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
                  : `Checkout ${selectedCommit.shortSha} + Sync Submodules`}
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
            {selectedCommit.shortSha}
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
              {formatRelativeOrShortTime(selectedCommit.timestamp)} UTC
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
              <span>Submodule Pointers at {selectedCommit.shortSha}</span>
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

      {/* Local-Only Tag & Note Editor */}
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
            <span>Local Commit Tag &amp; Note (Local-Only)</span>
          </span>
          {savedNotice && (
            <span className="primer-label primer-label-success">Saved</span>
          )}
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
          <input
            type="text"
            className="primer-input"
            placeholder="Tag label (e.g. Stable Audio Baseline, UI Tuner Sync)"
            value={tagLabel}
            onChange={(e) => {
              setTagLabel(e.target.value);
              setSavedNotice(false);
            }}
            style={{ fontSize: 11.5 }}
          />

          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {ANNOTATION_TONE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`primer-label primer-label-${opt.id}`}
                style={{
                  cursor: "pointer",
                  padding: "3px 8px",
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
            rows={3}
            placeholder="Local inspection notes (stored in OS AppData JSON, never pushed to Git)..."
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
              Save Local Tag
            </button>
            {existingAnnotation && (
              <button
                type="button"
                className="primer-btn primer-btn-danger"
                style={{ flex: "1 1 70px" }}
                onClick={() => void handleClearAnnotation()}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
