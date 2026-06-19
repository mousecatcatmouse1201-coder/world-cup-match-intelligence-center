import type { Fixture, OddsSnapshot, Player, PredictionResult, RecordSource, SentimentSnapshot, Team } from "./types";

interface PredictInput {
  fixture: Fixture;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  odds?: OddsSnapshot;
  sentiment?: SentimentSnapshot;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const round1 = (value: number) => Math.round(value * 10) / 10;

const roundPercent = (value: number) => Math.round(value * 1000) / 10;

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

function drawShareFromDiff(diff: number) {
  return clamp(0.3 - Math.abs(diff) / 520, 0.18, 0.34);
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
  const baseDiff = teamStrength(input.homeTeam) - teamStrength(input.awayTeam);
  const diff = baseDiff - homePenalty + awayPenalty + homeVenue + oddsLean(input.odds) + sentimentLean(input.sentiment);
  const winCurve = 1 / (1 + Math.exp(-diff / 145));
  const drawRaw = drawShareFromDiff(diff);
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
    source: modelSource()
  };
}

export function predictMany(
  fixtures: Fixture[],
  teams: Team[],
  players: Player[],
  odds: OddsSnapshot[],
  sentiment: SentimentSnapshot[]
) {
  return fixtures
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
