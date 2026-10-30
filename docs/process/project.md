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
3. When a change touches `sites/panepilot/` or `packages/shared/`, the same two for that site:
   `pnpm --filter panepilot build` and `pnpm --filter panepilot check`, once the site exists.

Baseline: run these once before changing anything.

## Looking at the result

- Start the dev server with `preview_start` (add it to `.claude/launch.json`), then check the
  page with `read_page` and screenshots at desktop and phone width (`resize_window` mobile).
- Send Grant screenshots of any visual change with `SendUserFile`.
- Only Grant can judge whether copy sounds like him and whether the design feels right.

## Extra checks by area

- **Anything visual:** check at 390 px wide; no horizontal scroll; text contrast 4.5:1.
- **A site's Azure Static Web Apps workflow or `staticwebapp.config.json` (0031, 0032):**
  - Read the workflow run with `gh run view`.
  - The pull request's preview link loads (0035).
  - The live site still loads after merge.
  - A change to one site doesn't run another site's deploy.

## Model table

| Task | Agent | Model |
| --- | --- | --- |
| Small or mechanical work: copy edits, a new content file, asset copies | `implementer` | `haiku` or `sonnet` |
| Most issue work: pages, components, layout, content collections | `implementer` | `sonnet` |
| Hard problems: the deploy pipeline, tricky layout or performance | `implementer` | `opus` |
| Review of any diff | `reviewer` | `sonnet`; `opus` when the diff touches a risky area or anything you'd call risky |

## Parallel rule

One subagent at a time, in every project (see `/do`). One checkout, no worktrees: the repo is small.

## CI

Each site's Azure Static Web Apps workflow, the hub's included (0031, 0032), once it exists.
Read a failure with `gh run view <id> --log-failed`.

## Risky areas

Diffs here get an `opus` review, and their issues are `Risk: high`.

- The deploy workflow and anything that changes what is published
- DNS instructions given to Grant (MX records must never change)

## Files that never change without their own issue

- `.github/workflows/*`
- `sites/*/public/staticwebapp.config.json`

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

- Anything that would change DNS, email, the GitHub repo's settings or Azure resources outside
  the repo, or that needs a secret (Grant adds every secret himself).
