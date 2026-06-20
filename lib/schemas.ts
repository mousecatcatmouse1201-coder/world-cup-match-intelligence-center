import { z } from "zod";

export const recordSourceSchema = z.object({
  sourceId: z.string().min(1),
  sourceName: z.string().min(1),
  sourceUrl: z.string().url(),
  sourceKind: z.enum(["official", "secondary", "manual", "model"]),
  lastFetchedAt: z.string().datetime(),
  confidence: z.enum(["official", "secondary", "estimated", "modeled"]),
  isMockOrEstimated: z.boolean()
});

export const dataSourceSchema = recordSourceSchema.extend({
  description: z.string().min(1)
});

export const teamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  fifaCode: z.string().min(2).max(4),
  group: z.string().min(1),
  region: z.string().min(1),
  fifaRank: z.number().int().positive(),
  rankingPoints: z.number().positive(),
  attack: z.number().min(0).max(100),
  defense: z.number().min(0).max(100),
  midfield: z.number().min(0).max(100),
  form: z.number().min(0).max(100),
  tempo: z.number().min(0).max(100),
  source: recordSourceSchema
});

export const playerSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(["fit", "doubtful", "injured"]),
  impact: z.number().min(0).max(100),
  note: z.string(),
  source: recordSourceSchema
});

export const fixtureSchema = z.object({
  id: z.string().min(1),
  externalIds: z
    .object({
      fifa: z.string().min(1).optional(),
      espn: z.string().min(1).optional()
    })
    .optional(),
  group: z.string().min(1),
  stage: z.string().min(1),
  kickoff: z.string().datetime({ offset: true }),
  kickoffAtLocal: z.string().datetime({ offset: true }).optional(),
  kickoffAtUtc: z.string().datetime().optional(),
  kickoffAtBeijing: z.string().min(1).optional(),
  beijingDate: z.string().min(1).optional(),
  beijingTimeLabel: z.string().min(1).optional(),
  venue: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1).optional(),
  homeTeamId: z.string().min(1).optional(),
  awayTeamId: z.string().min(1).optional(),
  homePlaceholder: z.string().min(1).optional(),
  awayPlaceholder: z.string().min(1).optional(),
  status: z.enum(["scheduled", "live", "live_pending", "finished", "result_pending", "unknown"]),
  score: z
    .object({
      home: z.number().int().min(0),
      away: z.number().int().min(0)
    })
    .optional(),
  result: z
    .object({
      homeScore: z.number().int().min(0),
      awayScore: z.number().int().min(0),
      source: z.union([z.literal("official"), z.literal("secondary"), z.string()]),
      updatedAt: z.string().datetime()
    })
    .optional(),
  heatIndex: z.number().min(0).max(100),
  source: recordSourceSchema
});

export const standingSchema = z.object({
  teamId: z.string().min(1),
  group: z.string().min(1),
  played: z.number().int().min(0),
  won: z.number().int().min(0),
  drawn: z.number().int().min(0),
  lost: z.number().int().min(0),
  goalsFor: z.number().int().min(0),
  goalsAgainst: z.number().int().min(0),
  points: z.number().int().min(0),
  qualificationProbability: z.number().min(0).max(100),
  source: recordSourceSchema
});

export const rankingSchema = z.object({
  teamId: z.string().min(1),
  fifaRank: z.number().int().positive(),
  rankingPoints: z.number().positive(),
  previousRank: z.number().int().positive().optional(),
  source: recordSourceSchema
});

export const oddsSchema = z.object({
  fixtureId: z.string().min(1),
  homeWin: z.number().positive(),
  draw: z.number().positive(),
  awayWin: z.number().positive(),
  source: recordSourceSchema
});

export const sentimentSchema = z.object({
  fixtureId: z.string().min(1),
  buzz: z.number().min(0).max(100),
  positiveHome: z.number().min(0).max(100),
  positiveAway: z.number().min(0).max(100),
  source: recordSourceSchema
});

export const dataStoreSchema = z.object({
  sources: z.array(dataSourceSchema).min(1),
  teams: z.array(teamSchema).min(2),
  players: z.array(playerSchema),
  fixtures: z.array(fixtureSchema).min(1),
  standings: z.array(standingSchema),
  rankings: z.array(rankingSchema),
  odds: z.array(oddsSchema),
  sentiment: z.array(sentimentSchema)
});
