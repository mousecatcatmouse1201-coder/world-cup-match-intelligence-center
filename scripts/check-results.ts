import { readFileSync } from "node:fs";
import path from "node:path";
import { getTodayDateKeyInBeijing } from "../lib/format";
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

function matchName(match: EnrichedMatch) {
  return `${match.home.shortName} vs ${match.away.shortName}`;
}

function requireMatch(matches: EnrichedMatch[], name: string) {
  const match = matches.find((item) => matchName(item) === name);
  if (!match) {
    throw new Error(`Missing match: ${name}`);
  }
  return match;
}

function assertResult(match: EnrichedMatch, homeScore: number, awayScore: number) {
  if (match.status !== "finished") {
    throw new Error(`${matchName(match)} expected status finished, got ${match.status}`);
  }

  if (match.result.homeScore !== homeScore || match.result.awayScore !== awayScore) {
    throw new Error(`${matchName(match)} expected result ${homeScore}-${awayScore}, got ${match.result.homeScore}-${match.result.awayScore}`);
  }

  if (match.fixture.result?.homeScore !== homeScore || match.fixture.result?.awayScore !== awayScore) {
    throw new Error(`${matchName(match)} fixture.result is not written as ${homeScore}-${awayScore}`);
  }

  if (match.fixture.score?.home !== homeScore || match.fixture.score?.away !== awayScore) {
    throw new Error(`${matchName(match)} fixture.score is not synchronized as ${homeScore}-${awayScore}`);
  }
}

const store = loadStore();
const enrichedMatches = getEnrichedMatches(store, { now });
const todayDateKey = getTodayDateKeyInBeijing(now);
const todayMatches = enrichedMatches.filter((match) => match.beijingDate === todayDateKey);
const scheduledMatches = todayMatches.filter((match) => match.status === "scheduled");
const resultPendingMatches = todayMatches.filter((match) => match.status === "result_pending");
const canadaQatar = requireMatch(todayMatches, "加拿大 vs 卡塔尔");
const mexicoKorea = requireMatch(todayMatches, "墨西哥 vs 韩国");
const switzerlandBosnia = requireMatch(todayMatches, "瑞士 vs 波黑");
const czechiaSouthAfrica = requireMatch(todayMatches, "捷克 vs 南非");

assertResult(canadaQatar, 6, 0);
assertResult(mexicoKorea, 1, 0);
assertResult(switzerlandBosnia, 4, 1);
assertResult(czechiaSouthAfrica, 1, 1);

const finishedNames = new Set([canadaQatar, mexicoKorea, switzerlandBosnia, czechiaSouthAfrica].map(matchName));
const misplacedScheduled = scheduledMatches.filter((match) => finishedNames.has(matchName(match)));
const misplacedResultPending = resultPendingMatches.filter((match) => finishedNames.has(matchName(match)));

if (misplacedScheduled.length || misplacedResultPending.length) {
  throw new Error(`Finished matches appeared in scheduled/result_pending sections: ${[
    ...misplacedScheduled,
    ...misplacedResultPending
  ].map(matchName).join(", ")}`);
}

console.log(`todayDateKey=${todayDateKey}`);
console.log("todayMatches=");
for (const match of todayMatches) {
  console.log(`  ${match.fixture.id} ${matchName(match)} ${match.status} ${match.result.homeScore}-${match.result.awayScore}`);
}
console.log("scheduledSection=");
for (const match of scheduledMatches) {
  console.log(`  ${match.fixture.id} ${matchName(match)}`);
}
console.log("resultPendingSection=");
for (const match of resultPendingMatches) {
  console.log(`  ${match.fixture.id} ${matchName(match)}`);
}
console.log("PASS check:results");
console.log("PASS Canada vs Qatar status === finished and result is 6-0");
console.log("PASS Mexico vs South Korea status === finished and result is 1-0");
console.log("PASS finished 今日比赛不在未开始或赛果待更新分区");
