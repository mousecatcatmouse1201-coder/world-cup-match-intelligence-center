import type { RecordSource } from "../lib/types";

export function SourceBadge({ source, verified = true }: { source: RecordSource; verified?: boolean }) {
  const label = !verified ? "赛程待校验" : source.isMockOrEstimated ? "估算/演示" : source.confidence === "official" ? "官方来源" : "二级来源";

  return (
    <span className={`sourceBadge ${source.isMockOrEstimated || !verified ? "estimated" : "official"}`} title={source.sourceUrl}>
      {label} · {source.sourceName}
    </span>
  );
}
