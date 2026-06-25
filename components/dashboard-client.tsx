"use client";

import Link from "next/link";
import { Component, type ReactNode, useEffect, useMemo, useState } from "react";
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
import { Search, Star } from "lucide-react";
import { getFavoriteTeamMatches, getHighestUpsetRiskMatch, getMostPopularMatch } from "../lib/dashboard-matches";
import { buildDataQualitySummary, getLatestDataUpdatedAt } from "../lib/data-quality";
import { buildDataFreshnessSummary, freshnessStatusLabel } from "../lib/data-freshness";
import { formatBeijingDataTimestamp, formatDisplayDateTime, formatFullDisplayDateTime, getTodayDateKeyInBeijing } from "../lib/format";
import { buildGroupStandings, getGroupStandingTable, type GroupStandingTable } from "../lib/group-standings";
import { buildModelPerformanceSummary, confidenceLabel, matchStatusLabel } from "../lib/match-intelligence";
import { teamLabel } from "../lib/team-display";
import type { DataConfidence, DataStore, EnrichedMatch, MatchStatus, PredictionResult, Team } from "../lib/types";
import { SourceBadge } from "./source-badge";
import { StandingsSummary } from "./standings-summary";

const FAVORITES_KEY = "wcmic.favoriteTeams";

class ChartFallbackBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface DashboardClientProps {
  store: DataStore;
  matches: EnrichedMatch[];
  predictions: PredictionResult[];
  reviewPredictions: PredictionResult[];
}

function teamDisplay(team: Team) {
  return {
    primary: localizedTeamLabel(team),
    secondary: team.fifaCode
  };
}

function teamInlineLabel(team: Team) {
  return teamLabel(team);
}

const TEAM_LOCALE_LABELS: Record<string, { flag: string; name: string }> = {
  algeria: { flag: "🇩🇿", name: "阿尔及利亚" },
  argentina: { flag: "🇦🇷", name: "阿根廷" },
  austria: { flag: "🇦🇹", name: "奥地利" },
  australia: { flag: "🇦🇺", name: "澳大利亚" },
  belgium: { flag: "🇧🇪", name: "比利时" },
  bosnia: { flag: "🇧🇦", name: "波黑" },
  brazil: { flag: "🇧🇷", name: "巴西" },
  "cabo-verde": { flag: "🇨🇻", name: "佛得角" },
  canada: { flag: "🇨🇦", name: "加拿大" },
  colombia: { flag: "🇨🇴", name: "哥伦比亚" },
  croatia: { flag: "🇭🇷", name: "克罗地亚" },
  curacao: { flag: "🇨🇼", name: "库拉索" },
  czechia: { flag: "🇨🇿", name: "捷克" },
  "dr-congo": { flag: "🇨🇩", name: "刚果（金）" },
  ecuador: { flag: "🇪🇨", name: "厄瓜多尔" },
  egypt: { flag: "🇪🇬", name: "埃及" },
  england: { flag: "🏴", name: "英格兰" },
  france: { flag: "🇫🇷", name: "法国" },
  germany: { flag: "🇩🇪", name: "德国" },
  ghana: { flag: "🇬🇭", name: "加纳" },
  haiti: { flag: "🇭🇹", name: "海地" },
  iran: { flag: "🇮🇷", name: "伊朗" },
  iraq: { flag: "🇮🇶", name: "伊拉克" },
  "ivory-coast": { flag: "🇨🇮", name: "科特迪瓦" },
  japan: { flag: "🇯🇵", name: "日本" },
  jordan: { flag: "🇯🇴", name: "约旦" },
  mexico: { flag: "🇲🇽", name: "墨西哥" },
  morocco: { flag: "🇲🇦", name: "摩洛哥" },
  netherlands: { flag: "🇳🇱", name: "荷兰" },
  "new-zealand": { flag: "🇳🇿", name: "新西兰" },
  norway: { flag: "🇳🇴", name: "挪威" },
  panama: { flag: "🇵🇦", name: "巴拿马" },
  paraguay: { flag: "🇵🇾", name: "巴拉圭" },
  portugal: { flag: "🇵🇹", name: "葡萄牙" },
  qatar: { flag: "🇶🇦", name: "卡塔尔" },
  "saudi-arabia": { flag: "🇸🇦", name: "沙特阿拉伯" },
  scotland: { flag: "🏴", name: "苏格兰" },
  senegal: { flag: "🇸🇳", name: "塞内加尔" },
  "south-africa": { flag: "🇿🇦", name: "南非" },
  "south-korea": { flag: "🇰🇷", name: "韩国" },
  spain: { flag: "🇪🇸", name: "西班牙" },
  sweden: { flag: "🇸🇪", name: "瑞典" },
  switzerland: { flag: "🇨🇭", name: "瑞士" },
  tunisia: { flag: "🇹🇳", name: "突尼斯" },
  turkiye: { flag: "🇹🇷", name: "土耳其" },
  uruguay: { flag: "🇺🇾", name: "乌拉圭" },
  "united-states": { flag: "🇺🇸", name: "美国" },
  uzbekistan: { flag: "🇺🇿", name: "乌兹别克" }
};

function localizedTeamLabel(team: Team) {
  return teamLabel(team);
}

function localizedTeamNameById(teams: Team[], id: string) {
  const team = teams.find((item) => item.id === id);
  return team ? localizedTeamLabel(team) : id;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function teamById(teams: Team[], id: string) {
  const team = teams.find((item) => item.id === id);
  if (!team) {
    throw new Error(`Unknown team ${id}`);
  }
  return team;
}

function fixtureDisplayName(match: EnrichedMatch) {
  return `${localizedTeamLabel(match.home)} vs ${localizedTeamLabel(match.away)}`;
}

export function DashboardClient({ store, matches, predictions }: DashboardClientProps) {
  const todayDateKey = getTodayDateKeyInBeijing();
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [favoriteTeamPicker, setFavoriteTeamPicker] = useState("");
  const [favoriteTeamSearch, setFavoriteTeamSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MatchStatus>("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [teamSearch, setTeamSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(todayDateKey);
  const [sortMode, setSortMode] = useState<"time" | "upset">("time");
  const [standingGroup, setStandingGroup] = useState("A");
  const [radarHomeTeamId, setRadarHomeTeamId] = useState("");
  const [radarAwayTeamId, setRadarAwayTeamId] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const qualitySummary = useMemo(() => buildDataQualitySummary(store), [store]);
  const latestDataUpdatedAt = useMemo(() => getLatestDataUpdatedAt(store), [store]);
  const freshness = useMemo(() => buildDataFreshnessSummary(store, new Date(), latestDataUpdatedAt), [store, latestDataUpdatedAt]);
  const dataUpdatedAtLabel = latestDataUpdatedAt
    ? formatBeijingDataTimestamp(latestDataUpdatedAt)
    : "N/A";
  const defaultRadarTeams = useMemo(() => {
    const byProfile = store.teams
      .slice()
      .sort((a, b) => (b.attack + b.defense + b.midfield + b.form + b.tempo) - (a.attack + a.defense + a.midfield + a.form + a.tempo));
    return byProfile.length > 1 ? [byProfile[0], byProfile[byProfile.length - 1]] : byProfile;
  }, [store.teams]);
  const selectedRadarHomeTeamId = radarHomeTeamId || defaultRadarTeams[0]?.id || "";
  const selectedRadarAwayTeamId = radarAwayTeamId || defaultRadarTeams[1]?.id || "";
  const radarTeams = [selectedRadarHomeTeamId, selectedRadarAwayTeamId]
    .map((id) => store.teams.find((team) => team.id === id))
    .filter((team): team is Team => Boolean(team));
  const radarTeamOptions = store.teams.slice().sort((a, b) => localizedTeamLabel(a).localeCompare(localizedTeamLabel(b), "zh-Hans-CN"));

  useEffect(() => {
    setMounted(true);
    setShowCharts(!window.matchMedia("(max-width: 560px)").matches);
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      setFavoriteTeams(JSON.parse(raw) as string[]);
    }
  }, []);

  function renderFilterFields(className = "") {
    const normalizedTeamSearch = teamSearch.trim().toLocaleLowerCase();
    const matchingTeams = store.teams.filter((team) => {
      if (!normalizedTeamSearch) return true;
      return [team.name, team.shortName, team.fifaCode, team.id, localizedTeamLabel(team)]
        .some((value) => value.toLocaleLowerCase().includes(normalizedTeamSearch));
    });
    const defaultTeamIds = new Set([
      ...matches.filter((match) => match.beijingDate === todayDateKey).flatMap((match) => [match.home.id, match.away.id]),
      ...favoriteTeams
    ]);
    const selectableTeams = normalizedTeamSearch ? matchingTeams : store.teams.filter((team) => defaultTeamIds.has(team.id));

    return (
      <div className={className}>
        <label className="filterField">
          <span>日期</span>
          <select aria-label="按日期筛选" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
            {dates.map((date) => <option value={date} key={date}>{date === "all" ? "全部日期" : date}</option>)}
          </select>
        </label>
        <label className="filterField">
          <span>小组</span>
          <select aria-label="按小组筛选" value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
            {groups.map((group) => <option value={group} key={group}>{group === "all" ? "全部小组" : `${group} 组`}</option>)}
          </select>
        </label>
        <label className="filterField searchField">
          <span>搜索球队</span>
          <span className="searchControl">
            <Search size={15} />
            <input
              aria-label="搜索球队"
              placeholder="搜索球队 / FIFA code"
              value={teamSearch}
              onChange={(event) => {
                setTeamSearch(event.target.value);
                setTeamFilter("all");
              }}
            />
          </span>
        </label>
        <label className="filterField">
          <span>球队</span>
          <select
            aria-label="按球队筛选"
            value={teamFilter}
            onChange={(event) => {
              setTeamFilter(event.target.value);
              setTeamSearch("");
            }}
          >
            <option value="all">{normalizedTeamSearch ? `搜索到 ${matchingTeams.length} 支球队` : "今日相关与收藏球队"}</option>
            {selectableTeams.sort((a, b) => a.fifaRank - b.fifaRank).map((team) => <option value={team.id} key={team.id}>{teamInlineLabel(team)}</option>)}
          </select>
        </label>
        {teamSearch || teamFilter !== "all" ? (
          <div className="teamFilterSummary" role="status">
            <span>{teamFilter !== "all" ? `已选择：${localizedTeamNameById(store.teams, teamFilter)}` : `搜索：${teamSearch}`}</span>
            <button type="button" onClick={() => { setTeamSearch(""); setTeamFilter("all"); }}>清除球队筛选</button>
          </div>
        ) : null}
        <label className="filterField">
          <span>状态</span>
          <select aria-label="按比赛状态筛选" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | MatchStatus)}>
            <option value="all">全部状态</option>
            <option value="live">进行中</option>
            <option value="live_pending">进行中，比分待更新</option>
            <option value="finished">已结束</option>
            <option value="scheduled">未开始</option>
            <option value="result_pending">赛果待更新</option>
            <option value="unknown">时间或数据异常</option>
          </select>
        </label>
        <label className="filterField">
          <span>排序</span>
          <select aria-label="比赛排序方式" value={sortMode} onChange={(event) => setSortMode(event.target.value as "time" | "upset")}>
            <option value="time">按开赛时间</option>
            <option value="upset">按冷门风险</option>
          </select>
        </label>
      </div>
    );
  }

  function toggleFavorite(teamId: string) {
    setFavoriteTeams((current) => {
      const next = current.includes(teamId) ? current.filter((id) => id !== teamId) : [...current, teamId];
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }

  const groups = useMemo(() => ["all", ...new Set(store.teams.map((team) => team.group).sort())], [store.teams]);
  const dates = useMemo(() => ["all", ...new Set([todayDateKey, ...matches.map((match) => match.beijingDate)].sort())], [matches, todayDateKey]);

  const enrichedMatches = useMemo(() => {
    return matches.map((match) => {
      return {
        ...match,
        isFavorite: favoriteTeams.includes(match.home.id) || favoriteTeams.includes(match.away.id)
      };
    });
  }, [favoriteTeams, matches]);

  const filteredFixtures = enrichedMatches
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .filter((item) => groupFilter === "all" || item.fixture.group === groupFilter)
    .filter((item) => teamFilter === "all" || item.home.id === teamFilter || item.away.id === teamFilter)
    .filter((item) => {
      const query = teamSearch.trim().toLowerCase();
      if (!query) return true;
      return [
        item.home.name,
        item.home.shortName,
        localizedTeamLabel(item.home),
        item.away.name,
        item.away.shortName,
        localizedTeamLabel(item.away),
        item.fixture.homeTeamId,
        item.fixture.awayTeamId
      ].some((value) => value?.toLowerCase().includes(query));
    })
    .filter((item) => dateFilter === "all" || item.beijingDate === dateFilter)
    .sort((a, b) => {
      if (sortMode === "upset") {
        return b.upsetRisk - a.upsetRisk;
      }

      return new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime();
    });

  const todayMatches = enrichedMatches.filter((match) => match.beijingDate === todayDateKey);
  const liveFixtures = filteredFixtures.filter((item) => item.status === "live" || item.status === "live_pending");
  const finishedFixtures = filteredFixtures.filter((item) => item.status === "finished");
  const scheduledFixtures = filteredFixtures.filter((item) => item.status === "scheduled");
  const resultPendingFixtures = filteredFixtures.filter((item) => item.status === "result_pending");
  const unknownFixtures = filteredFixtures.filter((item) => item.status === "unknown");
  const favoriteFixtures = enrichedMatches.filter((item) => item.isFavorite);
  const favoriteTodayFixtures = getFavoriteTeamMatches(todayMatches, favoriteTeams);
  const focusMatch = getMostPopularMatch(todayMatches);
  const upsetFocus = getHighestUpsetRiskMatch(todayMatches);
  const todayLiveFocus = todayMatches.find((match) => match.status === "live" || match.status === "live_pending");
  const todayScheduledMatches = todayMatches.filter((match) => match.status === "scheduled");
  const todayFinishedMatches = todayMatches.filter((match) => match.status === "finished");
  const largestPredictionError = todayFinishedMatches
    .filter((match) => match.review)
    .sort((a, b) => (b.review!.totalGoalError + b.review!.goalDiffError) - (a.review!.totalGoalError + a.review!.goalDiffError))[0];
  const exactScoreMatch = todayFinishedMatches.find((match) => match.review?.exactScoreHit);
  const nextFavorite = favoriteFixtures
    .filter((item) => item.status === "scheduled" || item.status === "live")
    .sort((a, b) => new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime())[0];
  const latestFavoriteResult = favoriteFixtures
    .filter((item) => item.status === "finished")
    .sort((a, b) => new Date(b.fixture.kickoff).getTime() - new Date(a.fixture.kickoff).getTime())[0];
  const modelPerformance = useMemo(
    () => buildModelPerformanceSummary(enrichedMatches.map((item) => item.review)),
    [enrichedMatches]
  );
  const groupCoverage = useMemo(() => "ABCDEFGHIJKL".split(""), []);
  const groupStandingTables = useMemo(() => buildGroupStandings(enrichedMatches, store.teams), [enrichedMatches, store.teams]);
  const selectedStandingTable = getGroupStandingTable(groupStandingTables, standingGroup) ?? groupStandingTables[0];
  const standingByTeam = useMemo(() => {
    const rows = new Map<string, GroupStandingTable["rows"][number]>();
    groupStandingTables.forEach((table) => {
      table.rows.forEach((row) => rows.set(row.teamId, row));
    });
    return rows;
  }, [groupStandingTables]);
  const groupStageMatches = useMemo(() => enrichedMatches.filter((match) => match.fixture.stage === "小组赛"), [enrichedMatches]);
  const schedulePreview = useMemo(() => {
    const upcomingGroupMatches = enrichedMatches
      .filter((match) => match.fixture.stage === "小组赛" && match.status === "scheduled")
      .sort((a, b) => new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime());
    const nextBeijingDate = upcomingGroupMatches[0]?.beijingDate;

    if (!nextBeijingDate) {
      return groupStageMatches.slice(0, 4);
    }

    return upcomingGroupMatches.filter((match) => match.beijingDate === nextBeijingDate);
  }, [enrichedMatches, groupStageMatches]);
  const scheduleDateRange = useMemo(() => {
    const scheduleDates = groupStageMatches.map((match) => match.beijingDate).sort();
    return scheduleDates.length ? `${scheduleDates[0]} 至 ${scheduleDates[scheduleDates.length - 1]}` : "暂无赛程日期";
  }, [groupStageMatches]);
  const schedulePreviewDate = schedulePreview[0]?.beijingDate;
  const heatData = enrichedMatches
    .filter((match) => match.status === "scheduled" || match.status === "live" || match.status === "live_pending")
    .map((match) => ({
      name: fixtureDisplayName(match),
      axisLabel: `${match.home.fifaCode}–${match.away.fifaCode}`,
      heat: match.fixture.heatIndex
    }))
    .sort((a, b) => b.heat - a.heat)
    .slice(0, 6);

  const formData = store.teams
    .map((team) => {
      const standing = standingByTeam.get(team.id);
      const played = standing?.played ?? 0;
      const rankingSignal = clamp((52 - team.fifaRank) / 4.5, -8, 11);
      const resultsSignal = clamp(
        (standing?.points ?? 0) * 1.8 +
          (standing?.goalDifference ?? 0) * 1.4 +
          (standing?.goalsFor ?? 0) * 0.5 -
          (standing?.goalsAgainst ?? 0) * 0.4 -
          Math.max(0, 2 - played) * 1.5,
        -5,
        13
      );
      const formScore = clamp(
        Math.round(48 + (team.form - 60) * 0.45 + rankingSignal + resultsSignal),
        45,
        90
      );
      return {
        name: localizedTeamLabel(team),
        form: formScore
      };
    })
    .sort((a, b) => b.form - a.form)
    .slice(0, 8)
    .map((team) => ({ name: team.name, form: team.form }));

  const qualificationData = groupStandingTables
    .flatMap((table) => table.rows.map((row) => {
      const team = teamById(store.teams, row.teamId);
      const rankFactor = row.rank === 1 ? 20 : row.rank === 2 ? 12 : row.rank === 3 ? 5 : -5;
      const tableProgress = table.totalMatches ? table.finishedMatches / table.totalMatches : 0;
      const baseRankBoost = clamp((80 - team.fifaRank) / 8, -4, 8);
      const probability = clamp(
        Math.round(30 + rankFactor + row.points * 3 + row.goalDifference * 1.5 + row.goalsFor + baseRankBoost + tableProgress * 4),
        12,
        94
      );
      return {
        name: localizedTeamLabel(team),
        probability
      };
    }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 8);

  const radarTeamLabels = radarTeams.map((team) => localizedTeamLabel(team));
  const radarHomeLabel = radarTeamLabels[0] ?? "主队";
  const radarAwayLabel = radarTeamLabels[1] ?? "客队";
  const radarData = [
    {
      metric: "进攻",
      [radarHomeLabel]: radarTeams[0]?.attack ?? 0,
      [radarAwayLabel]: radarTeams[1]?.attack ?? 0
    },
    {
      metric: "防守",
      [radarHomeLabel]: radarTeams[0]?.defense ?? 0,
      [radarAwayLabel]: radarTeams[1]?.defense ?? 0
    },
    {
      metric: "中场",
      [radarHomeLabel]: radarTeams[0]?.midfield ?? 0,
      [radarAwayLabel]: radarTeams[1]?.midfield ?? 0
    },
    {
      metric: "状态",
      [radarHomeLabel]: radarTeams[0]?.form ?? 0,
      [radarAwayLabel]: radarTeams[1]?.form ?? 0
    },
    {
      metric: "节奏",
      [radarHomeLabel]: radarTeams[0]?.tempo ?? 0,
      [radarAwayLabel]: radarTeams[1]?.tempo ?? 0
    }
  ];

  function renderEmpty(message: string) {
    return <div className="emptyState">{message}</div>;
  }

  function renderMatchGrid(items: typeof filteredFixtures, emptyMessage: string) {
    if (!items.length) {
      return renderEmpty(emptyMessage);
    }

    const visible = items.slice(0, 12);
    return (
      <>
        <div className="matchGrid">{visible.map((item) => renderMatchCard(item))}</div>
        {items.length > visible.length ? (
          <p className="sourceLine">已显示前 {visible.length} 场，共 {items.length} 场。继续使用日期、组别、状态或球队搜索缩小范围。</p>
        ) : null}
      </>
    );
  }

  function renderConfidence(confidence: DataConfidence) {
    const summary = [
      `赛程${confidenceLabel(confidence.matchTime)}`,
      `球队${confidenceLabel(confidence.teamData)}`,
      `赛果${confidenceLabel(confidence.result)}`,
      `来源${confidenceLabel(confidence.dataSource)}`
    ].join(" · ");

    return (
      <details className="confidenceBox">
        <summary>
          <strong>数据可信度</strong>
          <span>{summary}</span>
        </summary>
        <p>首页默认只显示摘要；完整可信度字段请进入比赛详情页查看。</p>
      </details>
    );
  }

  function renderMiniTable(rows: { name: string; value: string | number }[], emptyText: string) {
    if (!rows.length) {
      return renderEmpty(emptyText);
    }

    return (
      <table className="miniTable">
        <thead>
          <tr>
            <th scope="col">项目</th>
            <th scope="col">数值</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">{row.name}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderChartFrame(rows: { name: string; value: string | number }[], emptyText: string, chart: ReactNode) {
    const fallback = renderMiniTable(rows, emptyText);

    if (!mounted || !rows.length) {
      return (
        <div className="chartDataFallback">
          <p>项目 / 数值</p>
          {fallback}
        </div>
      );
    }

    return (
      <>
        <div className="chartVisual">
          <ChartFallbackBoundary fallback={fallback}>
            {chart}
          </ChartFallbackBoundary>
        </div>
        <div className="chartDataFallback" aria-label="图表 fallback 数据表">
          <p>项目 / 数值</p>
          {fallback}
        </div>
      </>
    );
  }

  function renderStandingTable(table: GroupStandingTable) {
    return <StandingsSummary table={table} teams={store.teams} />;
  }

  function renderMatchCard(item: (typeof enrichedMatches)[number], variant: "compact" | "full" = "full") {
    const { fixture, home, away, prediction, reviewPrediction, confidence, review, result, status, upsetRisk } = item;
    const actualScore = result.homeScore !== undefined && result.awayScore !== undefined
      ? `${result.homeScore}-${result.awayScore}`
      : null;

    return (
      <article className={`matchCard ${item.isFavorite ? "favorite" : ""}`} key={fixture.id}>
        <div className="cardLayer statusLayer">
          <span className="statusPill">{matchStatusLabel(status)}</span>
          <span>{fixture.stage} · {fixture.group} 组</span>
          <span>热度 {fixture.heatIndex}</span>
        </div>
        <Link href={`/matches/${fixture.id}`} className="matchTitle">
          {localizedTeamLabel(home)} <span>vs</span> {localizedTeamLabel(away)}
        </Link>
        <div className="matchMeta">{item.displayTimezoneLabel} {item.displayTime} · {fixture.city}</div>
        <div className="mobileMatchMeta">{item.beijingTimeLabel} · {matchStatusLabel(status)}</div>
        <div className="teamAuxLine">{localizedTeamLabel(home)} / {localizedTeamLabel(away)}</div>

        {status === "finished" ? (
          <div className="scoreLayer">
            <div className="resultBlock">
              <span>实际比分</span>
              <strong>{actualScore ? `${localizedTeamLabel(home)} ${actualScore} ${localizedTeamLabel(away)}` : "结果待更新"}</strong>
              <small>赛前预测：{reviewPrediction ? `${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}` : "暂无"}</small>
            </div>
            <div className="reviewPills">
              <span>{review?.outcomeHit ? "方向命中" : "方向未命中"}</span>
              <span>{review?.exactScoreHit ? "比分命中" : `偏差 ${review?.goalDiffError ?? "N/A"}`}</span>
              <span>总进球偏差 {review?.totalGoalError ?? "N/A"}</span>
              <Link href={`/matches/${fixture.id}`}>预测复盘</Link>
            </div>
          </div>
        ) : status === "result_pending" || status === "unknown" ? (
          <div className="scoreForecast scoreLayer">
            <span>赛果待抓取</span>
            <strong>数据待更新</strong>
            <small>赛前预测：{reviewPrediction ? `${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}` : "暂无"} · 进入详情查看复盘条件</small>
          </div>
        ) : status === "live" || status === "live_pending" ? (
          <div className="scoreForecast muted scoreLayer">
            <span>比分待更新</span>
            <strong>{actualScore ?? "--"}</strong>
            <small>赛前预测：{reviewPrediction ? `${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}` : "暂无"} · 等待比分数据更新。</small>
          </div>
        ) : prediction ? (
          <div className="scoreLayer">
            <div className="scoreForecast">
              <span>预测比分</span>
              <strong>{prediction.predictedScore.home}-{prediction.predictedScore.away}</strong>
              <small>冷门风险 {upsetRisk} · 区间 {prediction.scoreRange}</small>
            </div>
            <div className="probabilityRows compact">
              <div>
                <span>{localizedTeamLabel(home)}</span>
                <strong>{prediction.probabilities.homeWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.homeWin}%` }} /></div>
              </div>
              <div>
                <span>平</span>
                <strong>{prediction.probabilities.draw}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.draw}%` }} /></div>
              </div>
              <div>
                <span>{localizedTeamLabel(away)}</span>
                <strong>{prediction.probabilities.awayWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.awayWin}%` }} /></div>
              </div>
            </div>
            <p className="riskText">{prediction.riskFactors[0]}</p>
          </div>
        ) : (
          <div className="scoreForecast muted scoreLayer">
            <span>暂不预测</span>
            <strong>{actualScore ?? "--"}</strong>
            <small>该比赛不在当前预测窗口内。</small>
          </div>
        )}

        <div className="sourceLayer">
          <SourceBadge source={fixture.source} />
          <span>{formatFullDisplayDateTime(fixture.source.lastFetchedAt)}</span>
        </div>
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
            整理官方赛程和排名快照，用本地模型生成胜平负概率、预测比分、战术看点和比赛风险。
          </p>
        </div>
      </section>

      <section className="noticeBand">
        数据更新：{dataUpdatedAtLabel}（北京时间） · 状态：{freshnessStatusLabel(freshness.status, freshness.pendingResults.length)} · 本页为本地数据快照，不是实时比分 API。
      </section>

      <details className="mobileDataSummary">
        <summary>数据状态与可信度</summary>
        <span>{qualitySummary.sourceCount} 个来源 · 最近更新 {dataUpdatedAtLabel} · 赛果待更新 {freshness.pendingResults.length} 场</span>
      </details>

      <section className="qualityBand desktopQualityBand" aria-label="数据可信度摘要">
        <div>
          <span>来源目录</span>
          <strong>{qualitySummary.sourceCount}</strong>
          <small>含官方、二级、模型</small>
        </div>
        <div>
          <span>最近更新</span>
          <strong>{dataUpdatedAtLabel}</strong>
          <small>北京时间显示</small>
        </div>
        <div>
          <span>赛果待更新</span>
          <strong>{freshness.pendingResults.length} 场</strong>
          <small>开赛两小时后仍无最终比分</small>
        </div>
      </section>

      <section className="focusGrid" id="mobile-today">
        <article className="panel focusPanel" id="team-center">
          <h2>今日焦点</h2>
          {todayMatches.length ? (
            <div className="focusStats">
              <span>今日比赛 <strong>{todayMatches.length}</strong></span>
              <span>最受关注 <strong>{focusMatch ? fixtureDisplayName(focusMatch) : "今日暂无比赛"}</strong></span>
              {todayLiveFocus ? (
                <span>进行中焦点 <strong>{fixtureDisplayName(todayLiveFocus)}</strong></span>
              ) : todayScheduledMatches.length ? (
                <span>最大冷门风险 <strong>{upsetFocus ? fixtureDisplayName(upsetFocus) : "今日暂无冷门风险数据"}</strong></span>
              ) : (
                <>
                  <span>今日复盘重点 <strong>{largestPredictionError ? fixtureDisplayName(largestPredictionError) : "暂无可复盘比赛"}</strong></span>
                  <span>最大预测偏差 <strong>{largestPredictionError?.review ? `总进球 ${largestPredictionError.review.totalGoalError} · 净胜球 ${largestPredictionError.review.goalDiffError}` : "暂无"}</strong></span>
                  <span>比分命中比赛 <strong>{exactScoreMatch ? fixtureDisplayName(exactScoreMatch) : "0 场"}</strong></span>
                </>
              )}
              <span>主队相关 <strong>{favoriteTodayFixtures.length || (favoriteTeams.length ? "今日暂无主队相关比赛" : "未收藏")}</strong></span>
            </div>
          ) : (
            renderEmpty("今日暂无比赛。")
          )}
          <p className="sourceLine">今日比赛按北京时间日期计算。</p>
        </article>

        <article className="panel focusPanel">
          <h2>我的主队中心</h2>
          {favoriteTeams.length ? (
            <div className="teamCenter">
              <p>已收藏：{favoriteTeams.map((id) => localizedTeamNameById(store.teams, id)).join("、")}</p>
              <p>下一场：{nextFavorite ? `${fixtureDisplayName(nextFavorite)} · ${formatDisplayDateTime(nextFavorite.fixture.kickoff)}` : "暂无未来两天相关比赛"}</p>
              <p>最近结果：{latestFavoriteResult?.result.homeScore !== undefined && latestFavoriteResult.result.awayScore !== undefined ? `${localizedTeamLabel(latestFavoriteResult.home)} ${latestFavoriteResult.result.homeScore}-${latestFavoriteResult.result.awayScore} ${localizedTeamLabel(latestFavoriteResult.away)}` : "暂无已完赛结果"}</p>
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
        {renderFilterFields("filterControls desktopFilters")}
        <div className="mobileFilterBar">
          <button onClick={() => setDateFilter(todayDateKey)} className={dateFilter === todayDateKey ? "active" : ""}>今天</button>
          <button onClick={() => setDateFilter("all")} className={dateFilter === "all" ? "active" : ""}>全部</button>
          <button onClick={() => setMobileFilterOpen(true)}>筛选</button>
        </div>
      </section>

      {mobileFilterOpen ? (
        <div className="mobileFilterSheet" role="dialog" aria-modal="true" aria-label="筛选比赛">
          <button className="sheetBackdrop" aria-label="关闭筛选" onClick={() => setMobileFilterOpen(false)} />
          <section>
            <div className="sheetHeader"><h2>筛选比赛</h2><button onClick={() => setMobileFilterOpen(false)}>完成</button></div>
            {renderFilterFields("mobileFilterFields")}
          </section>
        </div>
      ) : null}

      <section className="teamStrip favoriteTeamStrip" aria-label="选择主队">
        <div>
          <strong>选择主队</strong>
          <span>从完整 48 队中选择；仅用于“我的主队中心”，不会筛选比赛。</span>
        </div>
        <label className="favoritePickerControl">
          <span>主队</span>
          <input aria-label="搜索主队" placeholder="搜索全部 48 队" value={favoriteTeamSearch} onChange={(event) => setFavoriteTeamSearch(event.target.value)} />
          <select value={favoriteTeamPicker} onChange={(event) => setFavoriteTeamPicker(event.target.value)}>
            <option value="">请选择球队</option>
            {store.teams.filter((team) => !favoriteTeamSearch.trim() ? favoriteTeams.includes(team.id) || todayMatches.some((match) => match.home.id === team.id || match.away.id === team.id) : [team.nameZh, team.name, team.fifaCode, team.id].some((value) => value?.toLowerCase().includes(favoriteTeamSearch.trim().toLowerCase()))).sort((a, b) => a.fifaRank - b.fifaRank).map((team) => <option key={team.id} value={team.id}>{teamInlineLabel(team)}</option>)}
          </select>
        </label>
        <button
          className="favoritePickerAction"
          disabled={!favoriteTeamPicker}
          onClick={() => favoriteTeamPicker && toggleFavorite(favoriteTeamPicker)}
        >
          <Star size={16} fill={favoriteTeams.includes(favoriteTeamPicker) ? "currentColor" : "none"} />
          {favoriteTeams.includes(favoriteTeamPicker) ? "取消收藏" : "收藏主队"}
        </button>
        {favoriteTeams.length ? (
          <div className="favoritePickerSelected" aria-label="已收藏主队">
            <span>已收藏：</span>
            {favoriteTeams.map((id) => {
              const team = teamById(store.teams, id);
              return <button key={id} onClick={() => toggleFavorite(id)} title={`取消收藏 ${teamInlineLabel(team)}`}>{teamDisplay(team).primary} ×</button>;
            })}
          </div>
        ) : null}
      </section>

      <section className="dashboardSection" id="mobile-schedule">
        <div className="sectionHeader">
          <h2>下一比赛日赛程</h2>
          <span>{schedulePreviewDate ?? "暂无赛程"} · 全部 {groupStageMatches.length} 场小组赛覆盖 {scheduleDateRange}</span>
        </div>
        <div className="coverageStrip">
          {groupCoverage.map((group) => <span key={group}>{group} 组</span>)}
        </div>
        <div className="rankList">
          {schedulePreview.map((item) => (
            <Link href={`/matches/${item.fixture.id}`} key={item.fixture.id}>
              <strong>{fixtureDisplayName(item)}</strong>
              <span>{item.beijingTimeLabel} · {matchStatusLabel(item.status)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>进行中 / 比分待更新</h2>
          <span>{liveFixtures.length} 场</span>
        </div>
        {renderMatchGrid(liveFixtures, "暂无进行中比赛。若开赛后比分未更新，将显示为进行中，比分待更新。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>已结束比赛</h2>
          <span>{finishedFixtures.length} 场</span>
        </div>
        {renderMatchGrid(finishedFixtures, "暂无已结束比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>即将开始</h2>
          <span>{scheduledFixtures.length} 场</span>
        </div>
        {renderMatchGrid(scheduledFixtures, "暂无未开始比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>赛果待更新</h2>
          <span>{resultPendingFixtures.length} 场</span>
        </div>
        {renderMatchGrid(resultPendingFixtures, "暂无赛果待更新比赛。")}
      </section>

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>时间或数据异常</h2>
          <span>{unknownFixtures.length} 场</span>
        </div>
        {renderMatchGrid(unknownFixtures, "暂无时间或数据异常比赛。")}
      </section>

      {selectedStandingTable ? (
        <section className="dashboardSection" id="group-standings" data-smoke="group-standings-homepage">
          <div className="sectionHeader">
            <div>
              <h2>小组积分榜与出线形势（本地规则推断）</h2>
              <p className="sourceLine">基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。</p>
            </div>
            <span>{selectedStandingTable.group} 组 · {selectedStandingTable.finishedMatches}/{selectedStandingTable.totalMatches} 场已结束 · {selectedStandingTable.isComplete ? "当前排名已确定/小组赛已结束" : "仍需后续比赛确认"}</span>
          </div>
          <div className="standingTabs" aria-label="选择小组积分榜">
            {groupStandingTables.map((table) => (
              <button
                key={table.group}
                className={table.group === selectedStandingTable.group ? "active" : ""}
                onClick={() => setStandingGroup(table.group)}
              >
                {table.group} 组
              </button>
            ))}
          </div>
          {renderStandingTable(selectedStandingTable)}
          <p className="sourceLine">{selectedStandingTable.notes.join(" ")}</p>
        </section>
      ) : null}

      <section className="dashboardSection">
        <div className="sectionHeader">
          <h2>模型表现</h2>
          <span>规则模型复盘</span>
        </div>
        {modelPerformance.reviewedMatches ? (
          <div className="performanceGrid">
            <div>
              <span>已复盘比赛</span>
              <strong>{modelPerformance.reviewedMatches}</strong>
            </div>
            <div>
              <span>方向命中率</span>
              <strong>{modelPerformance.outcomeHitRate}%</strong>
            </div>
            <div>
              <span>比分完全命中</span>
              <strong>{modelPerformance.exactScoreHits}</strong>
            </div>
            <div>
              <span>平均总进球误差</span>
              <strong>{modelPerformance.averageTotalGoalError}</strong>
            </div>
          </div>
        ) : (
          renderEmpty("暂无可复盘的已结束比赛。模型表现会在赛果更新后自动汇总。")
        )}
        <p className="sourceLine">
          {modelPerformance.reviewedMatches || 0} 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。
        </p>
      </section>

      {showCharts ? <section className="chartsGrid" id="mobile-models">
        <article className="panel">
          <h2>未开始 / 进行中比赛热度排行（演示口径）</h2>
          <div className="chartBox">
            {renderChartFrame(heatData.map((item) => ({ name: item.name, value: item.heat })), "暂无未开始或进行中的比赛热度数据。", (
              <ResponsiveContainer>
                <BarChart data={heatData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="axisLabel" interval={0} tick={{ fontSize: 11 }} />
                  <YAxis width={30} />
                  <Tooltip />
                  <Bar dataKey="heat" fill="#1f7a8c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ))}
          </div>
          <p className="sourceLine">热度指数（0–100）是基于本地示例舆情输入生成的关注度排序分，仅展示未开始或进行中的比赛；用于界面排序和模型示例，不是官方关注度，也不是全网实时舆情。</p>
        </article>

        <article className="panel">
          <h2>全量样本球队雷达图（演示模型）</h2>
          <div className="radarControls" aria-label="选择雷达图比较球队">
            <label>
              球队一
              <select value={selectedRadarHomeTeamId} onChange={(event) => setRadarHomeTeamId(event.target.value)}>
                {radarTeamOptions.map((team) => <option key={team.id} value={team.id} disabled={team.id === selectedRadarAwayTeamId}>{localizedTeamLabel(team)}</option>)}
              </select>
            </label>
            <label>
              球队二
              <select value={selectedRadarAwayTeamId} onChange={(event) => setRadarAwayTeamId(event.target.value)}>
                {radarTeamOptions.map((team) => <option key={team.id} value={team.id} disabled={team.id === selectedRadarHomeTeamId}>{localizedTeamLabel(team)}</option>)}
              </select>
            </label>
          </div>
          <div className="chartBox">
            {renderChartFrame(radarData.map((item) => ({ name: item.metric, value: `${radarHomeLabel} ${item[radarHomeLabel]} / ${radarAwayLabel} ${item[radarAwayLabel]}` })), "暂无球队对比数据。", (
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <Radar name={radarHomeLabel} dataKey={radarHomeLabel} stroke="#0f766e" fill="#0f766e" fillOpacity={0.25} />
                  <Radar name={radarAwayLabel} dataKey={radarAwayLabel} stroke="#b45309" fill="#b45309" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            ))}
          </div>
          <p className="sourceLine">可从全量样本中任选两队比较；初始展示综合画像最高与最低的球队，以清楚展示五项维度差异。球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。</p>
        </article>

        <article className="panel">
          <h2>近期状态曲线</h2>
          <div className="chartBox">
            {renderChartFrame(formData.map((item) => ({ name: item.name, value: item.form })), "暂无近期状态数据。", (
              <ResponsiveContainer>
                <AreaChart data={formData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[45, 90]} width={30} />
                  <Tooltip />
                  <Area dataKey="form" stroke="#475569" fill="#94a3b8" fillOpacity={0.35} />
                </AreaChart>
              </ResponsiveContainer>
            ))}
          </div>
          <p className="sourceLine">状态指数是本地模型输入，不是官方指标。</p>
        </article>

        <article className="panel">
          <h2>小组出线概率（演示模型）</h2>
          <div className="chartBox">
            {renderChartFrame(qualificationData.map((item) => ({ name: item.name, value: `${item.probability}%` })), "暂无小组出线概率数据。", (
              <ResponsiveContainer>
                <BarChart data={qualificationData} layout="vertical" margin={{ left: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={104} />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#64748b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ))}
          </div>
          <p className="sourceLine">出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。</p>
        </article>
      </section> : (
        <section className="mobileChartsTeaser" id="mobile-models">
          <strong>模型数据与图表</strong>
          <span>热度、球队对比、近期状态与出线概率</span>
          <button onClick={() => setShowCharts(true)}>查看图表</button>
        </section>
      )}

      <section className="sourcePanel" id="mobile-sources">
        <h2>数据来源与更新时间</h2>
        <p className="sourceLine">本地数据最近更新：{dataUpdatedAtLabel}，北京时间。以下为各来源各自的抓取时间。</p>
        <div className="sourceGrid">
          {store.sources.map((source) => (
            <a href={source.sourceUrl} target="_blank" rel="noreferrer" key={source.sourceId}>
              <strong>{source.sourceName}</strong>
              <span>{source.description}</span>
              <small>{source.confidence} · 来源抓取时间 {formatFullDisplayDateTime(source.lastFetchedAt)}</small>
            </a>
          ))}
        </div>
      </section>
      <nav className="mobileBottomNav" aria-label="移动端快捷导航">
        <a href="#mobile-today">今日</a>
        <a href="#mobile-schedule">赛程</a>
        <a href="#group-standings">积分榜</a>
        <a href="#team-center">我的主队</a>
      </nav>
    </main>
  );
}
