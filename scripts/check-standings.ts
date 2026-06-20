import { readFileSync } from "node:fs";
import path from "node:path";
import { buildGroupStandings, type GroupStandingRow } from "../lib/group-standings";
import { getEnrichedMatches } from "../lib/match-intelligence";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore, EnrichedMatch } from "../lib/types";

const expectedGroups = "ABCDEFGHIJKL".split("");
const now = new Date("2026-06-19T12:00:00+08:00");

interface ExpectedRow {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

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

function blankExpected(): ExpectedRow {
  return {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  };
}

function hasScore(match: EnrichedMatch) {
  return match.result.homeScore !== undefined && match.result.awayScore !== undefined;
}

function applyExpected(row: ExpectedRow, goalsFor: number, goalsAgainst: number) {
  row.played += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    row.wins += 1;
    row.points += 3;
  } else if (goalsFor < goalsAgainst) {
    row.losses += 1;
  } else {
    row.draws += 1;
    row.points += 1;
  }
}

function assertRow(teamId: string, actual: GroupStandingRow | undefined, expected: ExpectedRow) {
  if (!actual) fail(`Missing standing row for ${teamId}`);

  const fields: (keyof ExpectedRow)[] = [
    "played",
    "wins",
    "draws",
    "losses",
    "goalsFor",
    "goalsAgainst",
    "goalDifference",
    "points"
  ];

  for (const field of fields) {
    if (actual[field] !== expected[field]) {
      fail(`${teamId} ${field} expected ${expected[field]}, got ${actual[field]}`);
    }
  }

  if (actual.played !== actual.wins + actual.draws + actual.losses) {
    fail(`${teamId} played does not equal wins+draws+losses`);
  }

  if (actual.goalDifference !== actual.goalsFor - actual.goalsAgainst) {
    fail(`${teamId} goalDifference does not equal goalsFor-goalsAgainst`);
  }
}

function assertExpectedSnapshot(rows: GroupStandingRow[], teamName: string, expected: ExpectedRow & { rank: number }) {
  const row = rows.find((item) => item.teamName === teamName);
  if (!row) fail(`Missing expected snapshot row ${teamName}`);
  assertRow(teamName, row, expected);
  if (row.rank !== expected.rank) fail(`${teamName} rank expected ${expected.rank}, got ${row.rank}`);
}

const store = loadStore();
const matches = getEnrichedMatches(store, { now });
const tables = buildGroupStandings(matches, store.teams);
const expectedByTeam = new Map(store.teams.map((team) => [team.id, blankExpected()]));

if (tables.length !== 12) fail(`expected 12 group tables, got ${tables.length}`);

for (const match of matches) {
  if (match.status !== "finished" || !hasScore(match)) continue;

  const home = expectedByTeam.get(match.home.id);
  const away = expectedByTeam.get(match.away.id);
  if (!home || !away || match.result.homeScore === undefined || match.result.awayScore === undefined) {
    fail(`Finished match ${match.fixture.id} references unknown teams or missing score`);
  }

  applyExpected(home, match.result.homeScore, match.result.awayScore);
  applyExpected(away, match.result.awayScore, match.result.homeScore);
}

for (const group of expectedGroups) {
  const table = tables.find((item) => item.group === group);
  if (!table) fail(`Missing group table ${group}`);
  if (table.rows.length !== 4) fail(`Group ${group} expected 4 rows, got ${table.rows.length}`);
  if (table.totalMatches !== 6) fail(`Group ${group} expected 6 total matches, got ${table.totalMatches}`);

  const ranks = table.rows.map((row) => row.rank).sort((a, b) => a - b);
  if (ranks.join(",") !== "1,2,3,4") fail(`Group ${group} ranks must be 1,2,3,4; got ${ranks.join(",")}`);

  for (const row of table.rows) {
    assertRow(row.teamId, row, expectedByTeam.get(row.teamId) ?? blankExpected());
    if (!Number.isFinite(row.points) || !Number.isFinite(row.goalDifference)) {
      fail(`${row.teamName} has non-finite standing values`);
    }
  }
}

assertExpectedSnapshot(tables.find((table) => table.group === "A")?.rows ?? [], "墨西哥", {
  rank: 1,
  played: 2,
  wins: 2,
  draws: 0,
  losses: 0,
  goalsFor: 3,
  goalsAgainst: 0,
  goalDifference: 3,
  points: 6
});
assertExpectedSnapshot(tables.find((table) => table.group === "A")?.rows ?? [], "韩国", {
  rank: 2,
  played: 2,
  wins: 1,
  draws: 0,
  losses: 1,
  goalsFor: 2,
  goalsAgainst: 2,
  goalDifference: 0,
  points: 3
});
assertExpectedSnapshot(tables.find((table) => table.group === "A")?.rows ?? [], "捷克", {
  rank: 3,
  played: 2,
  wins: 0,
  draws: 1,
  losses: 1,
  goalsFor: 2,
  goalsAgainst: 3,
  goalDifference: -1,
  points: 1
});
assertExpectedSnapshot(tables.find((table) => table.group === "A")?.rows ?? [], "南非", {
  rank: 4,
  played: 2,
  wins: 0,
  draws: 1,
  losses: 1,
  goalsFor: 1,
  goalsAgainst: 3,
  goalDifference: -2,
  points: 1
});
assertExpectedSnapshot(tables.find((table) => table.group === "B")?.rows ?? [], "加拿大", {
  rank: 1,
  played: 2,
  wins: 1,
  draws: 1,
  losses: 0,
  goalsFor: 7,
  goalsAgainst: 1,
  goalDifference: 6,
  points: 4
});
assertExpectedSnapshot(tables.find((table) => table.group === "B")?.rows ?? [], "瑞士", {
  rank: 2,
  played: 2,
  wins: 1,
  draws: 1,
  losses: 0,
  goalsFor: 5,
  goalsAgainst: 2,
  goalDifference: 3,
  points: 4
});
assertExpectedSnapshot(tables.find((table) => table.group === "B")?.rows ?? [], "波黑", {
  rank: 3,
  played: 2,
  wins: 0,
  draws: 1,
  losses: 1,
  goalsFor: 2,
  goalsAgainst: 5,
  goalDifference: -3,
  points: 1
});
assertExpectedSnapshot(tables.find((table) => table.group === "B")?.rows ?? [], "卡塔尔", {
  rank: 4,
  played: 2,
  wins: 0,
  draws: 1,
  losses: 1,
  goalsFor: 1,
  goalsAgainst: 7,
  goalDifference: -6,
  points: 1
});

const tieNoted = tables.some((table) => table.rows.some((row) => row.notes.some((note) => note.includes("同分排序"))));
if (!tieNoted) fail("Expected at least one simplified tie note for unplayed/equal groups");

console.log("standings=");
for (const table of tables) {
  console.log(`  Group ${table.group}: ${table.finishedMatches}/${table.totalMatches} finished`);
  for (const row of table.rows) {
    console.log(`    ${row.rank}. ${row.teamName} ${row.points} pts GD ${row.goalDifference}`);
  }
}
console.log("PASS check:standings");
