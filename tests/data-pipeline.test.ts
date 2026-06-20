import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getHighestUpsetRiskMatch, getMostPopularMatch, getTodayMatches } from "../lib/dashboard-matches";
import { buildDataQualitySummary } from "../lib/data-quality";
import { formatDisplayDateKey, formatDisplayDateTime } from "../lib/format";
import { buildGroupStandings } from "../lib/group-standings";
import { getEnrichedMatches } from "../lib/match-intelligence";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore, SourceAuditReport } from "../lib/types";

function readJson<T>(fileName: string): T {
  const raw = readFileSync(path.join(process.cwd(), "data", "store", fileName), "utf8");
  return JSON.parse(raw) as T;
}

function loadStore(): DataStore {
  return dataStoreSchema.parse({
    sources: readJson("sources.json"),
    teams: readJson("teams.json"),
    players: readJson("players.json"),
    fixtures: readJson("fixtures.json"),
    standings: readJson("standings.json"),
    rankings: readJson("rankings.json"),
    odds: readJson("odds.json"),
    sentiment: readJson("sentiment.json")
  });
}

describe("data pipeline output", () => {
  it("writes schema-valid JSON store files", () => {
    const store = loadStore();

    expect(store.teams.length).toBeGreaterThanOrEqual(2);
    expect(store.fixtures.length).toBeGreaterThanOrEqual(1);
    expect(store.sources.some((source) => source.sourceKind === "official")).toBe(true);
  });

  it("keeps source metadata on every record type", () => {
    const store = loadStore();
    const records = [
      ...store.teams,
      ...store.players,
      ...store.fixtures,
      ...store.standings,
      ...store.rankings,
      ...store.odds,
      ...store.sentiment
    ];

    for (const record of records) {
      expect(record.source.sourceId).toBeTruthy();
      expect(record.source.sourceUrl).toMatch(/^https?:\/\//);
      expect(record.source.lastFetchedAt).toBeTruthy();
      expect(record.source.confidence).toBeTruthy();
    }
  });

  it("formats visible datetimes in a fixed display timezone", () => {
    expect(formatDisplayDateTime("2026-06-12T01:00:00.000Z")).toBe("06/12 09:00");
    expect(formatDisplayDateKey("2026-06-11T19:00:00-06:00")).toBe("2026-06-12");
  });

  it("summarizes trusted and estimated data records", () => {
    const summary = buildDataQualitySummary(loadStore());

    expect(summary.totalRecords).toBeGreaterThan(0);
    expect(summary.trustedRecords).toBeGreaterThan(0);
    expect(summary.mockOrEstimatedRecords).toBeGreaterThan(0);
    expect(summary.groups.map((group) => group.key)).toContain("fixtures");
    expect(summary.latestFetchedAt).toBeTruthy();
  });

  it("selects Beijing 2026-06-19 today matches without historical fallback", () => {
    const store = loadStore();
    const now = new Date("2026-06-19T12:00:00+08:00");
    const matches = getEnrichedMatches(store, { now });
    const todayMatches = getTodayMatches(matches, now);
    const todayFixtureIds = todayMatches.map((match) => match.fixture.id);
    const todayNames = todayMatches.map((match) => `${match.home.shortName} vs ${match.away.shortName}`);
    const dateOptions = [...new Set(matches.map((match) => match.beijingDate).sort())];

    expect(todayMatches.every((match) => match.beijingDate === "2026-06-19")).toBe(true);
    expect(todayNames).toEqual(expect.arrayContaining([
      "捷克 vs 南非",
      "瑞士 vs 波黑",
      "加拿大 vs 卡塔尔",
      "墨西哥 vs 韩国"
    ]));
    expect(todayFixtureIds).not.toContain("match-005");
    expect(todayFixtureIds).not.toContain("match-007");
    expect(getMostPopularMatch(todayMatches)?.fixture.id).not.toBe("match-005");
    expect(getHighestUpsetRiskMatch(todayMatches)?.fixture.id).not.toBe("match-007");
    expect(dateOptions).toContain("2026-06-19");
    expect(matches.every((match) => dateOptions.includes(match.beijingDate))).toBe(true);
  });

  it("keeps historical upset-risk samples finished when results are available", () => {
    const store = loadStore();
    const now = new Date("2026-06-19T12:00:00+08:00");
    const matches = getEnrichedMatches(store, { now });
    const englandCroatia = matches.find((match) => `${match.home.shortName} vs ${match.away.shortName}` === "英格兰 vs 克罗地亚");
    const ghanaPanama = matches.find((match) => `${match.home.shortName} vs ${match.away.shortName}` === "加纳 vs 巴拿马");

    expect(englandCroatia?.status).toBe("finished");
    expect(englandCroatia?.result).toMatchObject({ homeScore: 4, awayScore: 2 });
    expect(englandCroatia?.fixture.score).toMatchObject({ home: 4, away: 2 });
    expect(ghanaPanama?.status).toBe("finished");
    expect(ghanaPanama?.result).toMatchObject({ homeScore: 1, awayScore: 0 });
    expect(ghanaPanama?.fixture.score).toMatchObject({ home: 1, away: 0 });
  });

  it("builds group standings from finished enriched match results only", () => {
    const store = loadStore();
    const now = new Date("2026-06-19T12:00:00+08:00");
    const matches = getEnrichedMatches(store, { now });
    const standings = buildGroupStandings(matches, store.teams);
    const groupA = standings.find((table) => table.group === "A");
    const groupB = standings.find((table) => table.group === "B");

    expect(groupA?.rows.map((row) => [row.rank, row.teamName, row.points, row.goalDifference])).toEqual([
      [1, "墨西哥", 6, 3],
      [2, "韩国", 3, 0],
      [3, "捷克", 1, -1],
      [4, "南非", 1, -2]
    ]);
    expect(groupB?.rows.map((row) => [row.rank, row.teamName, row.points, row.goalDifference])).toEqual([
      [1, "加拿大", 4, 6],
      [2, "瑞士", 4, 3],
      [3, "波黑", 1, -3],
      [4, "卡塔尔", 1, -6]
    ]);
    expect(groupA?.rows[0].qualificationText).toContain("直接出线区");
    expect(groupA?.notes.join(" ")).toContain("非 FIFA 官方确认排名");
  });

  it("writes a source audit report with every record group", () => {
    const audit = readJson<SourceAuditReport>("source-audit.json");

    expect(audit.generatedAt).toBeTruthy();
    expect(audit.summary.groups.length).toBe(8);
    expect(audit.notes.some((note) => note.includes("可信记录"))).toBe(true);
  });
});
