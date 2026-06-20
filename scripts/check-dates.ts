import { readFileSync } from "node:fs";
import path from "node:path";
import { getHighestUpsetRiskMatch, getMostPopularMatch } from "../lib/dashboard-matches";
import { getTodayDateKeyInBeijing } from "../lib/format";
import { getEnrichedMatches } from "../lib/match-intelligence";
import { dataStoreSchema } from "../lib/schemas";
import type { DataStore } from "../lib/types";

const now = new Date("2026-06-19T10:00:00+08:00");
const emptyStateText = "今日比赛数据未接入当前 MVP 样本。";
const requiredTodayNames = new Set([
  "捷克 vs 南非",
  "瑞士 vs 波黑",
  "加拿大 vs 卡塔尔",
  "墨西哥 vs 韩国"
]);
const forbiddenTodayNames = new Set([
  "英格兰 vs 克罗地亚",
  "加纳 vs 巴拿马",
  "哥伦比亚 vs 乌兹别克"
]);

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

function matchName(match: ReturnType<typeof getEnrichedMatches>[number]) {
  return `${match.home.shortName} vs ${match.away.shortName}`;
}

function fail(message: string) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

const store = loadStore();
const dashboardClientSource = readFileSync(path.join(process.cwd(), "components", "dashboard-client.tsx"), "utf8");
const enrichedMatches = getEnrichedMatches(store, { now });
const todayDateKey = getTodayDateKeyInBeijing(now);
const todayMatches = enrichedMatches.filter((match) => match.beijingDate === todayDateKey);
const todayNames = todayMatches.map(matchName);
const dataHasRequiredTodayMatches = [...requiredTodayNames].every((name) => todayNames.includes(name));
const allRows = enrichedMatches.map((match) => ({
  id: match.fixture.id,
  name: matchName(match),
  beijingDate: match.beijingDate,
  status: match.status
}));
const mostPopularTodayMatch = getMostPopularMatch(todayMatches);
const highestUpsetRiskTodayMatch = getHighestUpsetRiskMatch(todayMatches);

console.log(`todayDateKey=${todayDateKey}`);
console.log(`now=${now.toISOString()}`);
console.log("allMatches=");
for (const row of allRows) {
  console.log(`  ${row.id} ${row.name} ${row.beijingDate} ${row.status}`);
}
console.log("todayMatches=");
for (const match of todayMatches) {
  console.log(`  ${match.fixture.id} ${matchName(match)} ${match.beijingDate} ${match.status}`);
}
console.log(`mostPopularTodayMatch=${mostPopularTodayMatch ? matchName(mostPopularTodayMatch) : "none"}`);
console.log(`highestUpsetRiskTodayMatch=${highestUpsetRiskTodayMatch ? matchName(highestUpsetRiskTodayMatch) : "none"}`);
console.log(`emptyStateConfigured=${dashboardClientSource.includes(emptyStateText)}`);

if (todayDateKey !== "2026-06-19") {
  fail(`expected todayDateKey 2026-06-19, got ${todayDateKey}`);
}

if (!dataHasRequiredTodayMatches) {
  if (!dashboardClientSource.includes(emptyStateText)) {
    fail(`data is missing required today matches and homepage does not include empty state: ${emptyStateText}`);
  }
  if (todayMatches.length > 0) {
    fail("data is missing required today matches but todayMatches is not empty, which could produce a fake 今日比赛 count");
  }
}

for (const name of forbiddenTodayNames) {
  if (todayNames.includes(name)) {
    fail(`forbidden old match entered 2026-06-19 todayMatches: ${name}`);
  }
}

if (highestUpsetRiskTodayMatch && matchName(highestUpsetRiskTodayMatch) === "加纳 vs 巴拿马") {
  fail("加纳 vs 巴拿马 was selected as 今日最大冷门风险");
}

if (todayMatches.some((match) => match.beijingDate !== todayDateKey)) {
  fail("todayMatches contains a match whose beijingDate does not equal todayDateKey");
}

const focusNames = [
  mostPopularTodayMatch ? matchName(mostPopularTodayMatch) : null,
  highestUpsetRiskTodayMatch ? matchName(highestUpsetRiskTodayMatch) : null
].filter(Boolean);

for (const name of focusNames) {
  if (!todayNames.includes(name as string)) {
    fail(`focus match was selected outside todayMatches: ${name}`);
  }
}

if (!process.exitCode) {
  console.log("PASS check:dates");
  console.log("PASS 英格兰 vs 克罗地亚没有进入 2026-06-19 todayMatches");
  console.log("PASS 加纳 vs 巴拿马没有作为今日最大冷门风险");
  if (dataHasRequiredTodayMatches) {
    console.log("PASS data/store/*.json 已补齐 2026-06-19 北京时间真实比赛");
  } else {
    console.log(`PASS 数据未补齐时首页配置了空状态：${emptyStateText}`);
  }
}
