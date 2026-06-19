import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { getTeamBundle } from "../../../lib/store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;
  const bundle = await getTeamBundle(id);

  if (!bundle) {
    notFound();
  }

  return (
    <main className="pageShell">
      <Link href="/" className="backLink">返回 Dashboard</Link>
      <section className="teamHeader">
        <div>
          <p className="eyebrow">{bundle.team.group} 组 · {bundle.team.region}</p>
          <h1>{bundle.team.name}</h1>
          <p>FIFA 排名第 {bundle.team.fifaRank} · 积分 {bundle.team.rankingPoints}</p>
        </div>
        <SourceBadge source={bundle.team.source} />
      </section>

      <section className="detailGrid">
        <article className="panel">
          <h2>球队画像</h2>
          <div className="metricGrid">
            <span>进攻 <strong>{bundle.team.attack}</strong></span>
            <span>防守 <strong>{bundle.team.defense}</strong></span>
            <span>中场 <strong>{bundle.team.midfield}</strong></span>
            <span>状态 <strong>{bundle.team.form}</strong></span>
          </div>
        </article>

        <article className="panel">
          <h2>小组形势</h2>
          <p>积分 {bundle.standing?.points ?? 0}，出线概率演示值 {bundle.standing?.qualificationProbability.toFixed(1) ?? "N/A"}%。</p>
          <p className="sourceLine">该概率为本地模型推断，不是官方排名。</p>
        </article>

        <article className="panel">
          <h2>关键球员</h2>
          <ul className="cleanList">
            {bundle.players.map((player) => (
              <li key={player.id}>{player.name} · {player.role} · {player.status} · {player.note}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>相关比赛</h2>
          <ul className="cleanList">
            {bundle.fixtures.map((fixture) => (
              <li key={fixture.id}>
                <Link href={`/matches/${fixture.id}`}>{fixture.homeTeamId} vs {fixture.awayTeamId}</Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
