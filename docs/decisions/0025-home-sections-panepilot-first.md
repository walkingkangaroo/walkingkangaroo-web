# 0025. After the hero, the home page shows how a visit goes, our own round, and the games as a list

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** none: Grant's answers of 2026-10-14 in [docs/design-plan.md](../design-plan.md), recorded in [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md)

## Context

[0001](0001-b2-daylight-design.md) put "Also in the works" cards and the "Five steps to launch"
strip on the home page. With PanePilot leading ([0023](0023-panepilot-is-featured-at-beta.md)),
the page needs to explain the app to a window cleaner on a phone, and the games become secondary.

## Decision

The home page, in order:

1. The hero ([0024](0024-home-hero-is-the-fogged-pane.md)).
2. **How a visit goes:** four stops in order on a `--site-panel` band: quote per pane; the visits
   come round; do the visit from your phone; invoice it and pay the crew. Each stop has a number,
   a heading, two lines and, once it exists, a cropped screenshot. The numbers mean something
   here because it's a sequence. There are no footprints between the stops.
3. **Built on our own round:** a left-aligned editorial block in Grant's voice, with no image,
   ending in a link to panepilot.au.
4. **Also in the works:** the four games as rows, not cards. Each row has a small 16:9 cover
   thumbnail, the name, the one-liner, a small stage meter, and a link to the project page. The
   whole list is about one phone screen tall.
5. The devlog (once posts are published), about, the newsletter band and the footer, as now.

The "Five steps to launch" strip comes off the home page. It was only ever on the home page:
project pages already show all five step names in their stage panel, so the strip component is
removed rather than moved.

## Alternatives considered

- **Feature icons in cards:** generic. The stops use real screenshots of PanePilot's own flow.
- **Keep the game cards:** they double the page's length for the secondary audience.
- **Keep the strip on home:** the meter is always labelled in text (0009), so the strip repeats
  it.

## Consequences

- The vocabulary is PanePilot's own: visit, pane, run, invoice, "Mark accepted". Never job,
  appointment or bill. Claude drafts the words and Grant rewrites them
  ([0014](0014-claude-drafts-grant-rewrites.md)).
- "Built on our own round" states only what PanePilot's docs confirm. "Hosted in Australia" waits
  until Grant confirms where the database lives.
- `ProjectCard` and `StepsStrip` are no longer used and are removed.
