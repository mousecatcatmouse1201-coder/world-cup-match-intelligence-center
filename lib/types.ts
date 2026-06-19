export type Confidence = "official" | "secondary" | "estimated" | "modeled";

export type SourceKind = "official" | "secondary" | "manual" | "model";

export interface RecordSource {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  sourceKind: SourceKind;
  lastFetchedAt: string;
  confidence: Confidence;
  isMockOrEstimated: boolean;
}

export interface DataSource extends RecordSource {
  description: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  fifaCode: string;
  group: string;
  region: string;
  fifaRank: number;
  rankingPoints: number;
  attack: number;
  defense: number;
  midfield: number;
  form: number;
  tempo: number;
  source: RecordSource;
}

export interface Player {
  id: string;
  teamId: string;
  name: string;
  role: string;
  status: "fit" | "doubtful" | "injured";
  impact: number;
  note: string;
  source: RecordSource;
}

export interface Fixture {
  id: string;
  group: string;
  stage: string;
  kickoff: string;
  venue: string;
  city: string;
  homeTeamId: string;
  awayTeamId: string;
  status: "scheduled" | "live" | "finished";
  score?: {
    home: number;
    away: number;
  };
  heatIndex: number;
  source: RecordSource;
}

export interface Standing {
  teamId: string;
  group: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  qualificationProbability: number;
  source: RecordSource;
}

export interface Ranking {
  teamId: string;
  fifaRank: number;
  rankingPoints: number;
  previousRank?: number;
  source: RecordSource;
}

export interface OddsSnapshot {
  fixtureId: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  source: RecordSource;
}

export interface SentimentSnapshot {
  fixtureId: string;
  buzz: number;
  positiveHome: number;
  positiveAway: number;
  source: RecordSource;
}

export interface DataStore {
  sources: DataSource[];
  teams: Team[];
  players: Player[];
  fixtures: Fixture[];
  standings: Standing[];
  rankings: Ranking[];
  odds: OddsSnapshot[];
  sentiment: SentimentSnapshot[];
}

export interface PredictionResult {
  fixtureId: string;
  probabilities: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  expectedGoals: {
    home: number;
    away: number;
  };
  predictedScore: {
    home: number;
    away: number;
  };
  scoreRange: string;
  scoreConfidence: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  keyFactors: string[];
  riskFactors: string[];
  source: RecordSource;
}

export interface MatchAnalysis {
  fixtureId: string;
  title: string;
  summary: string;
  tacticalFocus: string[];
  keyPlayers: string[];
  upsetRisk: string;
  scorePrediction: string;
  sourceNote: string;
}
