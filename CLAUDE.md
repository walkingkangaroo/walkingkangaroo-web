# walkingkangaroo.com

The Walking Kangaroo website: Grant's games and apps, how far along each one is, and a devlog.
A static Astro site, hosted on Azure Static Web Apps like every site in this repo
([0032](docs/decisions/0032-hub-on-azure-static-web-apps.md)).
Start with [docs/brief.md](docs/brief.md).

**Decisions and their reasons: [docs/DECISIONS.md](docs/DECISIONS.md).** Don't reopen an Accepted
decision without Grant. The roadmap and issues live in the Linear project **Website**.

Keep this file under 100 lines. It is read by every session and every subagent. Rules that
matter for only part of the code go in `.claude/rules/<topic>.md` with a `paths:` list, so they
load only when those files are touched. History goes in decision records, not here.

## Commands

Node 24 LTS (`.nvmrc`), [0008](docs/decisions/0008-astro-7-on-node-24.md). pnpm 12 through
corepack (`packageManager` in the root `package.json`). A pnpm workspace: run everything from
the repo root, and the root scripts run the hub's (`pnpm --filter hub ...`).

```bash
pnpm install    # one pnpm-lock.yaml, at the root
pnpm build      # astro build into sites/hub/dist/
pnpm check      # astro check of the hub
pnpm dev        # local preview on http://localhost:4321
```

## Layout

The repo is `walkingkangaroo/walkingkangaroo-web`, one repo for the web
([0027](docs/decisions/0027-one-web-repo-walkingkangaroo-web.md)).

- `sites/hub/`: the hub, walkingkangaroo.com (the Astro site and its `design-plan.md`).
- `sites/<name>/`: a product site, each hosted on its own Azure Static Web App ([0031](docs/decisions/0031-product-sites-on-azure-static-web-apps.md)).
- `packages/shared/`: the Walking Kangaroo signature for product sites' footers ([0028](docs/decisions/0028-signature-uses-brand-pack-files.md)).
- `docs/` and `.claude/` stay at the root and serve every site.
- `docs/brief.md`: what the site is, what it shows, and the plan.
- `docs/decisions/`: one record per decision, indexed in `docs/DECISIONS.md`.
- `docs/process/`: facts for `/shape`, `/do` and `/retro`.
- `docs/hosting.md`: each live site's Azure app, its DNS records at VentraIP, and how to check them.

## Conventions

- Rules for the hub only (brand assets, colours and tints, PanePilot's assets, type) are in
  [.claude/rules/hub.md](.claude/rules/hub.md).
- Rules for PanePilot's own site, `sites/panepilot/` (its palette, type, assets and the demos), are in
  [.claude/rules/panepilot-site.md](.claude/rules/panepilot-site.md), from [0039](docs/decisions/0039-panepilot-site-follows-its-design-plan.md).
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
