# 0040. panepilot.au's site goes live on its Azure address first, and the domain switches when sign-up ships

- **Status:** Accepted
- **Date:** 2026-10-16
- **Issues:** KAN-937
- **Round:** [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md), question 1

## Context

Grant chose on 2026-10-15 that panepilot.au goes live with PanePilot's self-serve sign-up
(PanePilot milestone 12), so "Start your free trial" works from day one. Until then panepilot.au
redirects to the app (PanePilot decision 0052). The hub went live on its Azure address before
its domain ([0033](0033-hub-goes-live-on-its-azure-address-first.md)).

## Decision

- The site is built now, with its deploy workflow (0031). From that merge, every merge to
  `main` that touches it is live at its `azurestaticapps.net` address, for Grant to check.
- The site is built for `https://panepilot.au` with no base path, and its canonical links
  point there.
- panepilot.au and `www.panepilot.au` are pointed at it once sign-up has shipped (0036). Grant
  makes the DNS change (0005).

## Alternatives considered

- **Build locally, and deploy only when sign-up ships:** the first deploy and the DNS switch
  would land on the same day.

## Consequences

- Until sign-up ships, "Start your free trial" on the Azure address leads to a sign-in page that
  still says there's no public sign-up. The address isn't linked from anywhere.
- The switch needs the app's side too: panepilot.au comes off the Container App
  ([0043](0043-app-front-page-sends-visitors-to-panepilot-au.md)).
