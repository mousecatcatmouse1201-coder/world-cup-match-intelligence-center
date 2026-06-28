# AGENTS.md

## Project Overview

This repository contains the World Cup Match Intelligence Center.

It is a Next.js and TypeScript web application for displaying World Cup match schedules, team information, standings, local rule-based predictions, data source notes, and match review information.

This project is used both as an application and as a Codex learning repository. Prefer small, reviewable changes.

## Tech Stack

* Next.js
* React
* TypeScript
* Vitest
* Node.js
* npm
* GitHub Actions
* Vercel

## Important Directories

* `app/`: Next.js routes and page entry points.
* `components/`: React UI components.
* `lib/`: Shared application logic, data loading, prediction logic, display helpers, and validation-related utilities.
* `data/store/`: Structured local JSON data used by the app.
* `scripts/`: Developer scripts for data fetching, normalization, checking, reporting, and deployment.
* `tests/`: Automated tests.
* `.github/workflows/`: GitHub Actions CI configuration.
* `.agents/skills/`: Project-level Codex Skills.

## Common Commands

Use these commands when relevant:

```bash
npm run lint
npm test
npm run build
npm run check:data
```

Current command meanings:

* `npm run lint`: Runs TypeScript type checking through `tsc --noEmit`.
* `npm test`: Runs Vitest tests.
* `npm run build`: Runs a production Next.js build.
* `npm run check:data`: Runs project data checks.

Do not run data-changing scripts unless the user explicitly asks.

Data-changing or deployment-related commands include:

```bash
npm run data:fetch
npm run data:normalize
npm run data:refresh
npm run data:update-results
npm run deploy:prod
```

## GitHub Actions CI

The main CI workflow is in:

```text
.github/workflows/ci.yml
```

The expected CI check order is:

```text
npm ci
npm run lint
npm test
npm run build
```

If CI behavior is changed, keep the change small and explain the impact.

## Development Rules

Before editing:

1. Check `git status`.
2. Confirm the current branch.
3. Understand the requested scope.
4. Read the relevant files before changing them.
5. State the expected files to be changed.
6. Ask if the scope is unclear.

When editing:

* Keep changes small and focused.
* Do not modify unrelated files.
* Do not reformat the entire repository unless explicitly requested.
* Do not edit ignored files, secrets, environment files, or generated build output.
* Do not change production data to hide a code problem.
* Do not change deployment configuration unless the task is specifically about deployment.

## Git And PR Workflow

For small changes, prefer the project Skill:

```text
Use safe-small-pr.
```

The Skill lives at:

```text
.agents/skills/safe-small-pr/SKILL.md
```

Default learning branch format:

```text
learning/<short-task-name>
```

Use one branch for one focused task.

Do not automatically:

* commit
* push
* create a PR
* merge a PR
* delete branches
* deploy

Pause and ask for confirmation before each of those actions.

## Validation Guidance

Choose validation based on the change.

For TypeScript or application logic changes, usually run:

```bash
npm run lint
npm test
npm run build
```

For documentation-only changes, `git diff` and `git status` may be enough unless the user asks for full validation.

For data pipeline or data correctness changes, consider:

```bash
npm run check:data
```

Do not claim a command passed unless it was actually run.

If validation fails, stop and report the failure clearly. Do not hide failures.

## Data Rules

Treat `data/store/` as application data used by the website.

Do not modify data files unless the task explicitly requires a data update.

Do not silently discard malformed data.

Do not present estimated, secondary, or model-generated data as official data.

Keep source timestamps, normalized timestamps, result update times, and prediction snapshots conceptually separate.

## Deployment Safety

Do not run deployment commands unless explicitly authorized.

Do not assume Vercel Production deployment is desired.

Merging into `main` may trigger GitHub Actions and Vercel Production Deployment.

When a task may affect deployment, explain that risk before proceeding.

## Codex Behavior

Use beginner-friendly explanations for Git and repository operations.

For every command that changes state, explain:

* what the command does
* whether it modifies files
* whether it creates a commit
* whether it pushes to GitHub
* whether it can affect `main`
* whether it can trigger Vercel

Prefer:

* inspect first
* plan second
* edit third
* validate fourth
* show diff fifth
* ask before persistent or external actions

## Done Means

A task is done only when:

* The requested behavior or document change is complete.
* The changed files are clearly listed.
* Relevant validation has been run or intentionally skipped with a reason.
