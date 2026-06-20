import { readFileSync } from "node:fs";
import path from "node:path";
import {
  buildGroupStandings,
  getGroupStandingTable,
  getTeamFinishedMatches,
  getTeamRemainingMatches,
  getTeamStandingRow,
  getTeamStandingTable,
  resultImpactText
} from "../lib/group-standings";
import { getEnrichedMatches } from "../lib/match-intelligence";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore, EnrichedMatch } from "../lib/types";

const now = new Date("2026-06-19T12:00:00+08:00");

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

function requireMatch(matches: EnrichedMatch[], fixtureId: string) {
  const match = matches.find((item) => item.fixture.id === fixtureId);
  if (!match) fail(`Missing fixture ${fixtureId}`);
  return match;
}

function assertNoBadValues(match: EnrichedMatch) {
  if (!match.fixture.id) fail("empty match id");
  if (!match.fixture.group) fail(`${match.fixture.id} empty group`);
  if (!match.home.id || !match.away.id) fail(`${match.fixture.id} empty team id`);
  if (!match.home.group || !match.away.group) fail(`${match.fixture.id} empty team group`);
  for (const value of [match.upsetRisk, match.fixture.heatIndex]) {
    if (!Number.isFinite(value)) fail(`${match.fixture.id} has non-finite numeric value`);
  }
}

function assertTeamPage(teamId: string, expected: { group: string; points: number; goalDifference: number; played: number }) {
  const row = getTeamStandingRow(tables, teamId);
  const table = getTeamStandingTable(tables, teamId);
  const team = store.teams.find((item) => item.id === teamId);
  if (!team) fail(`Missing team ${teamId}`);
  if (!row) fail(`Missing standing row for ${teamId}`);
  if (!table) fail(`Missing standing table for ${teamId}`);
  if (team.group !== expected.group) fail(`${teamId} expected group ${expected.group}, got ${team.group}`);
  if (table.group !== expected.group) fail(`${teamId} table expected group ${expected.group}, got ${table.group}`);
  if (table.rows.length !== 4) fail(`${teamId} standings table should contain 4 teams`);
  if (row.points !== expected.points) fail(`${teamId} expected points ${expected.points}, got ${row.points}`);
  if (row.goalDifference !== expected.goalDifference) fail(`${teamId} expected GD ${expected.goalDifference}, got ${row.goalDifference}`);
  if (row.played !== expected.played) fail(`${teamId} expected played ${expected.played}, got ${row.played}`);
  if (!row.qualificationText) fail(`${teamId} missing qualification text`);

  const remaining = getTeamRemainingMatches(matches, teamId);
  const finished = getTeamFinishedMatches(matches, teamId);
  if (!remaining.length) fail(`${teamId} should have remaining fixtures`);
  if (!finished.length) fail(`${teamId} should have finished fixtures`);

  console.log(`/teams/${teamId} ${team.group} group rank=${row.rank} points=${row.points} GD=${row.goalDifference}`);
}

function assertFinishedImpact(fixtureId: string, expectedNeedles: string[]) {
  const match = requireMatch(matches, fixtureId);
  const table = getGroupStandingTable(tables, match.fixture.group);
  const impact = resultImpactText(match);
  assertNoBadValues(match);
  if (!table) fail(`${fixtureId} missing group standings`);
  if (table.rows.length !== 4) fail(`${fixtureId} group standings should contain 4 rows`);
  if (match.status !== "finished") fail(`${fixtureId} expected finished, got ${match.status}`);
  for (const needle of expectedNeedles) {
    if (!impact.includes(needle)) fail(`${fixtureId} impact missing ${needle}: ${impact}`);
  }
  console.log(`/matches/${fixtureId} ${match.home.shortName} vs ${match.away.shortName}: ${impact}`);
}

function assertScheduledImpact(fixtureId: string) {
  const match = requireMatch(matches, fixtureId);
  const table = getGroupStandingTable(tables, match.fixture.group);
  const impact = resultImpactText(match);
  assertNoBadValues(match);
  if (!table) fail(`${fixtureId} missing group standings`);
  if (match.status !== "scheduled") fail(`${fixtureId} expected scheduled, got ${match.status}`);
  for (const needle of ["本场比赛结果将影响", "本组积分榜", "直接出线区", "第三名竞争区"]) {
    if (!impact.includes(needle)) fail(`${fixtureId} scheduled impact missing ${needle}: ${impact}`);
  }
  if (impact.includes("本场赛果已计入")) fail(`${fixtureId} scheduled impact must not say result counted`);
  console.log(`/matches/${fixtureId} ${match.home.shortName} vs ${match.away.shortName}: ${impact}`);
}

const store = loadStore();
const matches = getEnrichedMatches(store, { now });
const tables = buildGroupStandings(matches, store.teams);

for (const match of matches) assertNoBadValues(match);

assertTeamPage("mexico", { group: "A", played: 2, points: 6, goalDifference: 3 });
assertTeamPage("south-korea", { group: "A", played: 2, points: 3, goalDifference: 0 });
assertTeamPage("canada", { group: "B", played: 2, points: 4, goalDifference: 6 });

assertFinishedImpact("match-008", [
  "本场赛果已计入 A 组积分榜",
  "捷克获得 1 分",
  "南非获得 1 分"
]);
assertFinishedImpact("match-010", [
  "本场赛果已计入 B 组积分榜",
  "加拿大获得 3 分",
  "卡塔尔获得 0 分"
]);
assertScheduledImpact("match-029");

console.log("PASS check:standings-pages");
