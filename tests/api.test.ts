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

  it("keeps matches API shape after all current prediction-window matches finish", async () => {
    const response = await getMatches();
    const body = await response.json();

    expect(body.fixtures.length).toBeGreaterThan(0);
    expect(body.matches.length).toBe(body.fixtures.length);
    expect(body.fixtures.length).toBe(72);
    expect(body.predictions).toEqual([]);
    for (const fixtureId of ["match-029", "match-030", "match-031", "match-032"]) {
      const match = body.matches.find((item: { fixture: { id: string } }) => item.fixture.id === fixtureId);
      expect(match.status).toBe("finished");
      expect(match.prediction).toBeNull();
      expect(match.reviewPrediction).toBeTruthy();
      expect(match.review).toBeTruthy();
    }
  });

  it("keeps list and detail enriched predictions consistent", async () => {
    const listResponse = await getMatches();
    const listBody = await listResponse.json();
    const detailResponse = await getMatchById(new Request("http://localhost/api/matches/match-011"), {
      params: Promise.resolve({ id: "match-011" })
    });
    const detailBody = await detailResponse.json();
    const listMatch = listBody.matches.find((match: { fixture: { id: string } }) => match.fixture.id === "match-011");

    expect(listMatch.prediction).toBeNull();
    expect(detailBody.enrichedMatch.prediction).toBeNull();
    expect(listMatch.reviewPrediction.predictedScore).toEqual(detailBody.enrichedMatch.reviewPrediction.predictedScore);
    expect(listMatch.status).toBe(detailBody.enrichedMatch.status);
    expect(detailBody.enrichedMatch.status).toBe("finished");
    expect(detailBody.enrichedMatch.result.homeScore).toBe(1);
    expect(detailBody.enrichedMatch.result.awayScore).toBe(0);
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
    expect(body.enrichedMatch.review).toBeTruthy();
    expect(body.enrichedMatch.dataConfidence.result).toBe("secondary");
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

  it("rejects predict and analyze APIs for finished today matches", async () => {
    const predictResponse = await postPredict(
      new Request("http://localhost/api/predict", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-011" })
      })
    );
    const predictBody = await predictResponse.json();
    const analyzeResponse = await postAnalyze(
      new Request("http://localhost/api/analyze", {
        method: "POST",
        body: JSON.stringify({ fixtureId: "match-011" })
      })
    );
    const analyzeBody = await analyzeResponse.json();

    expect(predictResponse.status).toBe(400);
    expect(predictBody.predictionEligibility.canPredict).toBe(false);
    expect(analyzeResponse.status).toBe(400);
    expect(analyzeBody.predictionEligibility.canPredict).toBe(false);
  });
});
