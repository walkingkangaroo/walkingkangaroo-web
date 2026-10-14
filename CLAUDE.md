# walkingkangaroo.com

The Walking Kangaroo website: Grant's games and apps, how far along each one is, and a devlog.
A static Astro site, published to GitHub Pages from launch (0011); until then it runs locally.
Start with [docs/brief.md](docs/brief.md).

**Decisions and their reasons: [docs/DECISIONS.md](docs/DECISIONS.md).** Don't reopen an Accepted
decision without Grant. The roadmap and issues live in the Linear project **Website**.

Keep this file under 100 lines. It is read by every session and every subagent. Rules that
matter for only part of the code go in `.claude/rules/<topic>.md` with a `paths:` list, so they
load only when those files are touched. History goes in decision records, not here.

## Commands

Node 24 LTS (`.nvmrc`), [0008](docs/decisions/0008-astro-7-on-node-24.md). pnpm 12 through
corepack (`packageManager` in `package.json`).

```bash
pnpm install
pnpm build      # astro build into dist/
pnpm check      # astro check
pnpm dev        # local preview on http://localhost:4321
```

## Layout

- `docs/brief.md`: what the site is, what it shows, and the plan.
- `docs/decisions/`: one record per decision, indexed in `docs/DECISIONS.md`.
- `docs/process/`: facts for `/shape`, `/do` and `/retro`.

## Conventions

- Brand assets come from `C:\dev\walkingkangaroo\brand\dist\walking-kangaroo-brand-pack\`,
  copied in unchanged. Never redraw, recolour or re-letter the logo.
- Colours: Rust `#9E3B22`, Ink `#2B1A12`, Paper `#F4EBDD`, Rust Light `#E0785A` (on Ink only).
  Rust on Ink and Rust Light on Paper fail contrast: never for text.
  Seven site tints sit beside them, and no other colours: [0010](docs/decisions/0010-site-tints.md).
- PanePilot's lockup, cover and screenshots are its own, copied unchanged from
  `C:\dev\panepilot\public\brand\`. Its teal never enters the site's CSS:
  [0024](docs/decisions/0024-home-hero-is-the-fogged-pane.md).
- Type: Outfit, SemiBold 600 for headings (sentence case, -2.5% tracking at 48 px and up),
  Regular 400 for body.
- The repo is public: no secrets, keys or unpublished plans for other projects.

## Workflow

- Work is driven from Linear. `/shape <topic>` turns an idea into Ready for Build issues, with
  the decisions recorded in the repo. `/do KAN-###` (or `/do next`) builds one issue and opens a
  pull request. `/retro <milestone>` measures a finished milestone.
- The session that runs these is the orchestrator. It plans, verifies and owns every commit,
  pull request and Linear update. `implementer` writes the code and `reviewer` reviews the diff.
- Never commit to the default branch, never merge a pull request, never set Done. Grant merges,
  and Linear sets Done when he does.
- Project facts for the skills are in `docs/process/project.md`. The skills, agents and scripts
  under `.claude/` come from `process-template` and are not edited here.

## Gotchas

- DNS is at VentraIP and Grant edits it himself. Never suggest changing the MX records.
