import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { generateMatchAnalysis } from "../../../lib/analysis";
import { formatFullDisplayDateTime } from "../../../lib/format";
import { buildDataConfidence, buildPredictionReview, confidenceLabel, matchStatusLabel, resolveMatchStatus, upsetRiskScore } from "../../../lib/match-intelligence";
import { getFixturePredictionEligibility, predictMatch } from "../../../lib/prediction";
import { getFixtureBundle } from "../../../lib/store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchPage({ params }: PageProps) {
  const { id } = await params;
  const bundle = await getFixtureBundle(id);

  if (!bundle) {
    notFound();
  }

  const predictionEligibility = getFixturePredictionEligibility(bundle.fixture);
  const prediction = predictionEligibility.canPredict ? predictMatch(bundle) : null;
  const reviewPrediction = predictMatch(bundle);
  const review = buildPredictionReview(bundle.fixture, reviewPrediction);
  const matchStatus = resolveMatchStatus(bundle.fixture);
  const confidence = buildDataConfidence(bundle.fixture, [...bundle.homePlayers, ...bundle.awayPlayers].map((player) => player.source));
  const analysis = prediction
    ? generateMatchAnalysis({
        fixture: bundle.fixture,
        homeTeam: bundle.homeTeam,
        awayTeam: bundle.awayTeam,
        homePlayers: bundle.homePlayers,
        awayPlayers: bundle.awayPlayers,
        prediction
      })
    : null;
  const reviewAnalysis = generateMatchAnalysis({
    fixture: bundle.fixture,
    homeTeam: bundle.homeTeam,
    awayTeam: bundle.awayTeam,
    homePlayers: bundle.homePlayers,
    awayPlayers: bundle.awayPlayers,
    prediction: reviewPrediction
  });
  const homeInjuryRisk = bundle.homePlayers.filter((player) => player.status !== "fit").length;
  const awayInjuryRisk = bundle.awayPlayers.filter((player) => player.status !== "fit").length;
  const comparisonRows = [
    ["FIFA 排名", bundle.homeTeam.fifaRank, bundle.awayTeam.fifaRank],
    ["近期状态", bundle.homeTeam.form, bundle.awayTeam.form],
    ["进攻指数", bundle.homeTeam.attack, bundle.awayTeam.attack],
    ["防守指数", bundle.homeTeam.defense, bundle.awayTeam.defense],
    ["预期进球", reviewPrediction.expectedGoals.home, reviewPrediction.expectedGoals.away],
    ["关键球员", bundle.homePlayers[0]?.name ?? "暂无", bundle.awayPlayers[0]?.name ?? "暂无"],
    ["伤停风险", homeInjuryRisk ? `${homeInjuryRisk} 人观察` : "低", awayInjuryRisk ? `${awayInjuryRisk} 人观察` : "低"],
    ["冷门风险", upsetRiskScore(reviewPrediction), upsetRiskScore(reviewPrediction)]
  ];

  return (
    <main className="pageShell">
      <Link href="/" className="backLink">
        返回 Dashboard
      </Link>

      <section className="matchHero">
        <div>
          <p className="eyebrow">{bundle.fixture.stage} · {bundle.fixture.group} 组</p>
          <h1>{bundle.homeTeam.name} vs {bundle.awayTeam.name}</h1>
          <p>{matchStatusLabel(matchStatus)} · 北京时间 {formatFullDisplayDateTime(bundle.fixture.kickoff)} · {bundle.fixture.city} · {bundle.fixture.venue}</p>
        </div>
        <div className={`scoreTile ${prediction ? "" : "muted"}`}>
          <span>{prediction ? "预测比分" : bundle.fixture.score ? "实际比分" : "暂不预测"}</span>
          <strong>{prediction ? `${prediction.predictedScore.home}-${prediction.predictedScore.away}` : bundle.fixture.score ? `${bundle.fixture.score.home}-${bundle.fixture.score.away}` : "--"}</strong>
          <small>{prediction ? `期望进球 ${prediction.expectedGoals.home}-${prediction.expectedGoals.away}` : predictionEligibility.message}</small>
        </div>
      </section>

      {prediction && analysis ? (
        <section className="detailGrid">
          <article className="panel widePanel">
            <div className="panelTitle">
              <h2>{analysis.title}</h2>
              <SourceBadge source={bundle.fixture.source} />
            </div>
            <p className="lead">{analysis.summary}</p>
            <div className="probabilityRows">
              <div>
                <span>{bundle.homeTeam.shortName} 胜</span>
                <strong>{prediction.probabilities.homeWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.homeWin}%` }} /></div>
              </div>
              <div>
                <span>平局</span>
                <strong>{prediction.probabilities.draw}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.draw}%` }} /></div>
              </div>
              <div>
                <span>{bundle.awayTeam.shortName} 胜</span>
                <strong>{prediction.probabilities.awayWin}%</strong>
                <div className="bar"><i style={{ width: `${prediction.probabilities.awayWin}%` }} /></div>
              </div>
            </div>
            <p className="sourceLine">{analysis.sourceNote}</p>
          </article>

          <article className="panel">
            <h2>战术看点</h2>
            <ul className="cleanList">
              {analysis.tacticalFocus.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="panel">
            <h2>关键球员</h2>
            <ul className="cleanList">
              {analysis.keyPlayers.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="panel">
            <h2>风险提示</h2>
            <p>{analysis.upsetRisk}</p>
            <ul className="cleanList">
              {prediction.riskFactors.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="panel">
            <h2>比分判断</h2>
            <p>{analysis.scorePrediction}</p>
            <p className="sourceLine">比分信心：{prediction.scoreConfidence}；模型信心：{prediction.confidence}</p>
          </article>

          <article className="panel widePanel">
            <h2>模型判断依据</h2>
            <div className="explanationGrid">
              {prediction.explanations.map((item) => (
                <div key={item.factor}>
                  <strong>{item.factor}</strong>
                  <span>{item.direction === "home" ? "+" : item.direction === "away" ? "-" : ""}{item.impact}%</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <p className="sourceLine">以上为规则模型推断，不是官方结论。</p>
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

          <article className="panel widePanel">
            <h2>比赛三种可能剧本</h2>
            <div className="scenarioGrid">
              {analysis.scenarios.map((scenario) => (
                <div key={scenario.title}>
                  <strong>{scenario.title}</strong>
                  <p>{scenario.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : (
        <section className="detailGrid">
          <article className="panel widePanel">
            <div className="panelTitle">
              <h2>赛前预测已暂停</h2>
              <SourceBadge source={bundle.fixture.source} />
            </div>
            <p className="lead">{predictionEligibility.message}</p>
            <p className="sourceLine">赛前预测仅覆盖未来两天未完赛比赛，已结束或窗口外比赛只展示事实数据。</p>
          </article>

          <article className="panel">
            <h2>比赛状态</h2>
            <p>{bundle.fixture.status === "finished" ? "已完赛" : "未完赛"}</p>
            <p className="sourceLine">{formatFullDisplayDateTime(bundle.fixture.kickoff)} · {bundle.fixture.city}</p>
          </article>

          <article className="panel">
            <h2>赛果</h2>
            <p>{bundle.fixture.score ? `${bundle.homeTeam.name} ${bundle.fixture.score.home}-${bundle.fixture.score.away} ${bundle.awayTeam.name}` : "暂无赛果"}</p>
            <p className="sourceLine">该区域不包含模型预测。</p>
          </article>

          {review ? (
            <article className="panel widePanel">
              <h2>预测复盘</h2>
              <div className="reviewGrid">
                <span>实际比分 <strong>{review.actualHomeScore}-{review.actualAwayScore}</strong></span>
                <span>赛前预测 <strong>{review.predictedHomeScore}-{review.predictedAwayScore}</strong></span>
                <span>胜平负方向 <strong>{review.outcomeHit ? "命中" : "未命中"}</strong></span>
                <span>比分偏差 <strong>{review.goalDiffError}</strong></span>
              </div>
              <p className="lead">{review.summary}</p>
              <ul className="cleanList">
                {review.improvementNotes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </article>
          ) : null}

          <article className="panel widePanel">
            <h2>模型判断依据</h2>
            <div className="explanationGrid">
              {reviewPrediction.explanations.map((item) => (
                <div key={item.factor}>
                  <strong>{item.factor}</strong>
                  <span>{item.direction === "home" ? "+" : item.direction === "away" ? "-" : ""}{item.impact}%</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <p className="sourceLine">该复盘依据赛前规则模型输出，仅用于解释模型偏差。</p>
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

          <article className="panel widePanel">
            <h2>数据可信度</h2>
            <div className="reviewGrid">
              <span>比赛时间 <strong>{confidenceLabel(confidence.matchTime)}</strong></span>
              <span>球队数据 <strong>{confidenceLabel(confidence.teamData)}</strong></span>
              <span>伤停信息 <strong>{confidenceLabel(confidence.injury)}</strong></span>
              <span>实际比分 <strong>{confidenceLabel(confidence.result)}</strong></span>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
