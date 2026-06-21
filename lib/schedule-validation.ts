import type { Fixture } from "./types";

export interface ScheduleValidationIssue { fixtureId: string; fields: string[]; }

// Values transcribed from FIFA's match-specific schedule pages on 2026-06-20.
// A fixture is only eligible for an official schedule claim when this check passes.
export const VERIFIED_FIXTURE_BASELINE: Record<string, Pick<Fixture, "kickoff" | "city" | "venue" | "homeTeamId" | "awayTeamId">> = {
  "match-031": { kickoff: "2026-06-19T20:30:00-04:00", city: "Philadelphia", venue: "Philadelphia Stadium", homeTeamId: "brazil", awayTeamId: "haiti" },
  "match-032": { kickoff: "2026-06-19T20:00:00-07:00", city: "San Francisco Bay Area", venue: "San Francisco Bay Area Stadium", homeTeamId: "turkiye", awayTeamId: "paraguay" },
  "match-033": { kickoff: "2026-06-20T12:00:00-05:00", city: "Houston", venue: "Houston Stadium", homeTeamId: "netherlands", awayTeamId: "sweden" },
  "match-034": { kickoff: "2026-06-20T16:00:00-04:00", city: "Toronto", venue: "Toronto Stadium", homeTeamId: "germany", awayTeamId: "ivory-coast" },
  "match-035": { kickoff: "2026-06-20T19:00:00-05:00", city: "Kansas City", venue: "Kansas City Stadium", homeTeamId: "ecuador", awayTeamId: "curacao" },
  "match-036": { kickoff: "2026-06-20T22:00:00-06:00", city: "Monterrey", venue: "Monterrey Stadium", homeTeamId: "tunisia", awayTeamId: "japan" }
};

export function collectVenueTimeMismatches(fixtures: Fixture[]): ScheduleValidationIssue[] {
  return fixtures.flatMap((fixture) => {
    const baseline = VERIFIED_FIXTURE_BASELINE[fixture.id];
    if (!baseline) return [];
    const fields = (Object.keys(baseline) as Array<keyof typeof baseline>).filter((field) => fixture[field] !== baseline[field]);
    return fields.length ? [{ fixtureId: fixture.id, fields }] : [];
  });
}

export function isScheduleVerified(fixture: Fixture) {
  return !collectVenueTimeMismatches([fixture]).length;
}
