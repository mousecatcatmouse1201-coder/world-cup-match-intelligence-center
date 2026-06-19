import { NextResponse } from "next/server";
import { generateMatchAnalysis } from "../../../../lib/analysis";
import { predictMatch } from "../../../../lib/prediction";
import { getFixtureBundle } from "../../../../lib/store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const bundle = await getFixtureBundle(id);

  if (!bundle) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  const prediction = predictMatch(bundle);
  const analysis = generateMatchAnalysis({ ...bundle, prediction });
  return NextResponse.json({ ...bundle, prediction, analysis });
}
