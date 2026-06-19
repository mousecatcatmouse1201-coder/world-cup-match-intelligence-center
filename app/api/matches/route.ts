import { NextResponse } from "next/server";
import { predictMany } from "../../../lib/prediction";
import { loadStore } from "../../../lib/store";

export async function GET() {
  const store = await loadStore();
  const predictions = predictMany(store.fixtures, store.teams, store.players, store.odds, store.sentiment);
  return NextResponse.json({ ...store, predictions });
}
