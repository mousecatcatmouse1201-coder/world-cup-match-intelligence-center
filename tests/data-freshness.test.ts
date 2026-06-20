import { describe, expect, it } from "vitest";
import { buildDataFreshnessSummary, expectedFinishedAt, isResultPending } from "../lib/data-freshness";
import type { DataStore, Fixture } from "../lib/types";

const now = new Date("2026-06-20T12:00:00.000Z");
const source = { sourceId: "local", sourceName: "Local", sourceUrl: "https://example.com", sourceKind: "manual" as const, lastFetchedAt: "2026-06-20T11:00:00.000Z", confidence: "secondary" as const, isMockOrEstimated: false };
const fixture = (overrides: Partial<Fixture> = {}): Fixture => ({
  id: "match-test", group: "A", stage: "小组赛", kickoff: "2026-06-20T09:00:00.000Z", venue: "Test", city: "Test",
  homeTeamId: "home", awayTeamId: "away", status: "scheduled", sourceUpdatedAt: "2026-06-20T11:00:00.000Z",
  lastNormalizedAt: "2026-06-20T11:00:00.000Z", heatIndex: 50, source, ...overrides
});

function store(fixtures: Fixture[]): DataStore {
  return { sources: [{ ...source, description: "test source" }], fixtures, teams: [], players: [], standings: [], rankings: [], odds: [], sentiment: [] };
}

describe("data freshness", () => {
  it("uses kickoff plus two hours as expected finish time", () => {
    expect(expectedFinishedAt(fixture())?.toISOString()).toBe("2026-06-20T11:00:00.000Z");
  });

  it("marks only scoreless matches past expected finish as pending", () => {
    expect(isResultPending(fixture(), now)).toBe(true);
    expect(isResultPending(fixture({ score: { home: 1, away: 0 }, result: { homeScore: 1, awayScore: 0, updatedAt: "2026-06-20T11:05:00.000Z" } }), now)).toBe(false);
    expect(isResultPending(fixture({ kickoff: "2026-06-20T11:00:00.000Z" }), now)).toBe(false);
  });

  it("prioritizes missing timestamps, then pending results, then stale data", () => {
    expect(buildDataFreshnessSummary(store([fixture()]), now, "2026-06-20T11:00:00.000Z").status).toBe("pending_results");
    expect(buildDataFreshnessSummary(store([fixture({ lastNormalizedAt: "" })]), now, "2026-06-20T11:00:00.000Z").status).toBe("missing_timestamps");
    expect(buildDataFreshnessSummary(store([fixture({ kickoff: "2026-06-21T09:00:00.000Z" })]), now, "2026-06-18T11:00:00.000Z").status).toBe("stale");
  });
});
