# 0029. PanePilot's project page leads with "Go to panepilot.au" and its lockup

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md), question 4

## Context

Every project page has one button, "Follow this project", which goes to the newsletter. The
PanePilot page's main job, like the home page's, is to send window cleaners to panepilot.au.

## Decision

- PanePilot's page has two buttons: "Go to panepilot.au" first, then "Follow this project".
- Its `h1` is PanePilot's lockup SVG, as on the home hero
  ([0024](0024-home-hero-is-the-fogged-pane.md)), with the accessible name "PanePilot".
- It shows the same screenshots as the home page once they exist
  ([0026](0026-panepilot-screenshots-from-a-demo-business.md)).
- Game pages are unchanged.

## Alternatives considered

- **"Follow this project" alone, as on the game pages:** the page would never send anyone to the
  app.

## Consequences

- The lockup, the link's label and the link's address come from optional fields in the project's
  content file, so any later product with its own site can use them too.
