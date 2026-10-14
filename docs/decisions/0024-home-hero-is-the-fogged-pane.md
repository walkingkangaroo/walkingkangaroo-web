# 0024. The home hero is PanePilot's fogged pane, cleared by one sweep

- **Status:** Accepted
- **Date:** 2026-10-14
- **Issues:** KAN-893
- **Round:** none: Grant's answers of 2026-10-14 in [sites/hub/design-plan.md](../../sites/hub/design-plan.md), recorded in [docs/rounds/hub-leads-with-panepilot.md](../rounds/hub-leads-with-panepilot.md)

## Context

With PanePilot featured ([0023](0023-panepilot-is-featured-at-beta.md)), the hero's job changes
from showing game cover art to sending window cleaners to panepilot.au. Grant reviewed the design
plan against a clickable mockup (https://claude.ai/artifact/RWJKnAbkrJUm6hT6jHpkjG) on 2026-10-14.
This supersedes [0022](0022-hero-text-beside-the-cover.md) and the hero's footprint trail in
[0001](0001-b2-daylight-design.md).

## Decision

- **The pane:** a rounded media panel, 5:4 under 1024 px wide and 16:10 from 1024 px. PanePilot's
  cover fills it as a backdrop, cropped to fit. When screenshots exist
  ([0026](0026-panepilot-screenshots-from-a-demo-business.md)), the phone job card stands on the
  cover in a plain CSS phone frame. The scene is composed in HTML and CSS, not exported as one
  image.
- **The sweep:** the pane opens lightly fogged, with the `--site-media` tint at about 70% and a
  Paper haze. About 0.4 s after load, one squeegee stroke, curved like PanePilot's Curved Sweep
  mark, crosses it from top right to bottom left in about 0.9 to 1 s, and the glass is clean. A
  thin wet edge in Paper and Ink at partial opacity trails the blade. It plays once.
- **CSS only:** a mask and a keyframe, with no JavaScript. Where the animation can't run, the pane
  is clean. With `prefers-reduced-motion: reduce`, the pane is clean from the start. The buttons
  are live and visible from the first paint.
- **No footprints** on or around the pane. The pane is PanePilot's alone.
- **The text:** under 1024 px it sits below the pane; from 1024 px it sits on the left, with the
  pane on the right, side by side and never overlapping. In order: the eyebrow "Going live in
  November · Web and phone"; the `h1`, which is PanePilot's lockup SVG (`logo-horizontal.svg`,
  copied unchanged, accessible name "PanePilot"), never "PanePilot" set in Outfit; a headline line
  in Outfit SemiBold; one sentence; the stage meter (Beta, step 4 of 5); then the buttons.
- **The buttons:** "Go to panepilot.au" (to https://panepilot.au, Paper on Rust, 5.7:1) and "See
  how it works" (to the home page's "How a visit goes" section). On a phone they span the full
  width.
- **Colours:** no new CSS colours. PanePilot's teal appears only through its own lockup, cover and
  screenshots. [0010](0010-site-tints.md) stands.
- **The header** gains "PanePilot" as its first link, going to the hub's PanePilot page. It
  still wraps under the logo on a phone ([0013](0013-phone-header-wraps.md)).

## Alternatives considered

- **Keep the 0022 hero with PanePilot's cover:** a static image does nothing PanePilot-specific.
- **A floating laptop and phone on a gradient:** the generic field-service look (the design
  plan's generic check).
- **A teal accent in the hub's CSS:** it would make the hub a sibling of a future PanePilot site.

## Consequences

- The hero is now specific to the featured project's assets: the lockup, the eyebrow and the
  headline come from the project's content file, so the hero stays data-driven.
- The cover is cropped in the pane. The project page still shows it whole.
- How the sweep feels can only be judged in a browser. Grant judges it at Human QA.
