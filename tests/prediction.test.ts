import { describe, expect, it } from "vitest";
import { generateMatchAnalysis } from "../lib/analysis";
import { getFavoriteTeamMatches, getHighestUpsetRiskMatch, getMostPopularMatch, getTodayMatches } from "../lib/dashboard-matches";
import { buildModelPerformanceSummary, buildPredictionReview, enrichMatch, getEnrichedMatchById, resolveMatchStatus } from "../lib/match-intelligence";
import { explainPrediction, getFixturePredictionEligibility, predictMany, predictMatch } from "../lib/prediction";
import { formatDisplayDateKey, getTodayDateKeyInBeijing, isTodayInBeijing } from "../lib/format";
import type { DataStore, Fixture, Player, Team } from "../lib/types";

const source = {
  sourceId: "test-source",
  sourceName: "Test Source",
  sourceUrl: "https://example.com/source",
  sourceKind: "official" as const,
  lastFetchedAt: "2026-06-18T00:00:00.000Z",
  confidence: "official" as const,
  isMockOrEstimated: false
};

const fixture: Fixture = {
  id: "test-match",
  group: "A",
  stage: "小组赛",
  kickoff: "2026-06-18T20:00:00.000Z",
  venue: "Test Stadium",
  city: "Test City",
  homeTeamId: "strong",
  awayTeamId: "weaker",
  status: "scheduled",
  heatIndex: 88,
  source
};

const strongTeam: Team = {
  id: "strong",
  name: "强队",
  shortName: "强队",
  fifaCode: "STR",
  group: "A",
  region: "UEFA",
  fifaRank: 4,
  rankingPoints: 1826,
  attack: 88,
  defense: 84,
  midfield: 87,
  form: 83,
  tempo: 79,
  source
};

const weakerTeam: Team = {
  id: "weaker",
  name: "弱队",
  shortName: "弱队",
  fifaCode: "WEA",
  group: "A",
  region: "AFC",
  fifaRank: 58,
  rankingPoints: 1412,
  attack: 67,
  defense: 68,
  midfield: 66,
  form: 72,
  tempo: 73,
  source
};

const players: Player[] = [];
const baseNow = new Date("2026-06-19T12:00:00+08:00");

describe("prediction engine", () => {
  it("returns normalized win draw loss probabilities", () => {
    const prediction = predictMatch({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    });

    const total = prediction.probabilities.homeWin + prediction.probabilities.draw + prediction.probabilities.awayWin;
    expect(Math.round(total * 10) / 10).toBe(100);
  });

  it("uses dynamic draw probability and exposes explanation factors", () => {
    const closePrediction = predictMatch({
      fixture,
      homeTeam: { ...strongTeam, fifaRank: 20, rankingPoints: 1600, attack: 76, defense: 76, midfield: 76, form: 76 },
      awayTeam: { ...weakerTeam, fifaRank: 22, rankingPoints: 1580, attack: 75, defense: 75, midfield: 75, form: 75 },
      homePlayers: players,
      awayPlayers: players
    });
    const unevenPrediction = predictMatch({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    });

    expect(closePrediction.probabilities.draw).toBeGreaterThan(unevenPrediction.probabilities.draw);
    expect(new Set([closePrediction.probabilities.draw, unevenPrediction.probabilities.draw]).size).toBeGreaterThan(1);
    expect(unevenPrediction.explanations.map((item) => item.factor)).toContain("FIFA 排名差异");
    expect(explainPrediction({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    }).length).toBeGreaterThan(0);
  });

  it("aligns score forecast with stronger team advantage", () => {
    const prediction = predictMatch({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    });

    expect(prediction.probabilities.homeWin).toBeGreaterThan(prediction.probabilities.awayWin);
    expect(prediction.predictedScore.home).toBeGreaterThanOrEqual(prediction.predictedScore.away);
  });

  it("generates Chinese analysis with a predicted score", () => {
    const prediction = predictMatch({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    });
    const analysis = generateMatchAnalysis({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players,
      prediction
    });

    expect(analysis.summary).toContain("预测比分");
    expect(analysis.scorePrediction).toContain(`${prediction.predictedScore.home} : ${prediction.predictedScore.away}`);
    expect(analysis.scenarios.length).toBe(3);
  });

  it("only allows predictions for unfinished matches in the next two Shanghai dates", () => {
    const finishedFixture: Fixture = {
      ...fixture,
      id: "finished-match",
      kickoff: "2026-06-12T01:00:00.000Z",
      status: "finished",
      score: { home: 1, away: 0 }
    };
    const windowFixture: Fixture = {
      ...fixture,
      id: "window-match",
      kickoff: "2026-06-19T01:00:00.000Z",
      status: "scheduled"
    };
    const outsideWindowFixture: Fixture = {
      ...fixture,
      id: "outside-window-match",
      kickoff: "2026-06-21T01:00:00.000Z",
      status: "scheduled"
    };

    expect(getFixturePredictionEligibility(finishedFixture, { now: baseNow }).canPredict).toBe(false);
    expect(getFixturePredictionEligibility(windowFixture, { now: baseNow }).canPredict).toBe(true);
    expect(getFixturePredictionEligibility(outsideWindowFixture, { now: baseNow }).canPredict).toBe(false);

    const predictions = predictMany(
      [finishedFixture, windowFixture, outsideWindowFixture],
      [strongTeam, weakerTeam],
      players,
      [],
      [],
      { now: baseNow }
    );

    expect(predictions.map((prediction) => prediction.fixtureId)).toEqual(["window-match"]);
  });

  it("resolves match status from explicit state, score and kickoff time", () => {
    expect(resolveMatchStatus({ ...fixture, status: "finished", score: { home: 2, away: 1 } }, baseNow)).toBe("finished");
    expect(resolveMatchStatus({ ...fixture, status: "scheduled", score: { home: 2, away: 1 } }, baseNow)).toBe("finished");
    expect(resolveMatchStatus({ ...fixture, status: "scheduled", kickoff: "2026-06-20T12:00:00+08:00" }, baseNow)).toBe("scheduled");
    expect(resolveMatchStatus({ ...fixture, status: "scheduled", kickoff: "2026-06-19T11:00:00+08:00" }, baseNow)).toBe("live_pending");
    expect(resolveMatchStatus({ ...fixture, status: "scheduled", kickoff: "2026-06-18T08:00:00+08:00" }, baseNow)).toBe("result_pending");
    expect(resolveMatchStatus({ ...fixture, status: "scheduled", kickoff: "not-a-date" }, baseNow)).toBe("unknown");
  });

  it("builds prediction reviews and model performance summary", () => {
    const finishedFixture: Fixture = {
      ...fixture,
      status: "finished",
      score: { home: 2, away: 0 }
    };
    const prediction = {
      ...predictMatch({
        fixture: finishedFixture,
        homeTeam: strongTeam,
        awayTeam: weakerTeam,
        homePlayers: players,
        awayPlayers: players
      }),
      predictedScore: { home: 1, away: 0 }
    };
    const review = buildPredictionReview(finishedFixture, prediction);
    const summary = buildModelPerformanceSummary([review]);

    expect(review?.outcomeHit).toBe(true);
    expect(review?.exactScoreHit).toBe(false);
    expect(review?.goalDiffError).toBe(1);
    expect(review?.totalGoalError).toBe(1);
    expect(summary.reviewedMatches).toBe(1);
    expect(summary.outcomeHitRate).toBe(100);
    expect(summary.exactScoreHits).toBe(0);
    expect(buildModelPerformanceSummary([]).outcomeHitRate).toBeNull();
  });

  it("enriches list and detail matches through the same prediction path", () => {
    const store: DataStore = {
      sources: [{ ...source, description: "Test source" }],
      teams: [strongTeam, weakerTeam],
      players,
      fixtures: [fixture],
      standings: [],
      rankings: [],
      odds: [],
      sentiment: []
    };
    const listMatch = enrichMatch(fixture, store, { now: baseNow });
    const detailMatch = getEnrichedMatchById(store, fixture.id, { now: baseNow });

    expect(detailMatch?.prediction?.probabilities).toEqual(listMatch.prediction?.probabilities);
    expect(detailMatch?.reviewPrediction?.predictedScore).toEqual(listMatch.reviewPrediction?.predictedScore);
    expect(detailMatch?.status).toBe(listMatch.status);
    expect(detailMatch?.displayDateKey).toBe(formatDisplayDateKey(fixture.kickoff));
    expect(detailMatch?.beijingDate).toBe(formatDisplayDateKey(fixture.kickoff));
    expect(detailMatch?.displayTimezoneLabel).toBe("北京时间");
  });

  it("marks past matches without scores as pending result updates", () => {
    const staleFixture: Fixture = {
      ...fixture,
      id: "stale-match",
      kickoff: "2026-06-18T08:00:00+08:00",
      status: "scheduled"
    };
    const match = enrichMatch(staleFixture, {
      teams: [strongTeam, weakerTeam],
      players,
      odds: [],
      sentiment: []
    }, { now: baseNow });

    expect(match.status).toBe("result_pending");
    expect(match.dataConfidence.result).toBe("pending");
    expect(match.staleResultMessage).toContain("赛果未抓取");
  });

  it("computes today and focus candidates only from Beijing-date matches", () => {
    const now = new Date("2026-06-19T12:00:00+08:00");
    const yesterdayHighHeat = {
      beijingDate: "2026-06-18",
      fixture: { heatIndex: 99 },
      upsetRisk: 99,
      home: { id: "old-home" },
      away: { id: "old-away" }
    };
    const todayLowHeat = {
      beijingDate: "2026-06-19",
      fixture: { heatIndex: 60 },
      upsetRisk: 30,
      home: { id: "strong" },
      away: { id: "weaker" }
    };
    const todayUpset = {
      beijingDate: "2026-06-19",
      fixture: { heatIndex: 50 },
      upsetRisk: 80,
      home: { id: "another" },
      away: { id: "weaker" }
    };
    const todayMatches = getTodayMatches([yesterdayHighHeat, todayLowHeat, todayUpset], now);

    expect(getTodayDateKeyInBeijing(now)).toBe("2026-06-19");
    expect(isTodayInBeijing("2026-06-18T19:00:00-04:00", now)).toBe(true);
    expect(todayMatches).toEqual([todayLowHeat, todayUpset]);
    expect(getMostPopularMatch(todayMatches)).toBe(todayLowHeat);
    expect(getHighestUpsetRiskMatch(todayMatches)).toBe(todayUpset);
    expect(getFavoriteTeamMatches(todayMatches, ["strong"])).toEqual([todayLowHeat]);
    expect(getTodayMatches([yesterdayHighHeat], now)).toEqual([]);
  });

  it("exposes required explanation factors for the detail intelligence view", () => {
    const prediction = predictMatch({
      fixture,
      homeTeam: strongTeam,
      awayTeam: weakerTeam,
      homePlayers: players,
      awayPlayers: players
    });
    const factors = prediction.explanations.map((item) => item.factor);

    expect(factors).toEqual(expect.arrayContaining([
      "FIFA 排名差异",
      "近期状态",
      "进攻指数",
      "防守指数",
      "伤停风险",
      "低进球倾向",
      "冷门风险"
    ]));
  });
});
