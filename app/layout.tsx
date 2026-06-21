import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://world-cup-match-intelligence-center.vercel.app"),
  title: {
    default: "世界杯比赛智能分析中心",
    template: "%s | 世界杯比赛智能分析中心"
  },
  description: "整合世界杯赛程、赛果、积分榜与本地模型预测的比赛分析中心。",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "世界杯比赛智能分析中心",
    title: "世界杯比赛智能分析中心",
    description: "赛程、赛果、积分榜与本地模型预测。"
  },
  twitter: {
    card: "summary",
    title: "世界杯比赛智能分析中心",
    description: "赛程、赛果、积分榜与本地模型预测。"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <span className="brandMark">WC</span>
            <span>
              <strong>World Cup Match Intelligence Center</strong>
              <small>权威来源整理 · 本地模型预测 · 无 API Key</small>
            </span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
