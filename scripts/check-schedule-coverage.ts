import { readFileSync } from "node:fs";
import path from "node:path";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore, Fixture } from "../lib/types";

const expectedGroups = "ABCDEFGHIJKL".split("");

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(path.join(process.cwd(), "data", "store", fileName), "utf8")) as T;
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

function fail(message: string): never {
  throw new Error(message);
}

function fixtureName(fixture: Fixture) {
  return `${fixture.id} ${fixture.homeTeamId ?? fixture.homePlaceholder} vs ${fixture.awayTeamId ?? fixture.awayPlaceholder}`;
}

const store = loadStore();
const groupFixtures = store.fixtures.filter((fixture) => fixture.stage === "小组赛");
const fixtureIds = new Set<string>();
const externalIds = new Set<string>();
const teamIds = new Set(store.teams.map((team) => team.id));

if (groupFixtures.length !== 72) {
  fail(`expected 72 group fixtures, got ${groupFixtures.length}`);
}

for (const group of expectedGroups) {
  const fixtures = groupFixtures.filter((fixture) => fixture.group === group);
  const teams = store.teams.filter((team) => team.group === group);

  if (fixtures.length !== 6) fail(`Group ${group} expected 6 fixtures, got ${fixtures.length}`);
  if (teams.length !== 4) fail(`Group ${group} expected 4 teams, got ${teams.length}`);
}

for (const fixture of groupFixtures) {
  if (fixtureIds.has(fixture.id)) fail(`duplicate fixture id ${fixture.id}`);
  fixtureIds.add(fixture.id);

  for (const [kind, value] of Object.entries(fixture.externalIds ?? {})) {
    if (!value) continue;
    const key = `${kind}:${value}`;
    if (externalIds.has(key)) fail(`duplicate external id ${key}`);
    externalIds.add(key);
  }

  if (!fixture.kickoffAtUtc || Number.isNaN(new Date(fixture.kickoffAtUtc).getTime())) fail(`${fixtureName(fixture)} missing valid kickoffAtUtc`);
  if (!fixture.beijingDate) fail(`${fixtureName(fixture)} missing beijingDate`);
  if (!fixture.beijingTimeLabel) fail(`${fixtureName(fixture)} missing beijingTimeLabel`);
  if (!fixture.venue) fail(`${fixtureName(fixture)} missing venue`);
  if (!fixture.group) fail(`${fixtureName(fixture)} missing group`);
  if (!fixture.homeTeamId || !fixture.awayTeamId) fail(`${fixtureName(fixture)} has empty group-stage team`);
  if (!teamIds.has(fixture.homeTeamId)) fail(`${fixtureName(fixture)} unknown home team`);
  if (!teamIds.has(fixture.awayTeamId)) fail(`${fixtureName(fixture)} unknown away team`);
  if (fixture.homeTeamId === fixture.awayTeamId) fail(`${fixtureName(fixture)} repeats same team`);

  if (fixture.status === "finished") {
    if (
      fixture.result?.homeScore === undefined ||
      fixture.result.awayScore === undefined ||
      fixture.score?.home === undefined ||
      fixture.score.away === undefined
    ) {
      fail(`${fixtureName(fixture)} is finished without synchronized result/score`);
    }
  }

  if (fixture.status === "scheduled" && (fixture.result || fixture.score)) {
    fail(`${fixtureName(fixture)} scheduled fixture must not contain fake result`);
  }
}

console.log("groups=");
for (const group of expectedGroups) {
  console.log(`  Group ${group}: ${groupFixtures.filter((fixture) => fixture.group === group).length} fixtures`);
}
console.log(`fixtures=${groupFixtures.length}`);
console.log(`teams=${store.teams.length}`);
console.log("PASS check:schedule coverage");
