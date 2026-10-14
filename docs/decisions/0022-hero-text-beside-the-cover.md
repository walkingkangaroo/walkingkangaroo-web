# 0022. The home hero shows the featured cover beside or above its text, never behind it

- **Status:** Superseded by [0024](0024-home-hero-is-the-fogged-pane.md)
- **Date:** 2026-10-07
- **Issues:** KAN-769
- **Round:** none: Grant's choice on KAN-754 (2026-10-06, text beside or below the image) and on KAN-769 (2026-10-07, whole cover, about 480 px tall)

## Context

The B2 board, which [0001](0001-b2-daylight-design.md) adopted, puts the featured project's text in
a Paper panel laid over the cover, bottom left, inside a 600 px card. The panel hid part of the
cover. Grant chose to show the text beside or below the cover instead (KAN-754). Asked which
mattered more in a side-by-side desktop hero, the whole cover or the current 600 px height, he chose
the whole cover at about 480 px tall (KAN-769).

## Decision

- **Desktop (1024 px and wider):** a split hero. The text is on the left, on the page background, and
  the cover is on the right as a rounded 16:9 panel. They sit side by side with no overlap. The
  hero is about 450 px tall at 1440 px wide, set by the cover's height.
- **Tablet and phone (under 1024 px):** the 16:9 cover sits above the text, both the full width.
- The cover is always shown whole, never cropped to fit the text. Where the text is taller than the
  cover, the hero grows to the text and the cover stays whole, centred beside it.
- The footprint trail stays inside the cover panel's top right corner, scaled with the panel, and
  never sits over the text.

Everything else in 0001 stands: the footprint trail, the project cards, the stage meter, the devlog,
the about section and the newsletter band.

## Alternatives considered

- **Keep the overlay and shrink the text panel:** still hides part of the cover.
- **Text below the cover at every width:** a much taller hero on desktop.
- **A taller split hero (600 px) with the cover cropped:** loses the sides of a 16:9 composition
  with a centred subject; Grant chose the whole cover.

## Consequences

- The hero is about 150 px shorter on desktop than the board.
- At the narrowest desktop widths the text column is narrow and the hero is taller than the cover.
- The cover art and content files are unchanged.
