import { NextResponse } from "next/server";
import { getEnrichedFixtureBundle } from "../../../lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const fixtureId = String(body.fixtureId ?? "");
  const match = await getEnrichedFixtureBundle(fixtureId);

  if (!match) {
    return NextResponse.json({ error: "fixtureId is required or invalid" }, { status: 400 });
  }

  if (!match.predictionEligibility.canPredict || !match.prediction) {
    return NextResponse.json({ error: match.predictionEligibility.message, predictionEligibility: match.predictionEligibility }, { status: 400 });
  }

  return NextResponse.json(match.analysis);
}
