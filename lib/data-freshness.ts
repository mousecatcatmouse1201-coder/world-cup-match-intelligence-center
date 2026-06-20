import type { DataStore, Fixture } from "./types";

export const EXPECTED_MATCH_DURATION_MS = 2 * 60 * 60 * 1000;
export const DATA_STALE_AFTER_MS = 24 * 60 * 60 * 1000;

export type FreshnessStatus = "normal" | "stale" | "pending_results" | "missing_timestamps";

export interface DataFreshnessSummary {
  status: FreshnessStatus;
  latestUpdatedAt: string | null;
  pendingResults: Fixture[];
  missingTimestampFixtures: Fixture[];
  staleSources: string[];
}

function hasFinalScore(fixture: Fixture) {
  return fixture.score !== undefined || (fixture.result?.homeScore !== undefined && fixture.result?.awayScore !== undefined);
}

export function expectedFinishedAt(fixture: Pick<Fixture, "kickoff">): Date | null {
  const kickoff = Date.parse(fixture.kickoff);
  return Number.isFinite(kickoff) ? new Date(kickoff + EXPECTED_MATCH_DURATION_MS) : null;
}

export function isResultPending(fixture: Fixture, now = new Date()) {
  const expected = expectedFinishedAt(fixture);
  return Boolean(expected && now.getTime() > expected.getTime() && !hasFinalScore(fixture));
}

export function missingFixtureTimestamps(fixture: Fixture) {
  const missing = !fixture.sourceUpdatedAt || !fixture.lastNormalizedAt || (!fixture.source?.lastFetchedAt);
  const missingResultTimestamp = hasFinalScore(fixture) && !fixture.lastResultsUpdatedAt;
  return missing || missingResultTimestamp;
}

export function freshnessStatusLabel(status: FreshnessStatus, pendingCount: number) {
  if (status === "pending_results") return `存在 ${pendingCount} 场赛果待更新比赛`;
  if (status === "missing_timestamps") return "部分数据缺少更新时间";
  if (status === "stale") return "可能过期，请核对赛程与赛果。";
  return "正常";
}

export function buildDataFreshnessSummary(store: DataStore, now = new Date(), latestUpdatedAt: string | null): DataFreshnessSummary {
  const pendingResults = store.fixtures.filter((fixture) => isResultPending(fixture, now));
  const missingTimestampFixtures = store.fixtures.filter(missingFixtureTimestamps);
  const staleSources = store.sources
    .filter((source) => {
      const fetchedAt = Date.parse(source.lastFetchedAt);
      return !Number.isFinite(fetchedAt) || now.getTime() - fetchedAt > DATA_STALE_AFTER_MS;
    })
    .map((source) => source.sourceName);
  const latestTime = latestUpdatedAt ? Date.parse(latestUpdatedAt) : NaN;
  const stale = !Number.isFinite(latestTime) || now.getTime() - latestTime > DATA_STALE_AFTER_MS || staleSources.length > 0;
  const status: FreshnessStatus = missingTimestampFixtures.length
    ? "missing_timestamps"
    : pendingResults.length
      ? "pending_results"
      : stale
        ? "stale"
        : "normal";

  return { status, latestUpdatedAt, pendingResults, missingTimestampFixtures, staleSources };
}
