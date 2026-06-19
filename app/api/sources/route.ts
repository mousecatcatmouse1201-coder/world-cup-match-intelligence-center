import { NextResponse } from "next/server";
import { summarizeSourceList } from "../../../lib/data-quality";
import { getSourcesBundle } from "../../../lib/store";

export async function GET() {
  const { sources, summary } = await getSourcesBundle();

  return NextResponse.json({
    sources: summarizeSourceList(sources),
    summary
  });
}
