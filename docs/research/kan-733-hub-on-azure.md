# Research: the hub launches on Azure Static Web Apps

Date: 2026-10-15
Issue: https://linear.app/walkingkangaroo/issue/KAN-733/publish-the-site-to-github-pages-at-walkingkangaroocom
Round: [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md)

## The question

Grant, 2026-10-15: "move away from github pages. all sites including the hub will be hosted on
azure". That reopens [0004](../decisions/0004-github-pages-public-repo.md) (the hub on GitHub
Pages) and the line in [0031](../decisions/0031-product-sites-on-azure-static-web-apps.md) that
says the hub stays there. KAN-733 was the Launch step's GitHub Pages issue. It becomes the
launch of the hub on Azure Static Web Apps.

A good outcome:

- `https://walkingkangaroo.com` serves the hub over HTTPS, and `www` redirects to it.
- Email keeps working. The MX records never change ([0005](../decisions/0005-dns-stays-at-ventraip.md)).
- The hub's workflow is the pattern each product site copies (0031).

## What exists today

- **No deploy setup.** There's no `.github/` folder (`ls -a .github`) and no `CNAME` file
  (`ls sites/hub/public`).
- **The hub builds for the apex.** `sites/hub/astro.config.mjs` has
  `site: 'https://walkingkangaroo.com'` and no `base` (0011). The layout's canonical link and
  link-preview tags come from `Astro.site`.
- **The hub doesn't use `packages/shared/`.** `grep shared sites/hub/package.json sites/hub/src`
  finds nothing. The signature is for product sites (0028).
- **The 404 page** is `sites/hub/src/pages/404.astro`, so the build writes `dist/404.html`.
- **Node 24** in `.nvmrc`. pnpm 12.9.1 in `packageManager`. The workspace is `sites/*` and
  `packages/*` (`pnpm-workspace.yaml`).
- **DNS today** (`nslookup`, and `dns.google` for CAA, 2026-10-15):
  - The apex and `www` both have an A record to 103.42.108.46. It answers over HTTP with a 200
    and doesn't answer over HTTPS. The research agent thinks it's VentraIP's forwarding or
    parking host (unverified).
  - MX: mx1–mx4.email-hosting.net.au (VentraIP email). Never touched.
  - TXT at the apex: one `google-site-verification` record.
  - No CAA records, so nothing stops Azure's certificate (it's issued by DigiCert).
- **Launch content:**
  - The five devlog posts are `draft: true`. 0020 says Grant flips them at launch and sets the date.
  - The newsletter band's form posts nowhere. `NewsletterBand.astro` says "the Newsletter step
    connects this form to Kit (decision 0006)". The brief puts Newsletter (step 5) before Launch
    (step 6).
  - No bracketed placeholder text was found in `sites/hub/src`.
- **Linear:** no Launch milestone yet. KAN-908, the first product site's deploy, is in Backlog.

## Options

The host itself is Grant's call and is settled: Azure Static Web Apps, Free plan, the same as
product sites (0031). The options below are about how the hub goes live.

### The workflow (the same for every option)

- **What it is:**
  - `.github/workflows/deploy-hub.yml` runs on pushes to `main` that touch `sites/hub/**`, the
    lockfile, the root `package.json`, `pnpm-workspace.yaml`, `.nvmrc` or the workflow itself.
  - It sets up pnpm from `packageManager` and Node from `.nvmrc`, runs `pnpm install
    --frozen-lockfile` and `pnpm --filter hub build`.
  - It uploads with `Azure/static-web-apps-deploy` (pinned to the SHA GitHub's docs give for
    `v1`), with `app_location: sites/hub/dist`, `output_location: ''` and `skip_app_build: true`.
  - The token is a repo secret named for the site, for example
    `AZURE_STATIC_WEB_APPS_API_TOKEN_HUB`, which Grant adds.
  - `sites/hub/public/staticwebapp.config.json` is copied into `dist/` by Astro:
    - a 404 rewrite to `/404.html`;
    - `trailingSlash: "always"`, to match Astro's directory output;
    - a year's immutable cache on `/_astro/*`;
    - a few plain security headers.
  - No `navigationFallback`, because that would turn every unknown URL into a 200.
- **Cost:** one workflow and one config file. Grant creates the app in the Azure portal and adds
  the token.
- **Risk:**
  - The deploy action runs only on Linux runners, and it's old: the `v1` tag dates from 2021.
  - Whether pnpm 12 works with the setup actions is only known by running it.
  - A failed run shows in `gh run view`.

### Option A: go live on the Azure address first, then switch the domain

- **What it is:**
  - The workflow merges, and the hub is public at `<name>.azurestaticapps.net` straight away.
  - Grant checks it on his phone.
  - The domain switch is a separate step: TXT first, then the apex and `www` records.
- **Cost:** two issues instead of one. The site is public, under a random name, before launch
  day. 0011 kept it off line because of placeholder text and a base path. Neither applies any
  more: there's no placeholder text, and Azure needs no base path.
- **Risk:**
  - Every merge after this is live at the Azure address.
  - Search engines could find it, but the canonical link already points at walkingkangaroo.com.

### Option B: hold the workflow until launch day

- **What it is:** the workflow and the domain switch merge on the same day.
- **Cost:** one step. Grant sees the site only in screenshots until then.
- **Risk:** any deploy problem shows up on launch day, at the same time as the DNS change.

### Pull-request previews

- **What they are:** each pull request deploys to
  `<name>-<PR number>.<region>.azurestaticapps.net`, and a bot comments the link. The Free plan
  allows 3 at a time, and closing the pull request frees its slot.
- **For:** Grant can open a change on his phone before he merges it.
- **Against:**
  - Azure: "Anyone can access the staged versions of your application via their URL, even if
    your GitHub repo is private." The URL is the production name plus the PR number, so it can
    be guessed.
  - Claude's draft copy would be public there until Grant rewrites it (0014).
  - Pull requests from forks get no secrets, so their deploy must be skipped.

### The apex record

- **ALIAS** to the app's hostname is Azure's recommendation. VentraIP lists ALIAS as a record
  type, but nobody has confirmed it works at the apex.
- **An A record** to the app's `stableInboundIP` works anywhere. Azure says it serves "a single
  regional host" with no global distribution. The audience is mostly in Australia, so that costs
  little.
- **Forwarding the apex to `www`** at VentraIP takes over the apex and `www` A records. A
  VentraIP staff reply from about four years ago says forwarding doesn't support HTTPS (seen
  only as a search snippet). If so, `https://walkingkangaroo.com` would fail, and that's the
  address the site, its canonical links and its link previews all use. 0031 listed forwarding
  second.
- **The redirect from `www`** is done by Azure, not VentraIP: both names are added to the app,
  and the apex is set as the default domain. Then "requests to other domains are automatically
  redirected to the default domain".

### The newsletter band

- **Wait for the Newsletter step:** the brief's order. Launch waits on its own round, Kit, and
  Kit's sending records at VentraIP.
- **Hide the band until Kit is connected:** launch doesn't wait. The Newsletter step brings the
  band back.
- **Leave it as it is:** a form that does nothing goes live.

## What can't be known without building

- **Whether VentraIP takes an ALIAS at the apex**, and whether it needs the old A record deleted
  first. That would leave a short gap. Grant finds out when he adds it.
- **How long Azure takes to issue the certificate** after the records change. Reports range from
  minutes to hours. Adding the TXT record first, while the old A record still serves, means
  validation happens before traffic moves.
- **The status code of the default-domain redirect** (301 or 302), and whether it also covers the
  `azurestaticapps.net` name and previews. Check with `curl -I` after setting it.
- **Whether the setup actions are happy with pnpm 12.** The first workflow run shows it.

## Sources

Read on 2026-10-15. Pages marked "checked" I opened myself. The rest come from two research
agents' reports.

- Azure, apex domains on external DNS: ALIAS, A record and forwarding, and "a single regional
  host" (checked): https://learn.microsoft.com/en-us/azure/static-web-apps/apex-domain-external
- Azure, default domain: "requests to other domains are automatically redirected" (checked):
  https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-default
- Azure, pull-request environments: public URLs, the URL pattern, 3 on Free (checked):
  https://learn.microsoft.com/en-us/azure/static-web-apps/review-publish-pull-requests
- Azure, plans: Free has 3 staging environments, 2 custom domains and free certificates
  (checked): https://learn.microsoft.com/en-us/azure/static-web-apps/plans
- Azure, custom domains and zero-downtime migration (TXT first):
  https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain
- Azure, build configuration (`skip_app_build`, `app_location`, monorepos):
  https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration
- Azure, `staticwebapp.config.json` (`responseOverrides`, `trailingSlash`, `globalHeaders`):
  https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
- GitHub's Azure Static Web Apps guide, with the deploy action pinned by SHA:
  https://docs.github.com/en/actions/how-tos/deploy/deploy-to-third-party-platforms/azure-static-web-app
- GitHub, secrets aren't passed to workflows from forks:
  https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions
- pnpm in CI: https://pnpm.io/continuous-integration
- VentraIP DNS record types, which list ALIAS (apex use unconfirmed):
  https://ventraip.com.au/support-centre/add-remove-or-manage-dns-records-within-vipcontrol/
- VentraIP domain forwarding:
  https://ventraip.com.au/faq/article/adding-domain-redirects-using-vipcontrol/
- Forwarding without HTTPS: a Whirlpool thread, search snippet only (unverified):
  https://forums.whirlpool.net.au/archive/2092940
- Certificate timing, from community answers (unverified):
  https://learn.microsoft.com/en-us/answers/questions/5762480/issue-with-creating-custom-domain-in-static-web-ap
