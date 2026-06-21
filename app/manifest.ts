import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "世界杯比赛智能分析中心",
    short_name: "世界杯智析",
    description: "世界杯赛程、赛果、积分榜与本地模型预测。",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#1f7a8c",
    lang: "zh-CN"
  };
}
