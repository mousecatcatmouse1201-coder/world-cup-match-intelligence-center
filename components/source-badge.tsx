import type { RecordSource } from "../lib/types";

export function SourceBadge({ source }: { source: RecordSource }) {
  const label = source.isMockOrEstimated ? "估算/演示" : source.confidence === "official" ? "官方来源" : "二级来源";

  return (
    <span className={`sourceBadge ${source.isMockOrEstimated ? "estimated" : "official"}`} title={source.sourceUrl}>
      {label} · {source.sourceName}
    </span>
  );
}
