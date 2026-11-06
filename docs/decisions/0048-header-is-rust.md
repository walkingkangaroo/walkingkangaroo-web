# 0048. The header is Rust: a wall on the home page and a slim band on every other page

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** WEB-2
- **Round:** [docs/rounds/home-rust-wall.md](../rounds/home-rust-wall.md), question 2 and "Already answered"
- **Supersedes:** [0047](0047-header-is-the-logo-alone.md)

## Context

After [0047](0047-header-is-the-logo-alone.md) the header was a 28 px logo on Paper, and Grant
found it easy to miss: he asked for a header that brings Walking Kangaroo to your attention before
the hero project. From three mockups (https://claude.ai/artifact/UtehVfMfRHeZanwRgVNHC3) he chose
B, the Rust wall, on 2026-11-06, and chose a slim Rust band for every other page (question 2: A).

## Decision

- **Home page:** the header is the Rust wall in [0049](0049-home-page-is-the-rust-wall.md).
- **Every other page** (About, the devlog index and posts, the project pages, 404): a full-width
  Rust band holding the brand pack's horizontal logo in Paper,
  `logo/horizontal/svg/walking-kangaroo-logo-horizontal-paper.svg`, copied unchanged. It links
  home, with the accessible name "Walking Kangaroo home".
  - The logo is 26 px tall under 720 px wide and 30 px from 720 px (177 and 204 px wide, above
    the pack's 160 px minimum for the full horizontal logo).
  - The band keeps at least one foot length clear above and below the logo, the pack's clear
    space: 25 px at 26 px tall and 28 px at 30 px. So the band is about 76 px tall on a phone
    and 86 px on a laptop. The mockup showed 66 and 82 px, before the clear space was checked.
  - The logo sits at the page column's left edge, as today.
- **No links** in either header, as in 0047.
- **Colours:** Rust, Paper and Ink only. Text and the logo on Rust are Paper (5.73:1). The focus
  outline on Rust is Paper, because Ink on Rust is 2.46:1.

## Alternatives considered

- **Other pages keep today's Paper header** (question 2, B): the home page would look like a
  different site from the rest.
- **An Ink masthead** (mockup option A): Walking Kangaroo and PanePilot read as two separate
  blocks.
- **The studio line set at display size on Paper** (mockup option C): it came with a PanePilot
  section Grant doesn't want.

## Consequences

- `SiteHeader` becomes the slim band, and the home page uses the wall in its place.
- The brand pack's horizontal and stacked Paper logos are copied into
  `sites/hub/src/assets/brand/`.
- The browser's theme colour, already Rust (`#9E3B22`), now matches the top of every page.
