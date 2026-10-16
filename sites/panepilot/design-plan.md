# panepilot.au: design plan

Drafted 2026-10-15. Grant answered the three questions the same day and asked for the signature
moment to change (below). Nothing is built yet. Once it's approved, the build goes
through `/shape` like the hub did, and where a decision record later disagrees with this plan, the
record wins.

## Decided in the shape round, 2026-10-16

Recorded in [docs/rounds/panepilot-au-site.md](../../docs/rounds/panepilot-au-site.md). Where this
plan and a decision record disagree, the record wins.

- **This plan is the design** ([0039](../../docs/decisions/0039-panepilot-site-follows-its-design-plan.md)).
- **Going live** ([0040](../../docs/decisions/0040-panepilot-site-live-on-azure-first.md)): live on its
  Azure address from the deploy issue on, and at panepilot.au once PanePilot's sign-up ships.
- **Contact** ([0041](../../docs/decisions/0041-panepilot-contact-address.md)): `hello@panepilot.au`,
  shown as `[TODO: contact address]` until Grant confirms it receives mail.
- **Screenshot prices** ([0042](../../docs/decisions/0042-demo-seed-uses-the-sites-example-prices.md)):
  the demo business switches to $7.50, $10.00 and Ladder +50% before the wide screenshots.
- **The app's front page** ([0043](../../docs/decisions/0043-app-front-page-sends-visitors-to-panepilot-au.md))
  sends signed-out visitors to panepilot.au once it's live.

## Brief

- **What it is:** PanePilot's own website at `panepilot.au`. It tells window cleaners what
  PanePilot does and sends them to the app. Today `panepilot.au` redirects to `app.panepilot.au`
  "until there is a public website to put there" (PanePilot decision 0052). This is that website.
  It's also the "marketing site" held out in PanePilot's KAN-891.
- **PanePilot in one sentence:** quoting per pane, scheduling the round, the visit on a phone,
  invoicing and worker pay, for Australian window-cleaning businesses.
- **The hook:** a working window-cleaning business in the Clare Valley built it to run its own
  round. It prices per pane, books shops together as a run, and invoices "Invoice", not "Tax
  Invoice", because that's how a small round really works.
- **Who visits:** owner-operators with one to five workers, mostly on a phone between jobs. Many
  are on Fergus, Jobber, ServiceM8 or a spreadsheet and are looking for something that fits
  window cleaning better.
- **The site's primary job:** start a free trial. Its second job is answering "will this fit how I
  work?" well enough that they try it.
- **Core verb:** **counting panes.** A window cleaner looks at a building and counts the glass
  before anything else happens. The quote, the visits, the invoice and the worker's pay all follow
  from that count.
- **Materials:** glass and window frames; the street of shops done as one run; the job card in
  the sun at the property; access notes ("back gate open before 10 am", "dog in the yard"); a
  ladder for the top windows; bank transfers and cash.
- **Status:** live for one business (Grant's) at app.panepilot.au. Self-serve sign-up, the 30-day
  trial and the A$49 plan are decided (PanePilot decisions 0056 to 0061) and Ready for Build in
  milestone 12, not built yet.

### Assets

- **Have:** the brand pack in `C:\dev\panepilot\public\brand\` (lockup, mark, light and dark),
  and seven real-app screenshots from the invented demo business in
  `C:\dev\panepilot\docs\screenshots\website\` (job card, quote, time card, paid invoice,
  approved time, week calendar, wide owner screen). Each value in them is traced to the seed.
- **Wide screenshots:** only `calendar-wide.png` exists at 1440 × 900. The hero also needs a
  quote and a paid invoice captured wide from the demo business (a PanePilot issue).
- **Gaps:** no customer quotes (and there should be none until real businesses say something), no
  screen recordings, no contact address for the site, no link-preview image yet.

### What the three reference sites do, and what we take from them

| Site | What it does well | What we leave |
| --- | --- | --- |
| fergus.com | Plain tradie voice; an FAQ that answers the money questions (trial, no setup fee, no lock-in, monthly billing) | Review badges, "25,000+ businesses", a promo banner, a sign-up form repeated four times |
| Jobber, window cleaning | Organised by the job: quote, schedule, do the work, get paid; a few window-specific angles (window counts, add-ons) | Two copies of the same feature blocks, a pressure-washing video on a window page, mostly generic home-service copy |
| Housecall Pro, window cleaning | Quotes "built around panes"; storefront rounds; an FAQ written for window cleaners | A stats row of growth claims, testimonials from carpet cleaners, a gift-card demo pop-up |

The pattern worth borrowing is the order (quote, schedule, on the day, get paid) and an FAQ that
answers real objections. The thing all three lack, and PanePilot can own, is being specific about
window cleaning instead of adding the words "window cleaning" to a home-services page.

## Signature moment

**Try each step of the round.** The page's layout is Grant's (2026-10-16). The hero shows the
real app in a wide browser window. Below it, one tab per step of the round, and each tab holds a
small working copy of that part of PanePilot. No window-cleaning software page lets a visitor try
the work, and the three reference sites only describe it.

**The rule for every demo:** each control is one the app really has, with the app's own words,
and any drawing only follows the numbers. It is never a control (Grant, 2026-10-15: tappable
windows would suggest the app quotes from a picture). Each demo is a simplified copy, so it's
listed in the site's README as a screen to check when the app changes.

### The tabs

| Tab | What the visitor does | The real feature it copies |
| --- | --- | --- |
| Quoting | Starts with nothing quoted. Adds Standard pane and Large pane from the price book (a new line starts at a count of 1, each with a remove button), changes Count and Each, and taps the Ladder chip; a two-storey shop comes up clean pane by pane | The quote line editor: Add from the price book, Count, Each, surcharge chips, remove, "Includes Ladder +50% · $22.50." |
| Scheduling | Picks how often Jo Example comes (Weekly, Fortnightly, Every 4 weeks, Monthly on a date, Every 3 months) and whether each shop on the Shops run comes every run, every 2nd or every 3rd run, then steps through 12 weeks on a copy of the app's calendar. Wider screens get the app's month view: Mon to Sun, the other months' days shaded, today in a teal disc, up to three chips a day ("8:00 am Jo Example" with a status-coloured left edge) then "+N more", and the run as one chip with its shop count that shows its stops in order. Earlier weeks show as Paid, earlier this week as To approve, the rest as Scheduled. Two fixed demo customers (Demo Motel weekly, Chris Test every 4 weeks) fill out the month | Recurring services (the editor's frequency options), runs (0019 to 0024) and the calendar's month view, day view, week strip, visit card and run block |
| Visits | A copy of the job card for Example Bakery: address, access, parking and hazard notes; Start, then Break and Finish, with a sped-up clock (a minute every half second) showing "1 h 15 min payable (1 h 10 min worked, rounded to the nearest 15 min)"; tick the checklist ("1 of 3 done"); Complete visit raises "Draft invoice INV-1044 is ready to review." The badge goes Scheduled, In progress, Completed | The job card, the time-on-site card and its buttons, the checklist, completing a visit |
| Invoicing | Reads "Visit completed. Draft invoice INV-1043 is ready to review.", turns the Pane count, Price each and Surcharge note switches on and off, taps Email invoice (Draft to Sent, due in 7 days), then Record payment and Save payment by bank transfer or cash (Paid) | Draft on completion, the invoice's primary action, line details (0027, 0028), payments |
| Workers' pay | A copy of Time review for Sam Sample's last week: three visits with Start and Finish times to correct, each showing payable time rounded to 15 minutes and its pay; switch between By the hour ($32.00/h) and A share of the visit (40%); Approve each (then its times lock), and Pay $112.00 once all are approved | Time review, 15-minute rounding, hourly or share pay, approval, approved time is final |

### Quoting, in detail

A line drawing of a two-storey shop (Example Bakery, from the demo business) beside a copy of the
quote lines. The quote starts empty ("Nothing quoted yet. Add a line from the price book."), with a
button for each price book entry; a line's button goes once it is added and comes back if the line
is removed. Downstairs are two display windows of large panes; upstairs are four sash windows of
standard panes, which is the ladder work. Changing a count lights that many panes, and a ladder
leans on the awning while a line carries the Ladder surcharge.

```
What is quoted
Standard pane    Count [ 6 ]  Each [ 7.50 ]   Surcharges ( Ladder +50% ✓ )      $67.50
                                               Includes Ladder +50% · $22.50.
Large pane       Count [ 4 ]  Each [ 10.00 ]  Surcharges ( Ladder +50% )        $40.00
                                                                     Total     $107.50
Counted on the shop: 6 of its 8 standard panes and all 4 large panes.
```

The example prices are Grant's (2026-10-16): $7.50 a standard pane, $10.00 a large pane, and
Ladder +50% on the standard line only. The Invoicing tab uses the same prices: 12 standard panes
with the ladder ($135.00) and 4 large ($40.00), $175.00 in all.

### Fallbacks

- **Phone:** the tabs become a row that swipes sideways, and each demo stacks in one column. The
  Scheduling demo switches to what the app shows on a phone: the day view with its seven-day strip (weekday, date, and a dot on days with work), and the chosen day's visits below it.
- **Keyboard and screen readers:** the tabs follow the ARIA tabs pattern (arrow keys move between
  them). Inputs and switches are real labelled controls, chips use `aria-pressed`, and totals and
  summaries are `aria-live`. Drawings are one image with a description.
- **Reduced motion:** panes change at once, with no fade.
- **No JavaScript:** every tab's panel shows in turn, each in its starting state (Quoting shows the two lines already added, since its buttons need a script), and the headline
  and "Start your free trial" don't depend on any of it.
- **Weight:** each demo is a small plain-script island that loads when its tab is first opened.

## Palette

PanePilot's own Harbour palette, taken from the app's tokens so the site and the app feel like
one product. One mood, light, with one deep band for pricing.

| Token | Hex | Role |
| --- | --- | --- |
| `--glass` | `#F4F8F8` | Page background (the app's background) |
| `--deep-water` | `#0B2F33` | Text, the elevation's linework, the pricing band |
| `--harbour` | `#0E7C86` | The one primary button, the active nav item, counted window frames |
| `--harbour-dark` | `#07646C` | Primary hover, links on Glass |
| `--muted` | `#52696D` | Secondary text |
| `--mint` | `#E6FFFB` | Text on Deep Water, and the fill of a counted pane |
| `--frame` | `#D3DFE0` | Hairlines, screenshot borders, uncounted window frames |

Plus white `#FFFFFF` for the quote card and screenshot frames, as in the app.

| Pair | Ratio | Use |
| --- | --- | --- |
| Deep Water on Glass | 13.37:1 | Body text and headings |
| Muted on Glass | 5.45:1 | Secondary text |
| Harbour Dark on Glass | 6.44:1 | Links |
| White on Harbour | 4.95:1 | The primary button |
| Mint on Deep Water | 13.66:1 | The pricing band |
| `#63B3BC` on Deep Water | 5.93:1 | Links in the pricing band (the app's dark-mode link teal) |

Harbour on Glass is 4.62:1, so it's fine for large text but never for small text; small teal text
uses Harbour Dark. The app's status colours (amber, green and so on) appear only inside
screenshots, never in the site's CSS.

## Type

- **Manrope** (700 and 800), display: the hero headline and section headings. It's the face of
  PanePilot's wordmark, so the headings feel like the lockup speaking. Tight tracking (-3%) at
  40 px and up. OFL, self-hosted woff2 from Fontsource, Latin subset.
- **Geist** (400 and 500), everything else: the app's own UI face, so the quote card and the
  copy around the screenshots match what's inside them. OFL, Fontsource, Latin subset.
- **Scale:** ratio 1.25 from a 17 px body. Display `clamp(2.5rem, 6vw, 4rem)`; h2 2.25 rem; h3
  1.4 rem; body 1.0625 rem with 1.6 line height; small 0.875 rem. Body lines 60 to 70 characters.
- Sentence case everywhere. No all-caps labels and no monospace.
- Only Manrope 800 is preloaded (the headline).

## Layout

Left-aligned and practical, like a job sheet: a 12-column grid at 1200 px max, 16 px gutters on a
phone. The shop drawing is the only illustration on the site; everything else is the real
app.

### Hero and tabs, desktop

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [panepilot]       How it works  Pricing  Questions      Sign in [Start…] │
├──────────────────────────────────────────────────────────────────────────┤
│ Quoting, scheduling and invoicing                                        │
│ for window cleaners.                                                     │
│ Count the panes once. PanePilot books the round, runs the visit on      │
│ your phone, invoices it and works out your workers' pay.                 │
│ [Start your free trial]   30 days free, no card. A$49 a month after.     │
│ ┌ app.panepilot.au/calendar ─────────────┐ ┌ …/quotes ─────────────────┐ │
│ │                                        │ │ a quote, wide             │ │
│ │  the week calendar, wide, with the     │ └───────────────────────────┘ │
│ │  Shops run as one block                │ ┌ …/invoices ───────────────┐ │
│ │                                        │ │ a paid invoice, wide      │ │
│ └────────────────────────────────────────┘ └───────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│ Try each step of the round                                               │
│ Quoting   Scheduling   Visits   Invoicing   Workers' pay                 │
│ ‾‾‾‾‾‾‾                                                                  │
│ Quote it per pane       [ shop drawing ]          ┌ What is quoted ────┐ │
│ Your price book holds…                            │ lines, chips, total│ │
│                                                   └────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

The screenshots sit flat in plain browser frames: no tilt, no shadow, no floating.

### Hero and tabs, phone (390 px)

```
┌──────────────────────────┐
│ [panepilot]      Sign in │
│ Quoting, scheduling and  │
│ invoicing for window     │
│ cleaners.                │
│ [Start your free trial ] │
│ 30 days free, no card.   │
│ ┌──────────────────────┐ │
│ │ calendar, wide       │ │
│ └──────────────────────┘ │
│ ┌─────────┐ ┌─────────┐  │
│ │ quote   │ │ invoice │  │
│ └─────────┘ └─────────┘  │
│ Try each step of the     │
│ round                    │
│ Quoting  Scheduling  Vi→ │  ← swipes sideways
│ Quote it per pane        │
│ [ shop drawing ]         │
│ [ quote lines ]          │
└──────────────────────────┘
```

## Motion

- **The demos are the only motion,** and only when the visitor changes something: a pane comes
  up clean, a badge moves from Draft to Sent to Paid. Nothing plays on its own.
- Nothing fades or slides in on scroll. Buttons get a plain hover and a visible focus ring
  (Harbour, 3 px, offset 2 px, as in the app).
- Reduced motion: every change happens instantly.

## Voice

Plain, specific and Australian, in the language of the round: visit, pane, run, round, invoice.
Never "job", "appointment" or "solution". It talks to the owner ("you", "your round"), and the
"Built by a window cleaner" section is first person plural, as on the app's home page today. No
claims we can't show.

- "Count the panes once. PanePilot books the round, runs the visit on your phone, invoices it and
  works out your workers' pay."
- "The shops on Main Street go together as one run, in your order, and some can come every second
  run."

## Sections

One page, plus a 404. Privacy and terms stay where the law and Google's consent screen already
point (`app.panepilot.au/privacy` and `/terms`), and the footer links to them.

1. **Header:** lockup, How it works, Pricing, Questions, "Sign in" (to app.panepilot.au/sign-in),
   and "Start your free trial" as the one filled button.
2. **Hero:** the headline, one line, the primary action with the trial terms beside it, and three
   real screenshots from a wide browser window: the week calendar, a quote and a paid invoice.
3. **Try each step of the round:** the five tabs above.
4. **Made for window cleaning:** the things the generic tools don't do, each one line with no
   picture. Per-pane price book with your own surcharges (ladder, roof, buildup), which stack on
   any line. Runs of shops with a stop order and every 2nd or 3rd run. Every n weeks or months.
   Reminders before a visit, for customers who like to be asked first. Access, parking and hazard
   notes on the job card. A glass-scratch acknowledgement customers sign by typed name. Invoices
   labelled "Invoice" with no GST line, for a business that isn't registered.
5. **Your workers:** one short paragraph beside the Workers' pay tab's subject. Workers sign in
   with their own Google or Microsoft account or an emailed code, see only their own visits and
   time, and see their estimated pay. No extra cost per worker.
6. **Built by a window cleaner:** the story, in Grant's words (Claude drafts, Grant rewrites),
   naming Clare Valley Window Cleaning as the business that built it and runs on it. No photo.
7. **Pricing** (the Deep Water band): one plan, A$49 a month, no GST, unlimited workers, every
   feature, 30 days free with no card, cancel online any time. A free setup call. Bring your
   customers in from a spreadsheet. The figures come from one data file, so a price change is one
   edit. "Start your free trial" again.
8. **What it doesn't do yet** (Grant chose to keep it): take card payments (customers pay by
   transfer or cash), connect to Xero or MYOB, plan the fastest route, or come as an App Store
   app. Honest, and it saves a trial that was never going to fit.
9. **Questions:** only ones people ask. Where is my data kept? (Australia, each business separated
   in the database itself.) Can I bring my customers from Fergus or a spreadsheet? (A CSV import.)
   Do my workers pay? Does it work on my phone? (It installs to the home screen.) I'm not
   registered for GST; is that a problem? Can I cancel? What happens to my data if I stop?
10. **Footer:** the lockup, privacy, terms, contact `hello@panepilot.au` (0041; a placeholder until it receives mail), and the Walking
    Kangaroo signature from `packages/shared/`.

`SoftwareApplication` JSON-LD with the A$49 offer, `en-AU`, Open Graph image of the wide calendar
screenshot at 1200 × 630.

## Different from previous sites

The only earlier entry is the hub (walkingkangaroo.com), and the log asks for PanePilot's site to
go "to PanePilot's own teal, Manrope and Geist, far from this page".

| | The hub | panepilot.au |
| --- | --- | --- |
| Temperature | Warm: Paper, Rust, Ink | Cool: Glass, Harbour, Deep Water |
| Type | Outfit only | Manrope display, Geist text |
| Signature | A fogged pane cleared by one squeegee sweep, played once on load | Five tabs, each a small working copy of one step of the round |
| Hero | Text left, one product image right | Text above three flat screenshots from a wide browser window |
| Sequence | Four stops on a panel band, numbers in circles | Tabs in the order of the round, no numbers |
| Voice | First person, Grant's | Second person to the owner, with one "we" section |

The fog and the sweep stay the hub's. This site has no squeegee anywhere.

## Generic check

Autopilot for "window cleaning software" would be: a sky-blue gradient, water droplets and
sparkle icons, Poppins, navy with an orange button, a laptop and phone mock-up floating in the
hero, a logo strip and a row of growth stats, three icon cards, a testimonial carousel.

Changed after the check:

- **No device mock-ups.** Screenshots are shown whole in a thin Frame border, at their real
  proportions. The phone ones aren't put in a phone bezel.
- **No icons for features.** "Made for window cleaning" is a plain list; the pictures are real
  screenshots or the one drawing.
- **No stats row and no testimonials.** There are no numbers or quotes to show, and the reference
  sites' versions are the parts that read least true. Proof is the story and the real app.
- **No gradients, droplets or sparkles.** Clean glass is shown as a flat mint fill in a drawn
  frame.
- **The hero's screenshots are flat and real.** A wide-screen hero is where a tilted, floating
  dashboard usually creeps in. These sit square in plain browser frames, at their real
  proportions, with nothing drawn over them.

## Grant's answers, 2026-10-15 and 16

- **Quoting starts empty (2026-10-16):** buttons add the Standard pane and Large pane lines, instead of both being there already.
- **Scheduling on phone and desktop (2026-10-16):** the app's phone day view with its week strip on small screens, and the app's month view on bigger ones (Grant sent a screenshot of it; only its layout is copied, none of its names). The four controls sit in one row above the calendar there.
- **Scheduling demo (2026-10-16):** look like the app's calendar. Chips with dates inside week rows made no sense, so it is now the week view with visit cards and the run block.
- **Layout (2026-10-16):** a hero of a few screenshots from a large browser window, then tabs for
  each step (quoting, scheduling, visits, invoicing and so on), each opening an interactive demo
  like the quoting one. All five tabs are prototyped (Visits and Workers' pay added later that day).

- **Signature moment (2026-10-16):** a two-storey shop instead of the cottage, with large panes
  downstairs and standard panes upstairs, so the Ladder surcharge sits on the standard line only.
  Prices $7.50 standard, $10.00 large, Ladder +50%.
- **Signature moment (2026-10-15):** he liked the quoting idea, but tapping windows on a picture would suggest
  the app works that way. Revised so the visitor uses the app's real quote lines and the drawing
  only follows (see "Signature moment").
- **When it goes live:** with self-serve sign-up (PanePilot milestone 12), with "Start your free
  trial" from day one. Until then `panepilot.au` keeps redirecting to the app.
- **The story names the business:** Clare Valley Window Cleaning built PanePilot and runs on it.
- **"What it doesn't do yet" stays:** card payments, Xero or MYOB, route planning, an App Store
  app.

## Hosting

Its own Azure Static Web App on the Free plan, from `sites/panepilot/`, with its own workflow
(0031). `panepilot.au` and `www.panepilot.au` move from the Container App's redirect to the
Static Web App. That needs PanePilot-side work (unbinding the apex from the Container App and
updating its params), and the links the app already sends under `panepilot.au/...` paths, if any,
need checking first (PanePilot KAN-852 forwards them today). Grant makes every DNS change.
