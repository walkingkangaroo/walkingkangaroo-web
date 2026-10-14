# Decision round: Hub leads with PanePilot, and the move into walkingkangaroo-web

Status: Waiting on Grant
Opened: 2026-10-14
Issue: https://linear.app/walkingkangaroo/issue/KAN-893/shape-hub-leads-with-panepilot-and-the-move-into-walkingkangaroo-web
Research: [docs/research/hub-leads-with-panepilot.md](../research/hub-leads-with-panepilot.md)

To answer, edit the `Answer:` lines, reply in chat, or run
`/shape hub-leads-with-panepilot 1: A, 2: yes`. Say "use the defaults" to take every default below.

Most of the design is already settled: your answers of 2026-10-14 are in
[docs/design-plan.md](../design-plan.md), "Grant's answers, 2026-10-14", and they are recorded as
decisions without asking again (see "Already answered" below). These four questions are what's
left.

## Questions

### 1. How does the Walking Kangaroo signature on product sites take each site's colours?

The showcase-sites skill says to draw the footprints and "walking kangaroo" as inline SVG in
`currentColor`, so the signature turns teal on a teal site. The brand pack says "Don't ... recolour"
the logo, and this repo's rule is "Never redraw, recolour or re-letter the logo".

- **A:** Use the brand pack's own logo files unchanged. The product site picks the variant that
  suits its background (primary, ink, reversed or paper, stacked or small horizontal). The signature
  stays Walking Kangaroo's colours, small and quiet.
- **B:** `currentColor`, as the skill says. It matches each site, but it recolours the logo and
  needs an exception to the brand rule written into a decision.
- **Recommendation:** A, because it keeps the brand rule whole and the pack already has a one-colour
  ink and paper version for any background.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:**

### 2. Does the home redesign wait for the PanePilot screenshots?

The screenshots depend on the demo business being seeded in the PanePilot repo, which is shaped
separately and has no date yet.

- **A:** Build the redesign now. Until the screenshots arrive, the pane shows PanePilot's teal cover
  on its own (the sweep still clears the fog off it), and the four "How a visit goes" stops are a
  number, a heading and two lines with no picture. The screenshots issue then adds the phone job
  card to the pane and a picture to each stop.
- **B:** Hold the hero and the four stops until the screenshots exist. Nothing is built twice, but
  the redesign waits on the other repo.
- **Recommendation:** A, because the site isn't public until launch (0011), so the page can land in
  stages, and nothing hand-drawn stands in for the real app.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:**

### 3. Who renames the GitHub repo to `walkingkangaroo-web`?

GitHub redirects the old web and git addresses after a rename, so local clones keep working.

- **A:** You rename it yourself (GitHub → the repo → Settings → Repository name) after this round's
  pull request merges and before the move issue starts.
- **B:** I run `gh repo rename walkingkangaroo-web` at the start of the move issue, after you say yes
  in chat.
- **Recommendation:** A, because it takes half a minute, and changes to the GitHub account stay with
  you.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:**

### 4. On the hub's PanePilot page, what is the main button?

Today every project page has one button, "Follow this project", which goes to the newsletter.

- **A:** "Go to panepilot.au" first, with "Follow this project" beside it as the second button. This
  matches the home hero.
- **B:** Keep "Follow this project" on its own, as on the game pages.
- **Recommendation:** A, because the page's main job, like the home page's, is to send window
  cleaners to panepilot.au.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:**

## Already answered (2026-10-14, recorded without asking again)

- PanePilot replaces Common Ground as the featured project, at Beta (step 4 of 5). Launch comes
  later.
- The eyebrow reads "Going live in November · Web and phone". The primary button is "Go to
  panepilot.au".
- The hero h1 is the PanePilot lockup SVG, per PanePilot's brand rules.
- The hero is a fogged pane cleared by one CSS-only squeegee sweep. With reduced motion the pane
  starts clean.
- No footprints on the hero image or between the four stops.
- The hub's CSS keeps to the brand colours and the 0010 tints. Teal appears only in PanePilot's
  own lockup, cover and screenshots.
- The "Five steps to launch" strip comes off the home page only.
- The pane is 5:4 on a phone and 16:10 on desktop, with the cover as its backdrop. This replaces
  0022's uncropped 16:9 cover.
- One web repo, `walkingkangaroo-web`: the hub in `sites/hub/`, then `packages/shared/` and a
  root `design-log.md`. This happens first, keeps the history, and keeps `pnpm build`, `check` and
  `dev` working.
- The screenshots come from a demo business with invented data. The seed is shaped in the
  PanePilot repo. This repo takes the finished, cropped images and checks them.
- Claude drafts the copy and you rewrite it (0014).

## Decided without asking

- **`docs/` and `.claude/` stay at the repo root.** The `/shape`, `/do` and `/retro` skills read
  `docs/process/` from the root, and those files come from process-template unchanged. There is one
  decision log for the whole repo, and a record names its site when it's site-specific. The design
  plan moves to `sites/hub/design-plan.md`, where the showcase-sites skill expects it.
- **Hub-only rules move out of `CLAUDE.md`.** The brand colours, the tints and the type rules
  apply to `sites/hub/` only, so they go to `.claude/rules/hub.md` with `paths: sites/hub/**`.
  Product sites have their own identities. `CLAUDE.md` keeps what applies to the whole repo.
- **The local folder stays `C:\dev\website`.** Renaming it would break the open worktrees under
  it and Claude's per-folder history, and nothing depends on the name. You can rename it later.
  It changes one line in `docs/process/project.md`.
- **The pane is composed in HTML and CSS,** not as one exported image. The cover is the backdrop,
  and the phone screenshot sits in a plain CSS phone frame. One source image per screen stays sharp
  at both aspect ratios, and Astro resizes it.
- **The nav's new "PanePilot" link goes to the hub's PanePilot page,** like Games and Devlog. The
  hero button is the way out to panepilot.au.
- **The mockup's stand-in colours stay out.** The sweep's wet edge uses Ink and Paper at partial
  opacity, not the mockup's dark teal, and the buttons keep their current hover. No new hex values.
- **"Built on our own round" states only what PanePilot's own docs confirm.** Each business seeing
  only its own data is confirmed (row-level security, PanePilot `docs/tenancy.md`). "Hosted in
  Australia" is left out until you confirm where the database lives. As always, you rewrite it.
- **One milestone, "PanePilot first",** with the repo move as its first issue.

## Held out

- **How product sites are hosted:** Backlog. GitHub Pages publishes one site per repo, and this
  repo's site is the hub (0004). So the first product site in `sites/` needs another host, such as
  Azure Static Web Apps, which is the skill's default. Decide when that site is shaped.
- **A public PanePilot site at panepilot.au:** not this project. panepilot.au redirects to the app
  until there is one (PanePilot decision 0052).

## Outcome

Filled in when the answers are recorded.

- Decisions:
- Spec or design changes:
- Issues:
