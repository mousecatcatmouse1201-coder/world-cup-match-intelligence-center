import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { generateMatchAnalysis } from "../../../lib/analysis";
import { formatFullDisplayDateTime } from "../../../lib/format";
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

  return (
    <main className="pageShell">
      <Link href="/" className="backLink">
        返回 Dashboard
      </Link>

      <section className="matchHero">
        <div>
          <p className="eyebrow">{bundle.fixture.stage} · {bundle.fixture.group} 组</p>
          <h1>{bundle.homeTeam.name} vs {bundle.awayTeam.name}</h1>
          <p>{formatFullDisplayDateTime(bundle.fixture.kickoff)} · {bundle.fixture.city} · {bundle.fixture.venue}</p>
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
        </section>
      )}
    </main>
  );
}
