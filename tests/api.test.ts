import { describe, expect, it, vi } from "vitest";
import { GET as getMatches } from "../app/api/matches/route";
import { GET as getSources } from "../app/api/sources/route";
import { POST as postPredict } from "../app/api/predict/route";

vi.mock("next/cache", () => ({
  unstable_cache: (callback: unknown) => callback
}));

describe("api routes", () => {
  it("keeps matches API shape with predictions", async () => {
    const response = await getMatches();
    const body = await response.json();

    expect(body.fixtures.length).toBeGreaterThan(0);
    expect(body.predictions.length).toBe(body.fixtures.length);
  });

  it("returns source catalog and data quality summary", async () => {
    const response = await getSources();
    const body = await response.json();

    expect(body.sources.length).toBeGreaterThan(0);
    expect(body.summary.totalRecords).toBeGreaterThan(0);
    expect(body.summary.groups.map((group: { key: string }) => group.key)).toContain("odds");
  });

  it("keeps predict API as a POST endpoint", async () => {
    const response = await postPredict(
      new Request("http://localhost/api/predict", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-001" })
      })
    );
    const body = await response.json();

    expect(body.fixtureId).toBe("match-001");
    expect(body.predictedScore).toBeTruthy();
  });
});
