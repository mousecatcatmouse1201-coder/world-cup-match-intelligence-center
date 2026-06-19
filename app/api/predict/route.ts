import { NextResponse } from "next/server";
import { getFixturePredictionEligibility, predictMatch } from "../../../lib/prediction";
import { getFixtureBundle } from "../../../lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const fixtureId = String(body.fixtureId ?? "");
  const bundle = await getFixtureBundle(fixtureId);

  if (!bundle) {
    return NextResponse.json({ error: "fixtureId is required or invalid" }, { status: 400 });
  }

  const predictionEligibility = getFixturePredictionEligibility(bundle.fixture);

  if (!predictionEligibility.canPredict) {
    return NextResponse.json({ error: predictionEligibility.message, predictionEligibility }, { status: 400 });
  }

  return NextResponse.json(predictMatch(bundle));
}
