import { readFileSync } from "node:fs";
import path from "node:path";
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

function assertFinishedResult(match: EnrichedMatch, homeScore: number, awayScore: number) {
  if (match.status !== "finished") {
    throw new Error(`${matchName(match)} expected finished, got ${match.status}`);
  }

  if (match.result.homeScore !== homeScore || match.result.awayScore !== awayScore) {
    throw new Error(`${matchName(match)} expected result ${homeScore}-${awayScore}, got ${match.result.homeScore}-${match.result.awayScore}`);
  }

  if (match.fixture.score?.home !== homeScore || match.fixture.score?.away !== awayScore) {
    throw new Error(`${matchName(match)} fixture.score expected ${homeScore}-${awayScore}`);
  }

  if (match.fixture.result?.homeScore !== homeScore || match.fixture.result?.awayScore !== awayScore) {
    throw new Error(`${matchName(match)} fixture.result expected ${homeScore}-${awayScore}`);
  }
}

function rankingStatusLabel(match: EnrichedMatch) {
  if (match.status === "finished" && match.result.homeScore !== undefined && match.result.awayScore !== undefined) {
    return `已结束 · 实际比分 ${match.home.shortName} ${match.result.homeScore}-${match.result.awayScore} ${match.away.shortName}`;
  }

  if (match.status === "finished" && (match.result.homeScore === undefined || match.result.awayScore === undefined)) {
    return "历史样本，赛果未接入";
  }

  return match.status;
}

const matches = getEnrichedMatches(loadStore(), { now });
const requiredRankingIds = new Set(["match-005", "match-007"]);
const ranking = [
  ...matches.slice().sort((a, b) => b.upsetRisk - a.upsetRisk).slice(0, 5),
  ...matches.filter((match) => requiredRankingIds.has(match.fixture.id))
].filter((match, index, rows) => rows.findIndex((item) => item.fixture.id === match.fixture.id) === index);
const englandCroatia = requireMatch(matches, "英格兰 vs 克罗地亚");
const ghanaPanama = requireMatch(matches, "加纳 vs 巴拿马");

assertFinishedResult(englandCroatia, 4, 2);
assertFinishedResult(ghanaPanama, 1, 0);

for (const match of ranking) {
  const label = rankingStatusLabel(match);

  if (match.status === "finished" && label.includes("赛果待更新")) {
    throw new Error(`${matchName(match)} ranking row must not show 赛果待更新`);
  }

  if (match.status === "finished" && match.result.homeScore === undefined && !label.includes("历史样本，赛果未接入")) {
    throw new Error(`${matchName(match)} historical finished sample without result must show 历史样本，赛果未接入`);
  }
}

for (const match of [englandCroatia, ghanaPanama]) {
  if (!ranking.some((item) => item.fixture.id === match.fixture.id)) {
    throw new Error(`${matchName(match)} must remain visible in homepage upset-risk ranking section`);
  }
}

console.log("ranking=");
for (const match of ranking) {
  console.log(`  ${match.fixture.id} ${matchName(match)} ${rankingStatusLabel(match)} · 冷门风险 ${match.upsetRisk}`);
}
console.log("PASS check:rankings");
console.log("PASS 全量样本冷门风险排行 status/result display");
console.log("PASS England vs Croatia finished result is 4-2");
console.log("PASS Ghana vs Panama finished result is 1-0");
