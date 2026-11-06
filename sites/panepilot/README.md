# panepilot.au

PanePilot's own website: an Astro static site in `sites/panepilot/`. The design is
[design-plan.md](design-plan.md) ([0039](../../docs/decisions/0039-panepilot-site-follows-its-design-plan.md));
`prototype.html` is the working prototype it was approved from. Where they differ, the plan wins.

## Run, build and check

From the repo root:

```bash
pnpm install
pnpm panepilot:dev     # preview on http://localhost:4321, or the next free port if the hub is running
pnpm panepilot:build   # astro build into sites/panepilot/dist/
pnpm panepilot:check   # astro check: 0 errors, 0 warnings, 0 hints
```

These are `pnpm --filter panepilot ...`. The hub's scripts (`pnpm build`, `pnpm check`) are unchanged.

## Where things live

- `src/styles/tokens.css`: every colour, the type scale and the spacing, as custom properties. It's
  the only file that writes a hex value. Components use the names.
- `src/data/site.ts`: the app's addresses, the contact line, and `isOpen`, which picks the main
  button ("Tell me when it opens" until sign-up opens, then "Start your free trial"; 0052).
- `src/data/offer.ts`: the A$39 price, the founders' A$27 and its deadline, the trial and the
  hero's line. Pages read from both.
- `src/layouts/BaseLayout.astro`: the head (title, description, canonical, Open Graph, Twitter, icons),
  the header and footer, and a slot for the page.
- `src/pages/index.astro` and `404.astro`.

## Where assets come from

All are copied unchanged, never edited or redrawn. A changed source means re-copying it.

| In this site | From |
| --- | --- |
| `public/brand/logo-horizontal.svg` (the lockup, header and footer) | `C:\dev\panepilot\public\brand\logo-horizontal.svg` |
| `public/favicon.svg` | `C:\dev\panepilot\src\app\icon.svg` |
| `public/favicon.ico` | `C:\dev\panepilot\src\app\favicon.ico` |
| `public/apple-touch-icon.png` | `C:\dev\panepilot\src\app\apple-icon.png` |
| `src/assets/screenshots/calendar-wide.png` | `C:\dev\panepilot\docs\screenshots\website\calendar-wide.png` |
| Manrope 700 and 800, Geist 400 and 500 (Latin woff2) | the `@fontsource/manrope` and `@fontsource/geist` packages |
| The Walking Kangaroo signature in the footer | `packages/shared/` ([0028](../../docs/decisions/0028-signature-uses-brand-pack-files.md)) |

The link preview (Open Graph and Twitter image, 1200 x 630) is made at build time from
`calendar-wide.png`: scaled to 1200 wide, then the top 630 px kept. A recaptured screenshot updates it.

## Deploying

It deploys like the hub: its own Azure Static Web App, from `sites/panepilot/`, with its own workflow
([0031](../../docs/decisions/0031-product-sites-on-azure-static-web-apps.md),
[0040](../../docs/decisions/0040-panepilot-site-live-on-azure-first.md)). The deploy issue (KAN-908) fills
in the detail.

## Screens to check when the app changes

Each demo is a simplified copy of a part of PanePilot, so when the app's screen changes, check its demo
still matches. All five are built: Quoting (KAN-940), Scheduling (KAN-941), Visits (KAN-942),
Invoicing (KAN-943) and Workers' pay (KAN-944). This is the list they're held to.

| Demo | The app screens it copies |
| --- | --- |
| Quoting | The quote line editor: Add from the price book, Count, Each, surcharge chips, remove, "Includes Ladder +50%" |
| Scheduling | The editor's frequency options for recurring services; runs; the calendar's month view, day view, week strip, visit card and run block |
| Visits | The job card, the time-on-site card and its buttons and payable line, the checklist, "Complete job" and its message |
| Invoicing | The invoice screen: the draft from "Complete job", its badge, the one filled button ("Email invoice", then "Record payment"), the Dates list (Issued, Due), the GST line, the Record payment form ("How did they pay?"), the Payments card; the line details switches ("What customers see on each line") |
| Workers' pay | Time review (`workers/time` in the app): the worker card and its summary line, each entry's badge ("Awaiting approval", "Approved", "Paid"), its payable line, "Correct … times" with "Why it is changing", 15-minute rounding, hourly or share pay ("at 40% of invoice"), Approve, "Pay $X", the footer sentence |

The hero's screenshots are the same kind of check: recapture them from the demo business when the
screens they show change ([0026](../../docs/decisions/0026-panepilot-screenshots-from-a-demo-business.md)).
