import type {
  DataConfidence,
  DataStore,
  EnrichedMatch,
  Fixture,
  MatchResult,
  MatchStatus,
  ModelPerformanceSummary,
  OddsSnapshot,
  Player,
  PredictionResult,
  PredictionReview,
  RecordSource,
  SentimentSnapshot,
  Team
} from "./types";
import { generateMatchAnalysis } from "./analysis";
import { DISPLAY_TIME_ZONE_LABEL, formatDisplayDateKey, formatDisplayDateTime, formatFullDisplayDateTime, getBeijingDateKey } from "./format";
import { getFixturePredictionEligibility, predictMatch, type PredictionWindowOptions } from "./prediction";

const liveWindowMs = 2.5 * 60 * 60 * 1000;

function fixtureScore(fixture: Fixture) {
  if (fixture.score) {
    return fixture.score;
  }

  if (fixture.result?.homeScore !== undefined && fixture.result?.awayScore !== undefined) {
    return {
      home: fixture.result.homeScore,
      away: fixture.result.awayScore
    };
  }

  return null;
}

export function resolveMatchStatus(fixture: Fixture, now = new Date()): MatchStatus {
  const kickoff = new Date(fixture.kickoff).getTime();
  const current = now.getTime();

  if (Number.isNaN(kickoff)) {
    return "unknown";
  }

  if (fixtureScore(fixture)) {
    return "finished";
  }

  if (fixture.status === "finished") {
    return "result_pending";
  }

  if (current < kickoff) {
    return "scheduled";
  }

  if (current - kickoff <= liveWindowMs) {
    return fixture.status === "live" ? "live" : "live_pending";
  }

  return "result_pending";
}

export function matchStatusLabel(status: MatchStatus) {
  if (status === "scheduled") return "未开始";
  if (status === "live") return "进行中";
  if (status === "live_pending") return "进行中，比分待更新";
  if (status === "finished") return "已结束";
  if (status === "result_pending") return "赛果待更新";
  return "时间或数据异常";
}

function outcome(home: number, away: number) {
  if (home > away) return "home";
  if (home < away) return "away";
  return "draw";
}

export function buildPredictionReview(fixture: Fixture, prediction?: PredictionResult | null): PredictionReview | null {
  const score = fixtureScore(fixture);

  if (!score || !prediction) {
    return null;
  }

  const actualOutcome = outcome(score.home, score.away);
  const predictedOutcome = outcome(prediction.predictedScore.home, prediction.predictedScore.away);
  const goalDiffError = Math.abs(
    score.home -
      score.away -
      (prediction.predictedScore.home - prediction.predictedScore.away)
  );
  const totalGoalError = Math.abs(
    score.home +
      score.away -
      (prediction.predictedScore.home + prediction.predictedScore.away)
  );
  const exactScoreHit =
    score.home === prediction.predictedScore.home &&
    score.away === prediction.predictedScore.away;
  const outcomeHit = actualOutcome === predictedOutcome;

  return {
    predictedHomeScore: prediction.predictedScore.home,
    predictedAwayScore: prediction.predictedScore.away,
    actualHomeScore: score.home,
    actualAwayScore: score.away,
    outcomeHit,
    exactScoreHit,
    goalDiffError,
    totalGoalError,
    summary: exactScoreHit
      ? "比分完全命中。"
      : outcomeHit
        ? `胜平负方向命中，净胜球偏差 ${goalDiffError}，总进球偏差 ${totalGoalError}。`
        : `胜平负方向未命中，净胜球偏差 ${goalDiffError}，总进球偏差 ${totalGoalError}。`,
    improvementNotes: outcomeHit
      ? ["继续观察临场阵容和早段节奏对比分精度的影响。"]
      : ["模型需要更重视临场伤停、红黄牌和比赛节奏变化。"]
  };
}

export function buildModelPerformanceSummary(reviews: Array<PredictionReview | null | undefined>): ModelPerformanceSummary {
  const validReviews = reviews.filter((review): review is PredictionReview => Boolean(review));
  const reviewedMatches = validReviews.length;

  if (!reviewedMatches) {
    return {
      reviewedMatches: 0,
      outcomeHits: 0,
      outcomeHitRate: null,
      exactScoreHits: 0,
      averageGoalDiffError: null,
      averageTotalGoalError: null
    };
  }

  const outcomeHits = validReviews.filter((review) => review.outcomeHit).length;
  const exactScoreHits = validReviews.filter((review) => review.exactScoreHit).length;
  const totalGoalDiffError = validReviews.reduce((sum, review) => sum + review.goalDiffError, 0);
  const totalGoalError = validReviews.reduce((sum, review) => sum + review.totalGoalError, 0);

  return {
    reviewedMatches,
    outcomeHits,
    outcomeHitRate: Math.round((outcomeHits / reviewedMatches) * 1000) / 10,
    exactScoreHits,
    averageGoalDiffError: Math.round((totalGoalDiffError / reviewedMatches) * 10) / 10,
    averageTotalGoalError: Math.round((totalGoalError / reviewedMatches) * 10) / 10
  };
}

export function buildMatchResult(fixture: Fixture): MatchResult {
  if (fixture.result) {
    return fixture.result;
  }

  const score = fixtureScore(fixture);

  if (!score) {
    return {
      source: fixture.source.sourceName,
      updatedAt: fixture.source.lastFetchedAt
    };
  }

  return {
    homeScore: score.home,
    awayScore: score.away,
    source: fixture.source.confidence === "official" ? "official" : "secondary",
    updatedAt: fixture.source.lastFetchedAt
  };
}

export function buildDataConfidence(fixture: Fixture, playerSources: RecordSource[] = [], status = resolveMatchStatus(fixture)): DataConfidence {
  const resultMissing = !fixtureScore(fixture);
  const hasDemoLineup = playerSources.some((source) => source.isMockOrEstimated);
  const hasPlayers = playerSources.length > 0;
  const hasOfficialFixture = fixture.source.confidence === "official";
  const hasSecondaryFixture = fixture.source.confidence === "secondary";

  return {
    matchTime: hasOfficialFixture ? "high" : "medium",
    teamData: "high",
    lineup: !hasPlayers ? "missing" : hasDemoLineup ? "demo" : "medium",
    injury: !hasPlayers ? "missing" : hasDemoLineup ? "demo" : "missing",
    keyPlayers: !hasPlayers ? "missing" : hasDemoLineup ? "demo" : "medium",
    prediction: "model",
    result: resultMissing ? status === "live_pending" || status === "result_pending" ? "pending" : "missing" : fixture.result?.source === "official" || hasOfficialFixture ? "official" : "secondary",
    dataSource: hasOfficialFixture ? "official" : hasSecondaryFixture ? "secondary" : fixture.source.isMockOrEstimated ? "demo" : "missing"
  };
}

export function confidenceLabel(value: DataConfidence[keyof DataConfidence]) {
  const labels: Record<string, string> = {
    high: "高",
    medium: "中",
    low: "低",
    demo: "MVP 示例",
    missing: "待更新",
    pending: "待更新",
    model: "规则模型",
    official: "官方",
    secondary: "二级来源"
  };
  return labels[value] ?? String(value);
}

export function upsetRiskScore(prediction?: PredictionResult | null) {
  if (!prediction) return 0;
  const favorite = Math.max(prediction.probabilities.homeWin, prediction.probabilities.awayWin);
  const underdog = Math.min(prediction.probabilities.homeWin, prediction.probabilities.awayWin);
  return Math.round((100 - (favorite - underdog)) * 0.65 + prediction.probabilities.draw * 0.35);
}

export function unknownResultMessage(fixture: Fixture, status = resolveMatchStatus(fixture), now = new Date()) {
  if (status === "live_pending") {
    return "比赛可能正在进行，但当前比分未抓取，等待数据更新。";
  }

  if (status === "result_pending" && new Date(fixture.kickoff).getTime() <= now.getTime() && !fixtureScore(fixture)) {
    return "比赛可能已结束，但当前赛果未抓取，等待数据更新。";
  }

  if (status === "unknown") {
    return "当前比赛时间或状态数据异常，等待数据源更新。";
  }

  return undefined;
}

function requireTeam(teams: Team[], id: string) {
  const team = teams.find((item) => item.id === id);
  if (!team) {
    throw new Error(`Unknown team ${id}`);
  }
  return team;
}

function placeholderTeam(id: string, label: string, source: RecordSource): Team {
  return {
    id,
    name: label,
    shortName: label,
    fifaCode: "TBD",
    group: "TBD",
    region: "TBD",
    fifaRank: 999,
    rankingPoints: 0,
    attack: 0,
    defense: 0,
    midfield: 0,
    form: 0,
    tempo: 0,
    source
  };
}

function fixtureOdds(odds: OddsSnapshot[], fixtureId: string) {
  return odds.find((item) => item.fixtureId === fixtureId);
}

function fixtureSentiment(sentiment: SentimentSnapshot[], fixtureId: string) {
  return sentiment.find((item) => item.fixtureId === fixtureId);
}

export function enrichMatch(
  fixture: Fixture,
  store: Pick<DataStore, "teams" | "players" | "odds" | "sentiment">,
  options: PredictionWindowOptions = {}
): EnrichedMatch {
  const hasConfirmedTeams = Boolean(fixture.homeTeamId && fixture.awayTeamId);
  const homeTeam = hasConfirmedTeams ? requireTeam(store.teams, fixture.homeTeamId!) : undefined;
  const awayTeam = hasConfirmedTeams ? requireTeam(store.teams, fixture.awayTeamId!) : undefined;
  const homeLabel = homeTeam?.shortName ?? fixture.homePlaceholder ?? "参赛队待确定";
  const awayLabel = awayTeam?.shortName ?? fixture.awayPlaceholder ?? "参赛队待确定";
  if (!homeTeam || !awayTeam) {
    const status = resolveMatchStatus(fixture, options.now);
    const result = buildMatchResult(fixture);
    const dataConfidence = buildDataConfidence(fixture, [], status);
    const kickoffDate = new Date(fixture.kickoff);
    const beijingDate = getBeijingDateKey(kickoffDate);
    const beijingTimeLabel = formatDisplayDateTime(kickoffDate);
    const homePlaceholderTeam = placeholderTeam(`placeholder-home-${fixture.id}`, homeLabel, fixture.source);
    const awayPlaceholderTeam = placeholderTeam(`placeholder-away-${fixture.id}`, awayLabel, fixture.source);

    return {
      fixture,
      match: fixture,
      homeTeam: homePlaceholderTeam,
      awayTeam: awayPlaceholderTeam,
      home: homePlaceholderTeam,
      away: awayPlaceholderTeam,
      homeLabel,
      awayLabel,
      hasConfirmedTeams: false,
      homePlayers: [],
      awayPlayers: [],
      prediction: null,
      reviewPrediction: null,
      predictionEligibility: {
        canPredict: false,
        code: "placeholder-teams",
        message: "参赛队待确定，不生成赛前预测。",
        fixtureDate: beijingDate,
        windowStart: beijingDate,
        windowEnd: beijingDate
      },
      status,
      result,
      review: null,
      dataConfidence,
      confidence: dataConfidence,
      predictionExplanation: [],
      analysis: {
        fixtureId: fixture.id,
        title: `${homeLabel} vs ${awayLabel} 赛程占位`,
        summary: "参赛队待确定，当前仅展示赛程结构，不生成胜平负预测。",
        tacticalFocus: ["参赛队确认后再生成战术看点。"],
        keyPlayers: ["参赛队待确定。"],
        upsetRisk: "参赛队待确定，不计算冷门风险。",
        scorePrediction: "参赛队待确定，不生成比分预测。",
        sourceNote: `赛程来源：${fixture.source.sourceName}。`,
        scenarios: []
      },
      upsetRisk: 0,
      kickoffAtUtc: kickoffDate.toISOString(),
      kickoffAtBeijing: formatFullDisplayDateTime(kickoffDate),
      beijingDate,
      beijingTimeLabel,
      displayDate: beijingDate,
      displayTime: beijingTimeLabel,
      displayTimezoneLabel: DISPLAY_TIME_ZONE_LABEL,
      displayDateKey: formatDisplayDateKey(kickoffDate)
    };
  }
  const homePlayers = store.players.filter((player) => player.teamId === homeTeam.id);
  const awayPlayers = store.players.filter((player) => player.teamId === awayTeam.id);
  const odds = fixtureOdds(store.odds, fixture.id);
  const sentiment = fixtureSentiment(store.sentiment, fixture.id);
  const predictionInput = {
    fixture,
    homeTeam,
    awayTeam,
    homePlayers,
    awayPlayers,
    odds,
    sentiment
  };
  const predictionEligibility = getFixturePredictionEligibility(fixture, options);
  const prediction = predictionEligibility.canPredict ? predictMatch(predictionInput) : null;
  const reviewPrediction = predictMatch(predictionInput);
  const status = resolveMatchStatus(fixture, options.now);
  const result = buildMatchResult(fixture);
  const playerSources = [...homePlayers, ...awayPlayers].map((player: Player) => player.source);
  const dataConfidence = buildDataConfidence(fixture, playerSources, status);
  const review = buildPredictionReview(fixture, reviewPrediction);
  const analysis = generateMatchAnalysis({
    fixture,
    homeTeam,
    awayTeam,
    homePlayers,
    awayPlayers,
    prediction: prediction ?? reviewPrediction
  });
  const kickoffDate = new Date(fixture.kickoff);
  const beijingDate = getBeijingDateKey(kickoffDate);
  const beijingTimeLabel = formatDisplayDateTime(kickoffDate);
  const staleResultMessage = unknownResultMessage(fixture, status, options.now);

  return {
    fixture,
    match: fixture,
    homeTeam,
    awayTeam,
    home: homeTeam,
    away: awayTeam,
    homeLabel,
    awayLabel,
    hasConfirmedTeams,
    homePlayers,
    awayPlayers,
    ...(odds ? { odds } : {}),
    ...(sentiment ? { sentiment } : {}),
    prediction,
    reviewPrediction,
    predictionEligibility,
    status,
    result,
    review,
    dataConfidence,
    confidence: dataConfidence,
    predictionExplanation: (prediction ?? reviewPrediction).explanations,
    analysis,
    upsetRisk: upsetRiskScore(prediction ?? reviewPrediction),
    kickoffAtUtc: kickoffDate.toISOString(),
    kickoffAtBeijing: formatFullDisplayDateTime(kickoffDate),
    beijingDate,
    beijingTimeLabel,
    displayDate: beijingDate,
    displayTime: beijingTimeLabel,
    displayTimezoneLabel: DISPLAY_TIME_ZONE_LABEL,
    displayDateKey: formatDisplayDateKey(kickoffDate),
    ...(staleResultMessage ? { staleResultMessage } : {})
  };
}

export function getEnrichedMatches(store: DataStore, options: PredictionWindowOptions = {}) {
  return store.fixtures.map((fixture) => enrichMatch(fixture, store, options));
}

export function getEnrichedMatchById(store: DataStore, id: string, options: PredictionWindowOptions = {}) {
  const fixture = store.fixtures.find((item) => item.id === id);
  return fixture ? enrichMatch(fixture, store, options) : null;
}
