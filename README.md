# World Cup Match Intelligence Center

世界杯比赛智能分析中心是一个 Next.js 数据看板，用本地 JSON 数据和规则模型展示赛程、球队画像、胜平负概率、比分区间、战术看点和数据来源可信度。

线上地址：https://world-cup-match-intelligence-center.vercel.app

## 运行

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run data:refresh
npm test
npm run build
```

## 数据来源

项目把数据分成四类，并在页面和 API 中标注：

- 官方来源：FIFA 官方赛程、FIFA/Coca-Cola 男足世界排名。
- 二级来源：ESPN 赛程校验。
- 演示数据：关键球员、赔率快照、舆情热度等无免费权威 API 的补充字段。
- 模型推断：预测比分、胜平负概率、出线概率等本地规则模型输出。

运行 `npm run data:refresh` 后会更新 `data/store/*.json`，生成 `data/raw/fetch-report.json` 抓取报告和 `data/store/source-audit.json` 来源审计报告。

## API

- `GET /api/matches`：返回完整数据仓库和未来两天未完赛比赛的批量预测。
- `GET /api/matches/[id]`：返回单场比赛、球队、预测和分析；已完赛或窗口外比赛的预测字段为 `null`。
- `GET /api/teams/[id]`：返回球队画像、球员、相关比赛和小组形势。
- `GET /api/sources`：返回来源目录和数据质量摘要。
- `POST /api/predict`：请求体 `{ "fixtureId": "match-005" }`，对未来两天未完赛比赛返回单场预测。
- `POST /api/analyze`：请求体 `{ "fixtureId": "match-005" }`，对未来两天未完赛比赛返回单场中文分析。

## 免责声明

本项目不是 FIFA、赛事组织方、球队或博彩公司官方产品。预测、比分、赔率、舆情和出线概率仅用于演示数据产品能力，不构成投注、财务或赛事决策建议。

## 发布检查

发布前至少完成：

```bash
npm test
npm run build
```

上线后检查首页、比赛详情页、球队详情页、`/api/matches`、`/api/sources`、`POST /api/predict`，并确认生产页面无浏览器 console error。
