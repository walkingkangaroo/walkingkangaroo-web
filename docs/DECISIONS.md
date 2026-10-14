# Decisions

What's settled on walkingkangaroo.com, and where to read why. Each decision has its own record in
[`decisions/`](decisions/). Accepted decisions stand until Grant reopens them. The roadmap and
issues live in the Linear project **Website**.

To record a decision: copy `decisions/0000-template.md` to the next number, fill it in, and add a
row below in the same pull request. To change one: write a new record and mark the old one
"Superseded by". Never rewrite an old record.

## Product

| # | Decision | Status |
| --- | --- | --- |
| [0001](decisions/0001-b2-daylight-design.md) | The site follows direction B2 · Daylight, built from the brand pack | Accepted (hero superseded by 0024, home cards and strip by 0025) |
| [0002](decisions/0002-projects-shown.md) | The site shows five projects, all in progress | Accepted (featured project and PanePilot's stage superseded by 0023) |
| [0006](decisions/0006-kit-newsletter.md) | Kit's free plan for the newsletter | Accepted |
| [0009](decisions/0009-stage-meter-solid-footprints.md) | The stage meter uses one solid foot, faded for steps not reached | Accepted |
| [0010](decisions/0010-site-tints.md) | The site uses seven Paper and Ink tints alongside the brand colours | Accepted |
| [0012](decisions/0012-project-page-scope.md) | Project pages leave out the playtest parts until there is a playtest | Accepted |
| [0013](decisions/0013-phone-header-wraps.md) | On a phone the header links wrap under the logo, with no menu button | Accepted |
| [0014](decisions/0014-claude-drafts-grant-rewrites.md) | Claude drafts the site's words, and Grant rewrites them before they merge | Accepted |
| [0015](decisions/0015-no-clips-yet.md) | No gameplay clips in the Content step | Accepted |
| [0016](decisions/0016-grant-supplies-covers.md) | Grant supplies each project's cover art | Accepted |
| [0017](decisions/0017-games-list-windows-and-steam.md) | The four games list Windows and Steam | Accepted |
| [0018](decisions/0018-no-working-on-now.md) | Project pages leave out "Working on now" | Accepted |
| [0019](decisions/0019-about-has-no-links.md) | The about section has no links | Accepted |
| [0020](decisions/0020-devlog-posts-drafted-now.md) | The first devlog posts are written now and kept as drafts until launch | Accepted |
| [0021](decisions/0021-about-has-no-photo.md) | The about section has no photo | Accepted |
| [0022](decisions/0022-hero-text-beside-the-cover.md) | The home hero shows the featured cover beside or above its text, never behind it | Superseded by 0024 |
| [0023](decisions/0023-panepilot-is-featured-at-beta.md) | PanePilot is the featured project, shown at Beta | Accepted |
| [0024](decisions/0024-home-hero-is-the-fogged-pane.md) | The home hero is PanePilot's fogged pane, cleared by one sweep | Accepted (button label superseded by 0030) |
| [0025](decisions/0025-home-sections-panepilot-first.md) | After the hero, the home page shows how a visit goes, our own round, and the games as a list | Accepted |
| [0026](decisions/0026-panepilot-screenshots-from-a-demo-business.md) | PanePilot's screenshots come from a demo business with invented data, and the page doesn't wait for them | Accepted |
| [0028](decisions/0028-signature-uses-brand-pack-files.md) | The signature on product sites uses the brand pack's logo files unchanged | Accepted |
| [0029](decisions/0029-panepilot-page-leads-to-panepilot-au.md) | PanePilot's project page leads with "Go to panepilot.au" and its lockup | Accepted (button label superseded by 0030) |
| [0030](decisions/0030-panepilot-link-reads-visit-panepilot-au.md) | Links to PanePilot's website read "Visit panepilot.au" | Accepted |

## Platform, code and process

| # | Decision | Status |
| --- | --- | --- |
| [0003](decisions/0003-astro-static-site.md) | A static Astro site, with projects and posts as content files | Accepted |
| [0004](decisions/0004-github-pages-public-repo.md) | Public repo, published to GitHub Pages on merge | Accepted |
| [0005](decisions/0005-dns-stays-at-ventraip.md) | DNS stays at VentraIP, and email records are never touched | Accepted |
| [0007](decisions/0007-adopt-process-template.md) | Work through process-template 1.0.1 | Accepted |
| [0008](decisions/0008-astro-7-on-node-24.md) | Astro 7 on Node 24 LTS | Accepted |
| [0011](decisions/0011-publish-at-launch.md) | The site is first published at launch, not while it's built | Accepted |
| [0027](decisions/0027-one-web-repo-walkingkangaroo-web.md) | One web repo, walkingkangaroo-web, with the hub in sites/hub/ | Accepted |

## Open questions

Questions waiting on an answer live in [`rounds/`](rounds/), one file per decision round.
