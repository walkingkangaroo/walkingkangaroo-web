# walkingkangaroo.com, PanePilot first: design plan

Drafted 2026-10-14. Grant reviewed it against the clickable mockup
(https://claude.ai/artifact/RWJKnAbkrJUm6hT6jHpkjG) the same day, and his first notes are applied
below. The build goes through `/shape`. This file moves to `sites/hub/design-plan.md` when the hub
moves into `walkingkangaroo-web` (see "Repo" at the end).

## Grant's answers, 2026-10-14

- **Primary action:** "Go to panepilot.au" is right, even while that address redirects to the
  app's sign-in page.
- **Screenshots:** seed a demo business with invented data and capture real screenshots from it.
- **Repo:** yes to `walkingkangaroo-web`, with this hub nested in its own folder inside it.
- **Process:** shape it into Linear issues with `/shape` as usual.
- **First notes:** no footprints on the hero image, and none between the four stops.
- **Launch and stage:** it launches in November. Show Beta (step 4 of 5) for now.

## Decided in the shape round, 2026-10-14

Recorded in [docs/rounds/hub-leads-with-panepilot.md](../../docs/rounds/hub-leads-with-panepilot.md) and decisions
0023 to 0029. Where this plan and a decision record disagree, the record wins.

- **Signature on product sites:** the brand pack's logo files, unchanged, in the variant that suits
  the site's background. Not `currentColor` (0028).
- **Screenshots:** the redesign is built first. The pane shows the cover alone and the stops have
  no picture until the demo-business screenshots arrive (0026).
- **Repo rename:** Grant renames the GitHub repo himself, before the move (0027).
- **PanePilot's project page:** "Go to panepilot.au" first, then "Follow this project", with the
  lockup as its `h1` (0029).
- **The nav's "PanePilot" link** goes to the hub's PanePilot page (0024).

## Until Kit is connected, 2026-10-15

The newsletter band, the header's "Get updates" and the project pages' "Follow this project" are
hidden by `newsletterLive` in `src/lib/newsletter.ts` (0034). The Newsletter step turns them back
on. The rest of this plan shows them as designed.
- **The link label** to PanePilot's website is "Visit panepilot.au", not "Go to panepilot.au", on
  the buttons and in "Built on our own round" (0030, Grant on 2026-10-14).
- **The steps strip:** it was only ever on the home page, so it is removed, not kept on the project
  pages. Project pages already name all five steps in their stage panel (0025).

## Brief

- **What it is:** the studio hub, reworked so its lead is PanePilot, the first Walking Kangaroo
  product to go live. The four games follow as a short "also in the works" list.
- **PanePilot in one sentence:** scheduling, per-pane quoting, invoicing, field work and worker
  pay for Australian window-cleaning businesses, run from the phone at the property.
- **The hook:** it was built by a working window-cleaning business in South Australia's Clare
  Valley to run its own round. It quotes per pane because that's how they price, and it runs from
  a phone because that's where they are when the job is done.
- **Who visits:** window-cleaning owner-operators (mostly on a phone, between jobs), plus anyone
  following Grant's games.
- **The page's primary job:** send interested window cleaners to **panepilot.au**. It has a
  second job too: keep game followers subscribed.
- **Core verb:** working the round. You quote a property, the visits come round on schedule, and
  you do the visit, invoice it and get paid.
- **Materials:** glass, squeegee strokes, the run (a street of shops cleaned together), the job
  card on a phone in sunlight, invoices labelled "Invoice" and never "Tax Invoice".
- **Status:** going live soon at app.panepilot.au; panepilot.au redirects there (PanePilot
  decision 0052). No public sign-up and no pricing yet. It launches in November 2026.
- **Assets:** the PanePilot lockup, mark and teal cover art (all in the hub or PanePilot's
  `public/brand/`).
- **Gaps:** there are no screenshots of the app at all. The hero and the "how it works" section
  need them, taken from a demo business that is seeded with invented data, with no real customer
  names, addresses, phone numbers or prices. Grant chose this route over supplying them.

## Signature moment: one clean sweep

The hero's media pane opens lightly fogged, like a shop window before the round, with a dusting
of Paper haze over the PanePilot cover. About a third of a second after load, a single squeegee
stroke crosses it. The stroke follows the same curve as PanePilot's Curved Sweep mark, from top
right to bottom left, and it clears the glass to reveal the real app: the phone job card,
standing on the teal cover art. A thin wet edge trails the blade and fades. It happens once and
takes about 0.9 s.

It comes from this product and no other. The mark is a squeegee stroke and the verb is cleaning
glass, so the hub's first move is literally doing PanePilot's job.

- **Phone:** the same sweep. The pane sits above the text (decision 0022), so it's the first
  thing seen.
- **Reduced motion:** the pane is clean from the start, a strong still.
- **No JavaScript:** it's CSS only (a mask and a keyframe), so it runs anyway, and the content
  and buttons never depend on it.
- **Never in the way:** the buttons are live and visible from the first paint. Nothing waits for
  the sweep.
- **No footprints on the pane:** Grant's note. The pane is PanePilot's alone. Walking Kangaroo
  is carried by the header, the stage meter, the palette and the type.

## Palette

The hub stays Red Earth. **No new CSS colours:** decisions 0010 and 0001 stand. PanePilot's teal
comes only from its own assets inside the pane (the lockup, the cover and the screenshots), the
same way a game's colours come from its cover art. The fog is the existing `--site-media` tint
at partial opacity.

| Token | Hex | Role |
|-------|-----|------|
| `--wk-paper` | `#F4EBDD` | Page background |
| `--wk-ink` | `#2B1A12` | Text, primary button fill |
| `--wk-rust` | `#9E3B22` | Stage-meter footprints, the primary button on the PanePilot hero |
| `--site-panel` | `#EFE3D0` | The run band ("how it works") |
| `--site-media` | `#E6D8C2` | Media panels, and the fog at about 70% opacity |
| `--site-text-quiet` | `#4A362B` | Secondary text |

Pairs used, all AA or better: Ink on Paper 14.1, Quiet on Paper 9.6, Paper on Rust (the button)
5.7, Ink on Panel 13.2, Quiet on Panel 8.9, Paper on Ink 14.1.

## Type

Outfit only, as now: SemiBold 600 for headings with -2.5% tracking at 48 px and up, and Regular
400 for body. The scale is unchanged (body 17 px, h1 56 px on desktop and 36 px on phone, h2 36
and 28, h3 20).

One exception, from PanePilot's own brand rules: the hero's h1 is the **panepilot lockup**
(outlined SVG, accessible name "PanePilot"), never "PanePilot" set in Outfit, because its rules
say a styled heading never stands in for the lockup. The headline line under it is Outfit.

## Layout

Hero, desktop (text left and pane right, per 0022):

```
 walking kangaroo                    PanePilot  Games  Devlog  About  [Get updates]

 Going live in November · Web and phone         ┌──────────────────────────────┐
                                                │ ░░░░░░░░░░░░░░░░░╲           │
 [■ panepilot]  ← the lockup is the h1          │ ░░░ fog ░░░░░░░╲  clean      │
 The window-cleaning round,                     │ ░░░░░░░░░░░░╲   ┌─────┐      │
 start to finish.                               │ ░░░░░░░░░╲      │ job │ teal │
                                                │ ░░░░░░╲  sweep  │card │ cover│
 Quote per pane, book the recurring visits,     │ ░░░╲            └─────┘      │
 work each one from your phone, then invoice    │ ╲   the stroke follows the mark│
 it and pay whoever did the job.                └──────────────────────────────┘
 ✿✿✿✿✿ Beta, step 4 of 5
 [Go to panepilot.au]   See how it works
```

Hero, phone: the pane first (5:4, full width, so the job card isn't tiny), then the eyebrow,
the lockup, the headline, the sentence, the meter, and full-width "Go to panepilot.au" and "See
how it works" buttons. On desktop the pane is 16:10.

"How a visit goes" is four stops in order on a `--site-panel` band, with no footprints between
them (Grant's note). The numbers are real here because it is a sequence. Each stop is a cropped
phone screenshot, a heading and two lines.

```
 Desktop                                                 Phone
 ── How a visit goes ──────────────────────────────      How a visit goes
  ①            ②            ③            ④                ① [screenshot]
 [quote]      [calendar]    [job card]    [invoice]           Quote per pane
 Quote per    The visits   Do it from   Invoice it,
 pane         come round   the phone    pay the crew       ② [screenshot]
                                                             The visits come round
                                                           … (stacked)
```

After that come:

- **Built on our own round:** a left-aligned editorial block, first person, with no image.
- **Also in the works:** four rows, not cards. Each row is a small cover thumbnail, the name, one
  line, a small stage meter and a link to the project page. The whole thing is about one phone
  screen tall.
- **Devlog** (when posts are published), **About**, the **newsletter band** and the **footer**, as
  now.
- **Removed from home:** the "Five steps to launch" strip. The meter is always labelled in text
  (0009), and the strip doubles the page's length for one game-shaped idea. It stays on the
  project pages.

## Motion

- **The one moment:** the sweep. Nothing else on the page animates on load or on scroll, and
  sections don't fade in.
- **What responds:** the buttons and links get a plain hover and focus state, as now.
- **Reduced motion:** the pane is clean from the start, with no sweep.

## Voice

First person, Grant's, plain and specific. The working vocabulary is PanePilot's own: visit,
pane, run, invoice, "Mark accepted". Never job, appointment or bill. Claude drafts and Grant
rewrites (0014).

- "I built PanePilot to run our own window-cleaning round in the Clare Valley. Now it's ready
  for yours."
- "Set the round once. Weekly, fortnightly, every four weeks: the visits come round on their own."

## Sections, in order

1. Header: the nav gains "PanePilot" first
2. Hero with the sweep. The primary action is **Go to panepilot.au**.
3. How a visit goes (the run)
4. Built on our own round
5. Also in the works (the four games)
6. Devlog, when there are published posts
7. About, newsletter, footer

The PanePilot project page stays and takes the same lockup and screenshots. Common Ground is no
longer featured: this supersedes the "featured" part of 0002 and needs a new decision record.

## Different from previous sites

The design log is empty (the hub is the first site), so this is measured against the hub as it
is now. The hero changes from game cover art to a working-tool pane, and a curved squeegee
stroke replaces the static image. The "how it works" run is new, and it's the hub's first
real-sequence section. The games shrink from a card grid to a four-row list. A future PanePilot
site of its own at panepilot.au should go to PanePilot's teal, Manrope and Geist, far from this
page.

## Generic check

Autopilot for "a website for a field-service app" gives a white page, a blue-purple gradient, a
floating laptop-and-phone mockup, three feature icons in rounded cards, and "Streamline your
business" in Inter. What changed because of it:

- **Feature icons in cards:** dropped. "How it works" is a run of real screenshots, using
  PanePilot's own concept.
- **Device mockup floating on a gradient:** replaced by the fogged pane and one sweep, using the
  logo's own curve.
- **Six features from the app's home page as a grid:** cut to four stops. The rest belongs on
  panepilot.au.
- **"Streamline" copy:** replaced with the round, the Clare Valley and per-pane, which no other
  product could say.
- **Sibling check:** a teal accent added to the hub would make it a sibling of the future
  PanePilot site, so it was kept out of CSS. The teal lives only inside the pane.

## Repo

Grant chose one web repo, `walkingkangaroo-web`, for the hub and every product site. The hub
today is `C:\dev\website` (github.com/walkingkangaroo/website). The plan is to rename that repo to
`walkingkangaroo-web`, move the Astro app into `sites/hub/`, and add `packages/shared/` (the WK
footer signature) and a root `design-log.md`, keeping the history and the process-template
setup. Grant confirmed this on 2026-10-14: the hub is nested in its own folder, `sites/hub/`,
and each product site gets its own folder beside it. This is its own change, done before the
redesign.
