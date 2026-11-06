# 0049. The home page is the Rust wall, with PanePilot's pane hung across its edge, and nothing else but the footer

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** WEB-2
- **Round:** [docs/rounds/home-rust-wall.md](../rounds/home-rust-wall.md), "Already answered"
- **Supersedes:** [0046](0046-home-page-is-the-hero-and-devlog.md); amends [0024](0024-home-hero-is-the-fogged-pane.md) (the `h1` and where the text sits)

## Context

After [0046](0046-home-page-is-the-hero-and-devlog.md) slimmed the home page, it looked empty and
Walking Kangaroo was easy to miss. Grant chose option B from the mockups on 2026-11-06 ("I like
B"), and asked for no devlog section and no PanePilot section other than the hero. Version 2 of
the mockup (https://claude.ai/artifact/UtehVfMfRHeZanwRgVNHC3) is the reference.

## Decision

**The page, in order:** the wall, PanePilot's hero, the newsletter band once Kit is connected
([0034](0034-newsletter-hidden-until-kit.md)), and the footer. No devlog section.

**The wall** is full-width Rust, its content centred:

- The brand pack's stacked logo in Paper, `logo/stacked/svg/walking-kangaroo-logo-stacked-paper.svg`,
  copied unchanged, linking home ("Walking Kangaroo home"). 184 px wide under 1024 px, 200 px
  from 1024 px. At least one foot length clear above it and between it and the text: 40 px and
  44 px.
- The page's `h1`, in Paper, Outfit SemiBold: 24 px under 1024 px, 34 px from 1024 px.
- One sentence in Paper, Outfit Regular: 16 px under 1024 px, 18 px from 1024 px.
- The words are Claude's drafts, for Grant to rewrite ([0014](0014-claude-drafts-grant-rewrites.md)):
  "I make games and apps as Walking Kangaroo." and "The first one to go live is PanePilot, an app
  for window cleaners. Four games are on the way."

**The hero:** PanePilot's pane hangs across the wall's lower edge. The wall's bottom padding and
the hero's pull-up are the same length, the overlap.

- **Under 1024 px:** the pane is the column's width, up to 720 px, centred, at 5:4, with 36% of
  its height on the wall. The label is below it. Under 720 px the button spans the column.
- **From 1024 px:** two columns 56 px apart, the pane taking the rest and the label 380 px. The
  pane is 16:10 with 24% of its height on the wall. The label starts 24 px below the wall's edge,
  so its Ink text is never on Rust (2.46:1). At 1440 × 900 the pane is about 764 × 478, up from
  672 × 420, and the button ends within 800 px of the top.
- The pane has a soft Ink shadow under it, at 30% at most, so it reads as hung on the wall.
  Everything inside the pane, the sweep and the reduced-motion still stay as
  [0024](0024-home-hero-is-the-fogged-pane.md) and
  [0038](0038-hero-shows-wide-screen-and-phone-over-the-swoops.md) have them.
- **The label**, in order: the eyebrow, PanePilot's lockup as the `h2` (never "PanePilot" set in
  Outfit), the headline, the summary, the stage meter (Beta, step 4 of 5) and "Visit
  panepilot.au". The meter drops its " · Web, Phone" detail here, because the eyebrow already says
  "Web and phone".

**Colours:** no new ones. Rust, Paper and Ink are the brand's, and PanePilot's teal comes only
from its own images ([0010](0010-site-tints.md)).

## Alternatives considered

- **The label under the pane on laptops** (mockup version 1): the button ended about 1000 px
  down, below a laptop's first screen.
- **A devlog or "From quote to paid" section after the hero:** Grant wants neither.
- **Options A and C:** see [0048](0048-header-is-rust.md).

## Consequences

- The home page's `h1` is Walking Kangaroo's line, not PanePilot's lockup. 0024 is amended to
  match; its pane and sweep are unchanged.
- At 1440 × 900 the whole home page, footer included, fits on about one screen.
- With the Devlog section gone, the devlog has no link from the site
  ([0050](0050-devlog-and-about-unlinked-until-they-have-content.md)).
- The featured project's `platforms` still show on project pages.
