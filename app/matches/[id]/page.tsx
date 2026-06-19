import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { generateMatchAnalysis } from "../../../lib/analysis";
import { formatFullDisplayDateTime } from "../../../lib/format";
import { predictMatch } from "../../../lib/prediction";
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

  const prediction = predictMatch(bundle);
  const analysis = generateMatchAnalysis({
    fixture: bundle.fixture,
    homeTeam: bundle.homeTeam,
    awayTeam: bundle.awayTeam,
    homePlayers: bundle.homePlayers,
    awayPlayers: bundle.awayPlayers,
    prediction
  });

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
        <div className="scoreTile">
          <span>预测比分</span>
          <strong>{prediction.predictedScore.home}-{prediction.predictedScore.away}</strong>
          <small>期望进球 {prediction.expectedGoals.home}-{prediction.expectedGoals.away}</small>
        </div>
      </section>

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
    </main>
  );
}
