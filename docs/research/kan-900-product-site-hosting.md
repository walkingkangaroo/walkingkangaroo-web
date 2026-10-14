# Research: how product sites in walkingkangaroo-web are hosted

Date: 2026-10-14
Issue: https://linear.app/walkingkangaroo/issue/KAN-900/choose-how-product-sites-in-walkingkangaroo-web-are-hosted
Round: [docs/rounds/kan-900-product-site-hosting.md](../rounds/kan-900-product-site-hosting.md)

## The question

This repo is meant to hold the hub and a site for each product in `sites/<name>/`
([0027](../decisions/0027-one-web-repo-walkingkangaroo-web.md)). GitHub Pages serves one site
per repository, and this repo's is the hub ([0004](../decisions/0004-github-pages-public-repo.md)),
so product sites need another host. A good outcome is one default host that every product site
uses the same way:

- a deploy that keeps DNS at VentraIP ([0005](../decisions/0005-dns-stays-at-ventraip.md));
- no secrets in the public repo;
- each site deploying on its own;
- no cost, or close to it.

## What exists today

- **No product site yet.** `sites/` holds only `hub/` (`ls sites`). `packages/shared/` has the
  signature product sites will use ([0028](../decisions/0028-signature-uses-brand-pack-files.md)).
- **No deploy workflow yet.** There's no `.github/workflows/` (`ls .github`). The hub's GitHub
  Pages workflow is built at launch (KAN-733, [0011](../decisions/0011-publish-at-launch.md)).
- **0027, Consequences:** "A product site in `sites/` needs another host. That choice is held in
  Backlog until the first product site is shaped." This round settles that choice now, as a default.
- **The showcase-sites skill** (`~/.claude/skills/showcase-sites/references/deploy.md`) names two
  hosts:
  - **Azure Static Web Apps,** the default for product sites, because "Grant already runs projects
    on Azure". It's one app per site, each with its own workflow and a `paths:` filter.
  - **cPanel at VentraIP,** "a good fit for the hub".

  It says to ask per site, and that deploys and DNS changes are Grant's call.
- **DNS:** walkingkangaroo.com and panepilot.au both use VentraIP's DNS, and Grant edits it (0005).
  On 2026-10-05 walkingkangaroo.com's apex pointed at a VentraIP address that served a blank page
  (0005). It isn't known here whether a VentraIP hosting plan is still paid for.
- **Domains:** each product gets a subdomain of walkingkangaroo.com or its own domain. The skill
  says to ask per product. That's out of scope here.

## Options

Each option was checked against the docs on 2026-10-14.

### Option A: Azure Static Web Apps, Free plan, one app per site

- **What it is:**
  - Each product site is its own Static Web App.
  - It has its own workflow in `.github/workflows/` with a `paths:` filter on `sites/<name>/**`
    and `packages/shared/**`.
  - The workflow builds with pnpm, then uploads `dist/` with `Azure/static-web-apps-deploy`
    (`skip_app_build: true`).
  - Pull requests get preview URLs (3 on Free).
- **Cost:**
  - Free: 10 apps per subscription, 2 custom domains per app, 250 MB per environment, and 100 GB
    a month. On Free the site stops serving past the bandwidth limit; there's no overage.
  - It needs an Azure subscription. Grant has one.
  - Each site needs one deployment token, which Grant puts in the repo's GitHub secrets himself.
  - Per site: one workflow and a `staticwebapp.config.json` for the 404 page and headers.
- **Domains with VentraIP DNS:**
  - A subdomain is a CNAME to the app's `azurestaticapps.net` name.
  - An apex such as `example.au` needs a TXT record to prove ownership. Then one of these:
    - an ALIAS record, which VentraIP's control panel lists but which isn't confirmed to work at
      the apex;
    - forwarding the apex to `www`;
    - an A record to the app's `stableInboundIP`.

    Azure says an A record loses global distribution and serves from one regional host. That's
    fine for a small site.
- **Risk:**
  - The 100 GB cap stops the site, and a launch spike is the likeliest cause. Moving that site to
    the Standard plan (about US$9 a month) lifts it.
  - Choosing how to handle an apex domain is a per-site step at deploy time.

### Option B: VentraIP cPanel, one hosting plan with addon domains

- **What it is:** each product site is an addon domain on one cPanel plan. A workflow builds the
  site and uploads `dist/` over FTP to that domain's folder, with an `.htaccess` for the 404 page
  and caching.
- **Cost:**
  - About A$11 a month at the regular price, unless Grant already pays for the plan.
  - Each site needs FTP credentials in GitHub secrets.
  - SFTP is off by default and allows only whitelisted IPs, which GitHub's runners don't have, so
    plain FTP or FTPS is the practical route.
  - AutoSSL issues free certificates for domains pointed at the server.
- **Risk:**
  - FTP from Actions is unconfirmed on VentraIP.
  - No pull-request previews.
  - Every site shares one server.

### Option C: Netlify, Free plan, one site per package

- **What it is:** Netlify's Git integration builds each site from its folder. No secrets live in
  GitHub, and pull requests get previews.
- **Cost:**
  - Free.
  - The 300-credit monthly cap is shared by every site on the account: about 20 production
    deploys, or about 15 GB of bandwidth, a month in total.
  - An apex domain takes an A record to `75.2.60.5`.
- **Risk:**
  - The shared credit cap is easy to hit once there are a few sites. When it's hit, the sites are
    paused.
  - Its monorepo docs cover npm and yarn workspaces, not pnpm.

### Option D: GitHub Pages, through one extra repo per site

- **What it is:** a workflow here builds the site and pushes `dist/` to a separate public repo
  that serves it on Pages (`peaceiris/actions-gh-pages` with `external_repository`).
- **Cost:**
  - Free.
  - Each site needs an extra repo and a deploy key in secrets.
  - An apex domain takes the same four A records as the hub.
- **Risk:**
  - It brings back a repo per site, which 0027 chose against.
  - GitHub's terms say Pages isn't free hosting for an online business, or for a site "primarily
    directed at" commercial transactions or SaaS. A product's marketing site could be read that
    way.

### Ruled out: Cloudflare Pages

An apex custom domain requires moving the domain's nameservers to Cloudflare, which breaks 0005.

## What can't be known without building

- **Whether VentraIP's ALIAS record works at an apex.** It decides between ALIAS, forwarding and
  an A record for the first product on its own domain. The cheapest test is to add one when that
  site deploys.
- **Whether Azure's deploy action is happy with a pnpm workspace.** Building in a prior step with
  `skip_app_build` avoids the question. The first site's workflow will show it.

## Sources

Read on 2026-10-14. A subagent's report was checked by opening the pages marked "checked".

- GitHub Pages: "Maximum of one pages site per repository":
  https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- GitHub Pages limits and prohibited uses (checked):
  https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- `peaceiris/actions-gh-pages`, `external_repository`: https://github.com/peaceiris/actions-gh-pages
- Azure Static Web Apps quotas, updated 2026-09-28 (checked):
  https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
- Azure Static Web Apps apex domains with external DNS (checked):
  https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external
- Azure Static Web Apps build configuration (`app_location`, `skip_app_build`):
  https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Netlify external DNS: https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/
- Netlify credit-based plans:
  https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- VentraIP DNS record types (lists ALIAS; apex use unconfirmed):
  https://ventraip.com.au/support-centre/add-remove-or-manage-dns-records-within-vipcontrol/
- VentraIP SSH/SFTP whitelist: https://ventraip.com.au/faq/article/enabling-ssh-and-sftp-access-on-a-hosting-service
- VentraIP AutoSSL: https://ventraip.com.au/support-centre/enabling-autossl-on-your-web-hosting-service/
- VentraIP plan price, from a third-party listing (unverified): https://www.whtop.com/plans/ventraip.com.au/83539
- Azure Standard plan price (about US$9 a month): from memory of Azure's pricing page, unverified.
