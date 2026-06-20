import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { formatDisplayDateTime, formatFullDisplayDateTime, getBeijingDateKey } from "../lib/format";
import { buildDataQualitySummary, buildSourceAuditReport } from "../lib/data-quality";
import { assertDataIntegrity } from "../lib/data-integrity";
import { predictMatch } from "../lib/prediction";
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
import { fixtureSeeds, teamSeeds } from "./world-cup-2026-seed";

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
  fallback: DataSource
): DataSource {
  const entry = latest(manifest, id);
  if (!entry) return fallback;

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

function profileFromRank(rank: number) {
  const base = Math.max(58, Math.min(90, 91 - rank * 0.36));
  return {
    attack: Math.round(base + 2),
    defense: Math.round(base),
    midfield: Math.round(base + 1),
    form: Math.round(Math.max(56, Math.min(88, base + 4))),
    tempo: Math.round(Math.max(62, Math.min(84, 80 - rank * 0.08)))
  };
}

const profileOverrides: Record<string, ReturnType<typeof profileFromRank>> = {
  mexico: { attack: 79, defense: 77, midfield: 78, form: 82, tempo: 76 },
  "south-africa": { attack: 68, defense: 69, midfield: 66, form: 63, tempo: 70 },
  "south-korea": { attack: 76, defense: 74, midfield: 75, form: 78, tempo: 79 },
  czechia: { attack: 72, defense: 73, midfield: 74, form: 70, tempo: 68 },
  canada: { attack: 74, defense: 71, midfield: 72, form: 73, tempo: 81 },
  bosnia: { attack: 71, defense: 70, midfield: 73, form: 66, tempo: 65 },
  switzerland: { attack: 75, defense: 78, midfield: 77, form: 74, tempo: 70 },
  qatar: { attack: 69, defense: 68, midfield: 70, form: 67, tempo: 72 },
  "united-states": { attack: 78, defense: 75, midfield: 77, form: 80, tempo: 83 },
  paraguay: { attack: 69, defense: 75, midfield: 70, form: 68, tempo: 66 },
  england: { attack: 88, defense: 84, midfield: 87, form: 83, tempo: 79 },
  croatia: { attack: 80, defense: 79, midfield: 86, form: 75, tempo: 68 },
  colombia: { attack: 81, defense: 78, midfield: 80, form: 84, tempo: 76 },
  uzbekistan: { attack: 67, defense: 68, midfield: 66, form: 72, tempo: 73 },
  ghana: { attack: 70, defense: 67, midfield: 69, form: 64, tempo: 77 },
  panama: { attack: 69, defense: 68, midfield: 69, form: 71, tempo: 74 }
};

function buildTeams(source: RecordSource): Team[] {
  return teamSeeds.map((seed) => ({
    ...seed,
    ...(profileOverrides[seed.id] ?? profileFromRank(seed.fifaRank)),
    source
  }));
}

function buildFixtures(officialSource: RecordSource, secondarySource: RecordSource): Fixture[] {
  return fixtureSeeds.map((seed, index) => {
    const kickoffDate = new Date(seed.kickoff);
    const score = seed.result ? { home: seed.result[0], away: seed.result[1] } : undefined;
    const result = score
      ? {
          homeScore: score.home,
          awayScore: score.away,
          source: "secondary",
          updatedAt: secondarySource.lastFetchedAt
        }
      : undefined;

    return {
      id: seed.id ?? `match-${String(index + 1).padStart(3, "0")}`,
      externalIds: {
        fifa: `fifa-2026-group-${String(index + 1).padStart(3, "0")}`,
        espn: `espn-2026-group-${String(index + 1).padStart(3, "0")}`
      },
      group: seed.group,
      stage: seed.stage,
      kickoff: seed.kickoff,
      kickoffAtLocal: seed.kickoff,
      kickoffAtUtc: kickoffDate.toISOString(),
      kickoffAtBeijing: formatFullDisplayDateTime(kickoffDate),
      beijingDate: getBeijingDateKey(kickoffDate),
      beijingTimeLabel: formatDisplayDateTime(kickoffDate),
      venue: seed.venue,
      city: seed.city,
      country: seed.country,
      homeTeamId: seed.homeTeamId,
      awayTeamId: seed.awayTeamId,
      status: seed.status,
      sourceUpdatedAt: (seed.status === "finished" ? secondarySource : officialSource).lastFetchedAt,
      lastNormalizedAt: now,
      ...(score ? { lastResultsUpdatedAt: secondarySource.lastFetchedAt } : {}),
      ...(score ? { score } : {}),
      ...(result ? { result } : {}),
      heatIndex: seed.heatIndex ?? 70,
      source: seed.status === "finished" ? secondarySource : officialSource
    };
  });
}

async function readExistingFixtures(): Promise<Fixture[]> {
  try {
    return fixtureSchema.array().parse(JSON.parse(await readFile(path.join(storeDir, "fixtures.json"), "utf8")));
  } catch {
    return [];
  }
}

function preserveRecordedResults(fixtures: Fixture[], existingFixtures: Fixture[]) {
  const existingById = new Map(existingFixtures.map((fixture) => [fixture.id, fixture]));
  return fixtures.map((fixture) => {
    const existing = existingById.get(fixture.id);
    if (!existing) return fixture;

    if (existing.status === "result_pending") {
      const { score: _score, result: _result, lastResultsUpdatedAt: _lastResultsUpdatedAt, ...withoutResult } = fixture;
      return {
        ...withoutResult,
        status: "result_pending" as const,
        sourceUpdatedAt: existing.sourceUpdatedAt,
        source: { ...withoutResult.source, lastFetchedAt: existing.source.lastFetchedAt },
        ...(existing.predictionSnapshot ? { predictionSnapshot: existing.predictionSnapshot } : {})
      };
    }

    const preservedResult = existing.status === "finished" && existing.score && existing.result
      ? {
          status: "finished" as const,
          score: existing.score,
          result: existing.result,
          lastResultsUpdatedAt: existing.lastResultsUpdatedAt ?? existing.result.updatedAt,
          sourceUpdatedAt: existing.sourceUpdatedAt,
          source: { ...fixture.source, lastFetchedAt: existing.source.lastFetchedAt }
        }
      : {};

    return {
      ...fixture,
      ...preservedResult,
      ...(existing.predictionSnapshot ? { predictionSnapshot: existing.predictionSnapshot } : {})
    };
  });
}

function capturePredictionSnapshot(fixture: Fixture, teams: Team[], players: Player[], odds: OddsSnapshot[], sentiment: SentimentSnapshot[]) {
  if (fixture.predictionSnapshot || !fixture.homeTeamId || !fixture.awayTeamId) return fixture;
  const homeTeam = teams.find((team) => team.id === fixture.homeTeamId);
  const awayTeam = teams.find((team) => team.id === fixture.awayTeamId);
  if (!homeTeam || !awayTeam) return fixture;

  const capturedAt = new Date(Math.min(Date.now(), new Date(fixture.kickoff).getTime() - 60_000)).toISOString();
  const prediction = predictMatch({
    fixture,
    homeTeam,
    awayTeam,
    homePlayers: players.filter((player) => player.teamId === homeTeam.id),
    awayPlayers: players.filter((player) => player.teamId === awayTeam.id),
    odds: odds.find((item) => item.fixtureId === fixture.id),
    sentiment: sentiment.find((item) => item.fixtureId === fixture.id)
  });

  return {
    ...fixture,
    predictionSnapshot: {
      ...prediction,
      source: { ...prediction.source, lastFetchedAt: capturedAt },
      capturedAt,
      modelVersion: "local-rules-v0.5.0"
    }
  };
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
    if (fixture.status !== "finished" || !fixture.score || !fixture.homeTeamId || !fixture.awayTeamId) continue;

    const home = table.get(fixture.homeTeamId);
    const away = table.get(fixture.awayTeamId);
    if (!home || !away) continue;

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

function buildPlayers(source: RecordSource): Player[] {
  const rows = [
    ["p-mex-1", "mexico", "Santiago Gimenez", "中锋", "fit", 83, "禁区终结和前场压迫是核心看点。"],
    ["p-mex-2", "mexico", "Edson Alvarez", "后腰", "fit", 80, "中场屏障决定转换防守质量。"],
    ["p-rsa-1", "south-africa", "Percy Tau", "边锋", "doubtful", 76, "速度反击有威胁，但状态标注为赛前观察。"],
    ["p-kor-1", "south-korea", "Son Heung-min", "前锋", "fit", 91, "纵深跑动和反击终结能力突出。"],
    ["p-cze-1", "czechia", "Patrik Schick", "中锋", "fit", 84, "定位球和禁区争顶是主要威胁。"],
    ["p-sui-1", "switzerland", "Granit Xhaka", "中场", "fit", 85, "中场出球和节奏控制是比赛稳定器。"],
    ["p-qat-1", "qatar", "Akram Afif", "前锋", "fit", 82, "反击推进和定位球处理是主要威胁。"],
    ["p-usa-1", "united-states", "Christian Pulisic", "边锋", "fit", 86, "一对一推进和弱侧接应是进攻开关。"],
    ["p-par-1", "paraguay", "Miguel Almiron", "前腰", "fit", 81, "反击推进和二点球处理值得关注。"],
    ["p-eng-1", "england", "Jude Bellingham", "中场", "fit", 93, "前插和肋部串联能改变比赛节奏。"],
    ["p-eng-2", "england", "Harry Kane", "中锋", "fit", 91, "回撤组织和禁区终结同时在线。"],
    ["p-cro-1", "croatia", "Luka Modric", "中场", "fit", 86, "控节奏和定位球质量仍是关键变量。"],
    ["p-col-1", "colombia", "Luis Diaz", "边锋", "fit", 88, "左路爆点和转换进攻最具威胁。"],
    ["p-uzb-1", "uzbekistan", "Eldor Shomurodov", "中锋", "fit", 78, "支点和冲击禁区能力是进攻基础。"],
    ["p-gha-1", "ghana", "Mohammed Kudus", "前腰", "fit", 84, "中路摆脱和远射会影响防线站位。"],
    ["p-pan-1", "panama", "Adalberto Carrasquilla", "中场", "fit", 78, "攻守转换中的第一脚出球很重要。"],
    ["p-bra-1", "brazil", "Vinicius Junior", "边锋", "fit", 92, "左路爆点和反击终结是核心威胁。"],
    ["p-arg-1", "argentina", "Lionel Messi", "前锋", "fit", 94, "定位球、终结和最后一传仍是核心变量。"],
    ["p-fra-1", "france", "Kylian Mbappe", "前锋", "fit", 95, "纵深冲击会持续拉扯防线。"],
    ["p-ger-1", "germany", "Jamal Musiala", "前腰", "fit", 89, "肋部持球推进是进攻关键。"]
  ] as const;

  return rows.map(([id, teamId, name, role, status, impact, note]) => ({
    id,
    teamId,
    name,
    role,
    status,
    impact,
    note,
    source
  }));
}

async function main() {
  await mkdir(storeDir, { recursive: true });
  const manifest = await readManifest();
  const existingFixtures = await readExistingFixtures();

  const fifaFixtures = sourceFromManifest(manifest, "fifa-fixtures-official", {
    sourceId: "fifa-fixtures-official",
    sourceName: "FIFA World Cup 2026 官方赛程",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures",
    sourceKind: "official",
    lastFetchedAt: now,
    confidence: "official",
    isMockOrEstimated: false,
    description: "官方赛程、场馆、分组和比赛时间。"
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
    sourceName: "ESPN 2026 World Cup 赛程/赛果校验",
    sourceUrl: "https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket",
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

  const teams = buildTeams(derivedSource(fifaRanking));
  let fixtures = preserveRecordedResults(buildFixtures(derivedSource(fifaFixtures), derivedSource(espnFixtures)), existingFixtures);
  const players = buildPlayers(derivedSource(manualSeed));
  const rankings: Ranking[] = teams.map((team) => ({
    teamId: team.id,
    fifaRank: team.fifaRank,
    rankingPoints: team.rankingPoints,
    previousRank: Math.max(1, team.fifaRank + Math.round((team.form - 72) / 6)),
    source: derivedSource(fifaRanking)
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
  fixtures = fixtures.map((fixture) => capturePredictionSnapshot(fixture, teams, players, odds, sentiment));
  const sources = [fifaFixtures, fifaRanking, espnFixtures, manualSeed, model];
  const store: DataStore = { sources, teams, players, fixtures, standings, rankings, odds, sentiment };
  assertDataIntegrity(store);

  const teamIds = new Set(teams.map((team) => team.id));
  for (const fixture of fixtures) {
    if (fixture.stage === "小组赛" && (!fixture.homeTeamId || !fixture.awayTeamId)) {
      throw new Error(`Group fixture ${fixture.id} must have confirmed teams`);
    }
    if (fixture.homeTeamId && !teamIds.has(fixture.homeTeamId)) throw new Error(`Fixture ${fixture.id} references unknown home team`);
    if (fixture.awayTeamId && !teamIds.has(fixture.awayTeamId)) throw new Error(`Fixture ${fixture.id} references unknown away team`);
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

  const summary = buildDataQualitySummary(store);
  console.log(`写入 ${teams.length} 支球队、${fixtures.length} 场小组赛、${players.length} 名关键球员。`);
  console.log(`可信记录 ${summary.trustedRecords}/${summary.totalRecords}，来源 ${summary.sourceCount} 类。`);
  console.log("JSON 入库完成：data/store/*.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
