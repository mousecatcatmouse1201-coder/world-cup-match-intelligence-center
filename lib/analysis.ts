import type { Fixture, MatchAnalysis, Player, PredictionResult, Team } from "./types";

function topPlayers(players: Player[]) {
  return [...players]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 2)
    .map((player) => `${player.name}（${player.role}，影响力 ${player.impact}）`);
}

function strongerSide(prediction: PredictionResult, homeTeam: Team, awayTeam: Team) {
  if (prediction.probabilities.homeWin > prediction.probabilities.awayWin + 5) {
    return homeTeam.shortName;
  }

  if (prediction.probabilities.awayWin > prediction.probabilities.homeWin + 5) {
    return awayTeam.shortName;
  }

  return "双方";
}

export function generateMatchAnalysis(input: {
  fixture: Fixture;
  homeTeam: Team;
  awayTeam: Team;
  homePlayers: Player[];
  awayPlayers: Player[];
  prediction: PredictionResult;
}): MatchAnalysis {
  const { fixture, homeTeam, awayTeam, homePlayers, awayPlayers, prediction } = input;
  const favorite = strongerSide(prediction, homeTeam, awayTeam);
  const keyPlayers = [...topPlayers(homePlayers), ...topPlayers(awayPlayers)];
  const xgGap = Math.abs(prediction.expectedGoals.home - prediction.expectedGoals.away);
  const favoriteTeam = favorite === homeTeam.shortName ? homeTeam : favorite === awayTeam.shortName ? awayTeam : homeTeam;
  const underdogTeam = favoriteTeam.id === homeTeam.id ? awayTeam : homeTeam;

  return {
    fixtureId: fixture.id,
    title: `${homeTeam.shortName} vs ${awayTeam.shortName} 赛前智能分析`,
    summary: `根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 ${favorite} 在模型中更占优势。当前主胜/平/客胜概率为 ${prediction.probabilities.homeWin}% / ${prediction.probabilities.draw}% / ${prediction.probabilities.awayWin}%，预测比分 ${prediction.predictedScore.home}-${prediction.predictedScore.away}。`,
    tacticalFocus: [
      `${homeTeam.shortName} 的进攻指数为 ${homeTeam.attack}，需要利用前场压迫和转换速度制造早段优势。`,
      `${awayTeam.shortName} 的防守指数为 ${awayTeam.defense}，如果能把比赛压到低节奏，平局概率会被放大。`,
      xgGap < 0.4
        ? "双方期望进球接近，定位球、二点球和替补阶段会成为关键分水岭。"
        : "期望进球差距已经拉开，落后一方需要更早提高压迫线，否则比赛会被优势方控住。"
    ],
    keyPlayers,
    upsetRisk:
      prediction.scoreConfidence === "low"
        ? "冷门风险偏高：概率差距有限，且预测比分集中在一球以内。"
        : "冷门风险中等：模型倾向较明确，但杯赛单场仍受红黄牌、早段进球和伤停影响。",
    scorePrediction: `预测比分 ${prediction.predictedScore.home}-${prediction.predictedScore.away}，期望进球 ${prediction.expectedGoals.home}-${prediction.expectedGoals.away}，合理区间 ${prediction.scoreRange}。`,
    sourceNote: `事实数据来源：${fixture.source.sourceName}；模型与比分为 ${prediction.source.sourceName}，不是官方结论。`,
    scenarios: [
      {
        title: "强队顺利取胜剧本",
        description: `${favoriteTeam.shortName} 如果能在前 30 分钟建立控球和射门优势，比赛会进入模型最看好的节奏，预测比分更接近 ${prediction.predictedScore.home}-${prediction.predictedScore.away}。`
      },
      {
        title: "僵局/平局剧本",
        description: `如果双方把节奏压低，且中场失误减少，平局概率会被放大；定位球和替补登场后的第一波冲击会成为关键。`
      },
      {
        title: "冷门剧本",
        description: `${underdogTeam.shortName} 需要利用反击、早段进球或对手伤停波动制造非线性优势；该判断为规则模型推断。`
      }
    ]
  };
}
