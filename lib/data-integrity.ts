import type { DataStore, Fixture } from "./types";

export interface DataIntegrityIssue {
  fixtureId: string;
  message: string;
}

function hasScore(fixture: Fixture) {
  return fixture.score !== undefined || fixture.result?.homeScore !== undefined || fixture.result?.awayScore !== undefined;
}

export function collectDataIntegrityIssues(store: Pick<DataStore, "fixtures">): DataIntegrityIssue[] {
  const issues: DataIntegrityIssue[] = [];

  for (const fixture of store.fixtures) {
    const score = fixture.score;
    const result = fixture.result;

    if (!fixture.sourceUpdatedAt) issues.push({ fixtureId: fixture.id, message: "missing sourceUpdatedAt" });
    if (!fixture.lastNormalizedAt) issues.push({ fixtureId: fixture.id, message: "missing lastNormalizedAt" });

    if (fixture.status === "finished") {
      if (!score || result?.homeScore === undefined || result?.awayScore === undefined) {
        issues.push({ fixtureId: fixture.id, message: "finished fixture must include score and result" });
      }
      if (!fixture.lastResultsUpdatedAt) issues.push({ fixtureId: fixture.id, message: "finished fixture missing lastResultsUpdatedAt" });
      if (!fixture.predictionSnapshot) issues.push({ fixtureId: fixture.id, message: "finished fixture missing pre-match predictionSnapshot" });
    } else if (hasScore(fixture)) {
      issues.push({ fixtureId: fixture.id, message: `${fixture.status} fixture must not include a final score/result` });
    }

    if (score && result && (score.home !== result.homeScore || score.away !== result.awayScore)) {
      issues.push({ fixtureId: fixture.id, message: "score and result must be synchronized" });
    }
    if (fixture.predictionSnapshot && fixture.predictionSnapshot.fixtureId !== fixture.id) {
      issues.push({ fixtureId: fixture.id, message: "predictionSnapshot fixtureId does not match fixture" });
    }
    if (fixture.predictionSnapshot && Date.parse(fixture.predictionSnapshot.capturedAt) > Date.parse(fixture.kickoff)) {
      issues.push({ fixtureId: fixture.id, message: "predictionSnapshot must be captured no later than kickoff" });
    }
  }

  return issues;
}

export function assertDataIntegrity(store: Pick<DataStore, "fixtures">) {
  const issues = collectDataIntegrityIssues(store);
  if (issues.length) {
    throw new Error(`Data integrity check failed:\n${issues.map((issue) => `- ${issue.fixtureId}: ${issue.message}`).join("\n")}`);
  }
}
