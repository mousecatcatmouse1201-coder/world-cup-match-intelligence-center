import { NextResponse } from "next/server";
import { getTeamBundle } from "../../../../lib/store";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const bundle = await getTeamBundle(id);

  if (!bundle) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json(bundle);
}
