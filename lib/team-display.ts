import type { Team } from "./types";

const TEAM_NAMES_ZH: Record<string, string> = {
  algeria: "阿尔及利亚", argentina: "阿根廷", austria: "奥地利", australia: "澳大利亚", belgium: "比利时", bosnia: "波黑", brazil: "巴西", "cabo-verde": "佛得角", canada: "加拿大", colombia: "哥伦比亚", croatia: "克罗地亚", curacao: "库拉索", czechia: "捷克", "dr-congo": "刚果（金）", ecuador: "厄瓜多尔", egypt: "埃及", england: "英格兰", france: "法国", germany: "德国", ghana: "加纳", haiti: "海地", iran: "伊朗", iraq: "伊拉克", "ivory-coast": "科特迪瓦", japan: "日本", jordan: "约旦", mexico: "墨西哥", morocco: "摩洛哥", netherlands: "荷兰", "new-zealand": "新西兰", norway: "挪威", panama: "巴拿马", paraguay: "巴拉圭", portugal: "葡萄牙", qatar: "卡塔尔", "saudi-arabia": "沙特阿拉伯", scotland: "苏格兰", senegal: "塞内加尔", "south-africa": "南非", "south-korea": "韩国", spain: "西班牙", sweden: "瑞典", switzerland: "瑞士", tunisia: "突尼斯", turkiye: "土耳其", uruguay: "乌拉圭", "united-states": "美国", uzbekistan: "乌兹别克斯坦"
};

export function teamNameZh(team: Team) {
  return team.nameZh || TEAM_NAMES_ZH[team.id] || team.name;
}

export function teamLabel(team: Team) {
  const name = teamNameZh(team);
  const trimmedName = name.trimEnd();

  if (trimmedName.endsWith(`（${team.fifaCode}）`) || trimmedName.endsWith(`(${team.fifaCode})`)) {
    return name;
  }

  return `${name}（${team.fifaCode}）`;
}
