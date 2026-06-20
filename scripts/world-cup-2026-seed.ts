import type { MatchStatus } from "../lib/types";

export interface TeamSeed {
  id: string;
  name: string;
  shortName: string;
  fifaCode: string;
  group: string;
  region: string;
  fifaRank: number;
  rankingPoints: number;
}

export interface FixtureSeed {
  id?: string;
  group: string;
  stage: string;
  kickoff: string;
  venue: string;
  city: string;
  country: string;
  homeTeamId: string;
  awayTeamId: string;
  status: MatchStatus;
  result?: [number, number];
  heatIndex?: number;
}

type TeamSeedRow = [string, string, string, string, string, string, number, number];
type FixtureSeedRow = [string, string, string, string, string, string, string, string, MatchStatus, [number, number] | undefined, number];

const teamRows: TeamSeedRow[] = [
  ["mexico", "墨西哥", "墨西哥", "MEX", "A", "CONCACAF", 13, 1681],
  ["south-africa", "南非", "南非", "RSA", "A", "CAF", 56, 1420],
  ["south-korea", "韩国", "韩国", "KOR", "A", "AFC", 23, 1585],
  ["czechia", "捷克", "捷克", "CZE", "A", "UEFA", 39, 1498],
  ["canada", "加拿大", "加拿大", "CAN", "B", "CONCACAF", 32, 1522],
  ["bosnia", "波黑", "波黑", "BIH", "B", "UEFA", 48, 1453],
  ["switzerland", "瑞士", "瑞士", "SUI", "B", "UEFA", 19, 1613],
  ["qatar", "卡塔尔", "卡塔尔", "QAT", "B", "AFC", 53, 1434],
  ["brazil", "Brazil", "Brazil", "BRA", "C", "CONMEBOL", 5, 1789],
  ["morocco", "Morocco", "Morocco", "MAR", "C", "CAF", 11, 1704],
  ["scotland", "Scotland", "Scotland", "SCO", "C", "UEFA", 34, 1518],
  ["haiti", "Haiti", "Haiti", "HAI", "C", "CONCACAF", 83, 1302],
  ["united-states", "美国", "美国", "USA", "D", "CONCACAF", 17, 1632],
  ["paraguay", "巴拉圭", "巴拉圭", "PAR", "D", "CONMEBOL", 44, 1472],
  ["australia", "Australia", "Australia", "AUS", "D", "AFC", 25, 1544],
  ["turkiye", "Turkiye", "Turkiye", "TUR", "D", "UEFA", 27, 1538],
  ["germany", "Germany", "Germany", "GER", "E", "UEFA", 9, 1728],
  ["curacao", "Curacao", "Curacao", "CUW", "E", "CONCACAF", 86, 1289],
  ["ivory-coast", "Ivory Coast", "Ivory Coast", "CIV", "E", "CAF", 41, 1488],
  ["ecuador", "Ecuador", "Ecuador", "ECU", "E", "CONMEBOL", 24, 1552],
  ["netherlands", "Netherlands", "Netherlands", "NED", "F", "UEFA", 7, 1761],
  ["japan", "Japan", "Japan", "JPN", "F", "AFC", 18, 1628],
  ["sweden", "Sweden", "Sweden", "SWE", "F", "UEFA", 29, 1531],
  ["tunisia", "Tunisia", "Tunisia", "TUN", "F", "CAF", 46, 1466],
  ["belgium", "Belgium", "Belgium", "BEL", "G", "UEFA", 8, 1734],
  ["egypt", "Egypt", "Egypt", "EGY", "G", "CAF", 31, 1525],
  ["iran", "Iran", "Iran", "IRN", "G", "AFC", 21, 1604],
  ["new-zealand", "New Zealand", "New Zealand", "NZL", "G", "OFC", 89, 1268],
  ["spain", "Spain", "Spain", "ESP", "H", "UEFA", 2, 1857],
  ["cabo-verde", "Cabo Verde", "Cabo Verde", "CPV", "H", "CAF", 65, 1384],
  ["saudi-arabia", "Saudi Arabia", "Saudi Arabia", "KSA", "H", "AFC", 58, 1412],
  ["uruguay", "Uruguay", "Uruguay", "URU", "H", "CONMEBOL", 15, 1668],
  ["france", "France", "France", "FRA", "I", "UEFA", 3, 1842],
  ["senegal", "Senegal", "Senegal", "SEN", "I", "CAF", 20, 1610],
  ["norway", "Norway", "Norway", "NOR", "I", "UEFA", 28, 1535],
  ["iraq", "Iraq", "Iraq", "IRQ", "I", "AFC", 59, 1408],
  ["argentina", "Argentina", "Argentina", "ARG", "J", "CONMEBOL", 1, 1885],
  ["algeria", "Algeria", "Algeria", "ALG", "J", "CAF", 38, 1504],
  ["austria", "Austria", "Austria", "AUT", "J", "UEFA", 22, 1596],
  ["jordan", "Jordan", "Jordan", "JOR", "J", "AFC", 64, 1388],
  ["portugal", "Portugal", "Portugal", "POR", "K", "UEFA", 6, 1777],
  ["dr-congo", "DR Congo", "DR Congo", "COD", "K", "CAF", 60, 1401],
  ["colombia", "哥伦比亚", "哥伦比亚", "COL", "K", "CONMEBOL", 14, 1678],
  ["uzbekistan", "乌兹别克斯坦", "乌兹别克", "UZB", "K", "AFC", 58, 1412],
  ["england", "英格兰", "英格兰", "ENG", "L", "UEFA", 4, 1826],
  ["croatia", "克罗地亚", "克罗地亚", "CRO", "L", "UEFA", 12, 1697],
  ["ghana", "加纳", "加纳", "GHA", "L", "CAF", 74, 1347],
  ["panama", "巴拿马", "巴拿马", "PAN", "L", "CONCACAF", 43, 1478]
];

export const teamSeeds: TeamSeed[] = teamRows.map(([id, name, shortName, fifaCode, group, region, fifaRank, rankingPoints]) => ({
  id,
  name,
  shortName,
  fifaCode,
  group,
  region,
  fifaRank,
  rankingPoints
}));

const fixtureRows: FixtureSeedRow[] = [
  ["match-001", "A", "2026-06-11T19:00:00-06:00", "Mexico City Stadium", "Mexico City", "Mexico", "mexico", "south-africa", "finished", [2, 0], 94],
  ["match-004", "A", "2026-06-11T22:00:00-04:00", "Guadalajara Stadium", "Guadalajara", "Mexico", "south-korea", "czechia", "finished", [2, 1], 78],
  ["match-002", "B", "2026-06-12T16:00:00-04:00", "Toronto Stadium", "Toronto", "Canada", "canada", "bosnia", "finished", [1, 1], 80],
  ["match-003", "D", "2026-06-12T18:00:00-07:00", "Los Angeles Stadium", "Los Angeles", "United States", "united-states", "paraguay", "finished", [4, 1], 91],
  ["match-012", "B", "2026-06-13T13:00:00-04:00", "San Francisco Bay Area Stadium", "San Francisco Bay Area", "United States", "switzerland", "qatar", "finished", [1, 1], 76],
  ["match-013", "C", "2026-06-13T16:00:00-04:00", "Miami Stadium", "Miami", "United States", "brazil", "morocco", "finished", [1, 1], 90],
  ["match-014", "C", "2026-06-13T19:00:00-04:00", "Boston Stadium", "Boston", "United States", "scotland", "haiti", "finished", [1, 0], 70],
  ["match-015", "D", "2026-06-14T13:00:00-04:00", "Kansas City Stadium", "Kansas City", "United States", "australia", "turkiye", "finished", [2, 0], 75],
  ["match-016", "E", "2026-06-14T16:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "germany", "curacao", "finished", [7, 1], 86],
  ["match-017", "F", "2026-06-14T19:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "netherlands", "japan", "finished", [2, 2], 84],
  ["match-018", "E", "2026-06-14T21:00:00-04:00", "Philadelphia Stadium", "Philadelphia", "United States", "ivory-coast", "ecuador", "finished", [1, 0], 72],
  ["match-019", "F", "2026-06-14T23:00:00-04:00", "Seattle Stadium", "Seattle", "United States", "sweden", "tunisia", "finished", [5, 1], 73],
  ["match-020", "H", "2026-06-15T12:00:00-04:00", "Atlanta Stadium", "Atlanta", "United States", "spain", "cabo-verde", "finished", [0, 0], 79],
  ["match-021", "G", "2026-06-15T15:00:00-04:00", "Houston Stadium", "Houston", "United States", "belgium", "egypt", "finished", [1, 1], 82],
  ["match-022", "H", "2026-06-15T18:00:00-04:00", "Miami Stadium", "Miami", "United States", "saudi-arabia", "uruguay", "finished", [1, 1], 77],
  ["match-023", "G", "2026-06-15T21:00:00-04:00", "Toronto Stadium", "Toronto", "Canada", "iran", "new-zealand", "finished", [2, 2], 68],
  ["match-024", "I", "2026-06-16T13:00:00-04:00", "Boston Stadium", "Boston", "United States", "france", "senegal", "finished", [3, 1], 88],
  ["match-025", "I", "2026-06-16T17:00:00-04:00", "Vancouver Stadium", "Vancouver", "Canada", "norway", "iraq", "finished", [4, 1], 71],
  ["match-026", "J", "2026-06-16T20:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "argentina", "algeria", "finished", [3, 0], 95],
  ["match-027", "J", "2026-06-17T13:00:00-04:00", "Seattle Stadium", "Seattle", "United States", "austria", "jordan", "finished", [3, 1], 70],
  ["match-028", "K", "2026-06-17T16:00:00-04:00", "Miami Stadium", "Miami", "United States", "portugal", "dr-congo", "finished", [1, 1], 89],
  ["match-005", "L", "2026-06-17T19:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "england", "croatia", "finished", [4, 2], 96],
  ["match-007", "L", "2026-06-17T13:00:00-05:00", "Kansas City Stadium", "Kansas City", "United States", "ghana", "panama", "finished", [1, 0], 74],
  ["match-006", "K", "2026-06-17T16:00:00-05:00", "Houston Stadium", "Houston", "United States", "colombia", "uzbekistan", "finished", [3, 1], 82],
  ["match-008", "A", "2026-06-18T15:00:00-06:00", "Atlanta Stadium", "Atlanta", "United States", "czechia", "south-africa", "finished", [1, 1], 70],
  ["match-009", "B", "2026-06-18T17:00:00-07:00", "Los Angeles Stadium", "Los Angeles", "United States", "switzerland", "bosnia", "finished", [4, 1], 76],
  ["match-010", "B", "2026-06-18T19:00:00-07:00", "BC Place Vancouver", "Vancouver", "Canada", "canada", "qatar", "finished", [6, 0], 88],
  ["match-011", "A", "2026-06-19T01:00:00Z", "Guadalajara Stadium", "Guadalajara", "Mexico", "mexico", "south-korea", "finished", [1, 0], 93],
  ["match-029", "D", "2026-06-19T15:00:00-04:00", "Seattle Stadium", "Seattle", "United States", "united-states", "australia", "scheduled", undefined, 91],
  ["match-030", "C", "2026-06-19T18:00:00-04:00", "Boston Stadium", "Boston", "United States", "scotland", "morocco", "scheduled", undefined, 78],
  ["match-031", "C", "2026-06-19T20:30:00-04:00", "Miami Stadium", "Miami", "United States", "brazil", "haiti", "scheduled", undefined, 87],
  ["match-032", "D", "2026-06-19T23:00:00-04:00", "Kansas City Stadium", "Kansas City", "United States", "turkiye", "paraguay", "scheduled", undefined, 73],
  ["match-033", "F", "2026-06-20T13:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "netherlands", "sweden", "scheduled", undefined, 84],
  ["match-034", "E", "2026-06-20T16:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "germany", "ivory-coast", "scheduled", undefined, 86],
  ["match-035", "E", "2026-06-20T20:00:00-04:00", "Philadelphia Stadium", "Philadelphia", "United States", "ecuador", "curacao", "scheduled", undefined, 70],
  ["match-036", "F", "2026-06-21T00:00:00-04:00", "Seattle Stadium", "Seattle", "United States", "tunisia", "japan", "scheduled", undefined, 71],
  ["match-037", "H", "2026-06-21T12:00:00-04:00", "Atlanta Stadium", "Atlanta", "United States", "spain", "saudi-arabia", "scheduled", undefined, 86],
  ["match-038", "G", "2026-06-21T15:00:00-04:00", "Toronto Stadium", "Toronto", "Canada", "belgium", "iran", "scheduled", undefined, 82],
  ["match-039", "H", "2026-06-21T18:00:00-04:00", "Miami Stadium", "Miami", "United States", "uruguay", "cabo-verde", "scheduled", undefined, 79],
  ["match-040", "G", "2026-06-21T21:00:00-04:00", "Houston Stadium", "Houston", "United States", "new-zealand", "egypt", "scheduled", undefined, 68],
  ["match-041", "J", "2026-06-22T13:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "argentina", "austria", "scheduled", undefined, 95],
  ["match-042", "I", "2026-06-22T17:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "france", "iraq", "scheduled", undefined, 88],
  ["match-043", "I", "2026-06-22T20:00:00-04:00", "Vancouver Stadium", "Vancouver", "Canada", "norway", "senegal", "scheduled", undefined, 74],
  ["match-044", "J", "2026-06-22T23:00:00-04:00", "San Francisco Bay Area Stadium", "San Francisco Bay Area", "United States", "jordan", "algeria", "scheduled", undefined, 69],
  ["match-045", "K", "2026-06-23T13:00:00-04:00", "Kansas City Stadium", "Kansas City", "United States", "portugal", "uzbekistan", "scheduled", undefined, 89],
  ["match-046", "L", "2026-06-23T16:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "england", "ghana", "scheduled", undefined, 96],
  ["match-047", "L", "2026-06-23T19:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "panama", "croatia", "scheduled", undefined, 78],
  ["match-048", "K", "2026-06-23T22:00:00-04:00", "Houston Stadium", "Houston", "United States", "colombia", "dr-congo", "scheduled", undefined, 82],
  ["match-049", "B", "2026-06-24T15:00:00-04:00", "Vancouver Stadium", "Vancouver", "Canada", "switzerland", "canada", "scheduled", undefined, 88],
  ["match-050", "B", "2026-06-24T15:00:00-04:00", "Toronto Stadium", "Toronto", "Canada", "bosnia", "qatar", "scheduled", undefined, 73],
  ["match-051", "C", "2026-06-24T18:00:00-04:00", "Miami Stadium", "Miami", "United States", "morocco", "haiti", "scheduled", undefined, 78],
  ["match-052", "C", "2026-06-24T18:00:00-04:00", "Boston Stadium", "Boston", "United States", "scotland", "brazil", "scheduled", undefined, 90],
  ["match-053", "A", "2026-06-24T21:00:00-04:00", "Mexico City Stadium", "Mexico City", "Mexico", "south-africa", "south-korea", "scheduled", undefined, 78],
  ["match-054", "A", "2026-06-24T21:00:00-04:00", "Guadalajara Stadium", "Guadalajara", "Mexico", "czechia", "mexico", "scheduled", undefined, 93],
  ["match-055", "E", "2026-06-25T16:00:00-04:00", "Philadelphia Stadium", "Philadelphia", "United States", "curacao", "ivory-coast", "scheduled", undefined, 70],
  ["match-056", "E", "2026-06-25T16:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "ecuador", "germany", "scheduled", undefined, 86],
  ["match-057", "F", "2026-06-25T19:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "tunisia", "netherlands", "scheduled", undefined, 84],
  ["match-058", "F", "2026-06-25T19:00:00-04:00", "Seattle Stadium", "Seattle", "United States", "japan", "sweden", "scheduled", undefined, 78],
  ["match-059", "D", "2026-06-25T22:00:00-04:00", "Los Angeles Stadium", "Los Angeles", "United States", "turkiye", "united-states", "scheduled", undefined, 91],
  ["match-060", "D", "2026-06-25T22:00:00-04:00", "Kansas City Stadium", "Kansas City", "United States", "paraguay", "australia", "scheduled", undefined, 75],
  ["match-061", "I", "2026-06-26T15:00:00-04:00", "Boston Stadium", "Boston", "United States", "norway", "france", "scheduled", undefined, 88],
  ["match-062", "I", "2026-06-26T15:00:00-04:00", "Vancouver Stadium", "Vancouver", "Canada", "senegal", "iraq", "scheduled", undefined, 74],
  ["match-063", "H", "2026-06-26T20:00:00-04:00", "Atlanta Stadium", "Atlanta", "United States", "cabo-verde", "saudi-arabia", "scheduled", undefined, 70],
  ["match-064", "H", "2026-06-26T20:00:00-04:00", "Miami Stadium", "Miami", "United States", "uruguay", "spain", "scheduled", undefined, 88],
  ["match-065", "G", "2026-06-26T23:00:00-04:00", "Toronto Stadium", "Toronto", "Canada", "new-zealand", "belgium", "scheduled", undefined, 82],
  ["match-066", "G", "2026-06-26T23:00:00-04:00", "Houston Stadium", "Houston", "United States", "egypt", "iran", "scheduled", undefined, 77],
  ["match-067", "L", "2026-06-27T17:00:00-04:00", "New York New Jersey Stadium", "New York/New Jersey", "United States", "panama", "england", "scheduled", undefined, 96],
  ["match-068", "L", "2026-06-27T17:00:00-04:00", "Kansas City Stadium", "Kansas City", "United States", "croatia", "ghana", "scheduled", undefined, 78],
  ["match-069", "K", "2026-06-27T19:30:00-04:00", "Miami Stadium", "Miami", "United States", "colombia", "portugal", "scheduled", undefined, 89],
  ["match-070", "K", "2026-06-27T19:30:00-04:00", "Atlanta Stadium", "Atlanta", "United States", "dr-congo", "uzbekistan", "scheduled", undefined, 74],
  ["match-071", "J", "2026-06-27T22:00:00-04:00", "Dallas Stadium", "Dallas", "United States", "algeria", "austria", "scheduled", undefined, 73],
  ["match-072", "J", "2026-06-27T22:00:00-04:00", "San Francisco Bay Area Stadium", "San Francisco Bay Area", "United States", "jordan", "argentina", "scheduled", undefined, 95]
];

export const fixtureSeeds: FixtureSeed[] = fixtureRows.map(([id, group, kickoff, venue, city, country, homeTeamId, awayTeamId, status, result, heatIndex]) => ({
  id,
  group,
  stage: "小组赛",
  kickoff,
  venue,
  city,
  country,
  homeTeamId,
  awayTeamId,
  status,
  result,
  heatIndex
})) as FixtureSeed[];
