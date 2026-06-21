import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceBadge } from "../../../components/source-badge";
import { StandingsSummary } from "../../../components/standings-summary";
import {
  buildGroupStandings,
  getTeamFinishedMatches,
  getTeamRemainingMatches,
  getTeamStandingRow,
  getTeamStandingTable,
  STANDINGS_PAGE_QUALIFICATION_NOTE,
  STANDINGS_PAGE_RULE_NOTE
} from "../../../lib/group-standings";
import { matchStatusLabel } from "../../../lib/match-intelligence";
import { getEnrichedMatches } from "../../../lib/match-intelligence";
import { getTeamBundle } from "../../../lib/store";
import { teamLabel } from "../../../lib/team-display";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;
  const bundle = await getTeamBundle(id);

  if (!bundle) {
    notFound();
  }

  const teamById = new Map(bundle.store.teams.map((team) => [team.id, team]));
  const fixtures = bundle.fixtures
    .slice()
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
  const nextFixture = fixtures.find((fixture) => fixture.status === "scheduled" || fixture.status === "live" || fixture.status === "live_pending");
  const finishedFixtures = fixtures.filter((fixture) => fixture.status === "finished");
  const enrichedMatches = getEnrichedMatches(bundle.store);
  const standingTables = buildGroupStandings(enrichedMatches, bundle.store.teams);
  const teamStanding = getTeamStandingRow(standingTables, id);
  const groupStanding = getTeamStandingTable(standingTables, id);
  const remainingMatches = getTeamRemainingMatches(enrichedMatches, id);
  const finishedMatches = getTeamFinishedMatches(enrichedMatches, id);

  function fixtureLabel(teamId?: string, placeholder?: string) {
    return teamId ? (teamById.get(teamId) ? teamLabel(teamById.get(teamId)!) : teamId) : placeholder ?? "参赛队待确定";
  }

  function fixtureResult(fixture: (typeof fixtures)[number]) {
    if (fixture.result?.homeScore !== undefined && fixture.result.awayScore !== undefined) {
      return `${fixtureLabel(fixture.homeTeamId, fixture.homePlaceholder)} ${fixture.result.homeScore}-${fixture.result.awayScore} ${fixtureLabel(fixture.awayTeamId, fixture.awayPlaceholder)}`;
    }

    return matchStatusLabel(fixture.status);
  }

  function matchOpponentLabel(match: (typeof enrichedMatches)[number]) {
    return teamLabel(match.home.id === id ? match.away : match.home);
  }

  function matchResultLabel(match: (typeof enrichedMatches)[number]) {
    if (match.result.homeScore !== undefined && match.result.awayScore !== undefined) {
      return `${teamLabel(match.home)} ${match.result.homeScore}-${match.result.awayScore} ${teamLabel(match.away)}`;
    }
    return matchStatusLabel(match.status);
  }

  function standingSummary(row: NonNullable<typeof groupStanding>["rows"][number]) {
    const goalDifference = row.goalDifference > 0 ? `+${row.goalDifference}` : `${row.goalDifference}`;
    return `进球 ${row.goalsFor}｜失球 ${row.goalsAgainst}｜净胜球 ${goalDifference}｜积分 ${row.points}`;
  }

  return (
    <main className="pageShell">
      <Link href="/" className="backLink">返回 Dashboard</Link>
      <section className="teamHeader">
        <div>
          <p className="eyebrow">{bundle.team.group} 组 · {bundle.team.region}</p>
          <h1>{teamLabel(bundle.team)}</h1>
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
          <p>{teamStanding ? `当前排名：${bundle.team.group} 组第 ${teamStanding.rank}` : "当前排名：小组积分榜暂不可用。"}</p>
          <p>{teamStanding ? `积分 ${teamStanding.points} · 净胜球 ${teamStanding.goalDifference > 0 ? `+${teamStanding.goalDifference}` : teamStanding.goalDifference}` : "积分与净胜球暂不可用。"}</p>
          <p>{teamStanding ? `当前状态：${teamStanding.qualificationText}` : "当前状态：仍需后续比赛确认。"}</p>
          <p>已结束 {finishedFixtures.length} 场，下一场 {nextFixture ? `${fixtureLabel(nextFixture.homeTeamId, nextFixture.homePlaceholder)} vs ${fixtureLabel(nextFixture.awayTeamId, nextFixture.awayPlaceholder)} · ${nextFixture.beijingTimeLabel ?? ""}` : "暂无未开始比赛"}。</p>
          <p className="sourceLine">{STANDINGS_PAGE_RULE_NOTE} {STANDINGS_PAGE_QUALIFICATION_NOTE}</p>
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
          <h2>小组赛程</h2>
          <ul className="cleanList">
            {fixtures.map((fixture) => (
              <li key={fixture.id}>
                <Link href={`/matches/${fixture.id}`}>
                  {fixtureLabel(fixture.homeTeamId, fixture.homePlaceholder)} vs {fixtureLabel(fixture.awayTeamId, fixture.awayPlaceholder)}
                </Link>
                {" · "}
                {fixture.beijingDate} {fixture.beijingTimeLabel}
                {" · "}
                {fixtureResult(fixture)}
              </li>
            ))}
          </ul>
        </article>

        {groupStanding ? (
          <article className="panel widePanel" id="team-group-standings" data-smoke="team-group-standings">
            <h2>{groupStanding.group} 组积分榜与出线形势</h2>
            <p className="sourceLine">当前球队：{teamLabel(bundle.team)}</p>
            <StandingsSummary table={groupStanding} teams={bundle.store.teams} currentTeamIds={[id]} />
            <p className="sourceLine">{STANDINGS_PAGE_RULE_NOTE} {STANDINGS_PAGE_QUALIFICATION_NOTE}</p>
          </article>
        ) : null}

        <article className="panel widePanel">
          <h2>已结束比赛</h2>
          {finishedMatches.length ? (
            <ul className="cleanList">
              {finishedMatches.map((match) => (
                <li key={match.fixture.id}>
                  <Link href={`/matches/${match.fixture.id}`}>
                    vs {matchOpponentLabel(match)}
                  </Link>
                  {" · "}
                  {match.beijingDate} {match.beijingTimeLabel}
                  {" · "}
                  实际比分 {matchResultLabel(match)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="sourceLine">该队暂无已结束小组赛。</p>
          )}
        </article>

        <article className="panel widePanel">
          <h2>剩余赛程</h2>
          {remainingMatches.length ? (
            <ul className="cleanList">
              {remainingMatches.map((match) => (
                <li key={match.fixture.id}>
                  <Link href={`/matches/${match.fixture.id}`}>
                    vs {matchOpponentLabel(match)}
                  </Link>
                  {" · "}
                  {match.beijingDate} {match.beijingTimeLabel}，北京时间
                  {" · "}
                  {matchStatusLabel(match.status)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="sourceLine">该队小组赛已无未完赛赛程。</p>
          )}
        </article>
      </section>
    </main>
  );
}
