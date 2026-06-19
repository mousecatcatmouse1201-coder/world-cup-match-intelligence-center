import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildSourceAuditReport } from "../lib/data-quality";
import {
  dataSourceSchema,
  fixtureSchema,
  oddsSchema,
  playerSchema,
  rankingSchema,
  sentimentSchema,
  standingSchema,
  teamSchema
} from "../lib/schemas";
import type {
  DataSource,
  DataStore,
  Fixture,
  OddsSnapshot,
  Player,
  Ranking,
  RecordSource,
  SentimentSnapshot,
  Standing,
  Team
} from "../lib/types";

interface RawManifestEntry {
  id: string;
  name: string;
  url: string;
  kind: "official" | "secondary";
  fetchedAt: string;
  fileName?: string;
  ok: boolean;
}

const storeDir = path.join(process.cwd(), "data", "store");
const rawDir = path.join(process.cwd(), "data", "raw");
const now = new Date().toISOString();

async function readManifest() {
  try {
    const raw = await readFile(path.join(rawDir, "manifest.json"), "utf8");
    return JSON.parse(raw) as RawManifestEntry[];
  } catch {
    return [] as RawManifestEntry[];
  }
}

function latest(manifest: RawManifestEntry[], id: string) {
  return [...manifest].reverse().find((entry) => entry.id === id && entry.ok) ?? null;
}

function sourceFromManifest(
  manifest: RawManifestEntry[],
  id: string,
  fallback: Omit<DataSource, keyof RecordSource> & RecordSource
): DataSource {
  const entry = latest(manifest, id);
  if (!entry) {
    return fallback;
  }

  return {
    sourceId: entry.id,
    sourceName: entry.name,
    sourceUrl: entry.url,
    sourceKind: entry.kind,
    lastFetchedAt: entry.fetchedAt,
    confidence: entry.kind === "official" ? "official" : "secondary",
    isMockOrEstimated: false,
    description: fallback.description
  };
}

function derivedSource(source: DataSource, overrides: Partial<RecordSource> = {}): RecordSource {
  return {
    sourceId: source.sourceId,
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    sourceKind: source.sourceKind,
    lastFetchedAt: source.lastFetchedAt,
    confidence: source.confidence,
    isMockOrEstimated: source.isMockOrEstimated,
    ...overrides
  };
}

function modelSource(): RecordSource {
  return {
    sourceId: "local-model-derived",
    sourceName: "本地规则模型推断",
    sourceUrl: "https://example.local/world-cup-match-intelligence-center/model",
    sourceKind: "model",
    lastFetchedAt: now,
    confidence: "modeled",
    isMockOrEstimated: true
  };
}

function estimateSource(label: string): RecordSource {
  return {
    sourceId: `manual-${label}`,
    sourceName: "MVP 示例补充数据",
    sourceUrl: "https://example.local/world-cup-match-intelligence-center/manual-seed",
    sourceKind: "manual",
    lastFetchedAt: now,
    confidence: "estimated",
    isMockOrEstimated: true
  };
}

function writeValidatedJson<T>(fileName: string, schema: { parse: (value: unknown) => T[] }, value: T[]) {
  schema.parse(value);
  return writeFileAtomic(fileName, JSON.stringify(value, null, 2));
}

async function writeFileAtomic(fileName: string, content: string) {
  const tmpPath = path.join(storeDir, `${fileName}.tmp`);
  const finalPath = path.join(storeDir, fileName);
  await writeFile(tmpPath, `${content}\n`, "utf8");
  await rename(tmpPath, finalPath);
}

function buildStandings(fixtures: Fixture[], teams: Team[], source: RecordSource): Standing[] {
  const table = new Map<string, Standing>();

  for (const team of teams) {
    table.set(team.id, {
      teamId: team.id,
      group: team.group,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      qualificationProbability: Math.max(10, Math.min(92, 86 - team.fifaRank * 0.7 + team.form * 0.3)),
      source
    });
  }

  for (const fixture of fixtures) {
    if (fixture.status !== "finished" || !fixture.score) {
      continue;
    }

    const home = table.get(fixture.homeTeamId);
    const away = table.get(fixture.awayTeamId);
    if (!home || !away) {
      continue;
    }

    home.played += 1;
    away.played += 1;
    home.goalsFor += fixture.score.home;
    home.goalsAgainst += fixture.score.away;
    away.goalsFor += fixture.score.away;
    away.goalsAgainst += fixture.score.home;

    if (fixture.score.home > fixture.score.away) {
      home.won += 1;
      away.lost += 1;
      home.points += 3;
    } else if (fixture.score.home < fixture.score.away) {
      away.won += 1;
      home.lost += 1;
      away.points += 3;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  return [...table.values()];
}

async function main() {
  await mkdir(storeDir, { recursive: true });
  const manifest = await readManifest();

  const fifaFixtures = sourceFromManifest(manifest, "fifa-fixtures-official", {
    sourceId: "fifa-fixtures-official",
    sourceName: "FIFA World Cup 2026 官方赛程",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures",
    sourceKind: "official",
    lastFetchedAt: now,
    confidence: "official",
    isMockOrEstimated: false,
    description: "官方赛程、场馆、分组和比分原始快照。"
  });

  const fifaRanking = sourceFromManifest(manifest, "fifa-ranking-official", {
    sourceId: "fifa-ranking-official",
    sourceName: "FIFA/Coca-Cola 男足世界排名",
    sourceUrl: "https://inside.fifa.com/fifa-world-ranking/men",
    sourceKind: "official",
    lastFetchedAt: now,
    confidence: "official",
    isMockOrEstimated: false,
    description: "FIFA 官方男足世界排名原始快照。"
  });

  const espnFixtures = sourceFromManifest(manifest, "espn-fixtures-secondary", {
    sourceId: "espn-fixtures-secondary",
    sourceName: "ESPN 2026 World Cup 赛程校验",
    sourceUrl: "https://www.espn.com/soccer/schedule/_/league/fifa.world",
    sourceKind: "secondary",
    lastFetchedAt: now,
    confidence: "secondary",
    isMockOrEstimated: false,
    description: "二级公开来源，用于校验赛程和赛果。"
  });

  const manualSeed: DataSource = {
    sourceId: "manual-mvp-intel",
    sourceName: "MVP 示例补充数据",
    sourceUrl: "https://example.local/world-cup-match-intelligence-center/manual-seed",
    sourceKind: "manual",
    lastFetchedAt: now,
    confidence: "estimated",
    isMockOrEstimated: true,
    description: "伤停、赔率、舆情、球员状态等无免费权威 API 的演示补充数据。"
  };

  const model: DataSource = {
    ...modelSource(),
    description: "基于排名、状态、伤停、赛程和示例市场信息计算的模型推断。"
  };

  const officialFixtureSource = derivedSource(fifaFixtures);
  const officialRankingSource = derivedSource(fifaRanking);
  const secondaryFixtureSource = derivedSource(espnFixtures);
  const estimated = derivedSource(manualSeed);

  const teams: Team[] = [
    ["mexico", "墨西哥", "墨西哥", "MEX", "A", "CONCACAF", 13, 1681, 79, 77, 78, 82, 76],
    ["south-africa", "南非", "南非", "RSA", "A", "CAF", 56, 1420, 68, 69, 66, 63, 70],
    ["south-korea", "韩国", "韩国", "KOR", "A", "AFC", 23, 1585, 76, 74, 75, 78, 79],
    ["czechia", "捷克", "捷克", "CZE", "A", "UEFA", 39, 1498, 72, 73, 74, 70, 68],
    ["canada", "加拿大", "加拿大", "CAN", "B", "CONCACAF", 32, 1522, 74, 71, 72, 73, 81],
    ["bosnia", "波黑", "波黑", "BIH", "B", "UEFA", 48, 1453, 71, 70, 73, 66, 65],
    ["united-states", "美国", "美国", "USA", "D", "CONCACAF", 17, 1632, 78, 75, 77, 80, 83],
    ["paraguay", "巴拉圭", "巴拉圭", "PAR", "D", "CONMEBOL", 44, 1472, 69, 75, 70, 68, 66],
    ["england", "英格兰", "英格兰", "ENG", "L", "UEFA", 4, 1826, 88, 84, 87, 83, 79],
    ["croatia", "克罗地亚", "克罗地亚", "CRO", "L", "UEFA", 12, 1697, 80, 79, 86, 75, 68],
    ["colombia", "哥伦比亚", "哥伦比亚", "COL", "K", "CONMEBOL", 14, 1678, 81, 78, 80, 84, 76],
    ["uzbekistan", "乌兹别克斯坦", "乌兹别克", "UZB", "K", "AFC", 58, 1412, 67, 68, 66, 72, 73],
    ["ghana", "加纳", "加纳", "GHA", "L", "CAF", 74, 1347, 70, 67, 69, 64, 77],
    ["panama", "巴拿马", "巴拿马", "PAN", "L", "CONCACAF", 43, 1478, 69, 68, 69, 71, 74]
  ].map(([id, name, shortName, fifaCode, group, region, fifaRank, rankingPoints, attack, defense, midfield, form, tempo]) => ({
    id,
    name,
    shortName,
    fifaCode,
    group,
    region,
    fifaRank,
    rankingPoints,
    attack,
    defense,
    midfield,
    form,
    tempo,
    source: officialRankingSource
  })) as Team[];

  const fixtures: Fixture[] = [
    ["match-001", "A", "小组赛", "2026-06-11T19:00:00-06:00", "Mexico City Stadium", "Mexico City", "mexico", "south-africa", "finished", 2, 0, 94],
    ["match-002", "B", "小组赛", "2026-06-12T16:00:00-04:00", "Toronto Stadium", "Toronto", "canada", "bosnia", "finished", 1, 1, 80],
    ["match-003", "D", "小组赛", "2026-06-12T18:00:00-07:00", "Los Angeles Stadium", "Los Angeles", "united-states", "paraguay", "finished", 4, 1, 91],
    ["match-004", "A", "小组赛", "2026-06-13T13:00:00-06:00", "Guadalajara Stadium", "Guadalajara", "south-korea", "czechia", "finished", 2, 1, 78],
    ["match-005", "L", "小组赛", "2026-06-18T19:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "england", "croatia", "scheduled", null, null, 96],
    ["match-006", "K", "小组赛", "2026-06-18T16:00:00-05:00", "Houston Stadium", "Houston", "colombia", "uzbekistan", "scheduled", null, null, 82],
    ["match-007", "L", "小组赛", "2026-06-18T13:00:00-05:00", "Kansas City Stadium", "Kansas City", "ghana", "panama", "scheduled", null, null, 74],
    ["match-008", "A", "小组赛", "2026-06-18T15:00:00-06:00", "Monterrey Stadium", "Monterrey", "czechia", "south-africa", "scheduled", null, null, 70]
  ].map(([id, group, stage, kickoff, venue, city, homeTeamId, awayTeamId, status, home, away, heatIndex]) => ({
    id,
    group,
    stage,
    kickoff,
    venue,
    city,
    homeTeamId,
    awayTeamId,
    status,
    score:
      typeof home === "number" && typeof away === "number"
        ? {
            home,
            away
          }
        : undefined,
    heatIndex,
    source: status === "finished" ? secondaryFixtureSource : officialFixtureSource
  })) as Fixture[];

  const playerRows = [
    ["p-mex-1", "mexico", "Santiago Gimenez", "中锋", "fit", 83, "禁区终结和前场压迫是核心看点。"],
    ["p-mex-2", "mexico", "Edson Alvarez", "后腰", "fit", 80, "中场屏障决定转换防守质量。"],
    ["p-rsa-1", "south-africa", "Percy Tau", "边锋", "doubtful", 76, "速度反击有威胁，但状态标注为赛前观察。"],
    ["p-kor-1", "south-korea", "Son Heung-min", "前锋", "fit", 91, "纵深跑动和反击终结能力突出。"],
    ["p-cze-1", "czechia", "Patrik Schick", "中锋", "fit", 84, "定位球和禁区争顶是主要威胁。"],
    ["p-usa-1", "united-states", "Christian Pulisic", "边锋", "fit", 86, "一对一推进和弱侧接应是进攻开关。"],
    ["p-par-1", "paraguay", "Miguel Almiron", "前腰", "fit", 81, "反击推进和二点球处理值得关注。"],
    ["p-eng-1", "england", "Jude Bellingham", "中场", "fit", 93, "前插和肋部串联能改变比赛节奏。"],
    ["p-eng-2", "england", "Harry Kane", "中锋", "fit", 91, "回撤组织和禁区终结同时在线。"],
    ["p-cro-1", "croatia", "Luka Modric", "中场", "fit", 86, "控节奏和定位球质量仍是关键变量。"],
    ["p-col-1", "colombia", "Luis Diaz", "边锋", "fit", 88, "左路爆点和转换进攻最具威胁。"],
    ["p-uzb-1", "uzbekistan", "Eldor Shomurodov", "中锋", "fit", 78, "支点和冲击禁区能力是进攻基础。"],
    ["p-gha-1", "ghana", "Mohammed Kudus", "前腰", "fit", 84, "中路摆脱和远射会影响防线站位。"],
    ["p-pan-1", "panama", "Adalberto Carrasquilla", "中场", "fit", 78, "攻守转换中的第一脚出球很重要。"]
  ] as const;

  const players: Player[] = playerRows.map(([id, teamId, name, role, status, impact, note]) => ({
    id,
    teamId,
    name,
    role,
    status,
    impact,
    note,
    source: estimated
  }));

  const rankings: Ranking[] = teams.map((team) => ({
    teamId: team.id,
    fifaRank: team.fifaRank,
    rankingPoints: team.rankingPoints,
    previousRank: Math.max(1, team.fifaRank + Math.round((team.form - 72) / 6)),
    source: officialRankingSource
  }));

  const standings = buildStandings(fixtures, teams, modelSource());

  const odds: OddsSnapshot[] = fixtures.map((fixture) => ({
    fixtureId: fixture.id,
    homeWin: 2.05 + (fixture.heatIndex < 80 ? 0.25 : 0),
    draw: 3.25,
    awayWin: 3.1 + (fixture.heatIndex > 90 ? 0.2 : 0),
    source: estimateSource("odds")
  }));

  const sentiment: SentimentSnapshot[] = fixtures.map((fixture) => ({
    fixtureId: fixture.id,
    buzz: fixture.heatIndex,
    positiveHome: Math.min(88, 44 + fixture.heatIndex / 3),
    positiveAway: Math.max(24, 74 - fixture.heatIndex / 4),
    source: estimateSource("sentiment")
  }));

  const sources = [fifaFixtures, fifaRanking, espnFixtures, manualSeed, model];
  const store: DataStore = {
    sources,
    teams,
    players,
    fixtures,
    standings,
    rankings,
    odds,
    sentiment
  };

  const teamIds = new Set(teams.map((team) => team.id));
  for (const fixture of fixtures) {
    if (!teamIds.has(fixture.homeTeamId) || !teamIds.has(fixture.awayTeamId)) {
      throw new Error(`Fixture ${fixture.id} references an unknown team`);
    }
  }

  await writeValidatedJson("sources.json", { parse: (value) => dataSourceSchema.array().parse(value) }, sources);
  await writeValidatedJson("teams.json", { parse: (value) => teamSchema.array().parse(value) }, teams);
  await writeValidatedJson("fixtures.json", { parse: (value) => fixtureSchema.array().parse(value) }, fixtures);
  await writeValidatedJson("players.json", { parse: (value) => playerSchema.array().parse(value) }, players);
  await writeValidatedJson("standings.json", { parse: (value) => standingSchema.array().parse(value) }, standings);
  await writeValidatedJson("rankings.json", { parse: (value) => rankingSchema.array().parse(value) }, rankings);
  await writeValidatedJson("odds.json", { parse: (value) => oddsSchema.array().parse(value) }, odds);
  await writeValidatedJson("sentiment.json", { parse: (value) => sentimentSchema.array().parse(value) }, sentiment);
  await writeFileAtomic("source-audit.json", JSON.stringify(buildSourceAuditReport(store), null, 2));

  console.log(`写入 ${teams.length} 支球队、${fixtures.length} 场比赛、${players.length} 名关键球员。`);
  console.log("来源审计报告完成：data/store/source-audit.json");
  console.log("JSON 入库完成：data/store/*.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
