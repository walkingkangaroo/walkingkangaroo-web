# 0028. The signature on product sites uses the brand pack's logo files unchanged

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md), question 1

## Context

Every product site carries a small Walking Kangaroo signature in its footer, linking back to
walkingkangaroo.com. The showcase-sites skill draws it as inline SVG in `currentColor`, so it takes
each site's colour. The brand pack says "Don't ... recolour" the logo, and this repo never
recolours it.

## Decision

- The signature is `packages/shared/WkSignature.astro`. It shows a logo file from the brand pack,
  copied in unchanged, linked to https://walkingkangaroo.com with the accessible name "Made by
  Walking Kangaroo".
- The product site picks the variant for its background: `primary` or `ink` on light backgrounds,
  `reversed` or `paper` on dark ones. It uses the small horizontal logo, or the stacked logo at 120
  px wide or more, as the brand pack sizes them.
- It never takes the product's colours.

## Alternatives considered

- **`currentColor`, as the skill says:** it matches each site but recolours the logo, which would
  need an exception to the brand rule.

## Consequences

- On a strongly coloured product site, the signature may be the one-colour ink or paper version
  rather than a colour match.
- The showcase-sites skill's `currentColor` instruction doesn't apply in this repo.
