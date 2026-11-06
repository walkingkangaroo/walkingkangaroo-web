# 0051. On laptops, 14% of PanePilot's pane hangs onto the Rust wall

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** —
- **Round:** none: Grant's answer of 2026-11-06 in the session, after he looked at mockups of 24%, 14% and 8% at 1440 × 900
- **Amends:** [0049](0049-home-page-is-the-rust-wall.md) (how much of the pane is on the wall from 1024 px)

## Context

Once [0049](0049-home-page-is-the-rust-wall.md) went live, Grant said the pane looked too high
against its text, though he liked it overlapping the Rust. The label must start below the wall's
edge, because Ink on Rust is 2.46:1. So the only way to bring the pane down against its label is
to put less of the pane on the wall.

At 1440 × 900 with 24% on the wall, the pane started 139 px above the label and ended 28 px above
the button.

## Decision

From 1024 px, **14%** of the pane's height is on the wall, down from 24%. Everything else in 0049
stands:

- The label still starts 24 px below the wall's edge.
- The pane's size and its place under the wall's sentence don't change.
- Under 1024 px, 36% of the pane is still on the wall, with the label below the pane.

The overlap is the one `--overlap` length on the home page's `.home` container, in
`sites/hub/src/pages/index.astro`.

Measured on the built site:

| Width | On the wall | Pane starts above the label | Pane ends below the button | Page height |
| --- | --- | --- | --- | --- |
| 1440 × 900 | 66.8 px | 90.8 px | 20.2 px | 909 px |
| 1024 × 768 | 43.1 px | 67.1 px | ends 125.5 px above it | 866 px |

## Alternatives considered

- **24% (0049 as built):** the pane looked too high against the text.
- **8%:** this nearly centres the label on the pane at 1440 px. But only 25 px of the pane is on
  the wall at 1024 px, and Grant wants the overlap to read clearly.
- **Keeping the wall's height and moving the pane down instead:** the page passes 940 px at
  1440 × 900, and the pane drifts away from the wall's sentence.

## Consequences

- The wall's Rust edge sits higher, so at 1440 × 900 the page is 28 px shorter (909 px) and the
  button ends at about 738 px.
- At 1024 px the label is still taller than the pane, so the pane ends above the button there.
