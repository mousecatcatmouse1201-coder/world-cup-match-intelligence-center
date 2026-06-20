import { appendFile } from "node:fs/promises";
import { spawn } from "node:child_process";

const productionUrl = "https://world-cup-match-intelligence-center.vercel.app";
const checks = [
  ["/", ["今日焦点", "完整小组赛数据", "小组积分榜与出线形势（本地规则推断）", "今日比赛按北京时间日期计算"]],
  ["/matches/match-001", ["预测复盘", "总进球偏差"]],
  ["/matches/match-010", ["加拿大 vs 卡塔尔", "实际比分", "6-0", "赛后预测复盘"]],
  ["/api/matches", ["match-008", "match-009", "match-010", "match-011", "predictions"]]
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: process.env,
      shell: process.platform === "win32"
    });
    let output = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(text);
    });
    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stderr.write(text);
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
  });
}

function runCaptured(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: process.env,
      shell: process.platform === "win32"
    });
    let output = "";

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
  });
}

function extractDeployment(output) {
  const id = output.match(/"id":\s*"(dpl_[^"]+)"/)?.[1] ?? "unknown";
  const url =
    output.match(/"url":\s*"(https:\/\/[^"]+)"/)?.[1] ??
    output.match(/Production\s+(https:\/\/\S+)/)?.[1] ??
    productionUrl;
  const inspectorUrl = output.match(/"inspectorUrl":\s*"(https:\/\/[^"]+)"/)?.[1] ?? "unknown";

  return { id, url, inspectorUrl };
}

function assertProductionInspect(output, deploymentId) {
  const required = ["target\tproduction", "status\t● Ready", "https://world-cup-match-intelligence-center.vercel.app"];
  const missing = required.filter((needle) => !output.includes(needle));

  if (deploymentId !== "unknown" && !output.includes(deploymentId)) {
    missing.push(deploymentId);
  }

  if (missing.length) {
    throw new Error(`Production inspect did not confirm alias target: missing ${missing.join(", ")}`);
  }
}

function normalizeHtmlText(body) {
  return body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function smokeCheck() {
  const results = [];

  for (const [path, needles] of checks) {
    const url = `${productionUrl}${path}`;
    const response = await fetch(url);
    const body = await response.text();
    const missing = needles.filter((needle) => !body.includes(needle));

    results.push({
      path,
      status: response.status,
      ok: response.ok && missing.length === 0,
      missing
    });
  }

  return results;
}

async function smokeCheckTodayMatches() {
  const response = await fetch(`${productionUrl}/api/matches`, { cache: "no-store" });
  const body = await response.json();
  const matches = Array.isArray(body.matches) ? body.matches : [];
  const todayMatches = matches.filter((match) => match.beijingDate === "2026-06-19");
  const todayIds = todayMatches.map((match) => match.fixture?.id);
  const requiredIds = ["match-008", "match-009", "match-010", "match-011"];
  const forbiddenIds = ["match-005", "match-006", "match-007"];
  const missing = requiredIds.filter((id) => !todayIds.includes(id));
  const forbidden = forbiddenIds.filter((id) => todayIds.includes(id));

  return {
    path: "/api/matches#beijing-2026-06-19",
    status: response.status,
    ok: response.ok && missing.length === 0 && forbidden.length === 0 && todayMatches.length === 4,
    missing,
    forbidden,
    count: todayMatches.length
  };
}

async function smokeCheckScheduleCoverageApi() {
  const response = await fetch(`${productionUrl}/api/matches?scheduleSmoke=${Date.now()}`, { cache: "no-store" });
  const body = await response.json();
  const fixtures = Array.isArray(body.fixtures) ? body.fixtures : [];
  const matches = Array.isArray(body.matches) ? body.matches : [];
  const groups = "ABCDEFGHIJKL".split("");
  const missing = [];

  if (fixtures.length !== 72) missing.push(`fixtures=72 got ${fixtures.length}`);
  if (matches.length !== 72) missing.push(`matches=72 got ${matches.length}`);

  for (const group of groups) {
    const count = fixtures.filter((fixture) => fixture.stage === "小组赛" && fixture.group === group).length;
    if (count !== 6) missing.push(`Group ${group}=6 got ${count}`);
  }

  return {
    path: "/api/matches#schedule-coverage",
    status: response.status,
    ok: response.ok && missing.length === 0,
    missing
  };
}

async function smokeCheckHomepageScheduleCoverage() {
  const response = await fetch(`${productionUrl}/?scheduleCoverageSmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const required = [
    "72 场小组赛数据",
    "2026-06-12 至 2026-06-28",
    "2026-06-28",
    "🇺🇸 美国 vs 🇦🇺 澳大利亚",
    "🏴 苏格兰 vs 🇲🇦 摩洛哥",
    "🇧🇷 巴西 vs 🇭🇹 海地",
    "🇹🇷 土耳其 vs 🇵🇾 巴拉圭",
    ... "ABCDEFGHIJKL".split("").map((group) => `${group} 组`)
  ];
  const start = text.indexOf("完整小组赛数据");
  const end = text.indexOf("进行中 / 比分待更新", start);
  const scheduleText = start >= 0 ? text.slice(start, end > start ? end : start + 900) : "";
  const forbidden = ["11 场比赛样本", "5 类来源", "4 场预测", "仅预测未来两天未完赛比赛"];
  const forbiddenInSchedule = ["United States vs Australia", "Brazil vs Haiti", "England vs Ghana"];
  const missing = required.filter((needle) => !text.includes(needle));
  const forbiddenFound = [
    ...forbidden.filter((needle) => text.includes(needle) || body.includes(needle)),
    ...forbiddenInSchedule.filter((needle) => scheduleText.includes(needle))
  ];
  const snippet = start >= 0 ? text.slice(start, end > start ? end : start + 900) : text.slice(0, 900);

  return {
    path: "/#schedule-coverage",
    status: response.status,
    ok: response.ok && missing.length === 0 && forbiddenFound.length === 0,
    missing,
    forbidden: forbiddenFound,
    snippet
  };
}

async function smokeCheckHomepageFocus() {
  const response = await fetch(`${productionUrl}/?smoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const focusStart = text.indexOf("今日焦点");
  const focusEnd = text.indexOf("我的主队中心", focusStart);
  const focusText = focusStart >= 0
    ? text.slice(focusStart, focusEnd > focusStart ? focusEnd : focusStart + 600)
    : "";
  const required = ["今日焦点", "今日比赛"];
  const forbidden = [];
  const missing = required.filter((needle) => !focusText.includes(needle));
  const forbiddenFound = forbidden.filter((needle) => focusText.includes(needle));

  return {
    path: "/#today-focus",
    status: response.status,
    ok: response.ok && focusStart >= 0 && missing.length === 0 && forbiddenFound.length === 0,
    missing,
    forbidden: forbiddenFound
  };
}

async function smokeCheckHomepageSections() {
  const response = await fetch(`${productionUrl}/?sectionSmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const required = ["进行中 / 比分待更新", "已结束比赛", "即将开始", "赛果待更新", "时间或数据异常"];
  const forbidden = [
    "墨西哥 vs 韩国 北京时间 06/19 09:00 · Guadalajara 比分待更新",
    "加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver 比分待更新"
  ];
  const missing = required.filter((needle) => !text.includes(needle));
  const forbiddenFound = forbidden.filter((needle) => text.includes(needle) || body.includes(needle));

  return {
    path: "/#status-sections",
    status: response.status,
    ok: response.ok && missing.length === 0 && forbiddenFound.length === 0,
    missing,
    forbidden: forbiddenFound
  };
}

async function smokeCheckTodayResults() {
  const response = await fetch(`${productionUrl}/api/matches`, { cache: "no-store" });
  const body = await response.json();
  const matches = Array.isArray(body.matches) ? body.matches : [];
  const byId = new Map(matches.map((match) => [match.fixture?.id, match]));
  const expectations = [
    ["match-010", 6, 0],
    ["match-011", 1, 0],
    ["match-009", 4, 1],
    ["match-008", 1, 1]
  ];
  const missing = [];

  for (const [id, homeScore, awayScore] of expectations) {
    const match = byId.get(id);
    if (
      !match ||
      match.status !== "finished" ||
      match.result?.homeScore !== homeScore ||
      match.result?.awayScore !== awayScore
    ) {
      missing.push(`${id} finished ${homeScore}-${awayScore}`);
    }
  }

  const misplaced = matches
    .filter((match) => ["match-008", "match-009", "match-010", "match-011"].includes(match.fixture?.id))
    .filter((match) => match.status === "scheduled" || match.status === "result_pending")
    .map((match) => `${match.fixture?.id}:${match.status}`);

  return {
    path: "/api/matches#today-results",
    status: response.status,
    ok: response.ok && missing.length === 0 && misplaced.length === 0,
    missing,
    forbidden: misplaced
  };
}

async function smokeCheckHomepageDoesNotContainUpsetRanking() {
  const response = await fetch(`${productionUrl}/?rankingRemovalSmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const forbidden = [
    "全量样本冷门风险排行",
    "规则模型推断 · 全量样本"
  ];
  const forbiddenFound = forbidden.filter((needle) => body.includes(needle));

  return {
    path: "/#upset-risk-ranking-removed",
    status: response.status,
    ok: response.ok && forbiddenFound.length === 0,
    forbidden: forbiddenFound
  };
}

async function smokeCheckChartDisclaimers() {
  const response = await fetch(`${productionUrl}/?chartDisclaimerSmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const chartStart = text.indexOf("模型表现");
  const chartEnd = text.indexOf("数据来源与更新时间", chartStart);
  const chartText = chartStart >= 0
    ? text.slice(chartStart, chartEnd > chartStart ? chartEnd : chartStart + 2400)
    : "";
  const required = [
    "模型表现",
    "全量样本热度排行（演示口径）",
    "全量 72 场样本的演示热度字段",
    "不是官方数据、官方关注度，也不是全网实时舆情",
    "全量样本球队雷达图（演示模型）",
    "属于本地演示模型口径",
    "不是官方数据、官方能力评分或实时状态",
    "小组出线概率（演示模型）",
    "覆盖全量小组赛样本",
    "不是官方数据、官方概率、博彩赔率或实时预测"
  ];
  const forbidden = [
    "Brazil 88",
    "Morocco 88",
    "Australia 92%",
    "Turkiye 92%",
    "Brazil 92%",
    "Morocco 92%"
  ];
  const missing = required.filter((needle) => !chartText.includes(needle));
  const forbiddenFound = forbidden.filter((needle) => chartText.includes(needle));
  const qualificationStart = chartText.indexOf("小组出线概率（演示模型）");
  const qualificationText = qualificationStart >= 0 ? chartText.slice(qualificationStart) : "";
  const probabilities = [...qualificationText.matchAll(/(\d+)%/g)].map((match) => match[1]);
  const uniqueProbabilities = new Set(probabilities);
  if (probabilities.length >= 4 && uniqueProbabilities.size === 1) {
    forbiddenFound.push(`出线概率全部为 ${probabilities[0]}%`);
  }

  return {
    path: "/#chart-disclaimers",
    status: response.status,
    ok: response.ok && chartStart >= 0 && missing.length === 0 && forbiddenFound.length === 0,
    missing,
    forbidden: forbiddenFound,
    snippet: chartText
  };
}

async function smokeCheckUiReadability() {
  const response = await fetch(`${productionUrl}/?uiReadabilitySmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const headers = {
    cacheControl: response.headers.get("cache-control") ?? "missing",
    vercelCache: response.headers.get("x-vercel-cache") ?? "missing",
    vercelId: response.headers.get("x-vercel-id") ?? "missing",
    matchedPath: response.headers.get("x-matched-path") ?? "missing"
  };
  const required = [
    "当前小组/收藏球队",
    "显示当前小组/收藏球队；完整 48 队请用搜索定位。",
    "数据可信度",
    "本地数据最近更新",
    "来源抓取时间",
    "首页默认只显示摘要；完整可信度字段请进入比赛详情页查看。",
    "28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛",
    "项目 / 数值",
    "小组积分榜与出线形势（本地规则推断）",
    "数据摘要",
    "进球 3",
    "失球 0",
    "净胜球 +3",
    "积分 6",
    "进球 3｜失球 0｜净胜球 +3｜积分 6"
  ];
  const forbidden = [
    "全部球队",
    "可信记录",
    "官方与二级来源",
    "演示/推断",
    "已独立标注",
    "数据可信度 赛程中 · 球队高 · 赛果二级来源 · 来源二级来源 比赛时间",
    "0+3",
    "3-1",
    "3-2",
    "3 0+3",
    "2 3-1",
    "2 2 0 0 3 0+3 6",
    "2 0 1 1 2 3-1 1",
    "2 0 1 1 1 3-2 1"
  ];
  const missing = required.filter((needle) => !text.includes(needle) && !body.includes(needle));
  const forbiddenRaw = forbidden.filter((needle) => body.includes(needle));
  const forbiddenText = forbidden.filter((needle) => text.includes(needle));
  const forbiddenFound = [...new Set([...forbiddenRaw, ...forbiddenText])];
  const start = text.indexOf("筛选比赛");
  const standingsStart = text.indexOf("小组积分榜与出线形势");
  const standingsEnd = text.indexOf("模型表现", standingsStart);
  const chartStart = text.indexOf("模型表现");
  const snippet = [
    `status=${response.status}`,
    `cache-control=${headers.cacheControl}`,
    `x-vercel-cache=${headers.vercelCache}`,
    `x-vercel-id=${headers.vercelId}`,
    `x-matched-path=${headers.matchedPath}`,
    `forbidden raw body=${forbiddenRaw.length ? forbiddenRaw.join(", ") : "none"}`,
    `forbidden visible text=${forbiddenText.length ? forbiddenText.join(", ") : "none"}`,
    standingsStart >= 0 ? text.slice(standingsStart, standingsEnd > standingsStart ? standingsEnd : standingsStart + 1200) : "",
    start >= 0 ? text.slice(start, start + 700) : "",
    chartStart >= 0 ? text.slice(chartStart, chartStart + 900) : ""
  ].filter(Boolean).join(" | ");

  return {
    path: "/#ui-readability",
    status: response.status,
    ok: response.ok && missing.length === 0 && forbiddenFound.length === 0,
    missing,
    forbidden: forbiddenFound,
    snippet
  };
}

async function smokeCheckGroupStandings() {
  const response = await fetch(`${productionUrl}/?standingsSmoke=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const body = await response.text();
  const text = normalizeHtmlText(body);
  const standingsStart = text.indexOf("小组积分榜与出线形势（本地规则推断）");
  const standingsEnd = text.indexOf("模型表现", standingsStart);
  const standingsText = standingsStart >= 0
    ? text.slice(standingsStart, standingsEnd > standingsStart ? standingsEnd : standingsStart + 1800)
    : "";
  const required = [
    "小组积分榜与出线形势（本地规则推断）",
    "A 组",
    "B 组",
    "排名 球队 数据摘要 出线形势",
    "进球 3｜失球 0｜净胜球 +3｜积分 6",
    "墨西哥",
    "当前位于直接出线区",
    "仍需后续比赛确认",
    "非 FIFA 官方确认排名",
    "72 场小组赛数据",
    "全量样本热度排行（演示口径）",
    "全量样本球队雷达图（演示模型）",
    "小组出线概率（演示模型）"
  ];
  const forbidden = [
    "11 场比赛样本",
    "5 类来源",
    "4 场预测",
    "仅预测未来两天未完赛比赛",
    "可信记录",
    "官方与二级来源",
    "演示/推断",
    "已独立标注",
    "热度含示例关注度字段，非全网实时舆情。",
    "球队画像基于排名与 MVP 补充数据整理。"
  ];
  const missing = required.filter((needle) => !text.includes(needle));
  const forbiddenFound = forbidden.filter((needle) => text.includes(needle));
  const rawRequired = [
    'id="group-standings"',
    'data-smoke="group-standings-homepage"',
    "小组积分榜与出线形势（本地规则推断）",
    "非 FIFA 官方确认排名"
  ];
  const rawMissing = rawRequired.filter((needle) => !body.includes(needle));

  return {
    path: "/#group-standings",
    status: response.status,
    ok: response.ok && standingsStart >= 0 && missing.length === 0 && rawMissing.length === 0 && forbiddenFound.length === 0,
    missing: [...missing, ...rawMissing.map((needle) => `raw:${needle}`)],
    forbidden: forbiddenFound,
    snippet: standingsText
  };
}

function assertGroupStandingsHtml(body, label) {
  const text = normalizeHtmlText(body);
  const forbiddenNeedles = [
    "0+3",
    "3-1",
    "3-2",
    "2 2 0 0 3 0+3 6",
    "2 0 1 1 2 3-1 1",
    "2 0 1 1 1 3-2 1"
  ];
  const requiredText = [
    "小组积分榜与出线形势（本地规则推断）",
    "A 组",
    "数据摘要",
    "进球 3｜失球 0｜净胜球 +3｜积分 6",
    "积分",
    "净胜球",
    "出线形势",
    "非 FIFA 官方确认排名",
    "build: standings-summary-v2 / no-legacy-columns / group-standings-homepage"
  ];
  const requiredRaw = [
    'id="group-standings"',
    'data-smoke="group-standings-homepage"',
    "数据摘要",
    "进球 3｜失球 0｜净胜球 +3｜积分 6"
  ];
  const missing = [
    ...requiredText.filter((needle) => !text.includes(needle)),
    ...requiredRaw.filter((needle) => !body.includes(needle)).map((needle) => `raw:${needle}`)
  ];
  const forbiddenRaw = forbiddenNeedles.filter((needle) => body.includes(needle));
  const forbiddenText = forbiddenNeedles.filter((needle) => text.includes(needle));
  const forbidden = [...new Set([...forbiddenRaw, ...forbiddenText])];
  const standingsStart = text.indexOf("小组积分榜与出线形势（本地规则推断）");
  const standingsEnd = text.indexOf("模型表现", standingsStart);

  return {
    label,
    ok: missing.length === 0 && forbidden.length === 0,
    missing,
    forbidden,
    snippet: [
      `forbidden raw body=${forbiddenRaw.length ? forbiddenRaw.join(", ") : "none"}`,
      `forbidden visible text=${forbiddenText.length ? forbiddenText.join(", ") : "none"}`,
      standingsStart >= 0 ? text.slice(standingsStart, standingsEnd > standingsStart ? standingsEnd : standingsStart + 1600) : ""
    ].filter(Boolean).join(" | ")
  };
}

async function smokeCheckGroupStandingsConsistency(deploymentUrl) {
  const randomMainUrl = `${productionUrl}/?smoke=${Date.now()}`;
  const mainResponse = await fetch(`${productionUrl}/`, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const randomResponse = await fetch(randomMainUrl, {
    cache: "no-store",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  });
  const deploymentOutput = await runCaptured("npx", ["vercel", "curl", deploymentUrl]);
  const checks = [
    {
      status: mainResponse.status,
      cacheControl: mainResponse.headers.get("cache-control"),
      xVercelCache: mainResponse.headers.get("x-vercel-cache"),
      xVercelId: mainResponse.headers.get("x-vercel-id"),
      xMatchedPath: mainResponse.headers.get("x-matched-path"),
      ...assertGroupStandingsHtml(await mainResponse.text(), "main")
    },
    {
      status: randomResponse.status,
      cacheControl: randomResponse.headers.get("cache-control"),
      xVercelCache: randomResponse.headers.get("x-vercel-cache"),
      xVercelId: randomResponse.headers.get("x-vercel-id"),
      xMatchedPath: randomResponse.headers.get("x-matched-path"),
      ...assertGroupStandingsHtml(await randomResponse.text(), "main-random-query")
    },
    {
      status: deploymentOutput.includes("Authentication Required") ? 401 : 200,
      cacheControl: "vercel curl",
      xVercelCache: "vercel curl",
      xVercelId: "vercel curl",
      xMatchedPath: "vercel curl",
      ...assertGroupStandingsHtml(deploymentOutput, "deployment-url-vercel-curl")
    }
  ];
  const missing = checks.flatMap((check) => check.missing.map((item) => `${check.label}:${item}`));
  const snippet = checks
    .map((check) => `${check.label}: status=${check.status}, cache-control=${check.cacheControl}, x-vercel-cache=${check.xVercelCache}, x-vercel-id=${check.xVercelId}, x-matched-path=${check.xMatchedPath}, ok=${check.ok}`)
    .join(" | ");

  return {
    path: "/#group-standings-consistency",
    status: checks.every((check) => check.status === 200 || check.label === "deployment-url-vercel-curl") ? 200 : 500,
    ok: missing.length === 0,
    missing,
    snippet
  };
}

async function smokeCheckStandingsLinkedPages() {
  const cases = [
    {
      path: "/teams/mexico",
      required: [
        "A 组积分榜",
        "墨西哥",
        "当前球队",
        "积分",
        "净胜球",
        "出线形势",
        "非 FIFA 官方确认排名",
        "当前排名：A 组第 1",
        "积分 6",
        "净胜球 +3",
        "进球 3｜失球 0｜净胜球 +3｜积分 6"
      ],
      forbidden: []
    },
    {
      path: "/teams/canada",
      required: [
        "B 组积分榜",
        "加拿大",
        "当前球队",
        "积分",
        "净胜球",
        "+6",
        "当前位于直接出线区"
      ],
      forbidden: []
    },
    {
      path: "/matches/match-008",
      required: [
        "捷克 vs 南非",
        "A 组",
        "A 组积分榜摘要",
        "本场赛果已计入 A 组积分榜",
        "捷克获得 1 分",
        "南非获得 1 分",
        "积分",
        "净胜球",
        "非 FIFA 官方确认排名",
        "进球 2｜失球 3｜净胜球 -1｜积分 1"
      ],
      forbidden: []
    },
    {
      path: "/matches/match-010",
      required: [
        "加拿大 vs 卡塔尔",
        "B 组",
        "B 组积分榜摘要",
        "本场赛果已计入 B 组积分榜",
        "加拿大获得 3 分",
        "卡塔尔获得 0 分",
        "+6",
        "进球 7｜失球 1｜净胜球 +6｜积分 4"
      ],
      forbidden: []
    },
    {
      path: "/matches/match-029",
      required: [
        "美国 vs Australia",
        "D 组",
        "D 组积分榜摘要",
        "本场比赛结果将影响",
        "直接出线区",
        "第三名竞争区",
        "赛果尚未产生"
      ],
      forbidden: ["本场赛果已计入"]
    }
  ];
  const results = [];

  for (const item of cases) {
    const separator = item.path.includes("?") ? "&" : "?";
    const response = await fetch(`${productionUrl}${item.path}${separator}smoke=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "cache-control": "no-cache",
        pragma: "no-cache"
      }
    });
    const body = await response.text();
    const text = normalizeHtmlText(body);
    const missing = item.required.filter((needle) => !text.includes(needle) && !body.includes(needle));
    const forbidden = item.forbidden.filter((needle) => text.includes(needle) || body.includes(needle));
    const firstNeedle = item.required[0];
    const start = text.indexOf(firstNeedle);
    const snippet = [
      `x-vercel-cache=${response.headers.get("x-vercel-cache")}`,
      `x-vercel-id=${response.headers.get("x-vercel-id")}`,
      start >= 0 ? text.slice(start, start + 900) : text.slice(0, 900)
    ].join(" | ");

    results.push({
      path: `${item.path}#standings-linkage`,
      status: response.status,
      ok: response.ok && missing.length === 0 && forbidden.length === 0,
      missing,
      forbidden,
      snippet
    });
  }

  return results;
}

function formatLog({ deployment, results }) {
  const passed = results.every((result) => result.ok);
  const lines = [
    "",
    `## Deployment ${new Date().toISOString()}`,
    "",
    `- Target: production`,
    `- Production URL: ${productionUrl}`,
    `- Deployment URL: ${deployment.url}`,
    `- Deployment ID: ${deployment.id}`,
    `- Inspect: ${deployment.inspectorUrl}`,
    `- Verification: ${passed ? "passed" : "failed"}`,
    `- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes`,
    "- Smoke checks:"
  ];

  for (const result of results) {
    const failures = [
      ...(result.missing?.length ? [`missing ${result.missing.join(", ")}`] : []),
      ...(result.forbidden?.length ? [`forbidden ${result.forbidden.join(", ")}`] : []),
      ...(typeof result.count === "number" && result.count !== 4 ? [`count ${result.count}`] : [])
    ];
    lines.push(
      `  - ${result.path}: HTTP ${result.status}, ${result.ok ? "passed" : failures.join("; ")}`
    );
    if (result.snippet) {
      lines.push(`    - Production HTML snippet: ${result.snippet}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

await run("npm", ["run", "check:data"]);
await run("npm", ["run", "lint"]);
await run("npm", ["test"]);
await run("npm", ["run", "build"]);
const deployOutput = await run("npx", ["vercel", "deploy", "--prod", "--yes"]);
const deployment = extractDeployment(deployOutput);
const inspectOutput = await run("npx", ["vercel", "inspect", "world-cup-match-intelligence-center.vercel.app"]);
assertProductionInspect(inspectOutput, deployment.id);
const results = [
  ...await smokeCheck(),
  await smokeCheckScheduleCoverageApi(),
  await smokeCheckHomepageScheduleCoverage(),
  await smokeCheckTodayMatches(),
  await smokeCheckHomepageFocus(),
  await smokeCheckHomepageSections(),
  await smokeCheckTodayResults(),
  await smokeCheckHomepageDoesNotContainUpsetRanking(),
  await smokeCheckGroupStandings(),
  await smokeCheckGroupStandingsConsistency(deployment.url),
  ...await smokeCheckStandingsLinkedPages(),
  await smokeCheckUiReadability(),
  await smokeCheckChartDisclaimers()
];
await appendFile("agents.md", formatLog({ deployment, results }));

if (!results.every((result) => result.ok)) {
  throw new Error("Production smoke checks failed. Deployment log was still written to agents.md.");
}
