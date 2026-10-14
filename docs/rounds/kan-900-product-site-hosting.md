# Decision round: how product sites in walkingkangaroo-web are hosted

Status: Answered
Opened: 2026-10-14
Issue: https://linear.app/walkingkangaroo/issue/KAN-900/choose-how-product-sites-in-walkingkangaroo-web-are-hosted
Research: [docs/research/kan-900-product-site-hosting.md](../research/kan-900-product-site-hosting.md)

To answer, edit the `Answer:` lines, reply in chat, or run
`/shape kan-900-product-site-hosting 1: A`. Say "use the defaults" to take every default below.

## Questions

### 1. Where should product sites in `sites/<name>/` be hosted by default?

The hub stays on GitHub Pages (0004). GitHub Pages serves only one site per repo, so product
sites need somewhere else.

- **A: Azure Static Web Apps, Free plan, one app per site.**
  - Free on your existing Azure subscription.
  - Each site gets its own deploy workflow, its own deployment token (you add it to GitHub's
    secrets) and preview links on pull requests.
  - Limits: 100 GB a month. On Free the site stops if it goes over; the paid plan lifts that.
  - An apex domain such as `example.au` needs a TXT record plus an ALIAS, a forward to `www`, or
    an A record at VentraIP.
- **B: VentraIP cPanel, one plan with each site as an addon domain.**
  - Uploaded over FTP from GitHub Actions.
  - About A$11 a month, unless you already pay for a plan.
  - No preview links, and FTP from Actions is unconfirmed on VentraIP.
- **C: Netlify, Free plan.**
  - No secrets in GitHub, and preview links.
  - All sites share one monthly allowance of about 20 deploys or 15 GB, and are paused when it
    runs out.
- **D: GitHub Pages, with one extra repo per site.**
  - Free, the same as the hub.
  - It brings back a repo per site, which 0027 chose against.
  - GitHub's terms say Pages isn't free hosting for a business or a SaaS site.
- **Recommendation:** A, because it's free, keeps each site's deploy separate, works with
  VentraIP's DNS, and is where you already run things (the showcase-sites skill's default).
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A. Grant, 2026-10-14: "Azure sounds good"

## Decided without asking

- **The hub stays on GitHub Pages (0004).** Moving it would reopen an Accepted decision, and nothing
  here needs it.
- **Cloudflare Pages is ruled out.** An apex domain there needs the nameservers moved to
  Cloudflare, which breaks 0005.
- **Nothing is built until a product site exists.** A deploy workflow with no site to deploy can't
  be checked, and workflows change only through their own issue (`docs/process/project.md`).
  The first product site's shape gets a deploy issue that follows this decision.
- **Each site's domain** (a walkingkangaroo.com subdomain or its own domain) is asked when that
  site is shaped, as the showcase-sites skill says.
- **An apex domain's records** are chosen when that site deploys. Try VentraIP's ALIAS record first
  (unconfirmed at the apex), then a forward to `www`, then an A record. Grant makes every DNS
  change (0005).
- **Tokens and other secrets** go into the repo's GitHub secrets by Grant's hand. Never in the
  repo, and never pasted into chat.

## Held out

- **Deploying the first product site:** Backlog,
  https://linear.app/walkingkangaroo/issue/KAN-908/deploy-the-first-product-site-to-azure-static-web-apps.
  It's built when that site is shaped.

## Outcome

- Decisions: [0031](../decisions/0031-product-sites-on-azure-static-web-apps.md), product sites are
  hosted on Azure Static Web Apps, one app per site.
- Spec or design changes: `CLAUDE.md` (Layout), `docs/process/project.md` (extra checks, CI,
  stop-and-ask), `docs/DECISIONS.md`.
- Issues: none to build now. The deploy is held out as KAN-908 (Backlog):
  https://linear.app/walkingkangaroo/issue/KAN-908/deploy-the-first-product-site-to-azure-static-web-apps
