import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup Match Intelligence Center",
  description: "世界杯比赛智能分析中心"
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
