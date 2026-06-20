import { readFile } from "node:fs/promises";
import path from "node:path";
import { unstable_cache } from "next/cache";
import { buildDataQualitySummary } from "./data-quality";
import { getEnrichedMatchById, getEnrichedMatches } from "./match-intelligence";
import type { PredictionWindowOptions } from "./prediction";
import { dataStoreSchema } from "./schemas";
import type {
  DataSource,
  DataStore,
  Fixture,
  OddsSnapshot,
  Player,
  Ranking,
  SentimentSnapshot,
  Standing,
  Team
} from "./types";

const storePath = (...parts: string[]) => path.join(process.cwd(), "data", "store", ...parts);

async function readJson<T>(fileName: string): Promise<T> {
  const raw = await readFile(storePath(fileName), "utf8");
  return JSON.parse(raw) as T;
}

async function loadStoreUncached(): Promise<DataStore> {
  const store = {
    sources: await readJson<DataSource[]>("sources.json"),
    teams: await readJson<Team[]>("teams.json"),
    players: await readJson<Player[]>("players.json"),
    fixtures: await readJson<Fixture[]>("fixtures.json"),
    standings: await readJson<Standing[]>("standings.json"),
    rankings: await readJson<Ranking[]>("rankings.json"),
    odds: await readJson<OddsSnapshot[]>("odds.json"),
    sentiment: await readJson<SentimentSnapshot[]>("sentiment.json")
  };

  return dataStoreSchema.parse(store);
}

export const loadStore = unstable_cache(loadStoreUncached, ["data-store"], {
  revalidate: 300
});

export async function getFixtureBundle(id: string) {
  const store = await loadStore();
  const fixture = store.fixtures.find((item) => item.id === id);

  if (!fixture) {
    return null;
  }

  const homeTeam = store.teams.find((team) => team.id === fixture.homeTeamId);
  const awayTeam = store.teams.find((team) => team.id === fixture.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return null;
  }

  return {
    store,
    fixture,
    homeTeam,
    awayTeam,
    homePlayers: store.players.filter((player) => player.teamId === homeTeam.id),
    awayPlayers: store.players.filter((player) => player.teamId === awayTeam.id),
    odds: store.odds.find((item) => item.fixtureId === fixture.id),
    sentiment: store.sentiment.find((item) => item.fixtureId === fixture.id)
  };
}

export async function getEnrichedFixtureBundle(id: string, options: PredictionWindowOptions = {}) {
  const store = await loadStore();
  return getEnrichedMatchById(store, id, options);
}

export async function getEnrichedFixtureBundles(options: PredictionWindowOptions = {}) {
  const store = await loadStore();
  return {
    store,
    matches: getEnrichedMatches(store, options)
  };
}

export async function getTeamBundle(id: string) {
  const store = await loadStore();
  const team = store.teams.find((item) => item.id === id);

  if (!team) {
    return null;
  }

  return {
    store,
    team,
    players: store.players.filter((player) => player.teamId === id),
    fixtures: store.fixtures.filter((fixture) => fixture.homeTeamId === id || fixture.awayTeamId === id),
    standing: store.standings.find((standing) => standing.teamId === id),
    ranking: store.rankings.find((ranking) => ranking.teamId === id)
  };
}

export async function getSourcesBundle() {
  const store = await loadStore();

  return {
    sources: store.sources,
    summary: buildDataQualitySummary(store)
  };
}
