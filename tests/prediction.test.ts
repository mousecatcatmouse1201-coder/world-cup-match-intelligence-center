import { describe, expect, it } from "vitest";
import { generateMatchAnalysis } from "../lib/analysis";
import { predictMatch } from "../lib/prediction";
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
  });
});
