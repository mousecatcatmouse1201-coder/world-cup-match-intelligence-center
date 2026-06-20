import { getTodayDateKeyInBeijing } from "./format";

export interface DashboardMatchLike {
  beijingDate: string;
  fixture: {
    heatIndex: number;
  };
  upsetRisk: number;
  home: {
    id: string;
  };
  away: {
    id: string;
  };
}

export function getTodayMatches<T extends DashboardMatchLike>(matches: T[], now = new Date()) {
  const todayDateKey = getTodayDateKeyInBeijing(now);
  return matches.filter((match) => match.beijingDate === todayDateKey);
}

export function getMostPopularMatch<T extends DashboardMatchLike>(matches: T[]) {
  return matches.slice().sort((a, b) => b.fixture.heatIndex - a.fixture.heatIndex)[0];
}

export function getHighestUpsetRiskMatch<T extends DashboardMatchLike>(matches: T[]) {
  return matches.slice().sort((a, b) => b.upsetRisk - a.upsetRisk)[0];
}

export function getFavoriteTeamMatches<T extends DashboardMatchLike>(matches: T[], favoriteTeamIds: string[]) {
  return matches.filter((match) => favoriteTeamIds.includes(match.home.id) || favoriteTeamIds.includes(match.away.id));
}
