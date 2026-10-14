# 0026. PanePilot's screenshots come from a demo business with invented data, and the page doesn't wait for them

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md), question 2, and Grant's answers of 2026-10-14 in [docs/design-plan.md](../design-plan.md)

## Context

The hero pane and "How a visit goes" need real screenshots of PanePilot, and none exist. A
screenshot of the live app could show a real customer's name, address, phone number or price.

## Decision

- The screenshots are taken from a demo business seeded with invented data in the PanePilot repo:
  the job card on a phone, a per-pane quote, the week calendar with a run, and a paid invoice with
  a worker's approved time. The seed is shaped and built in the PanePilot repo.
- This repo takes the finished, optimised, cropped images. Before they go on the page, every
  name, business, address, phone number, email address and amount in each one is checked against
  the demo seed. Anything that isn't in the seed stops the issue.
- The redesign is built first (question 2, default A). Until the screenshots arrive, the pane
  shows the cover alone and the stops have no picture. Nothing hand-drawn stands in for the app.

## Alternatives considered

- **Grant supplies screenshots:** he chose the seeded demo instead.
- **Hand-drawn stand-ins, as in the mockup:** they aren't the real app.
- **Hold the redesign until the screenshots exist:** it would block the page on another repo's
  work with no date.

## Consequences

- The screenshots issue is blocked by the PanePilot seed as well as by the redesign issues.
- Images follow the repo's size rule: anything over 500 KB needs a reason in the pull request.
