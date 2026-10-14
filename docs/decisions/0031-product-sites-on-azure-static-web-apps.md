# 0031. Product sites are hosted on Azure Static Web Apps, one app per site

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-900
- **Round:** [docs/rounds/kan-900-product-site-hosting.md](../rounds/kan-900-product-site-hosting.md), question 1

## Context

GitHub Pages serves one site per repository, and this repo's is the hub
([0004](0004-github-pages-public-repo.md)). Product sites live in `sites/<name>/` of the same repo
([0027](0027-one-web-repo-walkingkangaroo-web.md)), so they need another host. DNS stays at
VentraIP ([0005](0005-dns-stays-at-ventraip.md)). The options and their limits are in
[docs/research/kan-900-product-site-hosting.md](../research/kan-900-product-site-hosting.md).

## Decision

- Each product site is its own Azure Static Web App on the Free plan, in Grant's Azure
  subscription.
- **Its workflow.** Each site has its own workflow in `.github/workflows/`:
  - A `paths:` filter on `sites/<name>/**` and `packages/shared/**`, so one site's change doesn't
    redeploy the others.
  - It builds with pnpm, then uploads `dist/` with `Azure/static-web-apps-deploy` and
    `skip_app_build: true`.
  - Pull requests get preview links.
- **Its deployment token** goes into the repo's GitHub secrets, and Grant adds it himself. It's
  never committed and never pasted into chat.
- **Its 404 page and headers** come from a `staticwebapp.config.json` in the site's `public/`.
- **Domains.** A subdomain is a CNAME at VentraIP. An apex domain needs a TXT record for
  ownership, then one of these, chosen when that site deploys:
  - VentraIP's ALIAS record (unconfirmed at the apex);
  - a forward to `www`;
  - an A record to the app's `stableInboundIP`.

  Grant makes every DNS change (0005).
- **The hub stays on GitHub Pages** (0004).

## Alternatives considered

- **VentraIP cPanel with addon domains:**
  - About A$11 a month unless a plan is already paid for.
  - Uploads over FTP that weren't confirmed to work from GitHub Actions.
  - No preview links.
- **Netlify Free:** every site shares one allowance of about 20 deploys or 15 GB a month, and the
  sites are paused when it runs out.
- **GitHub Pages through an extra repo per site:** it goes against 0027, and GitHub's terms say
  Pages isn't free hosting for a business or SaaS site.
- **Cloudflare Pages:** an apex domain there needs the nameservers moved to Cloudflare, which
  breaks 0005.

## Consequences

- **The Free plan's limits:**
  - 10 apps per subscription.
  - 2 custom domains per app, enough for an apex and `www`.
  - 250 MB per environment.
  - 100 GB of traffic a month. Past that, the site stops until the month ends. Moving that one app
    to the Standard plan lifts the cap.
- **Nothing is built until a product site exists.** The first product site's shape gets a deploy
  issue that sets up its app, workflow and domain. Workflows change only through their own issue.
- **The deploy workflows are a risky area,** like the hub's, and get an `opus` review.
