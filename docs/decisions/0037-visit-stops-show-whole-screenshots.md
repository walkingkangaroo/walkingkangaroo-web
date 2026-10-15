# 0037. Each stop in "How a visit goes" shows its screenshot whole, below its text

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-924
- **Round:** none: Grant's request and answers of 2026-10-15, recorded in KAN-924

## Context

[0025](0025-home-sections-panepilot-first.md) gave each stop in "How a visit goes" a cropped
screenshot. KAN-899 built that as one 780 × 935 frame per stop with `object-fit: cover`, so up to
42% of each screenshot was hidden, and stop 4 split its frame between the paid invoice and the
approved time. Grant: "it looks wrong having it cropped the way it currently is".

## Decision

- Each stop is its number, heading and text, then its screenshot, shown whole at its own aspect
  ratio. No crop, no frame shape. The 1 px border and 14 px radius stay.
- From 900 px the four stops sit in a row: the numbers and headings line up, the pictures' tops
  line up, and their bottoms are left uneven.
- Under 900 px the stops stack, and a picture is no wider than 320 px.
- Stop 4 shows only the paid invoice. The approved-time screenshot stays on PanePilot's page.
- No phone frame around the pictures: the plain border, as before.

## Alternatives considered

- **Keep the crops:** Grant's reason for the change. A slice doesn't read as a real screen of the
  app.
- **Picture above the text:** Grant chose number, heading and text above, the picture below,
  with the pictures' tops aligned and their bottoms uneven.
- **Both pictures at stop 4:** Grant chose the invoice alone.

## Consequences

- The band is taller on desktop: the quote is about 580 px tall in a 280 px column.
- `position` and `weight` are gone from the `screenshots` schema. A stop's picture is just an entry
  with `stop`, so stop 2's calendar (KAN-913) is one more entry.
- Everything else in 0025 stands.
