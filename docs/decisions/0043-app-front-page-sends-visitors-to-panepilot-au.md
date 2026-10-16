# 0043. Once panepilot.au is live, the app's front page sends signed-out visitors there

- **Status:** Accepted
- **Date:** 2026-10-16
- **Issues:** KAN-937
- **Round:** [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md), question 4

## Context

`app.panepilot.au/` is a short public page today. PanePilot's KAN-885 adds a trial button and
pricing to it. It's also the home page on Google's sign-in consent screen. With panepilot.au
live, the two pages would say much the same thing.

## Decision

- When panepilot.au switches to the site, a signed-out visitor at `app.panepilot.au/` is sent
  to `https://panepilot.au`. A signed-in visitor goes on to their dashboard as today.
- The home page on Google's consent screen becomes `https://panepilot.au`. Grant changes it in
  the Google console.
- Privacy and terms stay in the app at `app.panepilot.au/privacy` and `/terms`. The site's footer
  links to them.
- In the same PanePilot issue, panepilot.au comes off the Container App and out of its deploy
  parameters, so the DNS change can point it at the site.

## Alternatives considered

- **Keep both pages:** two public descriptions and two places for the price.

## Consequences

- KAN-885's pricing section on the app's front page is seen only until the switch. Its sign-in
  note and its terms stay.
- The PanePilot issue and this repo's launch issue happen in one window, with Grant's DNS change
  between them.
