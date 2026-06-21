import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { StandingsSummary } from "../../../components/standings-summary";
import { formatFullDisplayDateTime } from "../../../lib/format";
import {
  buildGroupStandings,
  getGroupStandingTable,
  resultImpactText,
  STANDINGS_PAGE_QUALIFICATION_NOTE,
  STANDINGS_PAGE_RULE_NOTE
} from "../../../lib/group-standings";
import { confidenceLabel, matchStatusLabel } from "../../../lib/match-intelligence";
import { isScheduleVerified } from "../../../lib/schedule-validation";
import { getEnrichedFixtureBundle, getEnrichedFixtureBundles } from "../../../lib/store";
import { teamLabel } from "../../../lib/team-display";
import type { DataConfidence } from "../../../lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function explanationDirection(direction: string) {
  if (direction === "home") return "+";
  if (direction === "away") return "-";
  return "";
}

function confidenceRows(confidence: DataConfidence) {
  return [
    ["比赛时间", confidence.matchTime],
    ["球队基础数据", confidence.teamData],
    ["伤停信息", confidence.injury],
    ["关键球员", confidence.keyPlayers],
    ["预测结果", confidence.prediction],
    ["实际比分", confidence.result],
    ["数据来源", confidence.dataSource]
  ] as const;
}

function standingSummary(row: { goalsFor: number; goalsAgainst: number; goalDifference: number; points: number }) {
  const goalDifference = row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;
  return `进球 ${row.goalsFor}｜失球 ${row.goalsAgainst}｜净胜球 ${goalDifference}｜积分 ${row.points}`;
}

export default async function MatchPage({ params }: PageProps) {
  const { id } = await params;
  const match = await getEnrichedFixtureBundle(id);
  const allMatchesBundle = await getEnrichedFixtureBundles();

  if (!match) {
    notFound();
  }

  const {
    fixture,
    homeTeam,
    awayTeam,
    homePlayers,
    awayPlayers,
    prediction,
    reviewPrediction,
    predictionEligibility,
    status,
    review,
    result,
    dataConfidence,
    predictionExplanation,
    analysis,
    upsetRisk,
    displayTime,
    displayTimezoneLabel,
    staleResultMessage
  } = match;
  const activePrediction = prediction ?? reviewPrediction;
  const homeInjuryRisk = homePlayers.filter((player) => player.status !== "fit").length;
  const awayInjuryRisk = awayPlayers.filter((player) => player.status !== "fit").length;
  const actualScore = result.homeScore !== undefined && result.awayScore !== undefined
    ? `${result.homeScore}-${result.awayScore}`
    : null;
  const scoreTileLabel = status === "finished" ? "实际比分" : status === "result_pending" ? "赛果待抓取" : status === "live_pending" ? "比分待更新" : status === "unknown" ? "数据异常" : prediction ? "预测比分" : "赛前预测暂停";
  const scoreTileValue = status === "finished" ? actualScore ?? "--" : status === "result_pending" || status === "live_pending" || status === "unknown" ? "待更新" : prediction ? `${prediction.predictedScore.home}-${prediction.predictedScore.away}` : "--";
  const reviewPredictionLabel = reviewPrediction
    ? `${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}`
    : "暂无";
  const scoreTileNote = status === "finished"
    ? `赛前预测 ${reviewPredictionLabel}`
    : status === "result_pending" || status === "live_pending" || status === "unknown"
      ? `赛前预测 ${reviewPredictionLabel}`
    : prediction
      ? `期望进球 ${prediction.expectedGoals.home}-${prediction.expectedGoals.away}`
      : predictionEligibility.message;
  const comparisonRows = [
    ["FIFA 排名", homeTeam.fifaRank, awayTeam.fifaRank],
    ["进攻指数", homeTeam.attack, awayTeam.attack],
    ["防守指数", homeTeam.defense, awayTeam.defense],
    ["近期状态", homeTeam.form, awayTeam.form],
    ["期望进球", activePrediction ? activePrediction.expectedGoals.home : "--", activePrediction ? activePrediction.expectedGoals.away : "--"],
    ["关键球员", homePlayers[0]?.name ?? "暂无", awayPlayers[0]?.name ?? "暂无"],
    ["伤停风险", homeInjuryRisk ? `${homeInjuryRisk} 人观察` : "低", awayInjuryRisk ? `${awayInjuryRisk} 人观察` : "低"],
    ["冷门风险", upsetRisk, upsetRisk],
    ["数据来源可信度", confidenceLabel(dataConfidence.dataSource), confidenceLabel(dataConfidence.dataSource)]
  ];
  const groupStanding = getGroupStandingTable(buildGroupStandings(allMatchesBundle.matches, allMatchesBundle.store.teams), fixture.group);

  return (
    <main className="pageShell">
      <Link href="/" className="backLink">
        返回 Dashboard
      </Link>

      <section className="matchHero">
        <div>
          <p className="eyebrow">{matchStatusLabel(status)} · {fixture.stage} · {fixture.group} 组</p>
          <h1>{teamLabel(homeTeam)} vs {teamLabel(awayTeam)}</h1>
          <p>{displayTimezoneLabel} {displayTime} · {fixture.city} · {fixture.venue}</p>
          {staleResultMessage ? <p className="sourceLine">{staleResultMessage}</p> : null}
        </div>
        <div className={`scoreTile ${status === "result_pending" || status === "live_pending" || status === "unknown" || (!prediction && status !== "finished") ? "muted" : ""}`}>
          <span>{scoreTileLabel}</span>
          <strong>{scoreTileValue}</strong>
          <small>{scoreTileNote}</small>
        </div>
      </section>

      <section className="detailGrid">
        <article className={`panel widePanel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <div className="panelTitle">
            <h2>{status === "finished" ? "赛前分析（赛前快照）" : analysis.title}</h2>
            <SourceBadge source={fixture.source} verified={isScheduleVerified(fixture)} />
          </div>
          <p className="lead">{analysis.summary}</p>
          {activePrediction ? (
            <>
              <div className="probabilityRows">
                <div>
                  <span>{homeTeam.shortName} 胜</span>
                  <strong>{activePrediction.probabilities.homeWin}%</strong>
                  <div className="bar"><i style={{ width: `${activePrediction.probabilities.homeWin}%` }} /></div>
                </div>
                <div>
                  <span>平局</span>
                  <strong>{activePrediction.probabilities.draw}%</strong>
                  <div className="bar"><i style={{ width: `${activePrediction.probabilities.draw}%` }} /></div>
                </div>
                <div>
                  <span>{awayTeam.shortName} 胜</span>
                  <strong>{activePrediction.probabilities.awayWin}%</strong>
                  <div className="bar"><i style={{ width: `${activePrediction.probabilities.awayWin}%` }} /></div>
                </div>
              </div>
              <p className="sourceLine">该预测为本地规则模型推断，不代表官方结论。</p>
            </>
          ) : (
            <p className="sourceLine">{predictionEligibility.message ?? "参赛队待确定，不生成预测。"}</p>
          )}
        </article>

        <article className="panel">
          <h2>比赛状态</h2>
          <p>{matchStatusLabel(status)}</p>
          <p className="sourceLine">{staleResultMessage ?? `数据更新时间：${formatFullDisplayDateTime(fixture.source.lastFetchedAt)}`}</p>
        </article>

        <article className={`panel widePanel ${status === "finished" ? "postMatchSnapshot" : ""}`} data-smoke="match-data-times">
          <h2>{status === "finished" ? "赛前预测快照" : "数据时间"}</h2>
          <div className="reviewGrid">
            <span>来源抓取时间 <strong>{fixture.source.lastFetchedAt ? formatFullDisplayDateTime(fixture.source.lastFetchedAt) : "暂无"}</strong></span>
            <span>数据规范化时间 <strong>{fixture.lastNormalizedAt ? formatFullDisplayDateTime(fixture.lastNormalizedAt) : "暂无，等待规范化"}</strong></span>
            <span>赛果更新时间 <strong>{fixture.lastResultsUpdatedAt ? formatFullDisplayDateTime(fixture.lastResultsUpdatedAt) : "暂无，等待赛果补录"}</strong></span>
            <span>赛前预测快照 <strong>{fixture.predictionSnapshot?.capturedAt ? formatFullDisplayDateTime(fixture.predictionSnapshot.capturedAt) : "暂无"}</strong></span>
          </div>
          <p className="sourceLine">状态按开赛时间加 2 小时的本地提示规则判断；预测快照与赛果更新时间相互独立。</p>
        </article>

        <article className={`panel ${status === "finished" ? "postMatchScore" : ""}`}>
          <h2>比分信息</h2>
          <p>{actualScore ? `实际比分：${homeTeam.shortName} ${actualScore} ${awayTeam.shortName}` : "实际比分：赛果待抓取 / 数据待更新"}</p>
          <p className="sourceLine">{reviewPrediction ? `赛前预测：${reviewPrediction.predictedScore.home}-${reviewPrediction.predictedScore.away}；期望进球 ${reviewPrediction.expectedGoals.home}-${reviewPrediction.expectedGoals.away}` : "参赛队待确定，不生成赛前预测。"}</p>
        </article>

        {groupStanding ? (
          <article className={`panel widePanel ${status === "finished" ? "postMatchStandings" : ""}`} id="match-group-standings" data-smoke="match-group-standings">
            <h2>{fixture.group} 组积分榜摘要</h2>
            <p className="sourceLine">所属小组：{fixture.group} 组</p>
            <p className="lead">{resultImpactText(match)}</p>
            <StandingsSummary table={groupStanding} teams={allMatchesBundle.store.teams} currentTeamIds={[homeTeam.id, awayTeam.id]} />
            <p className="sourceLine">{STANDINGS_PAGE_RULE_NOTE} {STANDINGS_PAGE_QUALIFICATION_NOTE}</p>
          </article>
        ) : null}

        {review ? (
          <article className={`panel widePanel ${status === "finished" ? "postMatchReview" : ""}`}>
            <h2>赛后预测复盘</h2>
            <div className="reviewGrid">
              <span>实际比分 <strong>{review.actualHomeScore}-{review.actualAwayScore}</strong></span>
              <span>赛前预测 <strong>{review.predictedHomeScore}-{review.predictedAwayScore}</strong></span>
              <span>胜平负方向 <strong>{review.outcomeHit ? "命中" : "未命中"}</strong></span>
              <span>比分完全命中 <strong>{review.exactScoreHit ? "命中" : "未命中"}</strong></span>
              <span>净胜球偏差 <strong>{review.goalDiffError}</strong></span>
              <span>总进球偏差 <strong>{review.totalGoalError}</strong></span>
            </div>
            <p className="lead">{review.summary}</p>
            <ul className="cleanList">
              {review.improvementNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </article>
        ) : staleResultMessage ? (
          <article className="panel widePanel">
            <h2>预测复盘</h2>
            <p className="lead">{staleResultMessage}</p>
            <p className="sourceLine">赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。</p>
          </article>
        ) : null}

        <article className={`panel widePanel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>数据可信度</h2>
          <div className="reviewGrid">
            {confidenceRows(dataConfidence).map(([label, value]) => (
              <span key={label}>{label} <strong>{confidenceLabel(value)}</strong></span>
            ))}
          </div>
        </article>

        <article className={`panel widePanel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>模型判断依据</h2>
          <div className="explanationGrid">
            {predictionExplanation.map((item) => (
              <div key={item.factor}>
                <strong>{item.factor}</strong>
                <span>{explanationDirection(item.direction)}{item.impact}%</span>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <p className="sourceLine">该预测为本地规则模型推断，不代表官方结论。</p>
        </article>

        <article className="panel widePanel">
          <h2>双方关键指标对比</h2>
          <table className="comparisonTable">
            <tbody>
              {comparisonRows.map(([label, homeValue, awayValue]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{homeValue}</td>
                  <td>{awayValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className={`panel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>战术看点</h2>
          <ul className="cleanList">
            {analysis.tacticalFocus.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className={`panel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>关键球员</h2>
          <ul className="cleanList">
            {analysis.keyPlayers.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className={`panel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>风险提示</h2>
          <p>{analysis.upsetRisk}</p>
          {activePrediction ? (
            <ul className="cleanList">
              {activePrediction.riskFactors.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
        </article>

        <article className={`panel widePanel ${status === "finished" ? "postMatchPreAnalysis" : ""}`}>
          <h2>赛前剧本（历史预测）</h2>
          <details>
            <summary>展开赛前预测剧本</summary>
            <div className="scenarioGrid">
            {analysis.scenarios.map((scenario) => (
              <div key={scenario.title}>
                <strong>{scenario.title}</strong>
                <p>{scenario.description}</p>
              </div>
            ))}
            </div>
          </details>
        </article>
      </section>
    </main>
  );
}
