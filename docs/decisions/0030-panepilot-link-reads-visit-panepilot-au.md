# 0030. Links to PanePilot's website read "Visit panepilot.au"

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-902
- **Round:** none: Grant's instruction on 2026-10-14, while reviewing KAN-898

## Context

[0024](0024-home-hero-is-the-fogged-pane.md) and [0029](0029-panepilot-page-leads-to-panepilot-au.md)
labelled the primary button "Go to panepilot.au". The "Built on our own round" block (0025) ended
with "See PanePilot at panepilot.au". Grant asked for the link text to PanePilot's website to say
just "Visit panepilot.au".

## Decision

Every link to https://panepilot.au on the hub reads "Visit panepilot.au": the home hero's primary
button, the primary button on PanePilot's project page (both from `link.label` in
`panepilot.md`), and the link at the end of "Built on our own round".

## Consequences

- The label lives in one content field for both buttons, and in `OwnRound.astro` for the story link.
- Everything else in 0024 and 0029 stands.
