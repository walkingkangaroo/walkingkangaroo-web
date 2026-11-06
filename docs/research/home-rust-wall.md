# Research: the home page and header become the Rust wall

Date: 2026-11-06
Issue: WEB-2
Round: [docs/rounds/home-rust-wall.md](../rounds/home-rust-wall.md)

## The question

After the slim-down of 2026-11-06 ([0046](../decisions/0046-home-page-is-the-hero-and-devlog.md),
[0047](../decisions/0047-header-is-the-logo-alone.md)), the home page looked empty, and the
28 px logo in the header was easy to miss. Grant asked for redesign options that fill the page
around PanePilot, and for a header that brings Walking Kangaroo to your attention before the hero
project. A good outcome is a page that says who Walking Kangaroo is first, then shows PanePilot
bigger than it is now, and keeps the "Visit panepilot.au" button in the first screen on a laptop.

## What exists today

Read on 2026-11-06 in the repo and in the browser at 1440 × 900 (`pnpm dev`, the home page):

- **Header:** `sites/hub/src/components/SiteHeader.astro` is the primary horizontal logo, 28 px
  tall, linking home, with no links (0047). Every page gets it from
  `sites/hub/src/layouts/BaseLayout.astro`.
- **Home page:** `sites/hub/src/pages/index.astro` is `HomeHero`, then a Devlog section of
  the three newest published posts (none are published yet, so it doesn't show on the live site),
  then the newsletter band while `newsletterLive` is true (it is false, 0034).
- **Hero:** `sites/hub/src/components/HomeHero.astro`. Text on the left, the pane on the right at
  5:7 from 1024 px. The pane is 672 × 420 at 1440 wide. Its `h1` is PanePilot's lockup (0024).
  The pane holds the backdrop, the wide calendar and the phone in Ink bezels (0038), and the
  fog-and-sweep plays once (0024).
- **The page at 1440 × 900:** 1191 px tall. The hero is about 420 px tall, with a lot of Paper
  round it.
- **Brand pack** (`walking-kangaroo-brand-guidelines.pdf`, version 2.0, pages 2, 4, 5 and 7):
  the stacked logo is the main logo, "use it wherever there's room". "Paper on Rust" is an
  official one-colour combination, and the pack has `logo/stacked/svg/...-paper.svg` and
  `logo/horizontal/svg/...-paper.svg`. Paper on Rust is 5.73:1. Clear space is one foot length
  all round. No rotating, recolouring, outlines or effects on the logo.
- **Decisions that bear on it:** 0010 (seven site tints, no other colours), 0024 (the pane, the
  sweep and the lockup as `h1`), 0038 (the pane's composition), 0046 (home sections), 0047
  (header), and 0014 (Claude drafts the words, Grant rewrites them).
- **Other pages that share the header:** About, the devlog index and posts, the project pages and
  404. After 0047 nothing links to About or the project pages. With the Devlog section gone from
  home, nothing would link to the devlog either. KAN-919 (Ready for Build) publishes the five
  first devlog posts on launch day.

## Options

Each was built as a clickable mockup from the real logo files, screenshots and posts, at
https://claude.ai/artifact/UtehVfMfRHeZanwRgVNHC3 (version 1 had all three; version 2 is B
reworked).

### Option A: Ink masthead

- **What it is:** an Ink band across the top with the reversed horizontal logo at about twice
  today's size and one line about the studio. The pane runs off the page's right edge at about
  860 × 540.
- **Cost:** one issue: the header and the hero layout.
- **Risk:** low. It changes the least, but Walking Kangaroo and PanePilot read as two separate
  blocks.

### Option B: Rust wall (Grant's choice)

- **What it is:** the top of the page is a Rust wall with the Paper stacked logo and one line,
  centred, like a studio's name painted above the work it is showing. PanePilot's pane hangs
  across the wall's lower edge, and its label sits on the Paper below.
- **Cost:** two issues: the slim Rust band on every page, then the home page's wall and hero.
- **Risk:** the teal pane on Rust can only be judged in a browser. The label must never sit on
  Rust, because Ink on Rust is 2.46:1.

### Option C: Big words

- **What it is:** the stacked logo beside "I make games and apps." at display size, the hero as
  now, then four phone screens from quote to paid.
- **Cost:** two issues, and it brings back a PanePilot section that 0046 removed.
- **Risk:** Grant doesn't want more PanePilot sections than the hero (2026-11-06).

### B reworked, after Grant's notes of 2026-11-06

Grant chose B, with no devlog section and no other PanePilot section. With the label under the
pane, as in version 1, the button ended about 1000 px down a 1440-wide page, below a laptop's
first screen. In version 2 the label is a 380 px column to the right of the pane on laptops,
starting 24 px below the wall's edge. Measured in the browser at 1440 × 900:

| | Top (px) | Bottom (px) |
| --- | --- | --- |
| Rust wall | 0 | 384 |
| Pane, 764 × 478 | 269 | 747 |
| Label | 408 | 772 |
| "Visit panepilot.au" | 722 | 772 |
| Footer | 820 | 908 |

On a phone (390 px), the wall comes first, then the pane at 5:4 with 36% of its height on the
wall, then the label and a full-width button.

## What can't be known without building

- **How the sweep and the teal pane feel on Rust.** Grant judges it at Human QA, on his phone and
  a laptop.
- **The real first screen.** A laptop browser's own toolbars leave about 780 to 800 px of a
  900 px screen. The button ends at 772 px, so it should be in view; the built page should be
  checked at 1440 × 800.
- **Whether the words on the wall sound like Grant.** They are drafts from his About bio (0014).

## Sources

- Walking Kangaroo brand guidelines, version 2.0, September 2026, from
  `C:\dev\walkingkangaroo\brand\dist\walking-kangaroo-brand-pack\`, read 2026-11-06.
- The mockup, https://claude.ai/artifact/UtehVfMfRHeZanwRgVNHC3, versions 1 and 2, built and
  measured 2026-11-06.
