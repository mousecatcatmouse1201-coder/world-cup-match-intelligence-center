import type { MetadataRoute } from "next";
import { getEnrichedFixtureBundles } from "../lib/store";

const siteUrl = "https://world-cup-match-intelligence-center.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { matches, store } = await getEnrichedFixtureBundles();
  const lastModified = new Date(Math.max(
    ...store.sources.map((source) => new Date(source.lastFetchedAt).getTime()),
    Date.now()
  ));

  return [
    { url: siteUrl, lastModified, changeFrequency: "hourly", priority: 1 },
    ...matches.map((match) => ({
      url: `${siteUrl}/matches/${match.fixture.id}`,
      lastModified: new Date(match.fixture.lastResultsUpdatedAt ?? match.fixture.lastNormalizedAt),
      changeFrequency: "hourly" as const,
      priority: 0.8
    })),
    ...store.teams.map((team) => ({
      url: `${siteUrl}/teams/${team.id}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.6
    }))
  ];
}
