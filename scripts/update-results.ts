import { readFile, rename, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fixtureSchema } from "../lib/schemas";
import type { Fixture } from "../lib/types";

interface ResultUpdate {
  fixtureId: string;
  status: "finished" | "result_pending";
  homeScore?: number;
  awayScore?: number;
  source?: "official" | "secondary" | string;
  updatedAt?: string;
}

interface ResultUpdateFile {
  results: ResultUpdate[];
}

interface VerifiedManualResult {
  matchId: string;
  homeScore: number;
  awayScore: number;
  result: "home_win" | "away_win" | "draw";
  sourceUpdatedAt: string;
}

const storeDir = path.join(process.cwd(), "data", "store");

function usage() {
  return "Usage: npm run data:update-results -- --file path/to/results.json";
}

function parseArgs() {
  const fileIndex = process.argv.indexOf("--file");
  if (fileIndex < 0 || !process.argv[fileIndex + 1]) throw new Error(usage());
  return process.argv[fileIndex + 1];
}

function assertUpdate(update: ResultUpdate) {
  if (!update.fixtureId || !["finished", "result_pending"].includes(update.status)) {
    throw new Error(`Invalid update: ${JSON.stringify(update)}`);
  }
  const hasHome = update.homeScore !== undefined;
  const hasAway = update.awayScore !== undefined;
  if (update.status === "finished" && (!hasHome || !hasAway || !Number.isInteger(update.homeScore) || !Number.isInteger(update.awayScore) || update.homeScore! < 0 || update.awayScore! < 0)) {
    throw new Error(`${update.fixtureId}: finished updates require non-negative integer homeScore and awayScore`);
  }
  if (update.status === "result_pending" && (hasHome || hasAway)) {
    throw new Error(`${update.fixtureId}: result_pending updates must not include a score`);
  }
  if (update.updatedAt && Number.isNaN(Date.parse(update.updatedAt))) throw new Error(`${update.fixtureId}: updatedAt must be ISO datetime`);
}

function outcome(homeScore: number, awayScore: number): VerifiedManualResult["result"] {
  if (homeScore > awayScore) return "home_win";
  if (homeScore < awayScore) return "away_win";
  return "draw";
}

function parseUpdates(raw: unknown): ResultUpdate[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      const manual = item as VerifiedManualResult;
      if (!manual.matchId || !Number.isInteger(manual.homeScore) || !Number.isInteger(manual.awayScore) || !manual.sourceUpdatedAt) {
        throw new Error(`Invalid verified manual result: ${JSON.stringify(item)}`);
      }
      if (manual.result !== outcome(manual.homeScore, manual.awayScore)) {
        throw new Error(`${manual.matchId}: result does not match the supplied score`);
      }
      return {
        fixtureId: manual.matchId,
        status: "finished",
        homeScore: manual.homeScore,
        awayScore: manual.awayScore,
        updatedAt: manual.sourceUpdatedAt
      };
    });
  }

  const input = raw as ResultUpdateFile;
  if (!Array.isArray(input.results) || !input.results.length) throw new Error("results must be a non-empty array");
  return input.results;
}

async function writeFixtures(fixtures: Fixture[]) {
  const tmp = path.join(storeDir, "fixtures.json.tmp");
  await writeFile(tmp, `${JSON.stringify(fixtures, null, 2)}\n`, "utf8");
  await rename(tmp, path.join(storeDir, "fixtures.json"));
}

async function main() {
  const inputPath = path.resolve(process.cwd(), parseArgs());
  const updates = parseUpdates(JSON.parse(await readFile(inputPath, "utf8")));
  updates.forEach(assertUpdate);
  const requestedIds = updates.map((item) => item.fixtureId);
  if (new Set(requestedIds).size !== requestedIds.length) throw new Error("Duplicate fixtureId in update file");

  const fixtures = fixtureSchema.array().parse(JSON.parse(await readFile(path.join(storeDir, "fixtures.json"), "utf8"))) as Fixture[];
  const updateIds = new Set<string>();
  const updated = fixtures.map((fixture) => {
    const update = updates.find((item) => item.fixtureId === fixture.id);
    if (!update) return fixture;
    updateIds.add(update.fixtureId);
    const updatedAt = update.updatedAt ?? new Date().toISOString();

    if (update.status === "result_pending") {
      const { score: _score, result: _result, lastResultsUpdatedAt: _lastResultsUpdatedAt, ...withoutResult } = fixture;
      return {
        ...withoutResult,
        status: "result_pending" as const,
        sourceUpdatedAt: updatedAt,
        source: { ...fixture.source, lastFetchedAt: updatedAt }
      };
    }

    return {
      ...fixture,
      status: "finished" as const,
      score: { home: update.homeScore!, away: update.awayScore! },
      result: { homeScore: update.homeScore!, awayScore: update.awayScore!, source: update.source ?? "secondary", updatedAt },
      lastResultsUpdatedAt: updatedAt,
      sourceUpdatedAt: updatedAt,
      source: { ...fixture.source, lastFetchedAt: updatedAt }
      // predictionSnapshot is intentionally preserved. normalize only fills it when missing.
    };
  });

  const missing = updates.map((item) => item.fixtureId).filter((id) => !updateIds.has(id));
  if (missing.length) throw new Error(`Unknown fixtureId: ${missing.join(", ")}`);
  await writeFixtures(updated);

  const tsx = path.join(process.cwd(), "node_modules", ".bin", "tsx");
  const normalized = spawnSync(tsx, ["scripts/normalize-data.ts"], { cwd: process.cwd(), stdio: "inherit" });
  if (normalized.status !== 0) throw new Error("Normalization after result update failed; fixtures were not accepted by the local pipeline.");
  console.log(`PASS data:update-results (${updates.length} updates); standings, source audit, and missing prediction snapshots refreshed.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
