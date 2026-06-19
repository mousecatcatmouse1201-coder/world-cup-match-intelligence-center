import type {
  DataConfidence,
  Fixture,
  MatchStatus,
  PredictionResult,
  PredictionReview,
  RecordSource
} from "./types";

const liveWindowMs = 2 * 60 * 60 * 1000;

export function resolveMatchStatus(fixture: Fixture, now = new Date()): MatchStatus {
  if (fixture.status === "finished" || fixture.status === "live") {
    return fixture.status;
  }

  if (fixture.score) {
    return "finished";
  }

  if (fixture.status === "unknown") {
    return "unknown";
  }

  const kickoff = new Date(fixture.kickoff).getTime();
  const current = now.getTime();

  if (current < kickoff) {
    return "scheduled";
  }

  if (current - kickoff <= liveWindowMs) {
    return "live";
  }

  return "unknown";
}

export function matchStatusLabel(status: MatchStatus) {
  if (status === "scheduled") return "未开始";
  if (status === "live") return "进行中";
  if (status === "finished") return "已结束";
  return "状态未知";
}

function outcome(home: number, away: number) {
  if (home > away) return "home";
  if (home < away) return "away";
  return "draw";
}

export function buildPredictionReview(fixture: Fixture, prediction?: PredictionResult | null): PredictionReview | null {
  if (!fixture.score || !prediction) {
    return null;
  }

  const actualOutcome = outcome(fixture.score.home, fixture.score.away);
  const predictedOutcome = outcome(prediction.predictedScore.home, prediction.predictedScore.away);
  const goalDiffError = Math.abs(
    fixture.score.home -
      fixture.score.away -
      (prediction.predictedScore.home - prediction.predictedScore.away)
  );
  const exactScoreHit =
    fixture.score.home === prediction.predictedScore.home &&
    fixture.score.away === prediction.predictedScore.away;
  const outcomeHit = actualOutcome === predictedOutcome;

  return {
    predictedHomeScore: prediction.predictedScore.home,
    predictedAwayScore: prediction.predictedScore.away,
    actualHomeScore: fixture.score.home,
    actualAwayScore: fixture.score.away,
    outcomeHit,
    exactScoreHit,
    goalDiffError,
    summary: exactScoreHit
      ? "比分完全命中。"
      : outcomeHit
        ? `胜平负方向命中，净胜球偏差 ${goalDiffError}。`
        : `胜平负方向未命中，净胜球偏差 ${goalDiffError}。`,
    improvementNotes: outcomeHit
      ? ["继续观察临场阵容和早段节奏对比分精度的影响。"]
      : ["模型需要更重视临场伤停、红黄牌和比赛节奏变化。"]
  };
}

export function buildDataConfidence(fixture: Fixture, playerSources: RecordSource[] = []): DataConfidence {
  const resultMissing = !fixture.score;
  const hasDemoLineup = playerSources.some((source) => source.isMockOrEstimated);

  return {
    matchTime: fixture.source.confidence === "official" ? "high" : "medium",
    teamData: "high",
    lineup: hasDemoLineup ? "demo" : "medium",
    injury: hasDemoLineup ? "demo" : "missing",
    prediction: "model",
    result: resultMissing ? "missing" : fixture.source.confidence === "official" ? "official" : "secondary"
  };
}

export function confidenceLabel(value: DataConfidence[keyof DataConfidence]) {
  const labels: Record<string, string> = {
    high: "高",
    medium: "中",
    low: "低",
    demo: "示例",
    missing: "待更新",
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
