import Link from "next/link";
import type { GroupStandingTable } from "../lib/group-standings";
import type { Team } from "../lib/types";
import { teamLabel } from "../lib/team-display";

export function standingSummary(row: GroupStandingTable["rows"][number]) {
  const difference = row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference;
  return `进球 ${row.goalsFor}｜失球 ${row.goalsAgainst}｜净胜球 ${difference}｜积分 ${row.points}`;
}

export function StandingsSummary({ table, teams, currentTeamIds = [] }: { table: GroupStandingTable; teams: Team[]; currentTeamIds?: string[] }) {
  const teamById = new Map(teams.map((team) => [team.id, team]));
  return <div className="standingTableWrap">
    <table className="standingTable">
      <colgroup>
        <col className="standingRankCol" />
        <col className="standingTeamCol" />
        <col className="standingSummaryCol" />
        <col className="standingStatusCol" />
      </colgroup>
      <thead><tr><th>排名</th><th>球队</th><th>进球｜失球｜净胜球｜积分</th><th>出线形势</th></tr></thead>
      <tbody>{table.rows.map((row) => {
        const team = teamById.get(row.teamId);
        const active = currentTeamIds.includes(row.teamId);
        return <tr key={row.teamId} className={active ? "activeRow" : ""}>
          <td>{row.rank}</td><td><Link href={`/teams/${row.teamId}`}>{team ? teamLabel(team) : row.teamName}</Link>{currentTeamIds.length === 1 && active ? " · 当前球队" : ""}</td>
          <td className="standingSummaryCell">{standingSummary(row)}</td><td>{row.qualificationText}</td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}
