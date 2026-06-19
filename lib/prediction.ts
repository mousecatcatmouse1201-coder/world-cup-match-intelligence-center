import type { Fixture, OddsSnapshot, Player, PredictionExplanation, PredictionResult, RecordSource, SentimentSnapshot, Team } from "./types";

export const PREDICTION_TIME_ZONE = "Asia/Shanghai";
export const PREDICTION_WINDOW_DAYS = 2;

interface PredictInput {
  fixture: Fixture;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  odds?: OddsSnapshot;
  sentiment?: SentimentSnapshot;
}

export interface PredictionWindowOptions {
  now?: Date;
  timeZone?: string;
  days?: number;
  includeIneligible?: boolean;
}

export type PredictionUnavailableCode = "finished" | "past" | "outside-window";

export interface PredictionEligibility {
  canPredict: boolean;
  code?: PredictionUnavailableCode;
  message?: string;
  fixtureDate: string;
  windowStart: string;
  windowEnd: string;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const round1 = (value: number) => Math.round(value * 10) / 10;

const roundPercent = (value: number) => Math.round(value * 1000) / 10;

const dayMs = 24 * 60 * 60 * 1000;

function dateKeyInTimeZone(date: Date, timeZone = PREDICTION_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function dateKeyToUtcDay(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / dayMs);
}

function addDaysToDateKey(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return dateKeyInTimeZone(new Date(Date.UTC(year, month - 1, day + days)), "UTC");
}

export function getPredictionWindow(options: PredictionWindowOptions = {}) {
  const days = options.days ?? PREDICTION_WINDOW_DAYS;
  const timeZone = options.timeZone ?? PREDICTION_TIME_ZONE;
  const start = dateKeyInTimeZone(options.now ?? new Date(), timeZone);
  const end = addDaysToDateKey(start, days - 1);

  return {
    days,
    timeZone,
    start,
    end
  };
}

export function getFixturePredictionEligibility(fixture: Fixture, options: PredictionWindowOptions = {}): PredictionEligibility {
  const window = getPredictionWindow(options);
  const fixtureDate = dateKeyInTimeZone(new Date(fixture.kickoff), window.timeZone);
  const daysFromWindowStart = dateKeyToUtcDay(fixtureDate) - dateKeyToUtcDay(window.start);
  const base = {
    fixtureDate,
    windowStart: window.start,
    windowEnd: window.end
  };

  if (fixture.status === "finished") {
    return {
      ...base,
      canPredict: false,
      code: "finished",
      message: "比赛已经结束，不再生成赛前预测。"
    };
  }

  if (daysFromWindowStart < 0) {
    return {
      ...base,
      canPredict: false,
      code: "past",
      message: "比赛日期早于当前预测窗口，不再生成赛前预测。"
    };
  }

  if (daysFromWindowStart >= window.days) {
    return {
      ...base,
      canPredict: false,
      code: "outside-window",
      message: `仅预测 ${window.start} 至 ${window.end} 的未完赛比赛。`
    };
  }

  return {
    ...base,
    canPredict: true
  };
}

function modelSource(): RecordSource {
  return {
    sourceId: "local-model-derived",
    sourceName: "本地规则模型推断",
    sourceUrl: "https://example.local/world-cup-match-intelligence-center/model",
    sourceKind: "model",
    lastFetchedAt: new Date().toISOString(),
    confidence: "modeled",
    isMockOrEstimated: true
  };
}

function squadPenalty(players: Player[]) {
  return players.reduce((penalty, player) => {
    if (player.status === "injured") {
      return penalty + player.impact * 0.12;
    }

    if (player.status === "doubtful") {
      return penalty + player.impact * 0.06;
    }

    return penalty;
  }, 0);
}

function oddsLean(odds?: OddsSnapshot) {
  if (!odds) {
    return 0;
  }

  const homeImplied = 1 / odds.homeWin;
  const awayImplied = 1 / odds.awayWin;
  return clamp((homeImplied - awayImplied) * 80, -12, 12);
}

function sentimentLean(sentiment?: SentimentSnapshot) {
  if (!sentiment) {
    return 0;
  }

  return clamp((sentiment.positiveHome - sentiment.positiveAway) / 6, -8, 8);
}

function teamStrength(team: Team) {
  const rankComponent = 220 - team.fifaRank * 1.7;
  const ratingComponent = (team.rankingPoints - 1400) / 7;
  const profileComponent = team.attack * 0.8 + team.defense * 0.75 + team.midfield * 0.7 + team.form * 0.9;
  return rankComponent + ratingComponent + profileComponent;
}

function drawShareFromDiff(diff: number, input: PredictInput) {
  const strengthGap = Math.abs(diff) / 720;
  const attackGap = Math.abs(input.homeTeam.attack - input.awayTeam.attack) / 1000;
  const defenseBalance = (100 - Math.abs(input.homeTeam.defense - input.awayTeam.defense)) / 900;
  const formGap = Math.abs(input.homeTeam.form - input.awayTeam.form) / 1200;
  const lowTempoBoost = (160 - input.homeTeam.tempo - input.awayTeam.tempo) / 1200;
  return clamp(0.2 + defenseBalance + lowTempoBoost - strengthGap - attackGap - formGap, 0.12, 0.35);
}

function normalize(homeRaw: number, drawRaw: number, awayRaw: number) {
  const total = homeRaw + drawRaw + awayRaw;
  const home = homeRaw / total;
  const draw = drawRaw / total;
  const away = awayRaw / total;

  const homePercent = roundPercent(home);
  const drawPercent = roundPercent(draw);
  const awayPercent = Math.round((100 - homePercent - drawPercent) * 10) / 10;

  return {
    homeWin: homePercent,
    draw: drawPercent,
    awayWin: awayPercent
  };
}

function expectedGoals(input: PredictInput, diff: number) {
  const homeAttackEdge = (input.homeTeam.attack - input.awayTeam.defense) / 42;
  const awayAttackEdge = (input.awayTeam.attack - input.homeTeam.defense) / 42;
  const homeFormEdge = (input.homeTeam.form - 70) / 75;
  const awayFormEdge = (input.awayTeam.form - 70) / 75;
  const injurySwing = (squadPenalty(input.awayPlayers) - squadPenalty(input.homePlayers)) / 75;
  const diffSwing = diff / 360;

  return {
    home: round1(clamp(1.18 + homeAttackEdge + homeFormEdge + injurySwing + diffSwing, 0.3, 3.7)),
    away: round1(clamp(1.05 + awayAttackEdge + awayFormEdge - injurySwing - diffSwing, 0.2, 3.5))
  };
}

function explanationImpact(value: number) {
  return Math.round(value * 10) / 10;
}

function buildExplanations(input: PredictInput, homePenalty: number, awayPenalty: number, homeVenue: number, odds: number, sentiment: number): PredictionExplanation[] {
  const rankImpact = clamp((input.awayTeam.fifaRank - input.homeTeam.fifaRank) * 0.35, -18, 18);
  const formImpact = clamp((input.homeTeam.form - input.awayTeam.form) * 0.45, -12, 12);
  const attackImpact = clamp((input.homeTeam.attack - input.awayTeam.defense) * 0.32, -10, 10);
  const defenseImpact = clamp((input.homeTeam.defense - input.awayTeam.attack) * 0.25, -8, 8);
  const injuryImpact = clamp(awayPenalty - homePenalty, -10, 10);

  const rows = [
    {
      factor: "FIFA 排名差异",
      impact: rankImpact,
      description: `${input.homeTeam.shortName} 排名第 ${input.homeTeam.fifaRank}，${input.awayTeam.shortName} 第 ${input.awayTeam.fifaRank}。`
    },
    {
      factor: "近期状态",
      impact: formImpact,
      description: `${input.homeTeam.shortName} 状态 ${input.homeTeam.form}，${input.awayTeam.shortName} 状态 ${input.awayTeam.form}。`
    },
    {
      factor: "进攻指数",
      impact: attackImpact,
      description: `${input.homeTeam.shortName} 进攻 ${input.homeTeam.attack} 对 ${input.awayTeam.shortName} 防守 ${input.awayTeam.defense}。`
    },
    {
      factor: "防守指数",
      impact: defenseImpact,
      description: `${input.homeTeam.shortName} 防守 ${input.homeTeam.defense} 对 ${input.awayTeam.shortName} 进攻 ${input.awayTeam.attack}。`
    },
    {
      factor: "赛地因素",
      impact: homeVenue / 2,
      description: "东道主或名义主队拥有轻微赛地倾向。"
    },
    {
      factor: "伤停风险",
      impact: injuryImpact,
      description: `阵容可用性影响：主队 -${round1(homePenalty)}，客队 -${round1(awayPenalty)}。`
    },
    {
      factor: "市场/舆情校准",
      impact: odds + sentiment,
      description: "赔率与舆情为演示或非官方输入，仅作弱校准。"
    }
  ];

  return rows.map((row) => ({
    factor: row.factor,
    impact: explanationImpact(Math.abs(row.impact)),
    direction: Math.abs(row.impact) < 1 ? "draw" : row.impact > 0 ? "home" : "away",
    description: row.description
  }));
}

function scoreFromExpected(homeXg: number, awayXg: number) {
  const home = clamp(Math.round(homeXg), 0, 5);
  const away = clamp(Math.round(awayXg), 0, 5);

  if (home === away && Math.abs(homeXg - awayXg) > 0.35) {
    return homeXg > awayXg ? { home: home + 1, away } : { home, away: away + 1 };
  }

  return { home, away };
}

export function predictMatch(input: PredictInput): PredictionResult {
  const homePenalty = squadPenalty(input.homePlayers);
  const awayPenalty = squadPenalty(input.awayPlayers);
  const homeVenue = ["mexico", "canada", "united-states"].includes(input.homeTeam.id) ? 18 : 4;
  const oddsAdjustment = oddsLean(input.odds);
  const sentimentAdjustment = sentimentLean(input.sentiment);
  const baseDiff = teamStrength(input.homeTeam) - teamStrength(input.awayTeam);
  const diff = baseDiff - homePenalty + awayPenalty + homeVenue + oddsAdjustment + sentimentAdjustment;
  const winCurve = 1 / (1 + Math.exp(-diff / 145));
  const drawRaw = drawShareFromDiff(diff, input);
  const decisiveShare = 1 - drawRaw;
  const probabilities = normalize(winCurve * decisiveShare, drawRaw, (1 - winCurve) * decisiveShare);
  const xg = expectedGoals(input, diff);
  const predictedScore = scoreFromExpected(xg.home, xg.away);
  const closeness = Math.abs(probabilities.homeWin - probabilities.awayWin);
  const missingMarketData = !input.odds || input.odds.source.isMockOrEstimated;

  const keyFactors = [
    `${input.homeTeam.shortName} FIFA 排名第 ${input.homeTeam.fifaRank}，${input.awayTeam.shortName} 第 ${input.awayTeam.fifaRank}`,
    `近期状态指数：${input.homeTeam.shortName} ${input.homeTeam.form} / ${input.awayTeam.shortName} ${input.awayTeam.form}`,
    `阵容可用性影响：${input.homeTeam.shortName} -${round1(homePenalty)}，${input.awayTeam.shortName} -${round1(awayPenalty)}`
  ];

  if (input.sentiment) {
    keyFactors.push(`热度指数 ${input.sentiment.buzz}，舆情仅作非官方参考`);
  }

  const riskFactors = [
    closeness < 12 ? "两队概率差距较小，赛果波动风险高" : "概率差距相对清晰，但杯赛单场仍有偶然性",
    missingMarketData ? "赔率为示例或缺失，不作为真实市场判断" : "赔率快照已纳入模型校准",
    Math.abs(xg.home - xg.away) < 0.35 ? "期望进球接近，小比分或平局风险更高" : "期望进球差距较明显，但早段进球会改变节奏"
  ];

  return {
    fixtureId: input.fixture.id,
    probabilities,
    expectedGoals: xg,
    predictedScore,
    scoreRange: `${Math.max(0, predictedScore.home - 1)}-${Math.max(0, predictedScore.away - 1)} 到 ${predictedScore.home + 1}-${predictedScore.away + 1}`,
    scoreConfidence: closeness > 24 ? "high" : closeness > 12 ? "medium" : "low",
    confidence: missingMarketData ? "medium" : "high",
    keyFactors,
    riskFactors,
    explanations: buildExplanations(input, homePenalty, awayPenalty, homeVenue, oddsAdjustment, sentimentAdjustment),
    source: modelSource()
  };
}

export function predictMany(
  fixtures: Fixture[],
  teams: Team[],
  players: Player[],
  odds: OddsSnapshot[],
  sentiment: SentimentSnapshot[],
  options: PredictionWindowOptions = {}
) {
  return fixtures
    .filter((fixture) => options.includeIneligible || getFixturePredictionEligibility(fixture, options).canPredict)
    .map((fixture) => {
      const homeTeam = teams.find((team) => team.id === fixture.homeTeamId);
      const awayTeam = teams.find((team) => team.id === fixture.awayTeamId);
      if (!homeTeam || !awayTeam) {
        return null;
      }

      return predictMatch({
        fixture,
        homeTeam,
        awayTeam,
        homePlayers: players.filter((player) => player.teamId === homeTeam.id),
        awayPlayers: players.filter((player) => player.teamId === awayTeam.id),
        odds: odds.find((item) => item.fixtureId === fixture.id),
        sentiment: sentiment.find((item) => item.fixtureId === fixture.id)
      });
    })
    .filter((prediction): prediction is PredictionResult => Boolean(prediction));
}
