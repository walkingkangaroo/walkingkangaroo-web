# 0038. The home hero shows PanePilot on a wide screen and a phone, over the swoops without the mark

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-923
- **Round:** none: Grant's request of 2026-10-15 with a reference image, recorded in KAN-923

## Context

[0024](0024-home-hero-is-the-fogged-pane.md) put one phone on PanePilot's cover. The cover's mark
sat behind the phone. Grant asked for the owner's wide screen and the phone together, so a visitor
sees both sides of PanePilot at once, with the swoops behind them and no mark in the middle.

## Decision

- **Backdrop:** the pane is filled with Grant's version of the cover that has the swoops and bubbles
  but no mark. It is copied in unchanged. The hero reads it from its own field in the project's
  content file, `heroBackdrop`, and falls back to `cover`. `cover` is unchanged on the project page
  and the cards.
- **Wide screen:** a new `wide` field. It is the week calendar with the Example St shops run, on the
  owner's side at 1440 × 900, from the demo business ([0026](0026-panepilot-screenshots-from-a-demo-business.md)).
  It sits in a plain CSS frame like the phone's: an Ink bezel (a little thinner), the same ring
  and the same shadow. No browser chrome and no laptop body.
- **Composition:** the wide screen is left of centre and fills most of the pane. The phone stands in
  front of its lower right corner. Sizes are shares of the pane's width, W, and height, H (5:4 under
  1024 px, so H = 0.8 W; 16:10 from there, so H = 0.625 W).
  - Wide screen: 78% of W wide, 4% from the left, frame 0.497 W tall (bezel 1.2% of W). Top at 10%
    of H at 5:4 and 5% of H at 16:10.
  - Phone: 9% from the right and 5% from the bottom (bezel 1.6% of W). Height 47.5% of H at 5:4 and
    60.8% of H at 16:10. Both are 0.38 W, so the phone is the same size against the pane's width at
    both ratios, 19.3% of W wide and 76% of the wide screen's height.
  - The phone covers the wide screen's right 10.3% of W: the Sun column and the empty space below
    the week's cards. Sat is fully visible. The Thu column and its Shops run block are not covered.
    Both stay inside the pane with a margin.
- **One device alone:** a project with only `phone` keeps 0024's centred phone. One with only `wide`
  gets it centred.
- **The sweep:** unchanged. The fog and blade are above both devices and clear them in the one
  stroke. With reduced motion the pane is clean from the first frame.
- **No new colours.** Teal appears only through PanePilot's own images.
- Both screenshots are decorative in the hero, with empty alt text.

## Alternatives considered

- **A floating laptop and phone on a gradient:** 0024 rejected it as the generic field-service
  look. This differs: the swoops stay as the backdrop, the fog and the sweep stay, and there is no
  laptop body and no gradient. The frames are plain.
- **Keep the phone alone:** Grant's reason for the change is to show both sides at once.
- **Paint the mark out in CSS:** covers are Grant's art ([0016](0016-grant-supplies-covers.md)).
  The mark is never painted out, cropped away or covered in code. The backdrop comes without it.

## Consequences

- The hero now reads three images from the content file: `heroBackdrop`, `wide` and `phone`.
- A new PanePilot brand build that changes the backdrop or the calendar is copied in unchanged.
- Everything else in 0024 stands.
