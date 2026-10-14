# Brief: walkingkangaroo.com

Agreed with Grant on 5 October 2026. The decisions behind each part are in
[DECISIONS.md](DECISIONS.md).

## What it is

A simple site that shows what Walking Kangaroo is making. Nothing is released yet, so for now it
shows work in progress; it grows release pages when the first game ships. Written in Grant's own
voice ("Hi, I'm Grant").

## The design

Direction **B2 · Daylight** on the wireframe canvas:
https://claude.ai/artifact/RoieMJiNMKNuXoEvUmwK5y (the other boards there are rejected options,
except the project page, which is the template for project pages).

- Paper ground, Ink text, Rust accents, Outfit. Everything comes from the brand pack in
  `C:\dev\walkingkangaroo\brand\dist\walking-kangaroo-brand-pack\`: colour tokens, Outfit
  webfonts, logos, favicons, link-preview images. Never redraw or recolour the logo.
- Home, PanePilot first ([design-plan.md](../sites/hub/design-plan.md), 0024, 0025): header; PanePilot's hero, a
  fogged pane cleared by one squeegee sweep, with "Visit panepilot.au"; "How a visit goes" in four
  stops; "Built on our own round"; the four games as an "Also in the works" list; devlog; about;
  newsletter band; footer.
- **The footprint stage meter**: five prints for Idea, Prototype, Alpha, Beta, Launch. Filled
  prints show how far a project has come; steps not reached are the same foot, faded (0009).
  Always paired with the stage name in text.
- Works at phone width.

## What it shows

| Project | Type | Stage | Code |
| --- | --- | --- | --- |
| PanePilot (featured, 0023) | App | Beta; goes live in November 2026 | `C:\dev\panepilot` |
| Common Ground | Game | Prototype | `C:\dev\commonground` |
| Arcsine | Game | Prototype | `C:\dev\arcsine` |
| Aussie Trucker | Game | Prototype | `C:\dev\aussietrucker` |
| Perso | Game | Prototype | `C:\dev\perso` |

Only these five are shown; adding one is Grant's call. Perso is a remake of Crepe
Studios' 2017 game; Grant has confirmed it is cleared to show.

## The plan

1. **Set up** (done 2026-10-05): this repo, process-template 1.0.1, the Linear project.
2. **Build the site** to the design: Astro, pages for home, each project, devlog list and posts,
   about, and not found. Each project is one content file (type, stage, platforms, one-liner,
   media), so updating a stage or adding a post is a one-file change.
   Astro 7 on Node 24 (0008). Run and checked locally only; nothing is published until launch
   (0011). Shaped in [rounds/build-the-site.md](rounds/build-the-site.md).
3. **Content**: per project a description and the cover art Grant supplies (0016), with Windows
   and Steam for the four games (0017); a short bio, with no photo (0021) and no links (0019); and
   one devlog post per project, kept as a draft until launch (0020). Claude drafts the words and
   Grant rewrites them (0014). Gameplay clips wait in Backlog (0015). Shaped in
   [rounds/content.md](rounds/content.md).
4. **PanePilot first**: the repo becomes `walkingkangaroo-web`, with the hub in `sites/hub/`
   (0027) and a shared footer signature for product sites (0028). Then the home page leads with
   PanePilot (0023–0025, 0029), and real screenshots from a demo business follow (0026). Shaped in
   [rounds/hub-leads-with-panepilot.md](rounds/hub-leads-with-panepilot.md).
5. **Newsletter**: Kit's free plan, its form embedded; Kit's sending records and an SPF record
   added at VentraIP.
6. **Launch**: the GitHub Pages workflow and `CNAME` (0011); Grant adds the apex and www records at VentraIP; check HTTPS, link
   previews and the phone layout.

Later: gameplay clips (0015), release pages (the "Released product page" board), Steam wishlist buttons once store
pages exist, a press kit.
