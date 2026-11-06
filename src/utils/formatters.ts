import {
  AnnotationTone,
  ComputedTopologyLayout,
  LocalCommitAnnotation,
  RepositorySnapshot,
  TimezoneDisplayMode,
} from "../types/gitTypes";

export function formatRelativeOrShortTime(
  unixSeconds: number,
  timezoneMode: TimezoneDisplayMode = "utc8"
): string {
  if (!unixSeconds || unixSeconds <= 0) {
    return "-";
  }
  if (timezoneMode === "local") {
    const localDate = new Date(unixSeconds * 1000);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    const hours = String(localDate.getHours()).padStart(2, "0");
    const mins = String(localDate.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${mins}`;
  }

  const offsetMs = timezoneMode === "utc8" ? 8 * 3600 * 1000 : 0;
  const shifted = new Date(unixSeconds * 1000 + offsetMs);
  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const mins = String(shifted.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${mins}`;
}

export function formatTimezoneBadgeLabel(
  timezoneMode: TimezoneDisplayMode
): string {
  switch (timezoneMode) {
    case "utc8":
      return "UTC+8";
    case "utc0":
      return "UTC";
    case "local":
      return "Local";
  }
}

export function stripRemotePrefix(refName: string): string {
  return refName
    .trim()
    .replace(/^HEAD\s*->\s*/, "")
    .replace(/^refs\/(heads|remotes\/origin|remotes|tags)\//, "")
    .replace(/^origin\//, "");
}

export function isCommitTipConfirmed(
  annotation: LocalCommitAnnotation | undefined
): boolean {
  if (!annotation) {
    return false;
  }
  if (annotation.triageStatus === "unconfirmed" && !annotation.confirmed) {
    return false;
  }
  return Boolean(
    annotation.confirmed ||
      (annotation.triageStatus && annotation.triageStatus !== "unconfirmed") ||
      annotation.linkedCommitSha?.trim() ||
      annotation.tagLabel?.trim()
  );
}

export function resolveTriageBadgeSpec(
  annotation: LocalCommitAnnotation | undefined
): { label: string; tone: AnnotationTone } | null {
  if (!annotation) {
    return null;
  }
  switch (annotation.triageStatus) {
    case "useless":
      return { label: "USELESS", tone: "danger" };
    case "useful":
      return { label: "USEFUL", tone: "success" };
    case "absorbed":
      return {
        label: annotation.linkedCommitSha
          ? `ABSORBED -> ${annotation.linkedCommitSha.slice(0, 8)}`
          : "ABSORBED",
        tone: "done",
      };
    case "hold":
      return { label: "ON HOLD", tone: "attention" };
    default:
      if (annotation.confirmed) {
        return { label: "CONFIRMED", tone: annotation.colorTone || "accent" };
      }
      return null;
  }
}

export function buildAgentTriageReportMarkdown(params: {
  snapshot: RepositorySnapshot;
  layout: ComputedTopologyLayout;
  annotations: Record<string, LocalCommitAnnotation>;
  timezoneMode: TimezoneDisplayMode;
}): string {
  const { snapshot, layout, annotations, timezoneMode } = params;
  const tzLabel = formatTimezoneBadgeLabel(timezoneMode);
  const shaToCommit = new Map(snapshot.commits.map((c) => [c.sha, c]));

  const tipRows = layout.rows.filter(
    (r) => r.divergenceKind === "unmerged_tip"
  );
  const confirmedTips = tipRows.filter((r) =>
    isCommitTipConfirmed(annotations[r.commit.sha])
  );
  const unconfirmedTips = tipRows.filter(
    (r) => !isCommitTipConfirmed(annotations[r.commit.sha])
  );

  const lines: string[] = [
    `# Branch & Unmerged Tip Triage Report: ${snapshot.repoName}`,
    ``,
    `- **Repository Path**: \`${snapshot.repoPath}\``,
    `- **Mainline Base Spine**: \`${
      layout.resolvedBaseRefName
        ? stripRemotePrefix(layout.resolvedBaseRefName)
        : "HEAD"
    }\` (\`{${(layout.resolvedBaseSha ?? snapshot.headSha).slice(0, 8)}}\`)`,
    `- **Unmerged Tips**: ${tipRows.length} total (${confirmedTips.length} confirmed, ${unconfirmedTips.length} unconfirmed)`,
    `- **Timezone**: ${tzLabel}`,
    ``,
  ];

  const groupMap = new Map<
    string,
    { sha: string; branches: string[]; subject: string; isTip: boolean; note: string }[]
  >();
  for (const row of layout.rows) {
    const ann = annotations[row.commit.sha];
    if (!ann || !ann.tagLabel.trim()) {
      continue;
    }
    const key = ann.tagLabel.trim();
    const list = groupMap.get(key) ?? [];
    list.push({
      sha: row.commit.sha,
      branches: row.commit.refs.map(stripRemotePrefix),
      subject: row.commit.subject,
      isTip: row.divergenceKind === "unmerged_tip",
      note: ann.note,
    });
    groupMap.set(key, list);
  }

  if (groupMap.size > 0) {
    lines.push(`## 1. Feature Clusters & Tagged Groups`);
    for (const [tag, items] of groupMap.entries()) {
      lines.push(`### Tag: \`${tag}\` (${items.length} commit(s))`);
      for (const item of items) {
        const branchStr =
          item.branches.length > 0 ? item.branches.join(", ") : "(no branch ref)";
        lines.push(
          `- \`${item.sha.slice(0, 8)}\` [${
            item.isTip ? "UNMERGED TIP" : "LINEAGE"
          }] **${branchStr}** — ${item.subject}${
            item.note ? ` _(Note: ${item.note})_` : ""
          }`
        );
      }
      lines.push(``);
    }
  }

  const byStatus = (status: string) =>
    confirmedTips.filter(
      (r) => (annotations[r.commit.sha]?.triageStatus ?? "useful") === status
    );

  const usefulList = byStatus("useful");
  lines.push(`## 2. Useful Unmerged Tips (Keep / Merge / Catch Up) (${usefulList.length})`);
  if (usefulList.length === 0) {
    lines.push(`- None`);
  } else {
    for (const row of usefulList) {
      const ann = annotations[row.commit.sha];
      const refs = row.commit.refs.map(stripRemotePrefix).join(", ") || row.commit.shortSha;
      lines.push(
        `- \`${row.commit.sha.slice(0, 8)}\` **${refs}** (${formatRelativeOrShortTime(
          row.commit.timestamp,
          timezoneMode
        )})${ann?.tagLabel ? ` [Tag: \`${ann.tagLabel}\`]` : ""} — ${
          row.commit.subject
        }${ann?.note ? `\n  - Action/Note: ${ann.note}` : ""}`
      );
    }
  }
  lines.push(``);

  const absorbedList = byStatus("absorbed");
  lines.push(
    `## 3. Absorbed / Rebased / Cherry-Picked into Mainline (${absorbedList.length})`
  );
  if (absorbedList.length === 0) {
    lines.push(`- None`);
  } else {
    for (const row of absorbedList) {
      const ann = annotations[row.commit.sha];
      const refs = row.commit.refs.map(stripRemotePrefix).join(", ") || row.commit.shortSha;
      const targetCommit = ann?.linkedCommitSha
        ? shaToCommit.get(ann.linkedCommitSha) ??
          snapshot.commits.find((c) =>
            c.sha.startsWith(ann.linkedCommitSha ?? "")
          )
        : undefined;
      const targetDesc = targetCommit
        ? `\`{${targetCommit.sha.slice(0, 8)}}\` (${targetCommit.refs
            .map(stripRemotePrefix)
            .join(", ") || targetCommit.subject})`
        : ann?.linkedCommitSha
        ? `\`${ann.linkedCommitSha.slice(0, 8)}\``
        : "unspecified target";
      lines.push(
        `- \`${row.commit.sha.slice(0, 8)}\` **${refs}** -> Absorbed into ${targetDesc} — ${
          row.commit.subject
        }${ann?.note ? `\n  - Note: ${ann.note}` : ""}`
      );
    }
  }
  lines.push(``);

  const holdList = byStatus("hold");
  lines.push(`## 4. On Hold / Outdated Plan (${holdList.length})`);
  if (holdList.length === 0) {
    lines.push(`- None`);
  } else {
    for (const row of holdList) {
      const ann = annotations[row.commit.sha];
      const refs = row.commit.refs.map(stripRemotePrefix).join(", ") || row.commit.shortSha;
      lines.push(
        `- \`${row.commit.sha.slice(0, 8)}\` **${refs}**${
          ann?.tagLabel ? ` [Tag: \`${ann.tagLabel}\`]` : ""
        } — ${row.commit.subject}${ann?.note ? `\n  - Note: ${ann.note}` : ""}`
      );
    }
  }
  lines.push(``);

  const uselessList = byStatus("useless");
  lines.push(
    `## 5. Useless / Superseded Tips (Safe to Prune on Origin) (${uselessList.length})`
  );
  if (uselessList.length === 0) {
    lines.push(`- None`);
  } else {
    for (const row of uselessList) {
      const ann = annotations[row.commit.sha];
      const refs = row.commit.refs.map(stripRemotePrefix).join(", ") || row.commit.shortSha;
      lines.push(
        `- \`${row.commit.sha.slice(0, 8)}\` **${refs}** — ${row.commit.subject}${
          ann?.note ? `\n  - Reason: ${ann.note}` : ""
        }`
      );
    }
  }
  lines.push(``);

  lines.push(`## 6. Unconfirmed Unmerged Tips (${unconfirmedTips.length})`);
  if (unconfirmedTips.length === 0) {
    lines.push(`- All unmerged tips have been triaged and confirmed.`);
  } else {
    for (const row of unconfirmedTips) {
      const refs = row.commit.refs.map(stripRemotePrefix).join(", ") || row.commit.shortSha;
      lines.push(
        `- \`${row.commit.sha.slice(0, 8)}\` **${refs}** (${formatRelativeOrShortTime(
          row.commit.timestamp,
          timezoneMode
        )}) — ${row.commit.subject}`
      );
    }
  }

  return lines.join("\n");
}

