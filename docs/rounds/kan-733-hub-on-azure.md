# Decision round: the hub launches on Azure Static Web Apps

Status: Answered
Opened: 2026-10-15
Issue: https://linear.app/walkingkangaroo/issue/KAN-733/publish-the-site-to-github-pages-at-walkingkangaroocom
Research: [docs/research/kan-733-hub-on-azure.md](../research/kan-733-hub-on-azure.md)

Grant, 2026-10-15: "move away from github pages. all sites including the hub will be hosted on
azure". That's settled: the hub moves to Azure Static Web Apps, Free plan, like product sites
(0031). It supersedes the GitHub Pages part of 0004. These questions are about how it goes live.

To answer, edit the `Answer:` lines, reply in chat, or run
`/shape kan-733-hub-on-azure 1: A, 2: B`. Say "use the defaults" to take every default below.

## Questions

### 1. Should the hub go live on its Azure address before walkingkangaroo.com points at it?

- **A: Yes.**
  - The deploy workflow merges first, and the hub is public at `<name>.azurestaticapps.net`.
  - You check it on your phone.
  - Switching the domain is the launch, a step or two later.
  - Every merge after that is live at the Azure address.
- **B: No.** The workflow and the domain switch go live on the same day. Until then you see the
  site in screenshots, as now.
- **Recommendation:** A. You get to see the real site before launch, and a deploy problem
  doesn't land on the same day as the DNS change. 0011 kept the site off line because of
  placeholder text and a base path. Neither applies now.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A. Grant, 2026-10-15: "use the defaults" (default taken).

### 2. What should the newsletter band do at launch, while its form isn't connected to Kit yet?

- **A: Launch waits for the Newsletter step.** That's the brief's order. It needs its own round,
  plus Kit's sending records and an SPF record at VentraIP first.
- **B: Hide the band until Kit is connected.** Launch doesn't wait. The Newsletter step brings the
  band back.
- **C: Leave it as it is.** A Subscribe button that does nothing goes live.
- **Recommendation:** B. The hub's main job now is sending people to panepilot.au before PanePilot
  goes live in November, and that shouldn't wait on Kit.
- **Default if unanswered:** B.
- **For:** Grant
- **Answer:** B. Grant, 2026-10-15: "use the defaults" (default taken).

### 3. Should pull requests to the hub get a preview link?

- **A: Yes, for pull requests from this repo.**
  - Each one deploys to `<name>-<PR number>.<region>.azurestaticapps.net`, and you can open it on
    your phone before you merge.
  - The link is public and can be guessed. My drafts of your words would be visible there until
    you rewrite them (0014).
  - Pull requests from forks are skipped.
- **B: No.** Only `main` deploys. Pull requests are checked with `pnpm dev` and screenshots, as
  now.
- **Recommendation:** A. Seeing a change on a real phone is worth more than the small chance
  someone guesses the link. Posts marked `draft: true` stay out of previews either way.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A. Grant, 2026-10-15: "use the defaults" (default taken).

### 4. If VentraIP won't take an ALIAS record at the apex, what should walkingkangaroo.com use instead?

0031 listed ALIAS first, then forwarding to `www`, then an A record. For the hub, forwarding
looks like a poor second choice.

- **A: An A record to the app's fixed IP.**
  - `https://walkingkangaroo.com` stays the address.
  - It's served from one Azure region instead of worldwide. Most visitors are in Australia, so
    that matters little.
- **B: VentraIP forwarding to `www`, which becomes the main address.**
  - VentraIP's forwarding probably doesn't do HTTPS, so `https://walkingkangaroo.com` would fail
    for anyone who types it.
  - The site's canonical links and link previews would move to `www`.
- **Recommendation:** A, so the plain address always works over HTTPS. The order becomes ALIAS,
  then an A record, for the hub and for product sites.
- **Default if unanswered:** A.
- **For:** Grant
- **Answer:** A. Grant, 2026-10-15: "use the defaults" (default taken).

## Decided without asking

- **The repo stays public.** That's the other half of 0004, and nothing here changes it.
- **walkingkangaroo.com is the main address, and `www` redirects to it.** The site is already
  built for the apex (0011). Both names are added to the app, and the apex is set as Azure's
  default domain, so the redirect is Azure's, not VentraIP's.
- **The hub's workflow follows 0031:**
  - its own workflow, `.github/workflows/deploy-hub.yml`;
  - a `paths:` filter on `sites/hub/**`, the lockfile, the root `package.json`,
    `pnpm-workspace.yaml`, `.nvmrc` and the workflow itself;
  - a pnpm build, then `skip_app_build`;
  - a token secret named for the site.

  The hub doesn't use `packages/shared/`, so that folder isn't in its filter. Product sites copy
  this workflow (KAN-908).
- **`staticwebapp.config.json` lives in `sites/hub/public/`.** It holds the 404 page, trailing
  slashes to match Astro's output, long caching for `/_astro/`, and a few plain security
  headers.
- **The Azure side is yours:**
  - You create the app in your subscription, in the Azure region closest to Australia.
  - You add the token to GitHub's secrets.

  Claude never sees the token (0031, and the project facts' stop-and-ask list).
- **The domain switch runs TXT first.**
  - Azure checks you own the domain while the old A record still serves, and only then do the
    apex and `www` records move.
  - You make every DNS change, and Claude gives the exact records and checks them (0005).
  - The MX records and the `google-site-verification` record are never touched.
- **The devlog posts go live at launch, dated launch day.** 0020 already says so.
- **There's no `CNAME` file.** Azure doesn't use one. The project facts' protected-file list and
  extra checks are updated to match.
- **Launch doesn't wait for KAN-913,** the week calendar on stop 2. It can merge before or after.

## Held out

- **A Content-Security-Policy header:** Backlog. It's worth having, but it needs testing against
  the hero's script and the Kit embed. That's easier once both are live.
  https://linear.app/walkingkangaroo/issue/KAN-920/add-a-content-security-policy-header-to-the-hub
- **Cancelling whatever serves 103.42.108.46:** it's yours to check at VentraIP after launch. It's
  outside the repo.

## Outcome

- **Decisions:**
  - [0032](../decisions/0032-hub-on-azure-static-web-apps.md): the hub is on Azure Static Web
    Apps, at walkingkangaroo.com.
  - [0033](../decisions/0033-hub-goes-live-on-its-azure-address-first.md): it goes live on its
    Azure address first.
  - [0034](../decisions/0034-newsletter-hidden-until-kit.md): the newsletter band and its links
    are hidden until Kit is connected. The links are the header's "Get updates", the project
    pages' "Follow this project", and the hero's fallback, which all jump to the band.
  - [0035](../decisions/0035-pull-requests-get-preview-links.md): pull requests from this repo get
    a preview link.
  - [0036](../decisions/0036-apex-uses-alias-or-an-a-record.md): an apex domain uses ALIAS, else
    an A record, never forwarding.
  - Status lines updated on 0004, 0005, 0011 and 0031.
- **Spec or design changes:**
  - `CLAUDE.md` (what the site is);
  - `docs/brief.md` (Launch is now step 5, Newsletter step 6);
  - `docs/process/project.md` (extra checks, CI, protected files, stop-and-ask);
  - `docs/DECISIONS.md`.
- **Issues, in build order** (milestone Launch):
  1. https://linear.app/walkingkangaroo/issue/KAN-917/the-newsletter-band-and-every-link-to-it-stay-hidden-until-kit-is
  2. https://linear.app/walkingkangaroo/issue/KAN-733/the-hub-deploys-to-azure-static-web-apps-from-main-with-a-preview-link
     (Grant creates the Azure app and adds the token first)
  3. https://linear.app/walkingkangaroo/issue/KAN-918/walkingkangaroocom-serves-the-hub-over-https-and-www-redirects-to-it
  4. https://linear.app/walkingkangaroo/issue/KAN-919/the-five-first-devlog-posts-are-live-dated-launch-day
- **KAN-908** (the first product site's deploy) now points at the hub's setup, 0035 and 0036.
