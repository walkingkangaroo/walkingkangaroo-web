# 0045. Issues live in the tracker vault, through process-template 1.3.0

- **Status:** Accepted
- **Date:** 2026-11-05
- **Issues:** none (process change, made in `process-template` 1.3.0)

## Context

Grant moved his projects' issues from Linear to his tracker vault: a git repo of one Markdown file
per issue that he reads in Obsidian, and that agents change through a small CLI. PanePilot piloted
it from 2026-11-04, and the way of working became process-template 1.3.0. On 2026-11-05 this
project's 17 open issues moved with their IDs, milestones, comments, blockers and status history.

## Decision

- Issues are in the tracker project **Website**. The skills, agents and `tracker` skill reach it
  through `bash .claude/scripts/tracker.sh`, with the project named by `TRACKER_PROJECT` in
  `docs/process/project.env`.
- New issues are `WEB-###`. Issues moved from Linear keep their `KAN-###` IDs, except Linear's
  KAN-1135 (the Visits demo's double-click reset), which became WEB-1: the vault had already given
  KAN-1135 to a Process issue the day before.
- The `Tracker - Done on merge` workflow sets an issue Done when its pull request merges, in place
  of Linear's GitHub integration. Nobody sets Done by hand.
- This takes template 1.2.0 at the same time.

## Consequences

- Milestones finished before 2026-11-05 have their history in Linear only.
- The repo needs the `TRACKER_TOKEN` secret and `TRACKER_REPO` variable, set at organisation level.
  This repo is public, but GitHub doesn't pass secrets to pull requests from forks, so only
  Grant's own merges can change the tracker.
