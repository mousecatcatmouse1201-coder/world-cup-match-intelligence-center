---
name: safe-small-pr
description: "Use for small, scoped repository changes that should follow a safe PR workflow: inspect git status, branch from main, plan before editing, limit changes to the requested scope, run validation, show diff, and pause before commit, push, PR creation, or merge."
---

# Safe Small PR

## Purpose

Use this skill when the user asks for a small, low-risk code, copy, test, config, or CI change that should be handled through a safe branch-and-PR workflow.

This skill is not for large refactors, broad architecture changes, data migrations, dependency upgrades, production deployments, or unclear tasks.

## Core Principle

Move in small, reviewable steps.

Do not assume permission to commit, push, create a PR, merge, deploy, delete branches, reset files, or rewrite history. Pause and ask before each action with external or persistent impact.

## Required Workflow

1. Check repository safety.

Run or inspect:

```bash
git status
git branch --show-current
git log --oneline -5 --decorate
```

Explain the results in beginner-friendly language.

2. Confirm scope.

Before editing, state:

* What problem is being solved.
* Which files are expected to change.
* Which files must not change.
* What validation should be run.
* Whether the task is small enough for this skill.

If scope is unclear, ask before editing.

3. Start from `main`.

Unless the user explicitly says otherwise:

```bash
git switch main
git pull --ff-only origin main
```

If the working tree is not clean, stop and explain.

4. Create a task branch.

Use a clear branch name, for example:

```bash
git switch -c learning/<short-task-name>
```

5. Investigate before editing.

Read the relevant files first. Explain the current behavior and the proposed minimal change.

6. Edit only the requested scope.

Do not modify unrelated files.
Do not reformat the whole repository.
Do not modify production data unless the task explicitly requires it.
Do not modify secrets, environment files, build output, or ignored files.

7. Validate.

Choose the smallest useful validation.

Common validation commands:

```bash
npm run lint
npm test
npm run build
```

Run only the commands that make sense for the change, unless the user requests all checks.

If validation fails, stop and report the failure. Do not hide it.

8. Show the diff.

Before commit, show:

```bash
git diff --stat
git diff
git status
```

Explain what changed in beginner-friendly language.

9. Pause before commit.

Do not commit until the user confirms.

If confirmed, commit only the intended files with explicit `git add <file>` commands.

10. Pause before push.

Do not push until the user confirms.

11. Pause before PR creation.

Do not create a PR until the user confirms.

When creating a PR, include:

* Summary
* Files changed
* Validation run
* Notes about what was not changed

12. Never merge automatically.

Do not merge PRs unless the user explicitly asks after reviewing:

* Files changed
* Checks
* Preview or relevant output
* Risks

## Guardrails

Never do these without explicit user confirmation:

* `git commit`
* `git push`
* creating a PR
* merging a PR
* deleting branches
* deploying
* resetting files
* force pushing
* changing secrets or environment files
* modifying unrelated files
* modifying production data

Stop immediately if:

* The working tree is dirty unexpectedly.
* The current branch is not what was expected.
* More files changed than planned.
* Validation fails.
* The task grows beyond a small scoped change.

## Completion Report

At the end of each phase, report:

* Current branch.
* Files changed.
* Validation commands run and their results.
* Diff summary.
* Whether commit has happened.
* Whether push has happened.
* Whether PR has been created.
* Whether anything affected `main`.
* Whether anything could trigger Vercel production deployment.
* What confirmation is needed next.
