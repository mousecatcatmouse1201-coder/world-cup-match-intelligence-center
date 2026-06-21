import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildDataFreshnessSummary, expectedFinishedAt } from "../lib/data-freshness";
import { collectDataIntegrityIssues } from "../lib/data-integrity";
import { getLatestDataUpdatedAt } from "../lib/data-quality";
import { collectVenueTimeMismatches } from "../lib/schedule-validation";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore } from "../lib/types";

const storePath = (...parts: string[]) => path.join(process.cwd(), "data", "store", ...parts);
async function readJson<T>(name: string) { return JSON.parse(await readFile(storePath(name), "utf8")) as T; }

async function loadStore(): Promise<DataStore> {
  return dataStoreSchema.parse({
    sources: await readJson("sources.json"), teams: await readJson("teams.json"), players: await readJson("players.json"),
    fixtures: await readJson("fixtures.json"), standings: await readJson("standings.json"), rankings: await readJson("rankings.json"),
    odds: await readJson("odds.json"), sentiment: await readJson("sentiment.json")
  });
}

function teams(store: DataStore, fixture: DataStore["fixtures"][number]) {
  const name = (id?: string) => store.teams.find((team) => team.id === id)?.shortName ?? id ?? "待定";
  return `${name(fixture.homeTeamId)} vs ${name(fixture.awayTeamId)}`;
}

const store = await loadStore();
const freshness = buildDataFreshnessSummary(store, new Date(), getLatestDataUpdatedAt(store));
const integrity = collectDataIntegrityIssues(store);
const missingSnapshots = store.fixtures.filter((fixture) => !fixture.predictionSnapshot);
const lateSnapshots = store.fixtures.filter((fixture) => fixture.predictionSnapshot && Date.parse(fixture.predictionSnapshot.capturedAt) > Date.parse(fixture.kickoff));
const missingResultTimes = store.fixtures.filter((fixture) => fixture.score && !fixture.lastResultsUpdatedAt);
const venueTimeMismatches = collectVenueTimeMismatches(store.fixtures);

console.log("Data Pending Report");
console.log("Summary:");
console.log(`- Total matches: ${store.fixtures.length}`);
console.log(`- Pending results: ${freshness.pendingResults.length}`);
console.log(`- Missing prediction snapshots: ${missingSnapshots.length}`);
console.log(`- Missing timestamps: ${freshness.missingTimestampFixtures.length}`);
console.log(`- Stale sources: ${freshness.staleSources.length}`);
console.log(`- Venue/time mismatches: ${venueTimeMismatches.length}`);
console.log("Pending results:");
for (const fixture of freshness.pendingResults) console.log(`- ${fixture.id} | ${teams(store, fixture)} | kickoff: ${fixture.kickoff} | expected finished at: ${expectedFinishedAt(fixture)?.toISOString()}`);
if (!freshness.pendingResults.length) console.log("- none");
console.log("Data exceptions:");
for (const fixture of missingSnapshots) console.log(`- ${fixture.id} | missing predictionSnapshot`);
for (const fixture of lateSnapshots) console.log(`- ${fixture.id} | predictionSnapshot captured after kickoff`);
for (const fixture of freshness.missingTimestampFixtures) console.log(`- ${fixture.id} | missing required timestamp`);
for (const fixture of missingResultTimes) console.log(`- ${fixture.id} | final result missing lastResultsUpdatedAt`);
for (const source of freshness.staleSources) console.log(`- source stale: ${source}`);
for (const mismatch of venueTimeMismatches) console.log(`- ${mismatch.fixtureId} | venue/time mismatch: ${mismatch.fields.join(", ")}`);
if (!missingSnapshots.length && !lateSnapshots.length && !freshness.missingTimestampFixtures.length && !freshness.staleSources.length) console.log("- none");
console.log("Suggested next step:");
console.log("- Verify real match results.");
console.log("- Create a local results JSON file.");
console.log("- Run: npm run data:update-results -- --file <results.json>");
if (integrity.length) {
  console.error(`Structural integrity errors: ${integrity.length}`);
  process.exitCode = 1;
}
