export function formatRelativeOrShortTime(unixSeconds: number): string {
  if (!unixSeconds || unixSeconds <= 0) {
    return "-";
  }
  const date = new Date(unixSeconds * 1000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const mins = String(date.getUTCMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${mins}`;
}

export function stripRemotePrefix(refName: string): string {
  return refName.replace(/^refs\/(heads|remotes|tags)\//, "").replace(/^origin\//, "");
}
