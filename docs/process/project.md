# Process facts: walkingkangaroo.com

Everything `/do`, `/shape` and `/retro` need to know about this project. Edit it here, in this
project. The skills, agents and scripts under `.claude/` come from `process-template` and are
never edited here.

## Identity

- **Linear:** team Dev, project **Website**
- **Repo:** local folder `C:\dev\website`, remote `walkingkangaroo/walkingkangaroo-web` (public).
  A pnpm workspace: the hub is in `sites/hub/`, shared code goes in `packages/`, and `docs/`
  and `.claude/` stay at the root (0027).
- **Shell:** Git Bash from the Bash tool.

## Read before planning

- `docs/brief.md`: what the site is, the projects it shows, and the plan. Binding.
- The B2 · Daylight board on https://claude.ai/artifact/RoieMJiNMKNuXoEvUmwK5y: the design.
  Read it with the Artifact tool, never by fetching the URL.
- `docs/DECISIONS.md` and the records in `docs/decisions/` that touch the issue's area.

## What green means

Run by the orchestrator, by the implementer before it reports, and by the reviewer if it wants.

1. `pnpm build`: completes with no errors.
2. `pnpm check`: 0 errors, 0 warnings.

Baseline: run these once before changing anything.

## Looking at the result

- Start the dev server with `preview_start` (add it to `.claude/launch.json`), then check the
  page with `read_page` and screenshots at desktop and phone width (`resize_window` mobile).
- Send Grant screenshots of any visual change with `SendUserFile`.
- Only Grant can judge whether copy sounds like him and whether the design feels right.

## Extra checks by area

- **Anything visual:** check at 390 px wide; no horizontal scroll; text contrast 4.5:1.
- **The GitHub Pages workflow or `CNAME`:** read the workflow run with `gh run view`; the live
  site must still load after merge.
- **A product site's Azure Static Web Apps workflow (0031):** the same, plus the pull request's
  preview link loads, and a change to one site doesn't run another site's deploy.

## Model table

| Task | Agent | Model |
| --- | --- | --- |
| Small or mechanical work: copy edits, a new content file, asset copies | `implementer` | `haiku` or `sonnet` |
| Most issue work: pages, components, layout, content collections | `implementer` | `sonnet` |
| Hard problems: the deploy pipeline, tricky layout or performance | `implementer` | `opus` |
| Review of any diff | `reviewer` | `sonnet`; `opus` when the diff touches a risky area or anything you'd call risky |

## Parallel rule

Parallel implementers only with disjoint files; otherwise one after another. One checkout, no
worktrees: the repo is small.

## CI

The hub's GitHub Pages deploy workflow and each product site's Azure Static Web Apps workflow,
once they exist. Read a failure with
`gh run view <id> --log-failed`.

## Risky areas

Diffs here get an `opus` review, and their issues are `Risk: high`.

- The deploy workflow and anything that changes what is published
- DNS instructions given to Grant (MX records must never change)

## Files that never change without their own issue

- `.github/workflows/*`
- `sites/hub/public/CNAME`

## Who decides

- Grant, for everything. Copy in his voice, which projects are shown and their stages are his
  calls: draft, mark it for him to check, never invent facts.

Decisions are recorded in `docs/decisions/` with a row in `docs/DECISIONS.md`.

## Hold-out milestone

Backlog.

## Rules for implementers

- Copy brand assets from the brand pack unchanged; never edit logo files.
- No secrets in the repo: it is public.
- Never put bracketed placeholder text live without Grant's sign-off on the replacement.

## Stray files to check for

- `node_modules/`, `dist/`, `.astro/` at any depth (the build writes `sites/hub/dist/`), `.env*`
- Large media: images over 500 KB or clips over 5 MB need a reason in the pull request.

## Extra stop-and-ask conditions

- Anything that would change DNS, email, the GitHub Pages settings or Azure resources outside the
  repo, or that needs a secret (Grant adds every secret himself).
