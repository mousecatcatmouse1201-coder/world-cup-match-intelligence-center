import { NextResponse } from "next/server";
import { getEnrichedFixtureBundle } from "../../../../lib/store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const match = await getEnrichedFixtureBundle(id);

  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...match,
    enrichedMatch: match,
    prediction: match.prediction,
    analysis: match.prediction ? match.analysis : null,
    predictionEligibility: match.predictionEligibility
  });
}
