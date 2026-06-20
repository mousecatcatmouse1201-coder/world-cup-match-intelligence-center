# World Cup Match Intelligence Center

世界杯比赛智能分析中心是一个 Next.js 数据看板，用本地 JSON 数据和规则模型展示 2026 世界杯小组赛赛程、球队画像、胜平负概率、比分区间、战术看点、赛后复盘和数据来源可信度。

线上地址：https://world-cup-match-intelligence-center.vercel.app

**当前版本状态：P0.5 Stable**

README 是仓库文档，不是 production 页面的一部分；production 页面以线上地址实际渲染内容为准。

## 当前已完成能力

- 首页提供今日焦点、主队中心、日期/小组/球队/状态筛选、完整小组赛入口和比赛状态分区。
- 比赛详情页提供胜平负概率、预测比分、期望进球、模型依据、风险提示、三种剧本、数据可信度和赛后复盘。
- 首页、比赛详情页与球队详情页均可查看本地规则推断的小组积分榜和出线形势。
- 主队收藏保存在浏览器本地存储，刷新后仍可保留。
- 图表提供结构化表格 fallback，移动端首页积分榜采用可换行布局。
- 冷门风险保留在单场比赛摘要、详情解释和筛选排序逻辑中，并明确标注为本地规则模型推断。

## 当前明确不做/暂不做能力

- 不提供用户登录、云端账号、社区、评论、后台 CMS 或复杂权限。
- 不接入真实博彩赔率、投注建议、付费订阅或投资决策能力。
- 不接入实时比分推送、实时舆情或 API Key 专属数据源。
- 当前不支持淘汰赛、移动 App、完整多语言国际化或模型权重配置。
- 首页不展示“全量样本冷门风险排行”，不会恢复该模块。

## 人工验收记录

P0.5 Stable 人工验收已完成：

- 首页 → 比赛详情 → 球队页 → 返回 Dashboard：通过。
- 主队收藏刷新后保留：通过。
- 空日期/无比赛、赛果待更新、数据异常空状态：通过。
- 390px 移动端无页面横向溢出，比赛卡片、积分榜与模型表现可读：通过。
- 首页冷门风险排行已移除：通过。
- `npm run check:data`、`npm run lint`、`npm test`、`npm run build`：通过。

## 运行

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run data:refresh
npm run data:update-results -- --file data/raw/results-update.example.json
npm run check:data
npm test
npm run build
npm run deploy:prod
```

`npm run deploy:prod` 会运行数据检查、类型检查、测试、生产构建，并直接对 Vercel 主域名执行 smoke check。

## P1 数据更新线（本地 JSON）

当前数据闭环保持无 API Key，可完全在本地运行：

`data/raw` 原始抓取快照或人工赛果文件 → `data:normalize` 规范化为 `data/store/*.json` → 本地规则模型生成赛前预测快照 → `data:update-results` 写入赛果并重建派生数据 → 页面/API 展示赛后复盘、积分形势与模型表现。

- 源数据：`data/raw/manifest.json` 与抓取快照、`scripts/world-cup-2026-seed.ts` 的可运行基线，以及人工维护的赛果更新文件。`data/store/fixtures.json` 是本地运行时的赛程/赛果记录。
- 派生数据：`standings.json`、`source-audit.json`、球队画像/排名补全、赔率与舆情演示数据；`fixtures.json` 中的 `predictionSnapshot` 是赛前模型输出的冻结快照，不会在赛后随结果重算或覆盖。
- 数据新鲜度：每场比赛都有 `sourceUpdatedAt` 与 `lastNormalizedAt`；已结束比赛还必须有 `lastResultsUpdatedAt`。页面“数据更新时间”读取这些真实来源/规范化时间，不使用硬编码文案。
- 更新赛果：复制 `data/raw/results-update.example.json`，填写 `fixtureId`、`status: "finished"`、双方比分、来源和可选 ISO `updatedAt`，然后执行 `npm run data:update-results -- --file <文件路径>`。需要明确标记缺失赛果时，使用 `status: "result_pending"` 且不填写比分。
- 日常检查：运行 `npm run check:data`。它会检查日期、赛果状态、排名、赛程、积分榜和页面结构；赛果检查会拒绝“已结束无比分”、“未结束却有最终比分”、“比分与 result 不同步”、“缺少更新时间”及“已结束比赛缺少赛前预测快照”。模型表现只会统计同时有最终比分和冻结赛前预测快照的比赛。

`data:normalize` 会保留已录入的最终赛果、赛果更新时间和预测快照，并重算积分榜/来源审计等派生数据；不要手工编辑 `standings.json` 或 `source-audit.json`。

## 数据来源与模型口径

项目把数据分成四类，并在页面和 API 中标注：

- 官方来源：FIFA 官方赛程、FIFA/Coca-Cola 男足世界排名。
- 二级来源：ESPN 赛程校验。
- 演示数据：关键球员、赔率快照、舆情热度等无免费权威 API 的补充字段。
- 模型推断：预测比分、胜平负概率、出线概率等本地规则模型输出。

预测模型使用 FIFA 排名、球队画像、近期状态、主客场/赛地、伤停风险，以及弱化的赔率和舆情快照生成规则模型输出。赛前预测会与已结束比赛的实际比分进行复盘；模型表现只统计同时拥有实际比分和赛前预测快照的比赛。

运行 `npm run data:refresh` 后会更新 `data/store/*.json`，生成 `data/raw/fetch-report.json` 抓取报告和 `data/store/source-audit.json` 来源审计报告。

## API

- `GET /api/matches`：返回完整数据仓库和未来两天未完赛比赛的批量预测。
- `GET /api/matches/[id]`：返回单场比赛、球队、预测和分析；已完赛或窗口外比赛的预测字段为 `null`。
- `GET /api/teams/[id]`：返回球队画像、球员、相关比赛和小组形势。
- `GET /api/sources`：返回来源目录和数据质量摘要。
- `POST /api/predict`：请求体 `{ "fixtureId": "match-005" }`，对未来两天未完赛比赛返回单场预测。
- `POST /api/analyze`：请求体 `{ "fixtureId": "match-005" }`，对未来两天未完赛比赛返回单场中文分析。

## 当前限制

- 本项目不依赖 API Key，比赛数据以本地 JSON 为主，更新频率受本地数据管道限制。
- 部分关键球员、伤停、赔率和舆情字段是 MVP 示例或本地补充，页面会明确标注。
- 小组积分榜采用积分、净胜球、进球数和稳定队名排序的简化规则，非 FIFA 官方确认排名。
- 出线概率、热度、球队画像和预测均为本地演示模型，不是官方数据、实时舆情或博彩赔率。
- 赛果缺失时页面只会显示待更新状态，不会生成实际比分；赛果仍需由人工核验后写入本地更新文件。外部实时比分源目前只保留抓取/审计接口预留，不是本轮运行依赖。
- 首页已移除“全量样本冷门风险排行”。冷门风险仅保留在单场比赛卡片、比赛详情页的模型解释，以及筛选排序逻辑中，且均标注为本地规则模型推断。

## 后续 P1 计划

- 接入可验证的实时比分与伤停来源。
- 增加淘汰赛、赛程日历、比赛提醒和主队中心增强。
- 增加模型权重可视化、误差趋势和出线概率模拟。
- 增加历史交锋、近期赛果及赛前/赛后中文长文分析。

## 免责声明

本项目不是 FIFA、赛事组织方、球队或博彩公司官方产品。预测、比分、赔率、舆情和出线概率仅用于演示数据产品能力，不构成投注、财务或赛事决策建议。

## 发布检查

发布前至少完成：

```bash
npm test
npm run build
```

上线后检查首页、比赛详情页、球队详情页、`/api/matches`、`/api/sources`、`POST /api/predict`，并确认生产页面无浏览器 console error。
