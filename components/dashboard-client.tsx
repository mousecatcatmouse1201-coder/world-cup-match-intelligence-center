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
import { getFixturePredictionEligibility } from "../lib/prediction";
import type { DataStore, Fixture, PredictionResult, Team } from "../lib/types";
import { SourceBadge } from "./source-badge";

const FAVORITES_KEY = "wcmic.favoriteTeams";

interface DashboardClientProps {
  store: DataStore;
  predictions: PredictionResult[];
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

export function DashboardClient({ store, predictions }: DashboardClientProps) {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [mounted, setMounted] = useState(false);
  const predictedFixtureIds = useMemo(() => new Set(predictions.map((prediction) => prediction.fixtureId)), [predictions]);
  const topFixture = store.fixtures.find((fixture) => predictedFixtureIds.has(fixture.id)) ?? store.fixtures[0];
  const qualitySummary = useMemo(() => buildDataQualitySummary(store), [store]);
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

  const visibleFixtures = favoriteOnly
    ? store.fixtures.filter((fixture) => favoriteTeams.includes(fixture.homeTeamId) || favoriteTeams.includes(fixture.awayTeamId))
    : store.fixtures;

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
          <small>上海时区显示</small>
        </div>
      </section>

      <section className="toolbar">
        <div>
          <strong>我的主队</strong>
          <span>收藏球队后自动高亮相关比赛和风险提示。</span>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={favoriteOnly} onChange={(event) => setFavoriteOnly(event.target.checked)} />
          只看主队
        </label>
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

      <section className="matchGrid">
        {visibleFixtures.map((fixture) => {
          const prediction = predictionFor(predictions, fixture);
          const home = teamById(store.teams, fixture.homeTeamId);
          const away = teamById(store.teams, fixture.awayTeamId);
          const isFavorite = favoriteTeams.includes(home.id) || favoriteTeams.includes(away.id);
          const predictionEligibility = getFixturePredictionEligibility(fixture);

          return (
            <article className={`matchCard ${isFavorite ? "favorite" : ""}`} key={fixture.id}>
              <div className="cardTopline">
                <span>{fixture.stage} · {fixture.group} 组 · 热度 {fixture.heatIndex}</span>
                <SourceBadge source={fixture.source} />
              </div>
              <Link href={`/matches/${fixture.id}`} className="matchTitle">
                {home.name} <span>vs</span> {away.name}
              </Link>
              <div className="matchMeta">{formatDisplayDateTime(fixture.kickoff)} · {fixture.city}</div>
              {prediction ? (
                <>
                  <div className="scoreForecast">
                    <span>预测比分</span>
                    <strong>{prediction.predictedScore.home}-{prediction.predictedScore.away}</strong>
                    <small>区间 {prediction.scoreRange}</small>
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
                <>
                  <div className="scoreForecast muted">
                    <span>{fixture.score ? "实际比分" : "暂不预测"}</span>
                    <strong>{fixture.score ? `${fixture.score.home}-${fixture.score.away}` : "--"}</strong>
                    <small>{predictionEligibility.message ?? "该比赛不在当前预测窗口内。"}</small>
                  </div>
                  <p className="riskText">赛前预测仅覆盖未来两天未完赛比赛。</p>
                </>
              )}
            </article>
          );
        })}
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
              <div className="chartPlaceholder">图表加载中</div>
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
              <div className="chartPlaceholder">图表加载中</div>
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
              <div className="chartPlaceholder">图表加载中</div>
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
              <div className="chartPlaceholder">图表加载中</div>
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
