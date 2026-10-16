# 0039. panepilot.au is built to its approved design plan: real screens, then five working demos

- **Status:** Accepted
- **Date:** 2026-10-16
- **Issues:** KAN-937
- **Round:** none: Grant's answers in chat on 2026-10-15 and 16, listed in
  [sites/panepilot/design-plan.md](../../sites/panepilot/design-plan.md) ("Grant's answers") and
  recorded in [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md)

## Context

PanePilot needs its own website at panepilot.au to tell window cleaners what it does and start
their free trial. Grant reviewed the design over nine versions of a working prototype
(https://claude.ai/artifact/GkN5Rm6DWhB541p34VFuT6).

## Decision

- `sites/panepilot/` is built to `sites/panepilot/design-plan.md`. The prototype's source is
  `sites/panepilot/prototype.html`.
- The look is PanePilot's own: Harbour palette from the app's tokens, Manrope headings and
  Geist text. It's one light mood with a Deep Water pricing band.
- The hero shows real app screenshots from the demo business, flat in plain browser frames.
- Below it, five tabs in the order of the round: Quoting, Scheduling, Visits, Invoicing,
  Workers' pay. Each is a small working copy of that part of the app.
- **Every control in a demo is one the app really has, in the app's words.** A drawing only
  follows the numbers and is never a control.
- The quote example prices are $7.50 a standard pane and $10.00 a large pane, with Ladder +50%
  on the standard line.
- The page also has:
  - "Made for window cleaning";
  - the story, which names Clare Valley Window Cleaning;
  - pricing;
  - "What it doesn't do yet": card payments, Xero or MYOB, route planning, an App Store app;
  - questions;
  - the footer with the Walking Kangaroo signature.

## Alternatives considered

- **A drawing of a building as the hero, with tappable windows:** it suggested the app quotes
  from a picture. Grant turned it down on 2026-10-15.
- **A sequence of five numbered screenshots:** Grant chose tabs with working demos instead on
  2026-10-16.

## Consequences

- The demos are copies of app screens. `sites/panepilot/README.md` lists them as screens to
  check when the app's quote editor, calendar, job card, invoice or time review change.
- Screenshots follow [0026](0026-panepilot-screenshots-from-a-demo-business.md): from the demo
  business, every value traced to its seed.
- `.claude/rules/panepilot-site.md` carries the rules for the site's files.
