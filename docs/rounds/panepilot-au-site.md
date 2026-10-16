# Decision round: panepilot.au site

Status: Answered
Opened: 2026-10-16
Issue: https://linear.app/walkingkangaroo/issue/KAN-937/shape-panepilotau-site
Research: [docs/research/panepilot-au-site.md](../research/panepilot-au-site.md)

To answer, edit the `Answer:` lines, reply in chat, or run
`/shape panepilot-au-site 1: A, 2: A`. Say "use the defaults" to take every default below.

The design itself is approved in chat (the plan's "Grant's answers" list). These questions are
only about going live and the seams with the app.

## Questions

### 1. Should the site go live on its Azure address now, with panepilot.au pointed at it when sign-up ships?

- **A:** Yes. Build it with its deploy workflow now. Every merge is live at its
  `azurestaticapps.net` address for you to check on your phone, the way the hub went (0033).
  panepilot.au switches over when PanePilot's milestone 12 ships.
- **B:** No. Build and check it locally only, and add the deploy when sign-up ships.
- **Recommendation:** A, because the first deploy and the DNS switch then happen on different
  days, and you can try the demos on your phone from the first merge.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A, default taken. Grant, 2026-10-16: "go with defaults"

### 2. What contact address goes in the footer and the questions section?

panepilot.au has no MX record today, so nothing can be emailed to an `@panepilot.au` address.

- **A:** `hello@panepilot.au`. You set up a mailbox or a forward for it at VentraIP first (an MX
  record on panepilot.au, which this repo never touches).
- **B:** An address you already have, such as one at walkingkangaroo.com. Say which.
- **C:** No email address. The site offers only "Start your free trial", and the free setup call
  is booked from inside the app.
- **Recommendation:** A, because a product address keeps your own inbox off a public page and can
  move to a helpdesk later.
- **Default if unanswered:** A, with the footer showing `[TODO: contact address]` until it
  works.
- **For:** Grant
- **Answer:** A, default taken. Grant, 2026-10-16: "go with defaults"

### 3. Should the demo business's price book change to your example prices before the wide screenshots are taken?

The hero's wide quote and invoice (PanePilot KAN-933) will show the seed's $4.50, $6.00 and
Ladder +20%. The tabs show $7.50, $10.00 and Ladder +50%.

- **A:** Yes. One PanePilot issue changes the seed's price book to $7.50, $10.00 and Ladder
  +50%, before KAN-933 is captured. The phone screenshots already committed are left as they
  are, with a note in their README saying which prices they were taken with.
- **B:** No. Keep the seed's prices. The hero and the tabs show different example prices.
- **Recommendation:** A, because the hero and the demos then agree. KAN-933 hasn't been captured
  yet, so it costs one small seed change.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A, default taken. Grant, 2026-10-16: "go with defaults"

### 4. Once panepilot.au is live, should the app's own front page send signed-out visitors to it?

`app.panepilot.au/` is a short public page today, and KAN-885 adds a trial button and pricing
to it. It's also the home page on Google's sign-in consent screen.

- **A:** Yes. When the DNS switches, a signed-out visitor at `app.panepilot.au/` goes to
  `https://panepilot.au`, and the consent screen's home page becomes `https://panepilot.au`.
  Privacy and terms stay in the app. KAN-885 still does its sign-in note and the terms.
- **B:** No. Keep both. The app's page stays as KAN-885 leaves it, and the two say much the same
  thing.
- **Recommendation:** A, because there's then one public page to keep right, and the pricing
  lives in one place.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A, default taken. Grant, 2026-10-16: "go with defaults"

## Decided without asking

- **The design is the approved plan:** `sites/panepilot/design-plan.md` and the prototype
  (v9). The plan's "Grant's answers" list is the record of what he chose in chat.
- **Hosting:** its own Azure Static Web App on the Free plan, with its own workflow, a `paths:`
  filter on `sites/panepilot/**` and `packages/shared/**`, and preview links (0031, 0035).
- **Domain:** `panepilot.au` is the canonical address and `www.panepilot.au` redirects to it.
  The apex record is ALIAS if VentraIP allows it, otherwise an A record (0036). Grant makes every
  DNS change (0005).
- **The app's side of the switch** (unbinding panepilot.au from the Container App, and taking
  its redirect out of the deploy parameters) is a PanePilot issue. It's blocked by sign-up
  shipping and done in the same window as the DNS change.
- **Copy:** Claude drafts and Grant rewrites (0014), the "Built by a window cleaner" section most
  of all.
- **Privacy and terms** stay in the app, linked from the footer. The site collects nothing, so it
  needs no policy of its own.
- **No analytics** at launch. Adding any would change the privacy policy, so it's held out.
- **Fonts** are Manrope and Geist, self-hosted from Fontsource, Latin subset.
- **Each demo is a plain-script island** that loads when its tab is first opened, so first-load
  JavaScript stays under about 50 KB.
- **The demos are listed in `sites/panepilot/README.md`** as screens to check when the app's
  quote editor, calendar, job card, invoice or time review change.

## Held out

- Analytics and a cookie-free visitor count: Backlog, KAN-949.
- A changelog or "What's new" page: Backlog, KAN-950.
- App Store and Google Play badges, once PanePilot's apps are listed (PanePilot 0018): Backlog,
  KAN-951.
- A Walking Kangaroo design-log entry for this site: written when the site ships, as part of
  the launch issue (KAN-948).

## Outcome

- Decisions: [0039](../decisions/0039-panepilot-site-follows-its-design-plan.md),
  [0040](../decisions/0040-panepilot-site-live-on-azure-first.md),
  [0041](../decisions/0041-panepilot-contact-address.md),
  [0042](../decisions/0042-demo-seed-uses-the-sites-example-prices.md),
  [0043](../decisions/0043-app-front-page-sends-visitors-to-panepilot-au.md).
- Spec or design changes:
  - `sites/panepilot/design-plan.md`, with the prototype's source in `prototype.html` and
    `prototype-shop.svg`;
  - `docs/brief.md` (step 7) and `docs/DECISIONS.md`;
  - `CLAUDE.md` and `.claude/rules/panepilot-site.md`;
  - `docs/process/project.md` (green checks for the site).
- Issues, in build order. The Website ones are in milestone "panepilot.au":
  1. https://linear.app/walkingkangaroo/issue/KAN-938/panepilots-site-builds-in-sitespanepilot-with-its-own-look-header: the site, its look, header, footer and 404.
  2. https://linear.app/walkingkangaroo/issue/KAN-939/panepilotaus-home-page-reads-top-to-bottom-hero-what-its-made-for-the: the home page's sections and copy.
  3. https://linear.app/walkingkangaroo/issue/KAN-940/a-visitor-can-try-quoting-a-shop-per-pane-in-the-first-of-five-tabs: the tabs and Quoting.
  4. https://linear.app/walkingkangaroo/issue/KAN-941/a-visitor-can-set-how-often-customers-and-a-run-of-shops-come-and-see: Scheduling.
  5. https://linear.app/walkingkangaroo/issue/KAN-942/a-visitor-can-run-a-visit-on-a-copy-of-the-job-card-start-the-clock: Visits.
  6. https://linear.app/walkingkangaroo/issue/KAN-943/a-visitor-can-take-a-draft-invoice-from-a-finished-visit-to-paid-and: Invoicing.
  7. https://linear.app/walkingkangaroo/issue/KAN-944/a-visitor-can-review-a-workers-week-correct-times-see-the-15-minute: Workers' pay.
  8. https://linear.app/walkingkangaroo/issue/KAN-908/panepilots-site-deploys-to-its-own-azure-static-web-app-from-main-with: the deploy, live on its Azure address. It can run any time after KAN-938.
  9. PanePilot https://linear.app/walkingkangaroo/issue/KAN-945/the-demo-business-charges-dollar750-a-standard-pane-dollar1000-a-large: the demo business's new prices. Then PanePilot KAN-933, the wide screenshots.
  10. https://linear.app/walkingkangaroo/issue/KAN-946/panepilotaus-hero-shows-the-real-apps-quote-and-paid-invoice-on-a-wide: the hero's wide quote and invoice.
  11. https://linear.app/walkingkangaroo/issue/KAN-948/panepilotau-serves-panepilots-site-over-https-www-redirects-to-it-and: the launch at panepilot.au, after PanePilot's sign-up (KAN-881).
      It runs in one window with PanePilot https://linear.app/walkingkangaroo/issue/KAN-947/panepilotau-leaves-the-app-for-the-website-and-signed-out-visitors-at, where the app lets go of panepilot.au.
