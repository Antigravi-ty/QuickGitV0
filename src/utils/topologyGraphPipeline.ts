import {
  BranchClassificationSummary,
  CommitDivergenceKind,
  ComputedTopologyLayout,
  GitBranchRef,
  GitCommitNode,
  GraphEdgeSegment,
  OrphanTreeComponent,
  PositionedCommitRow,
  RepositorySnapshot,
} from "../types/gitTypes";
import { stripRemotePrefix } from "./formatters";

export interface LayoutComputeInput {
  snapshot: RepositorySnapshot;
  localBaseRef: string | null;
  orphanHorizonCommitLimit: number;
  showArchivedOrphanTrees: boolean;
  includeLocalStaleBranches?: boolean;
  searchQuery: string;
  filterCategory:
    | "all"
    | "mainline"
    | "unmerged_tip"
    | "multi_merged"
    | "submodule_bump";
  focusedSubmodulePath: string | null;
}

interface ActiveLaneSlot {
  targetSha: string | null;
  reservedUntilRow: number;
  colorIndex: number;
  isContinuationTarget: boolean;
}

interface PendingEdgeRecord {
  fromSha: string;
  toSha: string;
  fromRow: number;
  toRow: number;
  fromLane: number;
  viaLane: number;
  colorIndex: number;
  isMergeEdge: boolean;
  mergeParentIndex: number;
}

function buildUndirectedComponents(
  commits: readonly GitCommitNode[],
  horizonLimit: number
): {
  components: OrphanTreeComponent[];
  shaToComponentId: Map<string, string>;
  visibleComponentIds: Set<string>;
} {
  const shaToCommit = new Map<string, GitCommitNode>();
  const adjacency = new Map<string, Set<string>>();

  for (const commit of commits) {
    shaToCommit.set(commit.sha, commit);
    if (!adjacency.has(commit.sha)) {
      adjacency.set(commit.sha, new Set<string>());
    }
  }

  for (const commit of commits) {
    const neighbors = adjacency.get(commit.sha)!;
    for (const parentSha of commit.parents) {
      if (shaToCommit.has(parentSha)) {
        neighbors.add(parentSha);
        adjacency.get(parentSha)?.add(commit.sha);
      }
    }
  }

  const visited = new Set<string>();
  const rawComponents: OrphanTreeComponent[] = [];

  for (const commit of commits) {
    if (visited.has(commit.sha)) {
      continue;
    }
    const queue: string[] = [commit.sha];
    visited.add(commit.sha);
    const componentShas: string[] = [];
    const rootCommitShas: string[] = [];
    const sampleRefs: string[] = [];
    let latestTimestamp = 0;
    let latestSubject = commit.subject;

    while (queue.length > 0) {
      const currentSha = queue.shift()!;
      componentShas.push(currentSha);
      const node = shaToCommit.get(currentSha)!;
      if (node.timestamp >= latestTimestamp) {
        latestTimestamp = node.timestamp;
        latestSubject = node.subject;
      }
      const inRepoParents = node.parents.filter((p) => shaToCommit.has(p));
      if (inRepoParents.length === 0) {
        rootCommitShas.push(currentSha);
      }
      for (const r of node.refs) {
        if (sampleRefs.length < 4 && !sampleRefs.includes(r)) {
          sampleRefs.push(r);
        }
      }
      const nextSet = adjacency.get(currentSha);
      if (nextSet) {
        for (const neighborSha of nextSet) {
          if (!visited.has(neighborSha)) {
            visited.add(neighborSha);
            queue.push(neighborSha);
          }
        }
      }
    }

    rawComponents.push({
      componentId: rootCommitShas[0] ?? componentShas[0],
      rootCommitShas,
      commitShas: componentShas,
      commitCount: componentShas.length,
      latestTimestamp,
      latestSubject,
      sampleRefs,
      visibleByHorizon: false,
    });
  }

  rawComponents.sort((a, b) => b.latestTimestamp - a.latestTimestamp);

  let accumulatedCommits = 0;
  const visibleComponentIds = new Set<string>();
  const shaToComponentId = new Map<string, string>();

  for (let i = 0; i < rawComponents.length; i++) {
    const comp = rawComponents[i];
    const shouldShow =
      i === 0 || accumulatedCommits < Math.max(1, horizonLimit);
    comp.visibleByHorizon = shouldShow;
    if (shouldShow) {
      visibleComponentIds.add(comp.componentId);
    }
    accumulatedCommits += comp.commitCount;
    for (const sha of comp.commitShas) {
      shaToComponentId.set(sha, comp.componentId);
    }
  }

  return {
    components: rawComponents,
    shaToComponentId,
    visibleComponentIds,
  };
}

function resolveBaseTarget(
  snapshot: RepositorySnapshot,
  localBaseRef: string | null
): { baseRefName: string | null; baseSha: string | null } {
  const commitSet = new Set(snapshot.commits.map((c) => c.sha));
  if (localBaseRef) {
    const trimmed = localBaseRef.trim();
    const stripped = stripRemotePrefix(trimmed);
    const matchedBranch = snapshot.branches.find(
      (b) =>
        b.name === trimmed ||
        b.fullRef === trimmed ||
        stripRemotePrefix(b.name) === stripped
    );
    if (matchedBranch && commitSet.has(matchedBranch.commitSha)) {
      return {
        baseRefName: matchedBranch.name,
        baseSha: matchedBranch.commitSha,
      };
    }
    if (commitSet.has(trimmed)) {
      return { baseRefName: trimmed.slice(0, 8), baseSha: trimmed };
    }
  }

  if (snapshot.headRefName) {
    const strippedHead = stripRemotePrefix(snapshot.headRefName);
    const headBranch = snapshot.branches.find(
      (b) =>
        b.name === snapshot.headRefName ||
        stripRemotePrefix(b.name) === strippedHead
    );
    if (headBranch && commitSet.has(headBranch.commitSha)) {
      return {
        baseRefName: headBranch.name,
        baseSha: headBranch.commitSha,
      };
    }
  }

  if (commitSet.has(snapshot.headSha)) {
    return {
      baseRefName: snapshot.headRefName ?? "HEAD",
      baseSha: snapshot.headSha,
    };
  }

  const firstLiveBranch =
    snapshot.branches.find((b) => b.isOnRemoteOrigin !== false) ??
    snapshot.branches[0];
  if (firstLiveBranch && commitSet.has(firstLiveBranch.commitSha)) {
    return {
      baseRefName: firstLiveBranch.name,
      baseSha: firstLiveBranch.commitSha,
    };
  }

  const firstCommit = snapshot.commits[0];
  return {
    baseRefName: firstCommit ? firstCommit.shortSha : null,
    baseSha: firstCommit ? firstCommit.sha : null,
  };
}

function computeAncestorSet(
  startSha: string | null,
  shaToCommit: Map<string, GitCommitNode>,
  firstParentOnly: boolean
): Set<string> {
  const result = new Set<string>();
  if (!startSha || !shaToCommit.has(startSha)) {
    return result;
  }
  const queue: string[] = [startSha];
  result.add(startSha);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const node = shaToCommit.get(current);
    if (!node) {
      continue;
    }
    const parents = firstParentOnly ? node.parents.slice(0, 1) : node.parents;
    for (const parentSha of parents) {
      if (shaToCommit.has(parentSha) && !result.has(parentSha)) {
        result.add(parentSha);
        queue.push(parentSha);
      }
    }
  }
  return result;
}

function computeMultiRootReachableSet(
  seedShas: Iterable<string>,
  shaToCommit: Map<string, GitCommitNode>
): Set<string> {
  const result = new Set<string>();
  const queue: string[] = [];
  for (const sha of seedShas) {
    if (sha && shaToCommit.has(sha) && !result.has(sha)) {
      result.add(sha);
      queue.push(sha);
    }
  }
  while (queue.length > 0) {
    const cur = queue.shift()!;
    const node = shaToCommit.get(cur);
    if (!node) {
      continue;
    }
    for (const p of node.parents) {
      if (shaToCommit.has(p) && !result.has(p)) {
        result.add(p);
        queue.push(p);
      }
    }
  }
  return result;
}

export function computeTopologyLayout(
  input: LayoutComputeInput
): ComputedTopologyLayout {
  const {
    snapshot,
    localBaseRef,
    orphanHorizonCommitLimit,
    showArchivedOrphanTrees,
    includeLocalStaleBranches = false,
    searchQuery,
  } = input;

  const shaToCommit = new Map<string, GitCommitNode>();
  for (const commit of snapshot.commits) {
    shaToCommit.set(commit.sha, commit);
  }

  const { baseRefName, baseSha } = resolveBaseTarget(snapshot, localBaseRef);

  const liveSeedShas: string[] = [];
  if (baseSha) {
    liveSeedShas.push(baseSha);
  }
  if (snapshot.headSha) {
    liveSeedShas.push(snapshot.headSha);
  }
  for (const branch of snapshot.branches) {
    if (branch.isOnRemoteOrigin !== false || branch.isHead) {
      liveSeedShas.push(branch.commitSha);
    }
  }
  const liveOriginReachableSet = computeMultiRootReachableSet(
    liveSeedShas,
    shaToCommit
  );

  let hiddenStaleCommitCount = 0;
  const candidateCommits = snapshot.commits.filter((commit) => {
    if (
      !includeLocalStaleBranches &&
      snapshot.remoteSyncAvailable &&
      liveOriginReachableSet.size > 0 &&
      !liveOriginReachableSet.has(commit.sha)
    ) {
      hiddenStaleCommitCount++;
      return false;
    }
    return true;
  });

  const { components, shaToComponentId, visibleComponentIds } =
    buildUndirectedComponents(candidateCommits, orphanHorizonCommitLimit);

  const baseComponentId = baseSha ? shaToComponentId.get(baseSha) ?? null : null;

  const mainlineSpineSet = computeAncestorSet(baseSha, shaToCommit, true);
  const baseReachableSet = computeAncestorSet(baseSha, shaToCommit, false);

  const shaToRefLabels = new Map<string, string[]>();
  for (const branch of snapshot.branches) {
    const list = shaToRefLabels.get(branch.commitSha) ?? [];
    if (!list.includes(branch.name)) {
      list.push(branch.name);
    }
    shaToRefLabels.set(branch.commitSha, list);
  }

  const strippedBaseRefName = baseRefName ? stripRemotePrefix(baseRefName) : null;

  const branchSummaries: BranchClassificationSummary[] = snapshot.branches.map(
    (branch: GitBranchRef) => {
      const isOnRemoteOrigin = branch.isOnRemoteOrigin !== false;
      const isMatchingBase =
        branch.name === baseRefName ||
        (strippedBaseRefName !== null &&
          stripRemotePrefix(branch.name) === strippedBaseRefName) ||
        (baseSha !== null &&
          branch.commitSha === baseSha &&
          branch.name === baseRefName);

      if (isMatchingBase) {
        return {
          branch,
          category: "base",
          aheadCount: 0,
          isOnRemoteOrigin,
        };
      }

      if (!isOnRemoteOrigin && snapshot.remoteSyncAvailable) {
        return {
          branch,
          category: "local_stale",
          aheadCount: 0,
          isOnRemoteOrigin: false,
        };
      }

      const compId = shaToComponentId.get(branch.commitSha);
      if (baseComponentId && compId && compId !== baseComponentId) {
        return {
          branch,
          category: "orphan_disconnected",
          aheadCount: 0,
          isOnRemoteOrigin,
        };
      }

      if (baseReachableSet.has(branch.commitSha)) {
        return {
          branch,
          category: "merged",
          aheadCount: 0,
          isOnRemoteOrigin,
        };
      }

      let aheadCount = 0;
      const visited = new Set<string>([branch.commitSha]);
      const queue: string[] = [branch.commitSha];
      while (queue.length > 0 && aheadCount < 250) {
        const cur = queue.shift()!;
        if (baseReachableSet.has(cur)) {
          continue;
        }
        aheadCount++;
        const node = shaToCommit.get(cur);
        if (node) {
          for (const p of node.parents) {
            if (!visited.has(p) && shaToCommit.has(p)) {
              visited.add(p);
              queue.push(p);
            }
          }
        }
      }
      return {
        branch,
        category: "unmerged_tip",
        aheadCount,
        isOnRemoteOrigin,
      };
    }
  );

  let hiddenOrphanCommitCount = 0;
  let hiddenOrphanTreeCount = 0;
  for (const comp of components) {
    if (!comp.visibleByHorizon) {
      hiddenOrphanTreeCount++;
      hiddenOrphanCommitCount += comp.commitCount;
    }
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleCommits = candidateCommits.filter((commit) => {
    const compId = shaToComponentId.get(commit.sha) ?? "";
    if (!showArchivedOrphanTrees && !visibleComponentIds.has(compId)) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const haystacks = [
        commit.sha,
        commit.shortSha,
        commit.subject,
        commit.authorName,
        ...commit.refs,
        ...(commit.staleRefs ?? []),
        ...Object.values(commit.submodulePointers),
      ];
      const matched = haystacks.some((h) =>
        h.toLowerCase().includes(normalizedQuery)
      );
      if (!matched) {
        return false;
      }
    }

    return true;
  });

  const visibleRowBySha = new Map<string, number>();
  visibleCommits.forEach((c, idx) => visibleRowBySha.set(c.sha, idx));

  const childrenMap = new Map<string, string[]>();
  const mergeChildrenCountMap = new Map<string, number>();

  for (const commit of visibleCommits) {
    if (!childrenMap.has(commit.sha)) {
      childrenMap.set(commit.sha, []);
    }
    for (let pIdx = 0; pIdx < commit.parents.length; pIdx++) {
      const parentSha = commit.parents[pIdx];
      if (!visibleRowBySha.has(parentSha)) {
        continue;
      }
      if (!childrenMap.has(parentSha)) {
        childrenMap.set(parentSha, []);
      }
      childrenMap.get(parentSha)!.push(commit.sha);
      if (commit.parents.length > 1 && pIdx > 0) {
        mergeChildrenCountMap.set(
          parentSha,
          (mergeChildrenCountMap.get(parentSha) ?? 0) + 1
        );
      }
    }
  }

  const activeLanes: ActiveLaneSlot[] = [
    {
      targetSha: null,
      reservedUntilRow: -1,
      colorIndex: 0,
      isContinuationTarget: false,
    },
  ];

  let nextForkColorSeed = 1;
  const allocateNextForkColor = (): number => {
    const color = nextForkColorSeed;
    nextForkColorSeed = (nextForkColorSeed % 13) + 1;
    return color;
  };

  const findOrCreateFreeLane = (currentRow: number): number => {
    for (let l = 1; l < activeLanes.length; l++) {
      if (activeLanes[l].reservedUntilRow < currentRow) {
        return l;
      }
    }
    const newIndex = activeLanes.length;
    activeLanes.push({
      targetSha: null,
      reservedUntilRow: -1,
      colorIndex: 1,
      isContinuationTarget: false,
    });
    return newIndex;
  };

  let maxLaneCount = 1;
  const rows: PositionedCommitRow[] = [];
  const pendingEdges: PendingEdgeRecord[] = [];

  for (let rowIndex = 0; rowIndex < visibleCommits.length; rowIndex++) {
    for (let l = 1; l < activeLanes.length; l++) {
      if (activeLanes[l].reservedUntilRow < rowIndex) {
        activeLanes[l].targetSha = null;
        activeLanes[l].reservedUntilRow = -1;
        activeLanes[l].isContinuationTarget = false;
      }
    }

    const commit = visibleCommits[rowIndex];
    const isMainline = mainlineSpineSet.has(commit.sha);
    const isReachableFromBase = baseReachableSet.has(commit.sha);
    const compId = shaToComponentId.get(commit.sha) ?? "";
    const isDisconnectedOrphan =
      Boolean(baseComponentId) && compId !== baseComponentId;

    const children = childrenMap.get(commit.sha) ?? [];
    const isTipCommit = children.length === 0;
    const mergedIntoCount = mergeChildrenCountMap.get(commit.sha) ?? 0;

    let divergenceKind: CommitDivergenceKind = "diverged";
    if (isDisconnectedOrphan) {
      divergenceKind = "orphan_disconnected";
    } else if (isMainline) {
      divergenceKind = "mainline";
    } else if (isReachableFromBase) {
      divergenceKind = "merged";
    } else if (isTipCommit) {
      divergenceKind = "unmerged_tip";
    }

    let assignedLane = 0;
    let assignedColor = 0;

    if (isMainline) {
      assignedLane = 0;
      assignedColor = 0;
      activeLanes[0].targetSha = null;
      activeLanes[0].reservedUntilRow = -1;
    } else {
      let continuationLane = -1;
      for (let l = 1; l < activeLanes.length; l++) {
        if (
          activeLanes[l].isContinuationTarget &&
          activeLanes[l].targetSha === commit.sha
        ) {
          if (continuationLane === -1) {
            continuationLane = l;
          } else {
            activeLanes[l].targetSha = null;
            activeLanes[l].reservedUntilRow = -1;
            activeLanes[l].isContinuationTarget = false;
          }
        }
      }

      if (continuationLane !== -1) {
        assignedLane = continuationLane;
        assignedColor = activeLanes[continuationLane].colorIndex;
        activeLanes[continuationLane].targetSha = null;
        activeLanes[continuationLane].reservedUntilRow = -1;
        activeLanes[continuationLane].isContinuationTarget = false;
      } else {
        assignedLane = findOrCreateFreeLane(rowIndex);
        assignedColor = allocateNextForkColor();
        activeLanes[assignedLane] = {
          targetSha: null,
          reservedUntilRow: rowIndex,
          colorIndex: assignedColor,
          isContinuationTarget: false,
        };
      }
    }

    for (let pIdx = 0; pIdx < commit.parents.length; pIdx++) {
      const parentSha = commit.parents[pIdx];
      const parentRow = visibleRowBySha.get(parentSha);
      if (parentRow === undefined || parentRow <= rowIndex) {
        continue;
      }
      const isParentMainline = mainlineSpineSet.has(parentSha);

      if (pIdx === 0) {
        if (isParentMainline) {
          if (assignedLane === 0) {
            activeLanes[0] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: 0,
              isContinuationTarget: true,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: 0,
              viaLane: 0,
              colorIndex: 0,
              isMergeEdge: false,
              mergeParentIndex: 0,
            });
          } else {
            activeLanes[assignedLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: assignedColor,
              isContinuationTarget: false,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: assignedLane,
              colorIndex: assignedColor,
              isMergeEdge: false,
              mergeParentIndex: 0,
            });
          }
        } else {
          let existingContLane = -1;
          for (let l = 1; l < activeLanes.length; l++) {
            if (
              activeLanes[l].isContinuationTarget &&
              activeLanes[l].targetSha === parentSha
            ) {
              existingContLane = l;
              break;
            }
          }

          if (existingContLane === -1 && assignedLane !== 0) {
            activeLanes[assignedLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: assignedColor,
              isContinuationTarget: true,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: assignedLane,
              colorIndex: assignedColor,
              isMergeEdge: false,
              mergeParentIndex: 0,
            });
          } else if (existingContLane !== -1 && assignedLane !== 0) {
            activeLanes[assignedLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: assignedColor,
              isContinuationTarget: false,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: assignedLane,
              colorIndex: assignedColor,
              isMergeEdge: false,
              mergeParentIndex: 0,
            });
          } else {
            const branchLane = findOrCreateFreeLane(rowIndex);
            const branchColor = allocateNextForkColor();
            activeLanes[branchLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: branchColor,
              isContinuationTarget: existingContLane === -1,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: branchLane,
              colorIndex: branchColor,
              isMergeEdge: false,
              mergeParentIndex: 0,
            });
          }
        }
      } else {
        if (isParentMainline) {
          if (parentRow === rowIndex + 1) {
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: assignedLane,
              colorIndex: assignedColor,
              isMergeEdge: true,
              mergeParentIndex: pIdx,
            });
          } else {
            const mergeViaLane = findOrCreateFreeLane(rowIndex);
            const mergeColor = allocateNextForkColor();
            activeLanes[mergeViaLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: mergeColor,
              isContinuationTarget: false,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: mergeViaLane,
              colorIndex: mergeColor,
              isMergeEdge: true,
              mergeParentIndex: pIdx,
            });
          }
        } else {
          let existingContLane = -1;
          for (let l = 1; l < activeLanes.length; l++) {
            if (
              activeLanes[l].isContinuationTarget &&
              activeLanes[l].targetSha === parentSha
            ) {
              existingContLane = l;
              break;
            }
          }

          if (existingContLane === -1) {
            const mergeLane = findOrCreateFreeLane(rowIndex);
            const mergeColor = allocateNextForkColor();
            activeLanes[mergeLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: mergeColor,
              isContinuationTarget: true,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: mergeLane,
              colorIndex: mergeColor,
              isMergeEdge: true,
              mergeParentIndex: pIdx,
            });
          } else if (parentRow === rowIndex + 1) {
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: existingContLane,
              colorIndex: activeLanes[existingContLane].colorIndex,
              isMergeEdge: true,
              mergeParentIndex: pIdx,
            });
          } else {
            const mergeViaLane = findOrCreateFreeLane(rowIndex);
            const mergeColor = activeLanes[existingContLane].colorIndex;
            activeLanes[mergeViaLane] = {
              targetSha: parentSha,
              reservedUntilRow: parentRow,
              colorIndex: mergeColor,
              isContinuationTarget: false,
            };
            pendingEdges.push({
              fromSha: commit.sha,
              toSha: parentSha,
              fromRow: rowIndex,
              toRow: parentRow,
              fromLane: assignedLane,
              viaLane: mergeViaLane,
              colorIndex: mergeColor,
              isMergeEdge: true,
              mergeParentIndex: pIdx,
            });
          }
        }
      }
    }

    if (activeLanes.length > maxLaneCount) {
      maxLaneCount = activeLanes.length;
    }

    const mergeSourceLabels: string[] = [];
    if (commit.parents.length > 1) {
      for (let pIdx = 1; pIdx < commit.parents.length; pIdx++) {
        const pSha = commit.parents[pIdx];
        const refNames = shaToRefLabels.get(pSha);
        if (refNames && refNames.length > 0) {
          mergeSourceLabels.push(stripRemotePrefix(refNames[0]));
        } else {
          mergeSourceLabels.push(pSha.slice(0, 7));
        }
      }
    }

    rows.push({
      commit,
      rowIndex,
      laneIndex: assignedLane,
      colorIndex: assignedColor,
      divergenceKind,
      isTipCommit,
      isMergeCommit: commit.parents.length > 1,
      isMultiMergeTarget: mergedIntoCount >= 2,
      mergedIntoCount,
      childShas: children,
      mergeSourceLabels,
      componentId: compId,
    });
  }

  const edges: GraphEdgeSegment[] = pendingEdges.map((pe) => {
    const targetRow = rows[pe.toRow];
    const sourceRow = rows[pe.fromRow];
    const isMergedIntoBase =
      sourceRow.divergenceKind === "merged" ||
      (sourceRow.divergenceKind === "mainline" && pe.isMergeEdge);
    return {
      fromSha: pe.fromSha,
      toSha: pe.toSha,
      fromRow: pe.fromRow,
      toRow: pe.toRow,
      fromLane: pe.fromLane,
      toLane: targetRow ? targetRow.laneIndex : pe.viaLane,
      viaLane: pe.viaLane,
      colorIndex: pe.colorIndex,
      isMergeEdge: pe.isMergeEdge,
      mergeParentIndex: pe.mergeParentIndex,
      isMergedIntoBase,
    };
  });

  return {
    rows,
    edges,
    maxLaneCount: Math.max(1, maxLaneCount),
    resolvedBaseRefName: baseRefName,
    resolvedBaseSha: baseSha,
    orphanComponents: components,
    hiddenOrphanCommitCount,
    hiddenOrphanTreeCount,
    hiddenStaleCommitCount,
    branchSummaries,
  };
}
