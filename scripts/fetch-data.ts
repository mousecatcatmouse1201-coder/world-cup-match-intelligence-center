import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface FetchSource {
  id: string;
  name: string;
  url: string;
  kind: "official" | "secondary";
}

interface RawManifestEntry extends FetchSource {
  fetchedAt: string;
  fileName?: string;
  ok: boolean;
  status?: number;
  error?: string;
}

interface FetchAuditReport {
  generatedAt: string;
  totalSources: number;
  okSources: number;
  failedSources: number;
  sources: RawManifestEntry[];
}

const rawDir = path.join(process.cwd(), "data", "raw");

const sources: FetchSource[] = [
  {
    id: "fifa-fixtures-official",
    name: "FIFA World Cup 2026 官方赛程",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures",
    kind: "official"
  },
  {
    id: "fifa-ranking-official",
    name: "FIFA/Coca-Cola 男足世界排名",
    url: "https://inside.fifa.com/fifa-world-ranking/men",
    kind: "official"
  },
  {
    id: "espn-fixtures-secondary",
    name: "ESPN 2026 World Cup 赛程校验",
    url: "https://www.espn.com/soccer/schedule/_/league/fifa.world",
    kind: "secondary"
  }
];

async function loadExistingManifest() {
  try {
    const raw = await readFile(path.join(rawDir, "manifest.json"), "utf8");
    return JSON.parse(raw) as RawManifestEntry[];
  } catch {
    return [];
  }
}

async function fetchSource(source: FetchSource): Promise<RawManifestEntry> {
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent":
          "WorldCupMatchIntelligenceCenter/0.1 educational data snapshot; contact=local-project",
        accept: "text/html,application/json;q=0.9,*/*;q=0.8"
      }
    });
    const text = await response.text();
    const safeTimestamp = fetchedAt.replace(/[:.]/g, "-");
    const fileName = `${source.id}-${safeTimestamp}.html`;
    await writeFile(path.join(rawDir, fileName), text, "utf8");

    return {
      ...source,
      fetchedAt,
      fileName,
      ok: response.ok,
      status: response.status,
      error: response.ok ? undefined : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      ...source,
      fetchedAt,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown fetch failure"
    };
  }
}

async function main() {
  await mkdir(rawDir, { recursive: true });
  const previous = await loadExistingManifest();
  const results = await Promise.all(sources.map(fetchSource));
  const manifest = [...previous, ...results].slice(-30);
  const report: FetchAuditReport = {
    generatedAt: new Date().toISOString(),
    totalSources: results.length,
    okSources: results.filter((item) => item.ok).length,
    failedSources: results.filter((item) => !item.ok).length,
    sources: results
  };

  await writeFile(path.join(rawDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  await writeFile(path.join(rawDir, "fetch-report.json"), JSON.stringify(report, null, 2), "utf8");

  const failed = results.filter((item) => !item.ok);
  for (const item of results) {
    const marker = item.ok ? "OK" : "WARN";
    console.log(`${marker} ${item.name} ${item.status ?? ""} ${item.fileName ?? item.error}`);
  }

  if (failed.length === results.length) {
    console.warn("所有远程来源抓取失败。normalize 会继续使用上一次 JSON 或内置基线数据。");
  }

  console.log(`抓取审计报告完成：data/raw/fetch-report.json，成功 ${report.okSources}/${report.totalSources}。`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
