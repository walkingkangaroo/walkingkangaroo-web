---
name: tracker
description: Read, create and update this project's issues in Grant's tracker vault (Obsidian, not Linear). Use for anything involving an issue ID such as PP-12, RS-45 or an older KAN-881, picking up the next issue, filing a bug or idea, recording progress, or changing an issue's status.
---

# Tracker

Issues live as Markdown files in Grant's tracker vault, a separate git repo he reads in Obsidian
on his PC and phone. They are not in Linear any more. Every read and write goes through one
command:

```bash
bash .claude/scripts/tracker.sh <command> ...
```

Written `tracker` below. It works on the project named by `TRACKER_PROJECT` in
`docs/process/project.env`, finds or clones the tracker, pulls before it reads, and commits and
pushes every change itself, so other sessions and Grant's phone see it within minutes. Never edit
or move tracker files by hand, and never commit in the tracker repo yourself. `--project <name>`
reaches another project, for example `--project Process`.

This file comes from `process-template` and is the same in every project. Never edit it here.

## Commands

| Task | Command |
| --- | --- |
| What's next to build | `tracker next --order number` (oldest first; without `--order`, highest priority first) |
| Read an issue, its log and its blockers | `tracker show <ID>` (`--json` for the fields) |
| This project's open issues | `tracker list` (add `--status "Human QA"`, `--milestone 13`, `--milestone none`, `--all`, `--json`) |
| Take an issue | `tracker claim <ID> --branch feature/<id> --by orchestrator` |
| One-line note | `tracker log <ID> "Fix round 1: lint failed on the new rule"` |
| Longer note (a plan, a summary) | `tracker comment <ID> --title Plan --body-file -` with the text in a heredoc |
| Change fields | `tracker set <ID> status="AI Review" pr=https://github.com/...` |
| Add or remove a label | `tracker label <ID> "+Needs Grant"`, `tracker label <ID> "-Needs Grant"` |
| File a new issue | `tracker new --title "..." --milestone 13 --blocked-by <ID>,<ID> --labels risk-high --body-file -` (prints the new ID) |
| Move an issue to another milestone | `tracker set <ID> milestone=14` (or `milestone=none`) |
| Rename an issue | `tracker set <ID> title="..."` |
| Status changes with times, for a retro | `tracker history <ID> --json` |
| Rough notes waiting to become issues | `tracker inbox` |
| Every command | `tracker help` |

A heredoc keeps long text out of shell quoting:

```bash
bash .claude/scripts/tracker.sh comment PP-12 --title Plan --body-file - <<'NOTE'
Tasks: ...
NOTE
```

## IDs

- A new issue gets the project's own prefix, numbered from 1: `PP-1`, `WEB-1`. The CLI picks the
  number; never invent one.
- Issues moved from Linear keep their old IDs, often `KAN-###`. Treat them exactly like the new
  ones. `next --order number` puts them first, because they are older.
- Branches are `feature/<id in lowercase>` (`feature/pp-12`, `feature/kan-881`). Commit subjects
  and PR titles start with the ID (`PP-12: Show counts on the quote filter chips`).

## Statuses

Backlog, Discovery, Ready for Build, In Progress, AI Review, Human QA, Done, Canceled, Duplicate.

- `next` and `claim` only take a Ready for Build issue whose `blocked_by` issues are all in Human
  QA or closed. If `claim` refuses, someone else took it first or it's still blocked: run `next`
  again rather than forcing it.
- **Never set Done.** When a pull request merges, the `Tracker - Done on merge` workflow marks
  every issue it names Done. The CLI refuses Done without a flag only that workflow uses.
- When each other status applies is set by `/do` and `/shape`.

## How the merge finds its issues

The workflow reads IDs from the branch name, the PR title, and `Fixes <ID>` (or Closes, Resolves)
lines in the PR body. It ignores `shape/` and `retro/` branch names, so a shape PR closes only the
issue its body says `Fixes`. A `Part of <ID>` line closes nothing.

## Files, folders and links

- Each issue is `<Project>/issues/<milestone>/<ID> <title>.md`, or `issues/No milestone/`. The
  CLI finds a file from its ID; refer to issues only by ID.
- In issue text, link another issue as `[[<ID>]]`. The CLI points it at that issue's file, or at
  Linear for an old issue that never moved over.
- Long agent detail (file lists, logs) goes in a folded callout above `## Log`:

  ```markdown
  > [!note]- Agent notes
  > Details for agents go here.
  ```

## Writing issues

- The title is the outcome a person would see: "Find a job, quote or invoice by its number from
  one search box".
- Before filing, check `tracker list --all` for one on the same thing.
- `/shape` writes full briefs from its issue template. Anything smaller still gets a short
  description and a `## Done when` list.
- Priority: 1 Urgent, 2 High, 3 Medium, 4 Low, 0 None.
- Turning an inbox note into an issue: `tracker new`, then ask Grant to delete the note. Inbox
  notes are his.

## When it fails

- "not a status", "blocked by", "is In Progress": the CLI is protecting the issue. Read the
  message; don't pass `--force` unless Grant says to.
- A clone or push error: the session can't reach the tracker repo. Stop and tell Grant rather
  than working from memory of the issue.
