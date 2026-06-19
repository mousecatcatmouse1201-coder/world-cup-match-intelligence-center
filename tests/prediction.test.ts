import { describe, expect, it } from "vitest";
import { generateMatchAnalysis } from "../lib/analysis";
import { getFixturePredictionEligibility, predictMany, predictMatch } from "../lib/prediction";
import type { Fixture, Player, Team } from "../lib/types";

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
    expect(analysis.scorePrediction).toContain(`${prediction.predictedScore.home}-${prediction.predictedScore.away}`);
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
});
