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

export interface LayoutComputeInput {
  snapshot: RepositorySnapshot;
  localBaseRef: string | null;
  orphanHorizonCommitLimit: number;
  showArchivedOrphanTrees: boolean;
  searchQuery: string;
  filterCategory: "all" | "mainline" | "unmerged_tip" | "multi_merged" | "submodule_bump";
  focusedSubmodulePath: string | null;
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
    const matchedBranch = snapshot.branches.find(
      (b) => b.name === trimmed || b.fullRef === trimmed
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
    const headBranch = snapshot.branches.find(
      (b) => b.name === snapshot.headRefName
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

  const firstBranch = snapshot.branches[0];
  if (firstBranch && commitSet.has(firstBranch.commitSha)) {
    return {
      baseRefName: firstBranch.name,
      baseSha: firstBranch.commitSha,
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

export function computeTopologyLayout(
  input: LayoutComputeInput
): ComputedTopologyLayout {
  const {
    snapshot,
    localBaseRef,
    orphanHorizonCommitLimit,
    showArchivedOrphanTrees,
    searchQuery,
    filterCategory,
    focusedSubmodulePath,
  } = input;

  const shaToCommit = new Map<string, GitCommitNode>();
  for (const commit of snapshot.commits) {
    shaToCommit.set(commit.sha, commit);
  }

  const { components, shaToComponentId, visibleComponentIds } =
    buildUndirectedComponents(snapshot.commits, orphanHorizonCommitLimit);

  const { baseRefName, baseSha } = resolveBaseTarget(snapshot, localBaseRef);
  const baseComponentId = baseSha ? shaToComponentId.get(baseSha) ?? null : null;

  const mainlineSpineSet = computeAncestorSet(baseSha, shaToCommit, true);
  const baseReachableSet = computeAncestorSet(baseSha, shaToCommit, false);

  const childrenMap = new Map<string, string[]>();
  const mergeChildrenCountMap = new Map<string, number>();

  for (const commit of snapshot.commits) {
    if (!childrenMap.has(commit.sha)) {
      childrenMap.set(commit.sha, []);
    }
    for (let pIdx = 0; pIdx < commit.parents.length; pIdx++) {
      const parentSha = commit.parents[pIdx];
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

  const shaToRefLabels = new Map<string, string[]>();
  for (const branch of snapshot.branches) {
    const list = shaToRefLabels.get(branch.commitSha) ?? [];
    if (!list.includes(branch.name)) {
      list.push(branch.name);
    }
    shaToRefLabels.set(branch.commitSha, list);
  }

  const branchSummaries: BranchClassificationSummary[] = snapshot.branches.map(
    (branch: GitBranchRef) => {
      const compId = shaToComponentId.get(branch.commitSha);
      if (baseComponentId && compId && compId !== baseComponentId) {
        return {
          branch,
          category: "orphan_disconnected",
          aheadCount: 0,
        };
      }
      if (
        branch.name === baseRefName ||
        (baseSha && branch.commitSha === baseSha && branch.name === baseRefName)
      ) {
        return {
          branch,
          category: "base",
          aheadCount: 0,
        };
      }
      if (baseReachableSet.has(branch.commitSha)) {
        return {
          branch,
          category: "merged",
          aheadCount: 0,
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

  const visibleCommits = snapshot.commits.filter((commit) => {
    const compId = shaToComponentId.get(commit.sha) ?? "";
    if (!showArchivedOrphanTrees && !visibleComponentIds.has(compId)) {
      return false;
    }

    const children = childrenMap.get(commit.sha) ?? [];
    const isTip = children.length === 0;
    const isMainline = mainlineSpineSet.has(commit.sha);
    const isMerged = baseReachableSet.has(commit.sha);
    const mergedIntoCount = mergeChildrenCountMap.get(commit.sha) ?? 0;

    if (filterCategory === "mainline" && !isMainline) {
      return false;
    }
    if (filterCategory === "unmerged_tip" && (isMerged || !isTip)) {
      return false;
    }
    if (filterCategory === "multi_merged" && mergedIntoCount < 2 && commit.parents.length < 2) {
      return false;
    }
    if (filterCategory === "submodule_bump") {
      if (focusedSubmodulePath) {
        if (!commit.changedSubmodules.includes(focusedSubmodulePath)) {
          return false;
        }
      } else if (commit.changedSubmodules.length === 0) {
        return false;
      }
    }

    if (normalizedQuery.length > 0) {
      const haystacks = [
        commit.sha,
        commit.shortSha,
        commit.subject,
        commit.authorName,
        ...commit.refs,
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

  const activeLanes: (string | null)[] = [null];
  let maxLaneCount = 1;
  const rows: PositionedCommitRow[] = [];

  for (let rowIndex = 0; rowIndex < visibleCommits.length; rowIndex++) {
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

    let assignedLane = -1;
    if (isMainline) {
      assignedLane = 0;
      activeLanes[0] = null;
      for (let l = 1; l < activeLanes.length; l++) {
        if (activeLanes[l] === commit.sha) {
          activeLanes[l] = null;
        }
      }
    } else {
      for (let l = 1; l < activeLanes.length; l++) {
        if (activeLanes[l] === commit.sha) {
          if (assignedLane === -1) {
            assignedLane = l;
          } else {
            activeLanes[l] = null;
          }
        }
      }
      if (assignedLane === -1) {
        let freeLane = -1;
        for (let l = 1; l < activeLanes.length; l++) {
          if (activeLanes[l] === null) {
            freeLane = l;
            break;
          }
        }
        if (freeLane === -1) {
          freeLane = activeLanes.length;
          activeLanes.push(null);
        }
        assignedLane = freeLane;
      }
    }

    const firstParent = commit.parents[0];
    if (firstParent && visibleRowBySha.has(firstParent)) {
      if (mainlineSpineSet.has(firstParent)) {
        activeLanes[0] = firstParent;
        if (assignedLane !== 0) {
          activeLanes[assignedLane] = null;
        }
      } else {
        const alreadyTracked = activeLanes.indexOf(firstParent);
        if (alreadyTracked !== -1 && alreadyTracked !== assignedLane) {
          activeLanes[assignedLane] = null;
        } else {
          activeLanes[assignedLane] = firstParent;
        }
      }
    } else {
      activeLanes[assignedLane] = null;
    }

    for (let pIdx = 1; pIdx < commit.parents.length; pIdx++) {
      const mergeParentSha = commit.parents[pIdx];
      if (!visibleRowBySha.has(mergeParentSha)) {
        continue;
      }
      if (mainlineSpineSet.has(mergeParentSha)) {
        activeLanes[0] = mergeParentSha;
        continue;
      }
      if (!activeLanes.includes(mergeParentSha)) {
        let freeMergeLane = -1;
        for (let l = 1; l < activeLanes.length; l++) {
          if (activeLanes[l] === null) {
            freeMergeLane = l;
            break;
          }
        }
        if (freeMergeLane === -1) {
          freeMergeLane = activeLanes.length;
          activeLanes.push(mergeParentSha);
        } else {
          activeLanes[freeMergeLane] = mergeParentSha;
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
          mergeSourceLabels.push(refNames[0].replace(/^origin\//, ""));
        } else {
          mergeSourceLabels.push(pSha.slice(0, 7));
        }
      }
    }

    rows.push({
      commit,
      rowIndex,
      laneIndex: assignedLane,
      colorIndex: assignedLane,
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

  const edges: GraphEdgeSegment[] = [];
  for (const row of rows) {
    const parents = row.commit.parents;
    for (let pIdx = 0; pIdx < parents.length; pIdx++) {
      const parentSha = parents[pIdx];
      const targetRowIdx = visibleRowBySha.get(parentSha);
      if (targetRowIdx === undefined) {
        continue;
      }
      const targetRow = rows[targetRowIdx];
      edges.push({
        fromSha: row.commit.sha,
        toSha: parentSha,
        fromRow: row.rowIndex,
        toRow: targetRow.rowIndex,
        fromLane: row.laneIndex,
        toLane: targetRow.laneIndex,
        colorIndex: pIdx === 0 ? row.colorIndex : targetRow.colorIndex,
        isMergeEdge: pIdx > 0,
        mergeParentIndex: pIdx,
      });
    }
  }

  return {
    rows,
    edges,
    maxLaneCount: Math.max(1, maxLaneCount),
    resolvedBaseRefName: baseRefName,
    resolvedBaseSha: baseSha,
    orphanComponents: components,
    hiddenOrphanCommitCount,
    hiddenOrphanTreeCount,
    branchSummaries,
  };
}
