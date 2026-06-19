"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AlertTriangle, Database, Star, Target } from "lucide-react";
import { buildDataQualitySummary } from "../lib/data-quality";
import { formatDisplayDateTime, formatFullDisplayDateTime } from "../lib/format";
import { buildDataConfidence, buildPredictionReview, confidenceLabel, matchStatusLabel, resolveMatchStatus, upsetRiskScore } from "../lib/match-intelligence";
import { getFixturePredictionEligibility, getPredictionWindow } from "../lib/prediction";
import type { DataConfidence, DataStore, Fixture, MatchStatus, PredictionResult, Team } from "../lib/types";
import { SourceBadge } from "./source-badge";

const FAVORITES_KEY = "wcmic.favoriteTeams";

interface DashboardClientProps {
  store: DataStore;
  predictions: PredictionResult[];
  reviewPredictions: PredictionResult[];
}

function teamName(teams: Team[], id: string) {
  return teams.find((team) => team.id === id)?.shortName ?? id;
}

function teamById(teams: Team[], id: string) {
  const team = teams.find((item) => item.id === id);
  if (!team) {
    throw new Error(`Unknown team ${id}`);
  }
  return team;
}

function predictionFor(predictions: PredictionResult[], fixture: Fixture) {
  return predictions.find((prediction) => prediction.fixtureId === fixture.id);
}

function confidenceRows(confidence: DataConfidence) {
  return [
    ["比赛时间", confidence.matchTime],
    ["球队基础数据", confidence.teamData],
    ["伤停信息", confidence.injury],
    ["预测结果", confidence.prediction],
    ["实际比分", confidence.result]
  ] as const;
}

function dateKey(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

export function DashboardClient({ store, predictions, reviewPredictions }: DashboardClientProps) {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | MatchStatus>("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortMode, setSortMode] = useState<"time" | "upset">("time");
  const [mounted, setMounted] = useState(false);
  const predictedFixtureIds = useMemo(() => new Set(predictions.map((prediction) => prediction.fixtureId)), [predictions]);
  const topFixture = store.fixtures.find((fixture) => predictedFixtureIds.has(fixture.id)) ?? store.fixtures[0];
  const qualitySummary = useMemo(() => buildDataQualitySummary(store), [store]);
  const predictionWindow = useMemo(() => getPredictionWindow(), []);
  const radarTeams = useMemo(() => {
    const fixture = topFixture;
    return fixture ? [teamById(store.teams, fixture.homeTeamId), teamById(store.teams, fixture.awayTeamId)] : store.teams.slice(0, 2);
  }, [store.teams, topFixture]);

  useEffect(() => {
    setMounted(true);
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      setFavoriteTeams(JSON.parse(raw) as string[]);
    }
  }, []);

  function toggleFavorite(teamId: string) {
    setFavoriteTeams((current) => {
      const next = current.includes(teamId) ? current.filter((id) => id !== teamId) : [...current, teamId];
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }

  const groups = useMemo(() => ["all", ...new Set(store.teams.map((team) => team.group).sort())], [store.teams]);
  const dates = useMemo(() => ["all", ...new Set(store.fixtures.map((fixture) => dateKey(fixture.kickoff)).sort())], [store.fixtures]);

  const enrichedFixtures = useMemo(() => {
    return store.fixtures.map((fixture) => {
      const home = teamById(store.teams, fixture.homeTeamId);
      const away = teamById(store.teams, fixture.awayTeamId);
      const prediction = predictionFor(predictions, fixture);
      const reviewPrediction = predictionFor(reviewPredictions, fixture);
      const status = resolveMatchStatus(fixture);
      const homePlayers = store.players.filter((player) => player.teamId === home.id);
      const awayPlayers = store.players.filter((player) => player.teamId === away.id);
      const confidence = buildDataConfidence(fixture, [...homePlayers, ...awayPlayers].map((player) => player.source));
      const review = buildPredictionReview(fixture, reviewPrediction);
      const upsetRisk = upsetRiskScore(prediction ?? reviewPrediction);
      const isFavorite = favoriteTeams.includes(home.id) || favoriteTeams.includes(away.id);

      return {
        fixture,
        home,
        away,
        status,
        prediction,
        reviewPrediction,
        confidence,
        review,
        upsetRisk,
        isFavorite
      };
    });
  }, [favoriteTeams, predictions, reviewPredictions, store.fixtures, store.players, store.teams]);

  const filteredFixtures = enrichedFixtures
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .filter((item) => groupFilter === "all" || item.fixture.group === groupFilter)
    .filter((item) => teamFilter === "all" || item.home.id === teamFilter || item.away.id === teamFilter)
    .filter((item) => dateFilter === "all" || dateKey(item.fixture.kickoff) === dateFilter)
    .sort((a, b) => {
      if (sortMode === "upset") {
        return b.upsetRisk - a.upsetRisk;
      }

      return new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime();
    });

  const todayFixtures = enrichedFixtures.filter((item) => getFixturePredictionEligibility(item.fixture).fixtureDate === predictionWindow.start);
  const liveFixtures = filteredFixtures.filter((item) => item.status === "live");
  const finishedFixtures = filteredFixtures.filter((item) => item.status === "finished");
  const scheduledFixtures = filteredFixtures.filter((item) => item.status === "scheduled");
  const unknownFixtures = filteredFixtures.filter((item) => item.status === "unknown");
  const favoriteFixtures = enrichedFixtures.filter((item) => item.isFavorite);
  const focusMatch = todayFixtures.slice().sort((a, b) => b.fixture.heatIndex - a.fixture.heatIndex)[0] ?? enrichedFixtures[0];
  const upsetFocus = enrichedFixtures.slice().sort((a, b) => b.upsetRisk - a.upsetRisk)[0];
  const nextFavorite = favoriteFixtures
    .filter((item) => item.status === "scheduled" || item.status === "live")
    .sort((a, b) => new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime())[0];
  const latestFavoriteResult = favoriteFixtures
    .filter((item) => item.status === "finished")
    .sort((a, b) => new Date(b.fixture.kickoff).getTime() - new Date(a.fixture.kickoff).getTime())[0];

  const heatData = store.fixtures
    .map((fixture) => ({
      name: `${teamName(store.teams, fixture.homeTeamId)}-${teamName(store.teams, fixture.awayTeamId)}`,
      heat: fixture.heatIndex
    }))
    .sort((a, b) => b.heat - a.heat)
    .slice(0, 6);

  const formData = store.teams
    .slice()
    .sort((a, b) => b.form - a.form)
    .slice(0, 8)
    .map((team) => ({ name: team.shortName, form: team.form }));

  const qualificationData = store.standings
    .slice()
    .sort((a, b) => b.qualificationProbability - a.qualificationProbability)
    .slice(0, 8)
    .map((standing) => ({
      name: teamName(store.teams, standing.teamId),
      probability: Math.round(standing.qualificationProbability)
    }));

  const radarData = [
    {
      metric: "进攻",
      [radarTeams[0]?.shortName ?? "主队"]: radarTeams[0]?.attack ?? 0,
      [radarTeams[1]?.shortName ?? "客队"]: radarTeams[1]?.attack ?? 0
    },
    {
      metric: "防守",
      [radarTeams[0]?.shortName ?? "主队"]: radarTeams[0]?.defense ?? 0,
      [radarTeams[1]?.shortName ?? "客队"]: radarTeams[1]?.defense ?? 0
    },
    {
      metric: "中场",
      [radarTeams[0]?.shortName ?? "主队"]: radarTeams[0]?.midfield ?? 0,
      [radarTeams[1]?.shortName ?? "客队"]: radarTeams[1]?.midfield ?? 0
    },
    {
      metric: "状态",
      [radarTeams[0]?.shortName ?? "主队"]: radarTeams[0]?.form ?? 0,
      [radarTeams[1]?.shortName ?? "客队"]: radarTeams[1]?.form ?? 0
    },
    {
      metric: "节奏",
      [radarTeams[0]?.shortName ?? "主队"]: radarTeams[0]?.tempo ?? 0,
      [radarTeams[1]?.shortName ?? "客队"]: radarTeams[1]?.tempo ?? 0
    }
  ];

  function renderEmpty(message: string) {
    return <div className="emptyState">{message}</div>;
  }

  function renderConfidence(confidence: DataConfidence) {
    return (
      <div className="confidenceBox">
        <strong>数据可信度</strong>
        <dl>
          {confidenceRows(confidence).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{confidenceLabel(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  function renderMiniTable(rows: { name: string; value: string | number }[], emptyText: string) {
    if (!rows.length) {
      return renderEmpty(emptyText);
    }

    return (
      <table className="miniTable">
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th>{row.name}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderMatchCard(item: (typeof enrichedFixtures)[number], variant: "compact" | "full" = "full") {
    const { fixture, home, away, prediction, reviewPrediction, confidence, review, status, upsetRisk } = item;

    return (
      <article className={`matchCard ${item.isFavorite ? "favorite" : ""}`} key={fixture.id}>
        <div className="cardTopline">
          <span>{matchStatusLabel(status)} · {fixture.stage} · {fixture.group} 组 · 热度 {fixture.heatIndex}</span>
          <SourceBadge source={fixture.source} />
        </div>
        <Link href={`/matches/${fixture.id}`} className="matchTitle">
          {home.name} <span>vs</span> {away.name}
        </Link>
        <div className="matchMeta">北京时间 {formatDisplayDateTime(fixture.kickoff)} · {fixture.city}</div>

        {status === "finished" ? (
          <>
            <div className="resultBlock">
              <span>实际比分</span>
              <strong>{fixture.score ? `${home.shortName} ${fixture.score.home}-${fixture.score.away} ${away.shortName}` : "结果待更新"}</strong>
              <small>赛前预测：{reviewPrediction ? `${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}` : "暂无"}</small>
            </div>
            <div className="reviewPills">
              <span>{review?.outcomeHit ? "方向命中" : "方向未命中"}</span>
              <span>{review?.exactScoreHit ? "比分命中" : `偏差 ${review?.goalDiffError ?? "N/A"}`}</span>
              <Link href={`/matches/${fixture.id}`}>预测复盘</Link>
            </div>
          </>
        ) : prediction ? (
          <>
            <div className="scoreForecast">
              <span>预测比分</span>
              <strong>{prediction.predictedScore.home}-{prediction.predictedScore.away}</strong>
              <small>冷门风险 {upsetRisk} · 区间 {prediction.scoreRange}</small>
            </div>
            <div className="probabilityRows compact">
              <div>
                <span>{home.shortName}</span>
                <strong>{prediction.probabilities.homeWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.homeWin}%` }} /></div>
              </div>
              <div>
                <span>平</span>
                <strong>{prediction.probabilities.draw}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.draw}%` }} /></div>
              </div>
              <div>
                <span>{away.shortName}</span>
                <strong>{prediction.probabilities.awayWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.awayWin}%` }} /></div>
              </div>
            </div>
            <p className="riskText">{prediction.riskFactors[0]}</p>
          </>
        ) : (
          <div className="scoreForecast muted">
            <span>{status === "live" ? "比分待更新" : "暂不预测"}</span>
            <strong>{fixture.score ? `${fixture.score.home}-${fixture.score.away}` : "--"}</strong>
            <small>{status === "unknown" ? "结果待更新" : "该比赛不在当前预测窗口内。"}</small>
          </div>
        )}

        {variant === "full" ? renderConfidence(confidence) : null}
      </article>
    );
  }

  return (
    <main className="pageShell">
      <section className="heroBand">
        <div className="heroCopy">
          <p className="eyebrow">无 API Key · 自动 JSON 入库 · 来源标注</p>
          <h1>世界杯比赛智能分析中心</h1>
          <p>
            从官方赛程和排名快照整理结构化数据，用本地模型生成胜平负概率、预测比分、战术看点和比赛风险。
          </p>
        </div>
        <div className="heroStats">
          <span><Database size={18} /> {store.sources.length} 类来源</span>
          <span><Target size={18} /> {predictions.length} 场预测</span>
          <span><AlertTriangle size={18} /> 仅预测未来两天未完赛比赛</span>
        </div>
      </section>

      <section className="noticeBand">
        当前为 MVP 示例数据，仅展示部分比赛。完整赛程数据接入中。当前按北京时间显示，后续版本可切换比赛地时间。
      </section>

      <section className="qualityBand" aria-label="数据可信度摘要">
        <div>
          <span>可信记录</span>
          <strong>{qualitySummary.trustedRecords}/{qualitySummary.totalRecords}</strong>
          <small>官方与二级来源</small>
        </div>
        <div>
          <span>演示/推断</span>
          <strong>{qualitySummary.mockOrEstimatedRecords}</strong>
          <small>已独立标注</small>
        </div>
        <div>
          <span>来源目录</span>
          <strong>{qualitySummary.sourceCount}</strong>
          <small>含官方、二级、模型</small>
        </div>
        <div>
          <span>最近更新</span>
          <strong>{qualitySummary.latestFetchedAt ? formatFullDisplayDateTime(qualitySummary.latestFetchedAt) : "N/A"}</strong>
          <small>北京时间显示</small>
        </div>
      </section>

      <section className="focusGrid">
        <article className="panel focusPanel">
          <h2>今日焦点</h2>
          <div className="focusStats">
            <span>今日比赛 <strong>{todayFixtures.length}</strong></span>
            <span>最受关注 <strong>{focusMatch ? `${focusMatch.home.shortName} vs ${focusMatch.away.shortName}` : "暂无"}</strong></span>
            <span>最大冷门风险 <strong>{upsetFocus ? `${upsetFocus.home.shortName} vs ${upsetFocus.away.shortName}` : "暂无"}</strong></span>
            <span>主队相关 <strong>{favoriteFixtures.length || "未收藏"}</strong></span>
          </div>
        </article>

        <article className="panel focusPanel">
          <h2>我的主队中心</h2>
          {favoriteTeams.length ? (
            <div className="teamCenter">
              <p>已收藏：{favoriteTeams.map((id) => teamName(store.teams, id)).join("、")}</p>
              <p>下一场：{nextFavorite ? `${nextFavorite.home.shortName} vs ${nextFavorite.away.shortName} · ${formatDisplayDateTime(nextFavorite.fixture.kickoff)}` : "暂无未来两天相关比赛"}</p>
              <p>最近结果：{latestFavoriteResult?.fixture.score ? `${latestFavoriteResult.home.shortName} ${latestFavoriteResult.fixture.score.home}-${latestFavoriteResult.fixture.score.away} ${latestFavoriteResult.away.shortName}` : "暂无已完赛结果"}</p>
              <p>重点提醒：{nextFavorite ? `冷门风险 ${nextFavorite.upsetRisk}，请关注阵容和赛前信息更新。` : "收藏球队后会显示赛程、结果和风险提醒。"}</p>
            </div>
          ) : (
            renderEmpty("还没有收藏主队。点击下方球队标签即可建立你的主队中心。")
          )}
        </article>
      </section>

      <section className="toolbar intelligenceToolbar">
        <div>
          <strong>筛选比赛</strong>
          <span>按日期、小组、球队、状态和排序方式浏览。</span>
        </div>
        <div className="filterControls">
          <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
            {dates.map((date) => <option value={date} key={date}>{date === "all" ? "全部日期" : date}</option>)}
          </select>
          <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
            {groups.map((group) => <option value={group} key={group}>{group === "all" ? "全部小组" : `${group} 组`}</option>)}
          </select>
          <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)}>
            <option value="all">全部球队</option>
            {store.teams.map((team) => <option value={team.id} key={team.id}>{team.name}</option>)}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | MatchStatus)}>
            <option value="all">全部状态</option>
            <option value="live">进行中</option>
            <option value="finished">已结束</option>
            <option value="scheduled">未开始</option>
            <option value="unknown">状态未知</option>
          </select>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value as "time" | "upset")}>
            <option value="time">按开赛时间</option>
            <option value="upset">按冷门风险</option>
          </select>
        </div>
      </section>

      <section className="teamStrip">
        {store.teams.slice(0, 10).map((team) => (
          <button
            key={team.id}
            className={`teamPill ${favoriteTeams.includes(team.id) ? "active" : ""}`}
            onClick={() => toggleFavorite(team.id)}
            title={`关注 ${team.name}`}
          >
            <Star size={15} fill={favoriteTeams.includes(team.id) ? "currentColor" : "none"} />
            {team.shortName}
          </button>
        ))}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>进行中比赛</h2>
          <span>{liveFixtures.length} 场</span>
        </div>
        {liveFixtures.length ? <div className="matchGrid">{liveFixtures.map((item) => renderMatchCard(item))}</div> : renderEmpty("暂无进行中比赛。若开赛后 2 小时内比分未更新，将显示为进行中或状态未知。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>已结束比赛</h2>
          <span>{finishedFixtures.length} 场</span>
        </div>
        {finishedFixtures.length ? <div className="matchGrid">{finishedFixtures.map((item) => renderMatchCard(item))}</div> : renderEmpty("暂无已结束比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>未开始比赛</h2>
          <span>{scheduledFixtures.length} 场</span>
        </div>
        {scheduledFixtures.length ? <div className="matchGrid">{scheduledFixtures.map((item) => renderMatchCard(item))}</div> : renderEmpty("暂无未开始比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>状态未知</h2>
          <span>{unknownFixtures.length} 场</span>
        </div>
        {unknownFixtures.length ? <div className="matchGrid">{unknownFixtures.map((item) => renderMatchCard(item))}</div> : renderEmpty("暂无状态未知比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>冷门风险排行</h2>
          <span>规则模型推断</span>
        </div>
        <div className="rankList">
          {enrichedFixtures.slice().sort((a, b) => b.upsetRisk - a.upsetRisk).slice(0, 5).map((item) => (
            <Link href={`/matches/${item.fixture.id}`} key={item.fixture.id}>
              <strong>{item.home.shortName} vs {item.away.shortName}</strong>
              <span>{matchStatusLabel(item.status)} · 冷门风险 {item.upsetRisk}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="chartsGrid">
        <article className="panel">
          <h2>比赛热度排行</h2>
          <div className="chartBox">
            {mounted ? (
              <ResponsiveContainer>
                <BarChart data={heatData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis width={30} />
                  <Tooltip />
                  <Bar dataKey="heat" fill="#1f7a8c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              renderMiniTable(heatData.map((item) => ({ name: item.name, value: item.heat })), "暂无比赛热度数据。")
            )}
          </div>
          <p className="sourceLine">热度含示例关注度字段，非全网实时舆情。</p>
        </article>

        <article className="panel">
          <h2>球队雷达图</h2>
          <div className="chartBox">
            {mounted ? (
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <Radar name={radarTeams[0]?.shortName} dataKey={radarTeams[0]?.shortName} stroke="#0f766e" fill="#0f766e" fillOpacity={0.25} />
                  <Radar name={radarTeams[1]?.shortName} dataKey={radarTeams[1]?.shortName} stroke="#b45309" fill="#b45309" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              renderMiniTable(radarData.map((item) => ({ name: item.metric, value: `${radarTeams[0]?.shortName ?? "主队"} ${item[radarTeams[0]?.shortName ?? "主队"]} / ${radarTeams[1]?.shortName ?? "客队"} ${item[radarTeams[1]?.shortName ?? "客队"]}` })), "暂无球队对比数据。")
            )}
          </div>
          <p className="sourceLine">球队画像基于排名与 MVP 补充数据整理。</p>
        </article>

        <article className="panel">
          <h2>近期状态曲线</h2>
          <div className="chartBox">
            {mounted ? (
              <ResponsiveContainer>
                <AreaChart data={formData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[50, 100]} width={30} />
                  <Tooltip />
                  <Area dataKey="form" stroke="#475569" fill="#94a3b8" fillOpacity={0.35} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              renderMiniTable(formData.map((item) => ({ name: item.name, value: item.form })), "暂无近期状态数据。")
            )}
          </div>
          <p className="sourceLine">状态指数是本地模型输入，不是官方指标。</p>
        </article>

        <article className="panel">
          <h2>小组出线概率</h2>
          <div className="chartBox">
            {mounted ? (
              <ResponsiveContainer>
                <BarChart data={qualificationData} layout="vertical" margin={{ left: 18 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={58} />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#64748b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              renderMiniTable(qualificationData.map((item) => ({ name: item.name, value: `${item.probability}%` })), "暂无小组出线概率数据。")
            )}
          </div>
          <p className="sourceLine">出线概率为演示模型推断，页面已与事实数据分开标注。</p>
        </article>
      </section>

      <section className="sourcePanel">
        <h2>数据来源与更新时间</h2>
        <div className="sourceGrid">
          {store.sources.map((source) => (
            <a href={source.sourceUrl} target="_blank" rel="noreferrer" key={source.sourceId}>
              <strong>{source.sourceName}</strong>
              <span>{source.description}</span>
              <small>{source.confidence} · {formatFullDisplayDateTime(source.lastFetchedAt)}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
