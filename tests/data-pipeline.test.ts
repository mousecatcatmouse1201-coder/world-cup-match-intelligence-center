import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildDataQualitySummary } from "../lib/data-quality";
import { formatDisplayDateTime } from "../lib/format";
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
  });

  it("summarizes trusted and estimated data records", () => {
    const summary = buildDataQualitySummary(loadStore());

    expect(summary.totalRecords).toBeGreaterThan(0);
    expect(summary.trustedRecords).toBeGreaterThan(0);
    expect(summary.mockOrEstimatedRecords).toBeGreaterThan(0);
    expect(summary.groups.map((group) => group.key)).toContain("fixtures");
    expect(summary.latestFetchedAt).toBeTruthy();
  });

  it("writes a source audit report with every record group", () => {
    const audit = readJson<SourceAuditReport>("source-audit.json");

    expect(audit.generatedAt).toBeTruthy();
    expect(audit.summary.groups.length).toBe(8);
    expect(audit.notes.some((note) => note.includes("可信记录"))).toBe(true);
  });
});
