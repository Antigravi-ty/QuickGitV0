export type CommitDivergenceKind =
  | "mainline"
  | "unmerged_tip"
  | "diverged"
  | "merged"
  | "orphan_disconnected";

export type AnnotationTone =
  | "accent"
  | "success"
  | "attention"
  | "danger"
  | "done"
  | "sponsors";

export interface GitBranchRef {
  name: string;
  fullRef: string;
  commitSha: string;
  isRemote: boolean;
  isTag: boolean;
  isHead: boolean;
  timestamp: number;
  subject: string;
}

export interface SubmoduleConfigEntry {
  name: string;
  path: string;
  url: string;
  branch: string | null;
  currentWorktreeSha: string | null;
  isDirty: boolean;
}

export interface GitCommitNode {
  sha: string;
  shortSha: string;
  parents: string[];
  authorName: string;
  authorEmail: string;
  timestamp: number;
  subject: string;
  refs: string[];
  submodulePointers: Record<string, string>;
  changedSubmodules: string[];
}

export interface WorkingTreeGuardStatus {
  isClean: boolean;
  mainRepoDirtyFiles: string[];
  dirtySubmodules: string[];
  summaryMessage: string;
}

export interface RepositorySnapshot {
  repoPath: string;
  repoName: string;
  headSha: string;
  headRefName: string | null;
  isDetachedHead: boolean;
  branches: GitBranchRef[];
  submodules: SubmoduleConfigEntry[];
  commits: GitCommitNode[];
  workingTreeStatus: WorkingTreeGuardStatus;
}

export interface DetachedCheckoutOutcome {
  success: boolean;
  blockedByDirtyState: boolean;
  targetSha: string;
  message: string;
  syncedSubmodules: string[];
  workingTreeStatus: WorkingTreeGuardStatus;
}

export interface LocalCommitAnnotation {
  commitSha: string;
  tagLabel: string;
  colorTone: AnnotationTone;
  note: string;
  updatedAt: number;
}

export interface RepositoryLocalMetadata {
  repoPath: string;
  localBaseRef: string | null;
  orphanHorizonCommitLimit: number;
  showArchivedOrphanTrees: boolean;
  commitAnnotations: Record<string, LocalCommitAnnotation>;
}

export interface AppWorkspaceMetadata {
  recentRepositories: string[];
  activeRepositoryPath: string | null;
  repositories: Record<string, RepositoryLocalMetadata>;
}

export interface OrphanTreeComponent {
  componentId: string;
  rootCommitShas: string[];
  commitShas: string[];
  commitCount: number;
  latestTimestamp: number;
  latestSubject: string;
  sampleRefs: string[];
  visibleByHorizon: boolean;
}

export interface BranchClassificationSummary {
  branch: GitBranchRef;
  category: "base" | "unmerged_tip" | "merged" | "orphan_disconnected";
  aheadCount: number;
}

export interface GraphEdgeSegment {
  fromSha: string;
  toSha: string;
  fromRow: number;
  toRow: number;
  fromLane: number;
  toLane: number;
  colorIndex: number;
  isMergeEdge: boolean;
  mergeParentIndex: number;
}

export interface PositionedCommitRow {
  commit: GitCommitNode;
  rowIndex: number;
  laneIndex: number;
  colorIndex: number;
  divergenceKind: CommitDivergenceKind;
  isTipCommit: boolean;
  isMergeCommit: boolean;
  isMultiMergeTarget: boolean;
  mergedIntoCount: number;
  childShas: string[];
  mergeSourceLabels: string[];
  componentId: string;
}

export interface ComputedTopologyLayout {
  rows: PositionedCommitRow[];
  edges: GraphEdgeSegment[];
  maxLaneCount: number;
  resolvedBaseRefName: string | null;
  resolvedBaseSha: string | null;
  orphanComponents: OrphanTreeComponent[];
  hiddenOrphanCommitCount: number;
  hiddenOrphanTreeCount: number;
  branchSummaries: BranchClassificationSummary[];
}
