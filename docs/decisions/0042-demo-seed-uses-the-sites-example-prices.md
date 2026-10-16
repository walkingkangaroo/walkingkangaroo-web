# 0042. The demo business's price book changes to the site's example prices before the wide screenshots

- **Status:** Accepted
- **Date:** 2026-10-16
- **Issues:** KAN-937, PanePilot KAN-933
- **Round:** [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md), question 3

## Context

The site's demos use Grant's example prices: $7.50 a standard pane, $10.00 a large pane, and
Ladder +50%. The demo business the screenshots come from charges $4.50, $6.00 and Ladder +20%
(PanePilot `prisma/demo-business/data.ts`). The hero's wide quote and invoice (PanePilot KAN-933)
haven't been captured yet.

## Decision

- A PanePilot issue changes the demo seed's price book to $7.50 a standard pane, $10.00 a large
  pane and Ladder +50%. It's done before KAN-933 captures the wide screenshots.
- The phone screenshots already committed in PanePilot's `docs/screenshots/website/` aren't
  re-taken. Their README says which prices they were captured with.

## Alternatives considered

- **Keep the seed's prices:** the hero's screenshots and the tabs would show different prices.

## Consequences

- The hub's screenshots keep the old prices. That's fine: the hub doesn't show the demos.
- Any later capture from the demo business shows the new prices.
