import type {
  DataQualityGroup,
  DataQualitySummary,
  DataRecordGroupKey,
  DataSource,
  DataStore,
  RecordSource,
  SourceAuditReport
} from "./types";

type SourceBearingRecord = RecordSource | { source: RecordSource };

const GROUP_LABELS: Record<DataRecordGroupKey, string> = {
  sources: "来源目录",
  teams: "球队与排名",
  players: "关键球员",
  fixtures: "赛程赛果",
  standings: "积分与出线概率",
  rankings: "FIFA 排名",
  odds: "赔率快照",
  sentiment: "舆情热度"
};

function sourceOf(record: SourceBearingRecord): RecordSource {
  return "source" in record ? record.source : record;
}

function emptyGroup(key: DataRecordGroupKey): DataQualityGroup {
  return {
    key,
    label: GROUP_LABELS[key],
    totalRecords: 0,
    officialRecords: 0,
    secondaryRecords: 0,
    estimatedRecords: 0,
    modeledRecords: 0,
    mockOrEstimatedRecords: 0,
    trustedRecords: 0,
    latestFetchedAt: null,
    sourceIds: []
  };
}

function buildGroup(key: DataRecordGroupKey, records: SourceBearingRecord[]): DataQualityGroup {
  const group = emptyGroup(key);
  const sourceIds = new Set<string>();
  let latestTime = 0;

  for (const record of records) {
    const source = sourceOf(record);
    const fetchedAt = Date.parse(source.lastFetchedAt);

    group.totalRecords += 1;
    sourceIds.add(source.sourceId);

    if (Number.isFinite(fetchedAt) && fetchedAt > latestTime) {
      latestTime = fetchedAt;
    }

    if (source.isMockOrEstimated) {
      group.mockOrEstimatedRecords += 1;
    }

    if (!source.isMockOrEstimated && (source.confidence === "official" || source.confidence === "secondary")) {
      group.trustedRecords += 1;
    }

    if (source.confidence === "official") {
      group.officialRecords += 1;
    } else if (source.confidence === "secondary") {
      group.secondaryRecords += 1;
    } else if (source.confidence === "estimated") {
      group.estimatedRecords += 1;
    } else {
      group.modeledRecords += 1;
    }
  }

  group.latestFetchedAt = latestTime > 0 ? new Date(latestTime).toISOString() : null;
  group.sourceIds = [...sourceIds].sort();
  return group;
}

export function buildDataQualitySummary(store: DataStore): DataQualitySummary {
  const groups = (Object.keys(GROUP_LABELS) as DataRecordGroupKey[]).map((key) => buildGroup(key, store[key] as SourceBearingRecord[]));
  let latestTime = 0;

  const summary = groups.reduce<DataQualitySummary>(
    (current, group) => {
      const fetchedAt = group.latestFetchedAt ? Date.parse(group.latestFetchedAt) : 0;
      if (Number.isFinite(fetchedAt) && fetchedAt > latestTime) {
        latestTime = fetchedAt;
      }

      current.totalRecords += group.totalRecords;
      current.officialRecords += group.officialRecords;
      current.secondaryRecords += group.secondaryRecords;
      current.estimatedRecords += group.estimatedRecords;
      current.modeledRecords += group.modeledRecords;
      current.mockOrEstimatedRecords += group.mockOrEstimatedRecords;
      current.trustedRecords += group.trustedRecords;
      return current;
    },
    {
      totalRecords: 0,
      sourceCount: store.sources.length,
      officialRecords: 0,
      secondaryRecords: 0,
      estimatedRecords: 0,
      modeledRecords: 0,
      mockOrEstimatedRecords: 0,
      trustedRecords: 0,
      latestFetchedAt: null,
      groups
    }
  );

  summary.latestFetchedAt = latestTime > 0 ? new Date(latestTime).toISOString() : null;
  return summary;
}

/**
 * Canonical local-pipeline freshness value for UI surfaces. It includes source
 * fetches plus normalization and result-write timestamps, so a manual local
 * result update cannot leave the dashboard banner behind the source panel.
 */
export function getLatestDataUpdatedAt(store: DataStore): string | null {
  const timestamps = [
    ...store.sources.map((source) => source.lastFetchedAt),
    ...store.fixtures.flatMap((fixture) => [
      fixture.source.lastFetchedAt,
      fixture.sourceUpdatedAt,
      fixture.lastNormalizedAt,
      fixture.lastResultsUpdatedAt,
      fixture.result?.updatedAt
    ])
  ];
  let latest = 0;

  for (const value of timestamps) {
    if (!value) continue;
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed) && parsed > latest) latest = parsed;
  }

  return latest ? new Date(latest).toISOString() : null;
}

export function buildSourceAuditReport(store: DataStore, generatedAt = new Date().toISOString()): SourceAuditReport {
  const summary = buildDataQualitySummary(store);
  const modeledGroups = summary.groups.filter((group) => group.modeledRecords > 0).map((group) => group.label);
  const estimatedGroups = summary.groups.filter((group) => group.estimatedRecords > 0).map((group) => group.label);

  return {
    generatedAt,
    summary,
    notes: [
      `可信记录 ${summary.trustedRecords}/${summary.totalRecords}，其余为演示数据或模型推断。`,
      `演示数据覆盖：${estimatedGroups.join("、") || "无"}。`,
      `模型推断覆盖：${modeledGroups.join("、") || "无"}。`
    ]
  };
}

export function summarizeSourceList(sources: DataSource[]) {
  return sources.map((source) => ({
    sourceId: source.sourceId,
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    sourceKind: source.sourceKind,
    confidence: source.confidence,
    lastFetchedAt: source.lastFetchedAt,
    isMockOrEstimated: source.isMockOrEstimated,
    description: source.description
  }));
}
