import { NextResponse } from "next/server";
import { getEnrichedFixtureBundles } from "../../../lib/store";

export async function GET() {
  const { store, matches } = await getEnrichedFixtureBundles();
  const predictions = matches.flatMap((match) => match.prediction ? [match.prediction] : []);
  return NextResponse.json({ ...store, predictions, matches });
}
