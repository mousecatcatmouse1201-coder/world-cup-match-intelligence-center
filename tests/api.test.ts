import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as postAnalyze } from "../app/api/analyze/route";
import { GET as getMatches } from "../app/api/matches/route";
import { GET as getMatchById } from "../app/api/matches/[id]/route";
import { GET as getSources } from "../app/api/sources/route";
import { POST as postPredict } from "../app/api/predict/route";

vi.mock("next/cache", () => ({
  unstable_cache: (callback: unknown) => callback
}));

describe("api routes", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-19T12:00:00+08:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("keeps matches API shape with only eligible predictions", async () => {
    const response = await getMatches();
    const body = await response.json();

    expect(body.fixtures.length).toBeGreaterThan(0);
    expect(body.predictions.length).toBe(4);
    expect(body.predictions.map((prediction: { fixtureId: string }) => prediction.fixtureId)).not.toContain("match-001");
  });

  it("returns source catalog and data quality summary", async () => {
    const response = await getSources();
    const body = await response.json();

    expect(body.sources.length).toBeGreaterThan(0);
    expect(body.summary.totalRecords).toBeGreaterThan(0);
    expect(body.summary.groups.map((group: { key: string }) => group.key)).toContain("odds");
  });

  it("returns null prediction and analysis for old match detail", async () => {
    const response = await getMatchById(new Request("http://localhost/api/matches/match-001"), {
      params: Promise.resolve({ id: "match-001" })
    });
    const body = await response.json();

    expect(body.fixture.id).toBe("match-001");
    expect(body.prediction).toBeNull();
    expect(body.analysis).toBeNull();
    expect(body.predictionEligibility.canPredict).toBe(false);
  });

  it("rejects predict API for finished matches", async () => {
    const response = await postPredict(
      new Request("http://localhost/api/predict", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-001" })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.predictionEligibility.canPredict).toBe(false);
  });

  it("keeps predict and analyze APIs for eligible matches", async () => {
    const predictResponse = await postPredict(
      new Request("http://localhost/api/predict", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-005" })
      })
    );
    const predictBody = await predictResponse.json();
    const analyzeResponse = await postAnalyze(
      new Request("http://localhost/api/analyze", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-005" })
      })
    );
    const analyzeBody = await analyzeResponse.json();

    expect(predictResponse.status).toBe(200);
    expect(predictBody.fixtureId).toBe("match-005");
    expect(predictBody.predictedScore).toBeTruthy();
    expect(analyzeResponse.status).toBe(200);
    expect(analyzeBody.fixtureId).toBe("match-005");
  });
});
