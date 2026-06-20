# Agents

## Deployment Policy

- After any code or data change intended for delivery, run `npm run deploy:prod`.
- The deploy script runs all required checks (`npm run check:dates`, `npm run check:results`, `npm run check:rankings`, `npm run lint`, `npm test`, `npm run build`), deploys to Vercel production, smoke-checks the public site, and appends a deployment record below.
- The current local repository has no Git remote configured, so push-based automatic deployment cannot be verified from this workspace. Until a remote is added and connected to Vercel, use `npm run deploy:prod` as the required automatic deployment path for agent changes.
- Do not introduce API-key-only deployment steps; the project remains deployable through the existing Vercel link.

## Production Verification Policy

- Never claim production is fixed from local scripts, local build output, API output alone, or a preview/deployment URL alone. Final verification must use the production alias `https://world-cup-match-intelligence-center.vercel.app/`.
- After deployment, run `npx vercel inspect world-cup-match-intelligence-center.vercel.app` and confirm the alias points to the new production deployment ID. If the inspect output does not show `target production`, `Ready`, and the expected alias, do not report success.
- Fetch the production alias HTML directly with a cache-busting query string and inspect the response headers and body. The homepage must not rely on stale static HTML for match status. For status-sensitive homepage changes, verify headers are consistent with fresh dynamic rendering, such as `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`, `x-vercel-cache: MISS`, and no stale `x-nextjs-prerender` evidence.
- Production smoke checks must read the production alias HTML, not just `/api/matches`, not only a deployment URL, and not only local rendered output. Check the raw page text for both required strings and forbidden stale strings.
- For match status/result changes, production verification must cover homepage state sections and detail pages using the same status/result data. Required homepage checks include:
  - `进行中 / 比分待更新 0 场`
  - `已结束比赛 4 场`
  - `赛果待更新 0 场`
  - `实际比分 墨西哥 1-0 韩国`
  - `实际比分 加拿大 6-0 卡塔尔`
  - `实际比分 瑞士 4-1 波黑`
  - `实际比分 捷克 1-1 南非`
- The same homepage smoke check must explicitly forbid stale strings such as:
  - `进行中 / 比分待更新 2 场`
  - `墨西哥 vs 韩国 比分待更新`
  - `加拿大 vs 卡塔尔 比分待更新`
  - `已结束比赛 0 场`
  - `赛果待更新 2 场`
  - `捷克 vs 南非 赛果待抓取`
  - `瑞士 vs 波黑 赛果待抓取`
- For upset-risk ranking changes, production verification must read the production alias homepage and check the `全量样本冷门风险排行` section, including finished/result display for historical samples such as `英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚` and `加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马`.
- Keep `/` dynamic for status-sensitive match data (`export const dynamic = "force-dynamic"; export const revalidate = 0;`) unless a replacement cache invalidation strategy is implemented and production-verified against the main alias.
- When a user reports production mismatch, first trust the possibility of stale alias/static HTML and re-check the production alias raw HTML, headers, Vercel alias target, and page sections before answering.

## Deployment 2026-06-19T01:46:02.000Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-a4e9pxna5.vercel.app
- Deployment ID: dpl_9Uz1X8kMPQesDwWMu5yFn3gudBVQ
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/9Uz1X8kMPQesDwWMu5yFn3gudBVQ
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - `/`: HTTP 200, contains `模型表现`, `比赛样本`, `总进球偏差`, `平均总进球误差`
  - `/matches/match-001`: HTTP 200, contains `预测复盘`, `总进球偏差`, `净胜球偏差`, `模型判断依据`
  - `/api/matches`: HTTP 200, returns 8 fixtures and 4 predictions

## Deployment 2026-06-19T02:04:41.500Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ej850wr4w.vercel.app
- Deployment ID: dpl_5KmjxHwDBD33A8QfsSns9tso95C3
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/5KmjxHwDBD33A8QfsSns9tso95C3
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed

## Deployment 2026-06-19T02:06:57.409Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-2pxvj8qf3.vercel.app
- Deployment ID: dpl_8JRRcputKQhEpkMhhLrfeYWFdsjc
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/8JRRcputKQhEpkMhhLrfeYWFdsjc
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed

## Deployment 2026-06-19T02:22:09.591Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-exshi6b3z.vercel.app
- Deployment ID: dpl_6HfnZG7js7m9ti4F1xMuaNJLmR5Q
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/6HfnZG7js7m9ti4F1xMuaNJLmR5Q
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed

## Deployment 2026-06-19T02:23:48.315Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-5z7iu440e.vercel.app
- Deployment ID: dpl_83YkbnRfJszcFeV7FkYv5aiNtx9H
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/83YkbnRfJszcFeV7FkYv5aiNtx9H
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed

## Deployment 2026-06-19T02:36:26.234Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-bp5qxyz90.vercel.app
- Deployment ID: dpl_CAqHiDQ2diTrX6KmUirn2YaTRXG5
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/CAqHiDQ2diTrX6KmUirn2YaTRXG5
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed

## Deployment 2026-06-19T02:41:23.687Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-4y2cijgdg.vercel.app
- Deployment ID: dpl_FQbmyidXgNH46H4VWzAM7uJdwF2F
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/FQbmyidXgNH46H4VWzAM7uJdwF2F
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed

## Deployment 2026-06-19T02:43:03.747Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-b9lvtialx.vercel.app
- Deployment ID: dpl_8dWcBEmMGbLSkpSfzZ5dRLkrcFWs
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/8dWcBEmMGbLSkpSfzZ5dRLkrcFWs
- Verification: passed
- Commands: npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed

## Deployment 2026-06-19T02:48:12.249Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-gavtjq6lr.vercel.app
- Deployment ID: dpl_HibfshxDbbcfeuiAWNJPVESjU3QM
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/HibfshxDbbcfeuiAWNJPVESjU3QM
- Verification: passed
- Commands: npm run check:dates, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed

## Deployment 2026-06-19T02:52:16.585Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ndthils5y.vercel.app
- Deployment ID: dpl_CVxtNfpQo214sV7LaWsf7sRoZhch
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/CVxtNfpQo214sV7LaWsf7sRoZhch
- Verification: passed
- Commands: npm run check:dates, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed

## Deployment 2026-06-19T02:57:26.310Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ep5tpla67.vercel.app
- Deployment ID: dpl_5kpAgttYhUoCipShzgMGR8qkmJ6u
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/5kpAgttYhUoCipShzgMGR8qkmJ6u
- Verification: passed
- Commands: npm run check:dates, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed

## Deployment 2026-06-19T03:03:58.209Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-as3qzd89v.vercel.app
- Deployment ID: dpl_H3Zs1rzprMbEx9nijeMakWUHJ63z
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/H3Zs1rzprMbEx9nijeMakWUHJ63z
- Verification: passed
- Commands: npm run check:dates, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed

## Deployment 2026-06-19T03:13:29.107Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-5quqqjdlm.vercel.app
- Deployment ID: dpl_9Xi7Cy7PS5sA44zeAX7cXgCzNund
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/9Xi7Cy7PS5sA44zeAX7cXgCzNund
- Verification: passed
- Commands: npm run check:dates, npm run check:results, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed

## Deployment 2026-06-19T03:17:33.106Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-bfo4yzuuy.vercel.app
- Deployment ID: dpl_82AycMdZHs6smsLWY6rqXTiQb4F8
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/82AycMdZHs6smsLWY6rqXTiQb4F8
- Verification: passed
- Commands: npm run check:dates, npm run check:results, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed

## Deployment 2026-06-19T03:48:35.715Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-o79nfqydc.vercel.app
- Deployment ID: dpl_J6KF7ES3rvr8LEn8GLzuQiwkbgco
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/J6KF7ES3rvr8LEn8GLzuQiwkbgco
- Verification: passed
- Commands: npm run check:dates, npm run check:results, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed

## Deployment 2026-06-19T04:06:36.431Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-jass4l613.vercel.app
- Deployment ID: dpl_BnP3fuHe2wyH81XtiqSsWFE2bfYU
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/BnP3fuHe2wyH81XtiqSsWFE2bfYU
- Verification: passed
- Commands: npm run check:dates, npm run check:results, npm run check:rankings, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed

## Deployment 2026-06-19T07:29:12.247Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-erz5g6eqv.vercel.app
- Deployment ID: dpl_Aoj46shpHKDQ26AxZ6neRMKirJof
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Aoj46shpHKDQ26AxZ6neRMKirJof
- Verification: passed
- Commands: npm run check:dates, npm run check:results, npm run check:rankings, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 韩国 vs 捷克 已结束 · 实际比分 韩国 2-1 捷克 · 冷门风险 61 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 捷克 vs 南非 已结束 · 实际比分 捷克 1-1 南非 · 冷门风险 59 墨西哥 vs 韩国 已结束 · 实际比分 墨西哥 1-0 韩国 · 冷门风险 59 

## Deployment 2026-06-19T07:50:01.129Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-rhhzz1fkb.vercel.app
- Deployment ID: dpl_9CVAVc6K3NduBbwHtmhz612of8Pb
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/9CVAVc6K3NduBbwHtmhz612of8Pb
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 

## Deployment 2026-06-19T07:53:24.985Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-h3jt6x8ci.vercel.app
- Deployment ID: dpl_BfspW47cMEEQD46by6zK2Tk7Rk9u
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/BfspW47cMEEQD46by6zK2Tk7Rk9u
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 

## Deployment 2026-06-19T08:00:02.037Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-de2q2o016.vercel.app
- Deployment ID: dpl_Cr3pKqv3AoCerk5q3pggG9z4Wwqo
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Cr3pKqv3AoCerk5q3pggG9z4Wwqo
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 

## Deployment 2026-06-19T08:34:58.022Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ovboz3mn6.vercel.app
- Deployment ID: dpl_GxqSngFptTYXG5MNBjqfBs5R4PBp
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/GxqSngFptTYXG5MNBjqfBs5R4PBp
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于演示模型口径；不是官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T08:54:30.544Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-8u0t4bcff.vercel.app
- Deployment ID: dpl_3QUCbvc6W6ob6Em1RH8BnbgsaYDq
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/3QUCbvc6W6ob6Em1RH8BnbgsaYDq
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, forbidden 球队雷达图
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于演示模型口径；不是官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T08:56:14.506Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-jjfm1pwlu.vercel.app
- Deployment ID: dpl_7PPjszqxskaq2PCxxW3RBJPjaCxw
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/7PPjszqxskaq2PCxxW3RBJPjaCxw
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#chart-disclaimers: HTTP 200, missing 属于演示模型口径
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T08:57:47.583Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-d85p3qbi7.vercel.app
- Deployment ID: dpl_E81S35xTZDjWTZixVnjK4RG8M4wk
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/E81S35xTZDjWTZixVnjK4RG8M4wk
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T09:03:52.058Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-7if1kxlrm.vercel.app
- Deployment ID: dpl_FuLRTJCx4SJofYwsELAPo5v1RZvp
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/FuLRTJCx4SJofYwsELAPo5v1RZvp
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T09:11:23.372Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-b58wo056f.vercel.app
- Deployment ID: dpl_41Kj14sYtZPjwAECcsP9Y7LbixcV
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/41Kj14sYtZPjwAECcsP9Y7LbixcV
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::wzv7g-1781860275510-db5db9ff76ea, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::khhq6-1781860276548-2cad0aae5128, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T09:21:28.318Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-rn9qppuby.vercel.app
- Deployment ID: dpl_CtxEZ9jrgcRRLBX8tNsgUe8gTgLF
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/CtxEZ9jrgcRRLBX8tNsgUe8gTgLF
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::dzjz6-1781860878587-968822363fbe, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::74gpx-1781860879510-6aceab88d877, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::zml27-1781860884902-ae3dcd300d59 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::kxn5x-1781860885721-d2356ca1ab94 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::spnpg-1781860886144-edc1d6660d1c | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::zlcsf-1781860886611-417d1bcdab2e | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::74gpx-1781860887019-40468c197b34 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T11:06:19.851Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-6ae378wst.vercel.app
- Deployment ID: dpl_Ej1LdS5C9o25NttEdf1uEJm9PeiW
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Ej1LdS5C9o25NttEdf1uEJm9PeiW
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, missing 墨西哥 vs 韩国 北京时间 06/19 09:00, 加拿大 vs 卡塔尔 北京时间 06/19 10:00, 瑞士 vs 波黑 北京时间 06/19 08:00, 捷克 vs 南非 北京时间 06/19 05:00
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::s6rmv-1781867171697-c7b99e9087bd, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::5h5qn-1781867172533-019ecbd0fec1, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781867176876-14bc67ebece7 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781867177547-1e68586c0688 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781867177906-958f558e3389 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781867178292-c5a484449f86 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::vj25r-1781867178738-c0a8dabe5dbf | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T11:07:47.713Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-o90g0m18p.vercel.app
- Deployment ID: dpl_2LkThtqoXyhoR98haTmqnQY5RyCL
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/2LkThtqoXyhoR98haTmqnQY5RyCL
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::zzgjl-1781867259938-626651032111, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::zhlg5-1781867260566-4996fee1d32b, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::vj25r-1781867264668-0af536fa111e | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9v559-1781867265537-6c1ba6fdeb6c | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::vj25r-1781867265929-4b50727ed5f3 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::vj25r-1781867266372-8be529f795d1 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781867266780-612916884405 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T11:14:28.424Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-a6gqmavnq.vercel.app
- Deployment ID: dpl_5apJzXhaJDAGdeXYMV9NoQWrd7rU
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/5apJzXhaJDAGdeXYMV9NoQWrd7rU
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::whzp4-1781867659205-a2616f567699, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::tvgqb-1781867659798-500025c0423c, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::hdxkc-1781867664322-75dc70a81361 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::hdxkc-1781867665084-47e8f25586e2 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::hdxkc-1781867665579-b2bafc4c3310 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::hdxkc-1781867666059-96466b1c42d0 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::hdxkc-1781867666467-3f6d3d0891c2 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T12:52:52.814Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-kr6hi6ig1.vercel.app
- Deployment ID: dpl_KpuLzHE4s4HDGEYveZMx2JTVewrT
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/KpuLzHE4s4HDGEYveZMx2JTVewrT
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 2 2 0 0 3 ｜ 0 ｜ +3 ｜ 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 2 1 0 1 2 ｜ 2 ｜ 0 ｜ 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 2 0 1 1 2 ｜ 3 ｜ -1 ｜ 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 2 0 1 1 1 ｜ 3 ｜ -2 ｜ 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 2 2 0 0 3 ｜ 0 ｜ +3 ｜ 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 2 1 0 1 2 ｜ 2 ｜ 0 ｜ 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 2 0 1 1 2 ｜ 3 ｜ -1 ｜ 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 2 0 1 1 1 ｜ 3 ｜ -2 ｜ 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::r7rdj-1781873563954-d1e9fb3403db, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::lcn2d-1781873564578-9c18038e67ce, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xvt7p-1781873568971-7b027262d716 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::w28xf-1781873569637-1314b307739a | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781873569978-3d6a6ed33f52 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781873570365-be1ec4220296 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9v559-1781873570780-d3ad0129d8fd | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T12:58:27.502Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-fttjneas1.vercel.app
- Deployment ID: dpl_9KvyhanF9u4VAMFzLKiWJa7AP5CH
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/9KvyhanF9u4VAMFzLKiWJa7AP5CH
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::hmrjx-1781873898701-6ac449678d93, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::g2nzw-1781873899303-4c36f3050a3a, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781873903704-eaa352081b70 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781873904410-0ed39ca4e560 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781873904816-212029906218 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781873905205-73d3fe498162 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::srscn-1781873905587-bfeacbd05607 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#ui-readability: HTTP 200, forbidden 3-1, 3-2
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:00:25.787Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-776hvvol4.vercel.app
- Deployment ID: dpl_6rNKZBCmfWsX9VpvJYktU4CD3fXN
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/6rNKZBCmfWsX9VpvJYktU4CD3fXN
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::xc2jj-1781874017285-e3ed76f3d991, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::9h2sj-1781874017874-b53cc75f9517, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::st4sf-1781874022121-8a1f11ebc317 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xc2jj-1781874022802-5c908de752cb | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781874023178-0e106a7164f0 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2-1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 73
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::st4sf-1781874023583-a1d62311e618 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2-1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡塔尔
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781874023944-e44f58fae28a | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1-1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾向。
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:06:43.478Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-fi2v0yluw.vercel.app
- Deployment ID: dpl_4ezVBE1JuT8SfRqd4fv3d9tciiU9
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/4ezVBE1JuT8SfRqd4fv3d9tciiU9
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 ：进球 3 ｜失球 0 ｜净胜球 +3 ｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 ：进球 2 ｜失球 2 ｜净胜球 0 ｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 ：进球 2 ｜失球 3 ｜净胜球 -1 ｜积分 1 当前处于第三名竞争区 4 南非 ：进球 1 ｜失球 3 ｜净胜球 -2 ｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::5pkr9-1781874394314-43522ee71fad, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::r7rdj-1781874395099-3da41c29cb91, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9h2sj-1781874399652-4c01b104086c | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9h2sj-1781874400395-de9761ed4c84 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9h2sj-1781874400759-674d150bdf38 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nsp48-1781874401188-14c41c959c15 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nsp48-1781874401601-ab0cd0a2771d | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:15:27.464Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ollu6v2zt.vercel.app
- Deployment ID: dpl_Gm8CWZv4LjD9kQhFLHiFqS7fqLTG
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Gm8CWZv4LjD9kQhFLHiFqS7fqLTG
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::qzllr-1781874916688-8c67e813932e, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::vxrbh-1781874917493-8c53efcf5f62, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::z7ktm-1781874922468-323b45f7014d | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::5fgmx-1781874923793-4d643659c9b9 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9pgp2-1781874924265-0b7563f5fb6a | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::wfk86-1781874924723-1fffab30a783 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::b6jst-1781874925134-ed8dce359f2f | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:22:42.379Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-ne9dsbvvu.vercel.app
- Deployment ID: dpl_2xAMBD9wWNRZseYNEZz9VkJ2ps2L
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/2xAMBD9wWNRZseYNEZz9VkJ2ps2L
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::s6rmv-1781875353590-cc0763e5fc02, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::tvgqb-1781875354531-2f312cebe5ed, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::7sh66-1781875358730-340a913cf466 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::7sh66-1781875359642-466a75a47aa6 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xphh5-1781875360003-4e692de97286 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::7sh66-1781875360437-7507b3f93b29 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::7sh66-1781875360817-2ca70e35ac34 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xphh5-1781875361219-60336e4b9beb | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:28:40.343Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-1dre08npu.vercel.app
- Deployment ID: dpl_BdoAu2vS122kfUZKvWwC36AECWKQ
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/BdoAu2vS122kfUZKvWwC36AECWKQ
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::wfk86-1781875712353-431abb9e41f0, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::dnpqd-1781875712962-b05af9511c60, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dnpqd-1781875716961-ba7def0b7926 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dnpqd-1781875717738-bbd98668a705 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dnpqd-1781875718089-8b6ddd8f7a60 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dnpqd-1781875718477-e3b2d91fe6a7 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::zzgjl-1781875718875-922dee636f96 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::wfk86-1781875719268-748c4de55fed | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 United States vs Australia 2026-06-20 06/20 03:00 · 未开始 Brazil vs Haiti 2026-06-20 06/20 08:30 · 未开始 England vs Ghana 2026-06-24 06/24 04:00 · 未开始 进行中 / 比分待更新 0 场 暂无进行中比赛。若开赛后比分未更新， | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:37:10.228Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-kovr0oem0.vercel.app
- Deployment ID: dpl_8swFbVECR388cYK7KvSY8meYGn7B
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/8swFbVECR388cYK7KvSY8meYGn7B
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 Turkiye vs 美国 未开始 · 冷门风险 74 Cabo Verde vs Saudi Arabia 未开始 · 冷门风险 74 Norway vs Senegal 未开始 · 冷门风险 72 DR Congo vs 乌兹别克 未开始 · 冷门风险 72 Australia vs Turkiye 已结束 · 实际比分 Australia 2-0 Turkiye · 冷门风险 71 英格兰 vs 克罗地亚 已结束 · 实际比分 英格兰 4-2 克罗地亚 · 冷门风险 60 加纳 vs 巴拿马 已结束 · 实际比分 加纳 1-0 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::hdxkc-1781876221638-89c5217875a4, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::5pkr9-1781876222213-00eb208d75c0, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781876226661-9e1d52aab3a5 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::rwt2q-1781876227413-dc5307989be5 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::rwt2q-1781876227894-253f95680f70 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781876228303-a5f7920d771a | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::s6rmv-1781876228663-03a630e67ff3 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9v559-1781876229043-6613686c6a50 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 墨西哥 (MEX) 南非 (RSA) 韩国 (KOR) 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 墨西哥 MEX 南非 RSA 韩国 KOR 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/ | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 2026 官方赛程 官方赛程、场馆、分组和比赛时间。 official · 2026/6/19 08:53:53 FIFA/Coca-Cola 男足世界排名 F
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 英格兰-克罗地亚 96 英格兰-加纳 96 巴拿马-英格兰 96 Argentina-Algeria 95 Argentina-Austria 95 Jordan-Argentina 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 美国 78 / Australia 84 防守 美国 75 / Australia 82 中场 美国 77 / Australia 83 状态 美国 80 / Australia 86 节奏 美国 83 / Australia 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 Brazil 88 Morocco 88 Germany 88 Netherlands 88 Japan 88 Belgium 88 Spain 88 Uruguay 88 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 墨西哥 92% 韩国 92% 瑞士 92% Brazil 92% Morocco 92% 美国 92% Australia 92% Turkiye 92% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:42:35.983Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-inpkekq1v.vercel.app
- Deployment ID: dpl_8krxWd1rA2dhmFJtVbB4BHXJk8TU
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/8krxWd1rA2dhmFJtVbB4BHXJk8TU
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, missing 最受关注 墨西哥 vs 韩国, 最大冷门风险 捷克 vs 南非
  - /#status-sections: HTTP 200, missing 墨西哥 vs 韩国 北京时间 06/19 09:00, 实际比分 墨西哥 1-0 韩国, 加拿大 vs 卡塔尔 北京时间 06/19 10:00, 实际比分 加拿大 6-0 卡塔尔, 瑞士 vs 波黑 北京时间 06/19 08:00, 实际比分 瑞士 4-1 波黑, 捷克 vs 南非 北京时间 06/19 05:00, 实际比分 捷克 1-1 南非
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 🇹🇷 土耳其 vs 🇺🇸 美国 未开始 · 冷门风险 74 🇨🇻 佛得角 vs 🇸🇦 沙特阿拉伯 未开始 · 冷门风险 74 🇳🇴 挪威 vs 🇸🇳 塞内加尔 未开始 · 冷门风险 72 🇨🇩 刚果（金） vs 🇺🇿 乌兹别克 未开始 · 冷门风险 72 🇦🇺 澳大利亚 vs 🇹🇷 土耳其 已结束 · 实际比分 🇦🇺 澳大利亚 2-0 🇹🇷 土耳其 · 冷门风险 71 🏴 英格兰 vs 🇭🇷 克罗地亚 已结束 · 实际比分 🏴 英格兰 4-2 🇭🇷 克罗地亚 · 冷门风险 60 🇬🇭 加纳 vs 🇵🇦 巴拿马 已结束 · 实际比分 🇬🇭 加纳 1-0 🇵🇦 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::67jg5-1781876544699-e32effbecdf4, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::rwt2q-1781876545682-2f86210ad54f, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::z7ktm-1781876551422-cefe6947634e | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::z7ktm-1781876552209-185ede01db99 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::whzp4-1781876552753-0e9dc0352638 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xphh5-1781876553233-27e8eac8a062 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xphh5-1781876553793-de12207f1c69 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xphh5-1781876554316-7e896b3f7543 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 98 🇨🇦 加拿大 98 🇦🇺 澳大利亚 98 🇩🇪 德国 98 🇸🇪 瑞典 98 🇫🇷 法国 98 🇳🇴 挪威 98 🇦🇷 阿根廷 98 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇲🇽 墨西哥 96% 🇨🇦 加拿大 96% 🇨🇭 瑞士 96% 🏴 苏格兰 96% 🇺🇸 美国 96% 🇦🇺 澳大利亚 96% 🇩🇪 德国 96% 🇸🇪 瑞典 96% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 20
  - /#chart-disclaimers: HTTP 200, forbidden 出线概率全部为 96%
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 98 🇨🇦 加拿大 98 🇦🇺 澳大利亚 98 🇩🇪 德国 98 🇸🇪 瑞典 98 🇫🇷 法国 98 🇳🇴 挪威 98 🇦🇷 阿根廷 98 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇲🇽 墨西哥 96% 🇨🇦 加拿大 96% 🇨🇭 瑞士 96% 🏴 苏格兰 96% 🇺🇸 美国 96% 🇦🇺 澳大利亚 96% 🇩🇪 德国 96% 🇸🇪 瑞典 96% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:44:55.207Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-in59n69wa.vercel.app
- Deployment ID: dpl_CMavyn4Do3H85GofeedXqDPP7qt5
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/CMavyn4Do3H85GofeedXqDPP7qt5
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 🇹🇷 土耳其 vs 🇺🇸 美国 未开始 · 冷门风险 74 🇨🇻 佛得角 vs 🇸🇦 沙特阿拉伯 未开始 · 冷门风险 74 🇳🇴 挪威 vs 🇸🇳 塞内加尔 未开始 · 冷门风险 72 🇨🇩 刚果（金） vs 🇺🇿 乌兹别克 未开始 · 冷门风险 72 🇦🇺 澳大利亚 vs 🇹🇷 土耳其 已结束 · 实际比分 🇦🇺 澳大利亚 2-0 🇹🇷 土耳其 · 冷门风险 71 🏴 英格兰 vs 🇭🇷 克罗地亚 已结束 · 实际比分 🏴 英格兰 4-2 🇭🇷 克罗地亚 · 冷门风险 60 🇬🇭 加纳 vs 🇵🇦 巴拿马 已结束 · 实际比分 🇬🇭 加纳 1-0 🇵🇦 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::z7ktm-1781876683799-fb6059efea33, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::r7rdj-1781876684589-974274fd84df, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nsp48-1781876690056-4762eadc083a | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::67jg5-1781876691028-3c3aaa50d686 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::9pgp2-1781876691416-7620368bc51f | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::w28xf-1781876691850-5807a033308e | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::flgff-1781876692268-575dd2751cd8 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gfsph-1781876692716-ecd6fabf0cfb | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:49:30.385Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-iecsj6tzo.vercel.app
- Deployment ID: dpl_HgvqLnPEmKyR8xFZU9pFdLfPdRdE
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/HgvqLnPEmKyR8xFZU9pFdLfPdRdE
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 🇹🇷 土耳其 vs 🇺🇸 美国 未开始 · 冷门风险 74 🇨🇻 佛得角 vs 🇸🇦 沙特阿拉伯 未开始 · 冷门风险 74 🇳🇴 挪威 vs 🇸🇳 塞内加尔 未开始 · 冷门风险 72 🇨🇩 刚果（金） vs 🇺🇿 乌兹别克 未开始 · 冷门风险 72 🇦🇺 澳大利亚 vs 🇹🇷 土耳其 已结束 · 实际比分 🇦🇺 澳大利亚 2-0 🇹🇷 土耳其 · 冷门风险 71 🏴 英格兰 vs 🇭🇷 克罗地亚 已结束 · 实际比分 🏴 英格兰 4-2 🇭🇷 克罗地亚 · 冷门风险 60 🇬🇭 加纳 vs 🇵🇦 巴拿马 已结束 · 实际比分 🇬🇭 加纳 1-0 🇵🇦 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::rlr99-1781876960109-5c3a3ecfccf8, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::7sh66-1781876960768-fc1b26d6ba35, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781876967036-54524c5256b8 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781876967750-c77a518059d9 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::b6jst-1781876968164-8e46aaba9438 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781876968675-38ea2257049b | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::rlr99-1781876969123-68feab5ea3e9 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::whzp4-1781876969612-aef74d987162 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:52:26.570Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-io7fl6uxo.vercel.app
- Deployment ID: dpl_FTA9r6keQAPArFYJGSX3yj2QR2FU
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/FTA9r6keQAPArFYJGSX3yj2QR2FU
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 🇹🇷 土耳其 vs 🇺🇸 美国 未开始 · 冷门风险 74 🇨🇻 佛得角 vs 🇸🇦 沙特阿拉伯 未开始 · 冷门风险 74 🇳🇴 挪威 vs 🇸🇳 塞内加尔 未开始 · 冷门风险 72 🇨🇩 刚果（金） vs 🇺🇿 乌兹别克 未开始 · 冷门风险 72 🇦🇺 澳大利亚 vs 🇹🇷 土耳其 已结束 · 实际比分 🇦🇺 澳大利亚 2-0 🇹🇷 土耳其 · 冷门风险 71 🏴 英格兰 vs 🇭🇷 克罗地亚 已结束 · 实际比分 🏴 英格兰 4-2 🇭🇷 克罗地亚 · 冷门风险 60 🇬🇭 加纳 vs 🇵🇦 巴拿马 已结束 · 实际比分 🇬🇭 加纳 1-0 🇵🇦 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::67jg5-1781877138618-4e593f7d1a91, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::qzllr-1781877139261-ba858ba648df, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::xc2jj-1781877143150-bec078402f18 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781877143865-c1ba75969726 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::flgff-1781877144247-525303171c6b | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::flgff-1781877144665-8007647ba3da | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::flgff-1781877145048-4f84f04bba5a | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::vvq58-1781877145433-337c0e00a20a | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-19T13:54:51.352Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-lnyzd4ai8.vercel.app
- Deployment ID: dpl_Ez9GRriA5Z2rqgpp9bnr98BkgZJ6
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Ez9GRriA5Z2rqgpp9bnr98BkgZJ6
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · 未开始 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking: HTTP 200, passed
    - Production HTML snippet: 全量样本冷门风险排行 规则模型推断 · 全量样本 🇹🇷 土耳其 vs 🇺🇸 美国 未开始 · 冷门风险 74 🇨🇻 佛得角 vs 🇸🇦 沙特阿拉伯 未开始 · 冷门风险 74 🇳🇴 挪威 vs 🇸🇳 塞内加尔 未开始 · 冷门风险 72 🇨🇩 刚果（金） vs 🇺🇿 乌兹别克 未开始 · 冷门风险 72 🇦🇺 澳大利亚 vs 🇹🇷 土耳其 已结束 · 实际比分 🇦🇺 澳大利亚 2-0 🇹🇷 土耳其 · 冷门风险 71 🏴 英格兰 vs 🇭🇷 克罗地亚 已结束 · 实际比分 🏴 英格兰 4-2 🇭🇷 克罗地亚 · 冷门风险 60 🇬🇭 加纳 vs 🇵🇦 巴拿马 已结束 · 实际比分 🇬🇭 加纳 1-0 🇵🇦 巴拿马 · 冷门风险 62 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::xphh5-1781877282210-6b286a82d42a, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::whzp4-1781877282959-26b9d476e5b9, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781877287843-37bc95f38f87 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781877288627-2c771b2bfcc9 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dxmp2-1781877289255-8b02b0278c3f | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781877289655-1638e59a7dea | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::tvgqb-1781877290015-19d74db87dc7 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 预测比分 1-1 期望进球 1.3-1.4 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 未开始 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78 对 Australia 防守 82。 防守指数 - 2.3 % 美国 防守 75 对 Australia 进攻 84。 赛地因素 + 9 % 东道主或名义主队拥有轻微赛地倾
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::gdckt-1781877290420-6c8913a6eaf5 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇺🇸 美国 vs 🇦🇺 澳大利亚 2026-06-20 06/20 03:00 · 未开始 🏴 苏格兰 vs 🇲🇦 摩洛哥 2026-06-20 06/20 06:00 · 未开始 🇧🇷 巴西 vs 🇭🇹 海地 2026-06-20 06/20 08:30 · | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T00:33:56.924Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-q3ur00cc6.vercel.app
- Deployment ID: dpl_FkwN5Mhn99YJN5jHAE2bMcKHbdhB
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/FkwN5Mhn99YJN5jHAE2bMcKHbdhB
- Verification: failed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, missing 🇲🇽 墨西哥 vs 🇰🇷 韩国, 🇨🇿 捷克 vs 🇿🇦 南非
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, missing 最受关注 🇲🇽 墨西哥 vs 🇰🇷 韩国, 最大冷门风险 🇨🇿 捷克 vs 🇿🇦 南非
  - /#status-sections: HTTP 200, missing 进行中 / 比分待更新 0 场, 已结束比赛 4 场, 赛果待更新 0 场, 🇲🇽 墨西哥 vs 🇰🇷 韩国 北京时间 06/19 09:00, 实际比分 🇲🇽 墨西哥 1-0 🇰🇷 韩国, 🇨🇦 加拿大 vs 🇶🇦 卡塔尔 北京时间 06/19 10:00, 实际比分 🇨🇦 加拿大 6-0 🇶🇦 卡塔尔, 🇨🇭 瑞士 vs 🇧🇦 波黑 北京时间 06/19 08:00, 实际比分 🇨🇭 瑞士 4-1 🇧🇦 波黑, 🇨🇿 捷克 vs 🇿🇦 南非 北京时间 06/19 05:00, 实际比分 🇨🇿 捷克 1-1 🇿🇦 南非; forbidden 已结束比赛 0 场, 赛果待更新 2 场
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::pl5tl-1781915628624-5f64065b2338, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::sm6fb-1781915629245-12c0b10eeb86, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::8fn4m-1781915633150-aee9d664b8fd | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::8fn4m-1781915633916-ac02fba88102 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781915634285-e590c1ee22a2 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781915634678-8a79eaea32ba | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781915635103-f19b1e36240c | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, missing 数据可信度 赛程中 · 球队高 · 赛果二级来源 · 来源二级来源
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781915635454-bc824489f117 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T00:36:17.281Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-e58nb5mka.vercel.app
- Deployment ID: dpl_Aj4dKy3dPrcZVFhtvkHTEQ6i9fwh
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/Aj4dKy3dPrcZVFhtvkHTEQ6i9fwh
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::fxkzt-1781915768849-ec438e1fe08e, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::cc8sv-1781915769435-92769662988f, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::cc8sv-1781915773790-b255a10c5ca3 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2gxzv-1781915774558-d1d5d3f20649 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::cpms4-1781915775195-7143cccfc3c4 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::fxkzt-1781915775606-2f83c2ce9ed2 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2gxzv-1781915776015-0ca17e8af51f | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::cc8sv-1781915776400-dcc3b7946f4c | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T00:48:19.567Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-rilk85sk6.vercel.app
- Deployment ID: dpl_4bzyVmsZ8rucYqHzBawmJjLZ5Xtu
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/4bzyVmsZ8rucYqHzBawmJjLZ5Xtu
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::cpms4-1781916491418-28852e0b5849, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::2chcq-1781916491982-eed1b4ce3fac, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916495915-d22c8dd37c0c | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916496832-600cc289aeda | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916497248-43ec2aca3fee | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916497626-0f4f33a21e44 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916497984-9fefb305bb24 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::4rbw5-1781916498368-4b871602a7a1 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T00:57:32.065Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-nb6rw7qse.vercel.app
- Deployment ID: dpl_7oS4b6f5i7GGJzHyJ633E9wEGRzF
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/7oS4b6f5i7GGJzHyJ633E9wEGRzF
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::2chcq-1781917043818-d2c201bb4eeb, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::47wpl-1781917044440-0dd37fccd4bc, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2chcq-1781917048624-f6fb2b8b8375 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2chcq-1781917049292-4ff9d14a73c9 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2chcq-1781917049658-76d74493a606 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2chcq-1781917050119-b6813fe694f1 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::2chcq-1781917050513-32740cd0041b | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::8hb5b-1781917050854-7490df8b2a9b | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T01:01:10.091Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-hgsab0xin.vercel.app
- Deployment ID: dpl_9MoD3Fz9q37HHwpPxGkdwLDX8FJe
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/9MoD3Fz9q37HHwpPxGkdwLDX8FJe
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::nkvrl-1781917261348-1a310292b404, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::l84v7-1781917261949-aeacb9dd0b0a, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nkvrl-1781917266618-88967a8ea8b7 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nkvrl-1781917267304-8985f6893ced | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::nkvrl-1781917267653-2222064b5a4d | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::q952w-1781917268056-761d1320ed7b | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::q952w-1781917268511-1fa65c37a56b | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::v5s6p-1781917268872-160227087469 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T01:21:09.958Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-au30t1vk2.vercel.app
- Deployment ID: dpl_FSsDsoWNcdSt4Hnri3fofPYW6c8Q
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/FSsDsoWNcdSt4Hnri3fofPYW6c8Q
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::sm6fb-1781918461462-1190d5e3f340, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::q7tfm-1781918462017-f07be1f867f7, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::h559j-1781918466099-819723142eb4 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::h559j-1781918466962-7d1c83582de2 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::t9ggj-1781918467318-cf698a980d8a | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::t9ggj-1781918467720-acd040b59791 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::t9ggj-1781918468100-3b2ceade5681 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::k8vtx-1781918468476-fb6b2cb1a880 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T01:23:31.244Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-f6yrlrdlc.vercel.app
- Deployment ID: dpl_8fTaHUcHiGpDGo38gDzPc477wg1y
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/8fTaHUcHiGpDGo38gDzPc477wg1y
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::cfbbk-1781918603745-72bf903ec703, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::tpmsl-1781918604338-dfe5dd613508, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::pl5tl-1781918608231-c6c45bf54877 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 墨西哥 · 当前球队 2 2 0 0 3 0 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 1 0 1 2 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 0 1 1 2 3 -1 1 当前处于第三名竞争区 4 南非 2 0 1 1 1 3 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::l9hx7-1781918608905-96acf6f80658 | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 场 胜 平 负 进球 失球 净胜球 积分 出线形势 1 加拿大 · 当前球队 2 1 1 0 7 1 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 1 1 0 5 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 0 1 1 2 5 -3 1 当前处于第三名竞争区 4 卡塔尔 2 0 1 1 1 7 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::l9hx7-1781918609290-ae06e5b17545 | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 场 净胜球 积分 出线形势 1 墨西哥 2 +3 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 2 0 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 2 -1 1 当前处于第三名竞争区 4 南非 2 -2 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 状态 63。 进攻指数 1 % 捷克 进攻 72 对 南非 防守 69。 防守指数 + 1.3 % 捷克 防守 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dkkp8-1781918609729-20b94f310b10 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 场 净胜球 积分 出线形势 1 加拿大 2 +6 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 2 +3 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 2 -3 1 当前处于第三名竞争区 4 卡塔尔 2 -6 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态 + 2.7 % 加拿大 状态 73，卡塔尔 状态 67。 进攻指数 + 1.9 % 加拿大 进攻 74 对 卡
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dkkp8-1781918610080-ef25799f7665 | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 场 净胜球 积分 出线形势 1 美国 1 +3 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 1 +2 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 1 -2 0 当前处于第三名竞争区 4 巴拉圭 1 -3 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态 - 2.7 % 美国 状态 80，Australia 状态 86。 进攻指数 - 1.3 % 美国 进攻 78
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::dkkp8-1781918610432-546468b4ab50 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 FIFA World Cup 202
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 

## Deployment 2026-06-20T01:30:39.013Z

- Target: production
- Production URL: https://world-cup-match-intelligence-center.vercel.app
- Deployment URL: https://world-cup-match-intelligence-center-1f6yidd3t.vercel.app
- Deployment ID: dpl_J3hYT9gYrdVyrA4LkrDXGEmtcGWZ
- Inspect: https://vercel.com/jason-wang-s-projects1/world-cup-match-intelligence-center/J3hYT9gYrdVyrA4LkrDXGEmtcGWZ
- Verification: passed
- Commands: npm run check:data, npm run lint, npm test, npm run build, npx vercel deploy --prod --yes
- Smoke checks:
  - /: HTTP 200, passed
  - /matches/match-001: HTTP 200, passed
  - /matches/match-010: HTTP 200, passed
  - /api/matches: HTTP 200, passed
  - /api/matches#schedule-coverage: HTTP 200, passed
  - /#schedule-coverage: HTTP 200, passed
    - Production HTML snippet: 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 
  - /api/matches#beijing-2026-06-19: HTTP 200, passed
  - /#today-focus: HTTP 200, passed
  - /#status-sections: HTTP 200, passed
  - /api/matches#today-results: HTTP 200, passed
  - /#upset-risk-ranking-removed: HTTP 200, passed
  - /#group-standings: HTTP 200, passed
    - Production HTML snippet: 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。 
  - /#group-standings-consistency: HTTP 200, passed
    - Production HTML snippet: main: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::6v2s9-1781919030999-3f4b7c4a0d87, x-matched-path=/, ok=true | main-random-query: status=200, cache-control=private, no-cache, no-store, max-age=0, must-revalidate, x-vercel-cache=MISS, x-vercel-id=hkg1::iad1::w5fgb-1781919031637-b836b0a93ade, x-matched-path=/, ok=true | deployment-url-vercel-curl: status=200, cache-control=vercel curl, x-vercel-cache=vercel curl, x-vercel-id=vercel curl, x-matched-path=vercel curl, ok=true
  - /teams/mexico#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919035579-ca251b4f8af5 | A 组积分榜与出线形势 当前球队： 墨西哥 排名 球队 数据摘要 出线形势 1 墨西哥 · 当前球队 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 南非 · 2026-06-12 06/12 09:00 · 实际比分 墨西哥 2-0 南非 vs 韩国 · 2026-06-19 06/19 09:00 · 实际比分 墨西哥 1-0 韩国 剩余赛程 vs 捷克 · 2026-06-25 06/25 09:00 ，北京时间 · 未开始
  - /teams/canada#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919035959-8d79442a630c | B 组积分榜与出线形势 当前球队： 加拿大 排名 球队 数据摘要 出线形势 1 加拿大 · 当前球队 进球 7｜失球 1｜净胜球 +6｜积分 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 进球 5｜失球 2｜净胜球 +3｜积分 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 进球 2｜失球 5｜净胜球 -3｜积分 1 当前处于第三名竞争区 4 卡塔尔 进球 1｜失球 7｜净胜球 -6｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 已结束比赛 vs 波黑 · 2026-06-13 06/13 04:00 · 实际比分 加拿大 1-1 波黑 vs 卡塔尔 · 2026-06-19 06/19 10:00 · 实际比分 加拿大 6-0 卡塔尔 剩余赛程 vs 瑞士 · 2026-06-25 06/25 03:00 ，北京时间 · 未开始
  - /matches/match-008#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919036322-9204deb805af | 捷克 vs 南非 北京时间 06/19 05:00 · Atlanta · Atlanta Stadium 实际比分 1-1 赛前预测 2-1 捷克 vs 南非 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 捷克 在模型中更占优势。当前主胜/平/客胜概率为 50% / 20.8% / 29.2%，预测比分 2 : 1。 捷克 胜 50 % 平局 20.8 % 南非 胜 29.2 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：捷克 1-1 南非 赛前预测：2-1；期望进球 1.5-0.6 A 组积分榜摘要 所属小组： A 组 本场赛果已计入 A 组积分榜。捷克获得 1 分，南非获得 1 分。 排名 球队 数据摘要 出线形势 1 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 1 - 1 赛前预测 2 - 1 胜平负方向 未命中 比分完全命中 未命中 净胜球偏差 1 总进球偏差 1 胜平负方向未命中，净胜球偏差 1，总进球偏差 1。 模型需要更重视临场伤停、红黄牌和比赛节奏变化。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 5.9 % 捷克 排名第 39，南非 第 56。 近期状态 + 3.2 % 捷克 状态 70，南非 
  - /matches/match-010#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919036742-e8aad6fdc6f7 | 加拿大 vs 卡塔尔 北京时间 06/19 10:00 · Vancouver · BC Place Vancouver 实际比分 6-0 赛前预测 2-1 加拿大 vs 卡塔尔 赛前智能分析 二级来源 · ESPN 2026 World Cup 赛程校验 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 加拿大 在模型中更占优势。当前主胜/平/客胜概率为 54.5% / 17.2% / 28.3%，预测比分 2 : 1。 加拿大 胜 54.5 % 平局 17.2 % 卡塔尔 胜 28.3 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 已结束 数据更新时间：2026/6/19 08:53:53 比分信息 实际比分：加拿大 6-0 卡塔尔 赛前预测：2-1；期望进球 1.6-0.7 B 组积分榜摘要 所属小组： B 组 本场赛果已计入 B 组积分榜。加拿大获得 3 分，卡塔尔获得 0 分。 排名 球队 数据摘要 出线形势 1 加拿大 进球 7｜失球 1｜净胜球 +6｜积分 4 当前位于直接出线区，仍需后续比赛确认 2 瑞士 进球 5｜失球 2｜净胜球 +3｜积分 4 当前位于直接出线区，仍需后续比赛确认 3 波黑 进球 2｜失球 5｜净胜球 -3｜积分 1 当前处于第三名竞争区 4 卡塔尔 进球 1｜失球 7｜净胜球 -6｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 赛后预测复盘 实际比分 6 - 0 赛前预测 2 - 1 胜平负方向 命中 比分完全命中 未命中 净胜球偏差 5 总进球偏差 3 胜平负方向命中，净胜球偏差 5，总进球偏差 3。 继续观察临场阵容和早段节奏对比分精度的影响。 数据可信度 比赛时间 中 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 二级来源 数据来源 二级来源 模型判断依据 FIFA 排名差异 + 7.4 % 加拿大 排名第 32，卡塔尔 第 53。 近期状态
  - /matches/match-029#standings-linkage: HTTP 200, passed
    - Production HTML snippet: x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919037116-c36fd3ee1d4a | 美国 vs Australia 北京时间 06/20 03:00 · Seattle · Seattle Stadium 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果待抓取 待更新 赛前预测 1-1 美国 vs Australia 赛前智能分析 官方来源 · FIFA World Cup 2026 官方赛程 根据 FIFA 官方赛程、FIFA 排名快照和本地规则模型整理，本场 美国 在模型中更占优势。当前主胜/平/客胜概率为 43.5% / 23.5% / 33%，预测比分 1 : 1。 美国 胜 43.5 % 平局 23.5 % Australia 胜 33 % 该预测为本地规则模型推断，不代表官方结论。 比赛状态 赛果待更新 比赛可能已结束，但当前赛果未抓取，等待数据更新。 比分信息 实际比分：赛果待抓取 / 数据待更新 赛前预测：1-1；期望进球 1.3-1.4 D 组积分榜摘要 所属小组： D 组 赛果尚未产生，本场比赛结果将影响本组积分榜、直接出线区和第三名竞争区排序。 排名 球队 数据摘要 出线形势 1 美国 进球 4｜失球 1｜净胜球 +3｜积分 3 当前位于直接出线区，仍需后续比赛确认 2 Australia 进球 2｜失球 0｜净胜球 +2｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 Turkiye 进球 0｜失球 2｜净胜球 -2｜积分 0 当前处于第三名竞争区 4 巴拉圭 进球 1｜失球 4｜净胜球 -3｜积分 0 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，非 FIFA 官方确认排名。 出线形势基于当前已录入赛果推断，仍需后续比赛确认。 预测复盘 比赛可能已结束，但当前赛果未抓取，等待数据更新。 赛果更新后，将自动计算方向命中、比分命中、总进球偏差和净胜球偏差。 数据可信度 比赛时间 高 球队基础数据 高 伤停信息 MVP 示例 关键球员 MVP 示例 预测结果 规则模型 实际比分 待更新 数据来源 官方 模型判断依据 FIFA 排名差异 + 2.8 % 美国 排名第 17，Australia 第 25。 近期状态
  - /#ui-readability: HTTP 200, passed
    - Production HTML snippet: status=200 | cache-control=private, no-cache, no-store, max-age=0, must-revalidate | x-vercel-cache=MISS | x-vercel-id=hkg1::iad1::6v2s9-1781919037549-5f1408f474f7 | x-matched-path=/ | forbidden raw body=none | forbidden visible text=none | 小组积分榜与出线形势（本地规则推断） 基于当前已录入赛果和完整小组赛程计算，排序采用积分、净胜球、进球数等简化规则；第三名出线形势需结合其他小组结果，非 FIFA 官方确认排名。 A 组 · 4 / 6 场已结束 · 仍需后续比赛确认 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 排名 球队 数据摘要 出线形势 1 🇲🇽 墨西哥 进球 3｜失球 0｜净胜球 +3｜积分 6 当前位于直接出线区，仍需后续比赛确认 2 🇰🇷 韩国 进球 2｜失球 2｜净胜球 0｜积分 3 当前位于直接出线区，仍需后续比赛确认 3 🇨🇿 捷克 进球 2｜失球 3｜净胜球 -1｜积分 1 当前处于第三名竞争区 4 🇿🇦 南非 进球 1｜失球 3｜净胜球 -2｜积分 1 当前暂列小组第四，仍取决于剩余比赛 积分榜为本地简化规则，排序采用积分、净胜球、进球数和队名稳定排序，非 FIFA 官方确认排名。 第三名出线形势需结合其他小组结果；当前状态为基于已录入赛果的本地规则推断。 仍需后续比赛确认。  | 筛选比赛 按日期、小组、球队、状态和排序方式浏览。 全部日期 2026-06-12 2026-06-13 2026-06-14 2026-06-15 2026-06-16 2026-06-17 2026-06-18 2026-06-19 2026-06-20 2026-06-21 2026-06-22 2026-06-23 2026-06-24 2026-06-25 2026-06-26 2026-06-27 2026-06-28 全部小组 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 当前小组/收藏球队 🇲🇽 墨西哥 (MEX) 🇿🇦 南非 (RSA) 🇰🇷 韩国 (KOR) 🇨🇿 捷克 (CZE) 全部状态 进行中 进行中，比分待更新 已结束 未开始 赛果待更新 时间或数据异常 按开赛时间 按冷门风险 🇲🇽 墨西哥 MEX 🇿🇦 南非 RSA 🇰🇷 韩国 KOR 🇨🇿 捷克 CZE 显示当前小组/收藏球队；完整 48 队请用搜索定位。 完整小组赛数据 72 场小组赛数据 · 2026-06-12 至 2026-06-28 A 组 B 组 C 组 D 组 E 组 F 组 G 组 H 组 I 组 J 组 K 组 L 组 🇹🇷 土耳其 vs 🇵🇾 巴拉圭 2026-06-20 06/20 11:00 · 未开始 进行中 / 比分待更新 1 场 进行中，比分待更新 小组赛 · C 组 热度 87 🇧🇷 巴西 vs 🇭🇹 海地 北京时间 06/20 08:30 · Miami 🇧🇷  | 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 数据来源与更新时间 本地数据最近更新： 2026-06-
  - /#chart-disclaimers: HTTP 200, passed
    - Production HTML snippet: 模型表现 规则模型复盘 已复盘比赛 28 方向命中率 57.1 % 比分完全命中 2 平均总进球误差 1.6 28 场复盘来自当前 72 场样本中已经录入实际比分且存在赛前预测快照的比赛；表现统计只覆盖当前 MVP 示例数据，不能代表完整世界杯模型效果。 全量样本热度排行（演示口径） 项目 / 数值 项目 数值 🏴 英格兰-🇭🇷 克罗地亚 96 🏴 英格兰-🇬🇭 加纳 96 🇵🇦 巴拿马-🏴 英格兰 96 🇦🇷 阿根廷-🇩🇿 阿尔及利亚 95 🇦🇷 阿根廷-🇦🇹 奥地利 95 🇯🇴 约旦-🇦🇷 阿根廷 95 全量 72 场样本的演示热度字段，用于界面排序和模型示例；不是官方数据、官方关注度，也不是全网实时舆情。 全量样本球队雷达图（演示模型） 项目 / 数值 项目 数值 进攻 🇺🇸 美国 78 / 🇦🇺 澳大利亚 84 防守 🇺🇸 美国 75 / 🇦🇺 澳大利亚 82 中场 🇺🇸 美国 77 / 🇦🇺 澳大利亚 83 状态 🇺🇸 美国 80 / 🇦🇺 澳大利亚 86 节奏 🇺🇸 美国 83 / 🇦🇺 澳大利亚 78 球队画像基于 FIFA 排名和 MVP 手动补充输入生成，属于本地演示模型口径；不是官方数据、官方能力评分或实时状态。 近期状态曲线 项目 / 数值 项目 数值 🇲🇽 墨西哥 96 🇩🇪 德国 96 🇦🇷 阿根廷 96 🇸🇪 瑞典 95 🇫🇷 法国 95 🇳🇴 挪威 94 🇦🇹 奥地利 94 🇦🇺 澳大利亚 93 状态指数是本地模型输入，不是官方指标。 小组出线概率（演示模型） 项目 / 数值 项目 数值 🇨🇦 加拿大 87% 🇲🇽 墨西哥 86% 🇩🇪 德国 84% 🇸🇪 瑞典 78% 🇺🇸 美国 77% 🇦🇷 阿根廷 76% 🇳🇴 挪威 75% 🏴 英格兰 75% 出线概率覆盖全量小组赛样本，为本地演示模型推断；不是官方数据、官方概率、博彩赔率或实时预测。 
