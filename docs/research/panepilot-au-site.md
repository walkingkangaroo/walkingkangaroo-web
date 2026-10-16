# Research: panepilot.au site

Date: 2026-10-16
Issue: https://linear.app/walkingkangaroo/issue/KAN-937/shape-panepilotau-site
Round: [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md)

## The question

Grant wants PanePilot's own website at `panepilot.au`, to tell window cleaners what PanePilot does
and start their free trial. The design is approved: a hero of real app screenshots in a wide
browser window, then five tabs, each a small working copy of one step of the round. The
plan is in [sites/panepilot/design-plan.md](../../sites/panepilot/design-plan.md), and the
working prototype is at https://claude.ai/artifact/GkN5Rm6DWhB541p34VFuT6 (v9). What's left to
settle is how it goes live, where people write to, and two seams with the PanePilot app.

## What exists today

- **The design plan** (`sites/panepilot/design-plan.md`, this branch). It was approved in chat
  across 2026-10-15 and 16, and Grant's answers are listed in it. It covers the palette, type,
  layout, the five demos, the sections and fallbacks.
- **Hosting is decided.** Each product site is its own Azure Static Web App on the Free plan,
  with its own workflow, a `paths:` filter and preview links ([0031](../decisions/0031-product-sites-on-azure-static-web-apps.md),
  [0035](../decisions/0035-pull-requests-get-preview-links.md)). An apex domain uses an ALIAS
  record, or else an A record, never forwarding ([0036](../decisions/0036-apex-uses-alias-or-an-a-record.md)).
  The hub went live on its Azure address before its domain ([0033](../decisions/0033-hub-goes-live-on-its-azure-address-first.md)).
- **The footer signature** is `packages/shared/WkSignature.astro`, from the brand pack ([0028](../decisions/0028-signature-uses-brand-pack-files.md)).
- **panepilot.au today.** Checked 2026-10-16:
  - `nslookup -type=A panepilot.au` gives 4.196.42.39, the PanePilot Container Apps
    environment's static IP.
  - `curl -I https://panepilot.au/` answers `308` to `https://app.panepilot.au/`. That's
    PanePilot decision 0052: "panepilot.au redirects to it until there is a public website to
    put there".
  - `www.panepilot.au` doesn't answer.
  - `nslookup -type=MX panepilot.au` returns no MX record, so nothing can be emailed to an
    `@panepilot.au` address. The app sends from `mail.panepilot.au`.
- **The app's own public page** is `app.panepilot.au/`, a short page with Sign in, six features
  and the "Built by a window cleaner" story (`src/app/(public)/page.tsx` in the PanePilot repo).
  It's also the home page Google's OAuth consent screen points at. PanePilot's KAN-885 (Ready
  for Build) adds the free-trial button and a pricing section to it.
- **Self-serve sign-up and the A$49 plan** are decided (PanePilot 0056 to 0062) and Ready for
  Build in PanePilot's milestone 12, but not built. Grant chose on 2026-10-15 that panepilot.au
  goes live with sign-up, with "Start your free trial" from day one.
- **Screenshots.** `docs/screenshots/website/` in the PanePilot repo has seven, from the
  invented demo business. Only `calendar-wide.png` is wide. The wide quote and paid invoice the
  hero needs are PanePilot's KAN-933 (Backlog). The demo seed's price book is $4.50 a standard
  pane, $6.00 a large pane and Ladder +20% (`prisma/demo-business/data.ts:84-103`). The site's
  demos use Grant's example prices: $7.50, $10.00 and Ladder +50%.

## Options

### Option A: build now, live on the Azure address, panepilot.au at sign-up

- **What it is:** Build the site and its deploy workflow now. Every merge is live at its
  `azurestaticapps.net` address for Grant to check on his phone, as the hub was (0033). The
  canonical links already say `https://panepilot.au`, so search engines are pointed there. The
  DNS switch waits for PanePilot's milestone 12.
- **Cost:** One issue for the deploy, plus one for the switch.
- **Risk:** Until sign-up ships, "Start your free trial" leads to a sign-in page that says
  there's no public sign-up. The Azure address isn't linked from anywhere, so few will see it.

### Option B: build now, deploy only at sign-up

- **What it is:** Build and check locally, then add the workflow when sign-up ships.
- **Cost:** The same issues, done later.
- **Risk:** The first deploy and the DNS switch land together, which 0033 chose against for the
  hub.

## What can't be known without building

- How the five demos feel on a real phone, one-handed: tap targets, the sideways tab row, the
  sped-up clock. The prototype answers most of it. A preview link on a pull request answers the
  rest.
- Lighthouse on the production build, with the screenshots and five islands. The budget is
  first-load JavaScript under about 50 KB, with each demo loading when its tab opens.

## Sources

- DNS and HTTP checks above: run from Grant's PC on 2026-10-16 with `nslookup` and `curl -I`.
- The PanePilot repo at `C:\dev\panepilot`, master at 788888b: decisions 0052, 0056 to 0062;
  `src/app/(public)/page.tsx`; `prisma/demo-business/data.ts`; `docs/screenshots/website/README.md`.
- Linear: PanePilot KAN-885, KAN-891 and KAN-933, read 2026-10-16.
- The competitor pages used for the plan (fergus.com, Jobber's and Housecall Pro's
  window-cleaning pages), read 2026-10-15. They are summarised in the design plan.
