# 0027. One web repo, walkingkangaroo-web, with the hub in sites/hub/

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md), question 3, and Grant's answers of 2026-10-14 in [docs/design-plan.md](../design-plan.md)

## Context

Grant wants one web repo for the hub and every future product site, so the heavy game and app
repos stay out of web builds. This is the layout the showcase-sites skill uses.

## Decision

- `github.com/walkingkangaroo/website` is renamed `walkingkangaroo-web`. Grant renames it in
  GitHub's settings after the shape pull request merges and before the move issue starts
  (question 3, default A). Nobody creates a new repo called `website`, because that would break
  GitHub's redirects.
- The Astro app moves into `sites/hub/` in one commit that only moves files, so each file keeps
  its history. The repo root becomes a pnpm workspace (`sites/*`, `packages/*`) with one
  lockfile. `pnpm build`, `pnpm check` and `pnpm dev` at the root still build, check and serve the
  hub.
- `packages/shared/` holds what product sites share, starting with the Walking Kangaroo signature
  ([0028](0028-signature-uses-brand-pack-files.md)). A root `design-log.md` records each site's
  identity, so new sites go somewhere new.
- `docs/` and `.claude/` stay at the root. process-template's skills read `docs/process/` from
  there. One decision log serves the whole repo, and a record names its site when it's specific to
  one. The hub's design plan moves to `sites/hub/design-plan.md`.
- Rules that apply only to the hub (its colours, tints and type) move from `CLAUDE.md` to
  `.claude/rules/hub.md`, with `paths: sites/hub/**`.
- The local folder stays `C:\dev\website`. Grant can rename it later, and only
  `docs/process/project.md` names it.

## Alternatives considered

- **A fresh repo with the old one archived:** loses the history and the pull-request links.
- **A repo per site:** the heavy-repo problem is already solved by keeping web code apart, and a
  shared signature would be copied into each one.

## Consequences

- GitHub Pages publishes one site per repository, and this repo's is the hub
  ([0004](0004-github-pages-public-repo.md)). A product site in `sites/` needs another host. That
  choice is held in Backlog until the first product site is shaped.
- The launch workflow (KAN-733) builds `sites/hub/`. `withastro/action` looks for the lockfile
  only in its `path`, so it needs `package-manager` set, or a hand-written job.
- After the rename, check that Linear's GitHub integration still links pull requests.
- The move pull request should be merged with a merge commit, not squashed, so the pure-move
  commit survives.
