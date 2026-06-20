import type { EnrichedMatch, Team } from "./types";

export type QualificationStatus = "qualified" | "possible" | "eliminated" | "pending";

export interface GroupStandingRow {
  group: string;
  teamId: string;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  rank: number;
  qualificationStatus: QualificationStatus;
  qualificationText: string;
  notes: string[];
}

export interface GroupStandingTable {
  group: string;
  rows: GroupStandingRow[];
  finishedMatches: number;
  totalMatches: number;
  remainingMatches: number;
  isComplete: boolean;
  notes: string[];
}

export const GROUP_STANDING_RULE_NOTE = "积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。";
export const QUALIFICATION_RULE_NOTE = "第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。";
export const STANDINGS_PAGE_RULE_NOTE = "积分榜为本地简化规则，非 FIFA 官方确认排名。";
export const STANDINGS_PAGE_QUALIFICATION_NOTE = "出线形势基于当前已录入赛果推断，仍需后续比赛确认。";

const groups = "ABCDEFGHIJKL".split("");

function blankRow(team: Team): GroupStandingRow {
  return {
    group: team.group,
    teamId: team.id,
    teamName: team.shortName,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    rank: 0,
    qualificationStatus: "pending",
    qualificationText: "赛果不足，仍需后续比赛确认",
    notes: []
  };
}

function hasScore(match: EnrichedMatch) {
  return match.result.homeScore !== undefined && match.result.awayScore !== undefined;
}

function applyResult(row: GroupStandingRow, goalsFor: number, goalsAgainst: number) {
  row.played += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;

  if (goalsFor > goalsAgainst) {
    row.wins += 1;
    row.points += 3;
  } else if (goalsFor < goalsAgainst) {
    row.losses += 1;
  } else {
    row.draws += 1;
    row.points += 1;
  }
}

function sortRows(rows: GroupStandingRow[]) {
  return rows.slice().sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.teamName.localeCompare(b.teamName, "zh-CN");
  });
}

function hasSimplifiedTie(rows: GroupStandingRow[]) {
  const buckets = new Map<string, number>();
  for (const row of rows) {
    const key = `${row.points}:${row.goalDifference}:${row.goalsFor}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return [...buckets.values()].some((count) => count > 1);
}

function qualification(row: GroupStandingRow, isComplete: boolean): Pick<GroupStandingRow, "qualificationStatus" | "qualificationText" | "notes"> {
  const notes: string[] = [];

  if (!row.played) {
    notes.push("赛果样本不足，暂不判断。");
    return {
      qualificationStatus: "pending",
      qualificationText: "赛果不足，仍需后续比赛确认",
      notes
    };
  }

  if (row.rank <= 2) {
    notes.push(isComplete ? "小组赛已完成，按本地简化规则排名。" : "仍需后续比赛确认。");
    return {
      qualificationStatus: isComplete ? "qualified" : "possible",
      qualificationText: isComplete ? "小组赛已完成，当前位于直接出线区" : "当前位于直接出线区，仍需后续比赛确认",
      notes
    };
  }

  if (row.rank === 3) {
    notes.push("第三名出线需结合其他小组结果。");
    if (!isComplete) notes.push("仍需后续比赛确认。");
    return {
      qualificationStatus: "possible",
      qualificationText: "当前处于第三名竞争区",
      notes
    };
  }

  notes.push(isComplete ? "小组赛已完成，按本地简化规则暂列第四。" : "仍需后续比赛确认。");
  return {
    qualificationStatus: isComplete ? "eliminated" : "possible",
    qualificationText: isComplete ? "小组赛已完成，当前暂列小组第四" : "当前暂列小组第四，仍取决于剩余比赛",
    notes
  };
}

export function buildGroupStandings(matches: EnrichedMatch[], teams: Team[]): GroupStandingTable[] {
  return groups.map((group) => {
    const groupTeams = teams
      .filter((team) => team.group === group)
      .sort((a, b) => a.shortName.localeCompare(b.shortName, "zh-CN"));
    const rowsByTeam = new Map(groupTeams.map((team) => [team.id, blankRow(team)]));
    const groupMatches = matches.filter((match) => match.fixture.stage === "小组赛" && match.fixture.group === group);
    const finishedMatches = groupMatches.filter((match) => match.status === "finished" && hasScore(match));

    for (const match of finishedMatches) {
      const home = rowsByTeam.get(match.home.id);
      const away = rowsByTeam.get(match.away.id);
      if (!home || !away || match.result.homeScore === undefined || match.result.awayScore === undefined) continue;
      applyResult(home, match.result.homeScore, match.result.awayScore);
      applyResult(away, match.result.awayScore, match.result.homeScore);
    }

    const sortedRows = sortRows([...rowsByTeam.values()]).map((row, index) => ({
      ...row,
      rank: index + 1
    }));
    const hasTie = hasSimplifiedTie(sortedRows);
    const isComplete = groupMatches.length === 6 && finishedMatches.length === 6;
    const rows = sortedRows.map((row) => {
      const status = qualification(row, isComplete);
      return {
        ...row,
        ...status,
        notes: [
          ...status.notes,
          ...(hasTie ? ["同分排序为简化规则，非官方最终排名。"] : [])
        ]
      };
    });

    return {
      group,
      rows,
      finishedMatches: finishedMatches.length,
      totalMatches: groupMatches.length,
      remainingMatches: groupMatches.length - finishedMatches.length,
      isComplete,
      notes: [
        GROUP_STANDING_RULE_NOTE,
        QUALIFICATION_RULE_NOTE,
        isComplete ? "当前排名已确定/小组赛已结束。" : "仍需后续比赛确认。"
      ]
    };
  });
}

export function getGroupStandingTable(tables: GroupStandingTable[], group: string) {
  return tables.find((table) => table.group === group);
}

export function getGroupStandings(matches: EnrichedMatch[], teams: Team[], group: string) {
  return getGroupStandingTable(buildGroupStandings(matches, teams), group);
}

export function getTeamStandingRow(tables: GroupStandingTable[], teamId: string) {
  for (const table of tables) {
    const row = table.rows.find((item) => item.teamId === teamId);
    if (row) return row;
  }
  return undefined;
}

export function getTeamStandingTable(tables: GroupStandingTable[], teamId: string) {
  return tables.find((table) => table.rows.some((item) => item.teamId === teamId));
}

export function getTeamRemainingMatches(matches: EnrichedMatch[], teamId: string) {
  return matches
    .filter((match) => match.home.id === teamId || match.away.id === teamId)
    .filter((match) => match.status !== "finished")
    .sort((a, b) => new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime());
}

export function getTeamFinishedMatches(matches: EnrichedMatch[], teamId: string) {
  return matches
    .filter((match) => match.home.id === teamId || match.away.id === teamId)
    .filter((match) => match.status === "finished")
    .sort((a, b) => new Date(a.fixture.kickoff).getTime() - new Date(b.fixture.kickoff).getTime());
}

export function resultImpactText(match: EnrichedMatch) {
  if (match.status === "finished" && match.result.homeScore !== undefined && match.result.awayScore !== undefined) {
    if (match.result.homeScore > match.result.awayScore) {
      return `本场赛果已计入 ${match.fixture.group} 组积分榜。${match.home.shortName}获得 3 分，${match.away.shortName}获得 0 分。`;
    }
    if (match.result.homeScore < match.result.awayScore) {
      return `本场赛果已计入 ${match.fixture.group} 组积分榜。${match.away.shortName}获得 3 分，${match.home.shortName}获得 0 分。`;
    }
    return `本场赛果已计入 ${match.fixture.group} 组积分榜。${match.home.shortName}获得 1 分，${match.away.shortName}获得 1 分。`;
  }

  return `赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。`;
}
