import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { teamLabel } from "../lib/team-display";
import type { Team } from "../lib/types";

function team(overrides: Partial<Team>): Team {
  return {
    id: "netherlands",
    name: "Netherlands",
    nameZh: "荷兰",
    shortName: "Netherlands",
    fifaCode: "NED",
    group: "F",
    region: "UEFA",
    fifaRank: 7,
    rankingPoints: 1761,
    attack: 90,
    defense: 88,
    midfield: 89,
    form: 88,
    tempo: 85,
    source: {
      sourceId: "test",
      sourceName: "Test",
      sourceUrl: "https://example.com",
      sourceKind: "official",
      lastFetchedAt: "2026-06-20T00:00:00.000Z",
      confidence: "official",
      isMockOrEstimated: false
    },
    ...overrides
  };
}

describe("teamLabel", () => {
  it("appends the FIFA code to Chinese names that do not already end with it", () => {
    expect(teamLabel(team({ nameZh: "荷兰", fifaCode: "NED" }))).toBe("荷兰（NED）");
  });

  it("does not append the FIFA code again when a Chinese name already ends with it", () => {
    expect(teamLabel(team({ nameZh: "荷兰（NED）", fifaCode: "NED" }))).toBe("荷兰（NED）");
  });

  it("appends the FIFA code to English names that do not already end with it", () => {
    expect(teamLabel(team({ id: "example-team", nameZh: undefined, name: "Netherlands", fifaCode: "NED" }))).toBe("Netherlands（NED）");
  });

  it("does not append the FIFA code again when an English name already ends with it", () => {
    expect(teamLabel(team({ id: "example-team", nameZh: undefined, name: "Netherlands (NED)", fifaCode: "NED" }))).toBe("Netherlands (NED)");
  });

  it("does not treat a code-like word in the middle of a name as an existing suffix", () => {
    expect(teamLabel(team({ id: "example-team", nameZh: undefined, name: "NED Academy", fifaCode: "NED" }))).toBe("NED Academy（NED）");
  });

  it("keeps other teams using the same display format", () => {
    expect(teamLabel(team({ id: "brazil", nameZh: "巴西", name: "Brazil", fifaCode: "BRA" }))).toBe("巴西（BRA）");
  });
});

describe("DashboardClient team labels", () => {
  it("does not manually append a FIFA code after the shared team label helper", async () => {
    const source = await readFile("components/dashboard-client.tsx", "utf8");

    expect(source).not.toContain("localizedTeamLabel(home)}（{home.fifaCode}）");
    expect(source).not.toContain("localizedTeamLabel(away)}（{away.fifaCode}）");
  });
});
