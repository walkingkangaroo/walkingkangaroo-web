# 0032. The hub is hosted on Azure Static Web Apps, at walkingkangaroo.com

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-733
- **Round:** [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md), Grant's note and "Decided without asking"

## Context

[0004](0004-github-pages-public-repo.md) put the hub on GitHub Pages, and
[0031](0031-product-sites-on-azure-static-web-apps.md) kept it there while product sites went to
Azure. On 2026-10-15 Grant said: "move away from github pages. all sites including the hub will
be hosted on azure". The research is in
[docs/research/kan-733-hub-on-azure.md](../research/kan-733-hub-on-azure.md).

## Decision

- The hub is its own Azure Static Web App on the Free plan, in Grant's subscription, set up the
  way 0031 sets up a product site.
- **Its workflow** is `.github/workflows/deploy-hub.yml`:
  - It has a `paths:` filter on `sites/hub/**`, `pnpm-lock.yaml`, the root `package.json`,
    `pnpm-workspace.yaml`, `.nvmrc` and the workflow itself. The hub doesn't use
    `packages/shared/`, so that folder isn't in the filter.
  - It builds with pnpm, then uploads `sites/hub/dist` with `skip_app_build: true`.
- **Its token** is a repo secret named for the site. Grant creates the app and adds the token.
- **Its config** is `sites/hub/public/staticwebapp.config.json`. It sets the 404 page, trailing
  slashes to match Astro's output, caching for `/_astro/`, and plain security headers.
- **Its address** is `https://walkingkangaroo.com`. Both the apex and `www` are added to the app.
  The apex is set as Azure's default domain, so `www` redirects to it.
- **The domain switch:**
  - A TXT record goes in first, so Azure checks ownership while the old A record still serves.
  - Then the apex record goes in, as [0036](0036-apex-uses-alias-or-an-a-record.md) says, and
    `www` becomes a CNAME.
  - The MX and `google-site-verification` records are never touched (0005).
- The repo stays public (0004). There's no `CNAME` file.

## Alternatives considered

- **GitHub Pages, as 0004 planned:** Grant chose one host for every site.

## Consequences

- 0004's GitHub Pages hosting, 0005's GitHub Pages records, and 0031's "the hub stays on GitHub
  Pages" are superseded. Everything else in them stands.
- The hub's workflow is the pattern product sites copy (KAN-908).
- The Free plan's limits apply to the hub too (0031): 100 GB a month, and the site stops past
  that until Grant moves it to Standard.
