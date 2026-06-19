import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore } from "../lib/types";

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
});
