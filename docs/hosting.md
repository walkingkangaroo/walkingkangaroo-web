# Hosting and DNS

What each site is hosted on and which DNS records point at it, written down when the site goes
live. Each section also has the checks to rerun, so the next site can copy them. The hub is on
its domain, and so is PanePilot's site.

No token and no validation code is in this file. The repo is public.

## The hub: walkingkangaroo.com

Went live on 2026-10-15 (KAN-918). It serves over HTTPS at
`https://walkingkangaroo.com/`, and `www` redirects to it.

### The app

| | |
| --- | --- |
| Service | Azure Static Web App, Free plan, in Grant's subscription |
| App name | `jolly-bay-0fa6cd900` |
| Default address | `https://jolly-bay-0fa6cd900.6.azurestaticapps.net` |
| Region | East Asia (Hong Kong). The preview hostnames contain `eastasia`, and the address resolves through `msha-slice-6-hk1`. |
| Deployed by | `.github/workflows/deploy-hub.yml` (KAN-733) |
| Configured by | `sites/hub/public/staticwebapp.config.json` |
| Deploy token | The repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN_HUB`. Only its name is here. |

Decisions: [0032](decisions/0032-hub-on-azure-static-web-apps.md) (the hub on Azure),
[0035](decisions/0035-pull-requests-get-preview-links.md) (preview links),
[0036](decisions/0036-apex-uses-alias-or-an-a-record.md) (ALIAS, else an A record, never
forwarding), [0005](decisions/0005-dns-stays-at-ventraip.md) (DNS stays at VentraIP; Grant makes
every change; MX never changes).

### Custom domains in Azure

In the portal: the app, then Settings, then Custom domains.

- `walkingkangaroo.com` and `www.walkingkangaroo.com` were both added with validation type TXT
  ("Custom domain on other DNS"). The portal gave the hosts as `@` (the root) and `www`.
- Both validated within minutes. `www` showed "Adding..." for a few minutes first.
- Azure issued a DigiCert certificate for each name, valid until 2027-04-15. They were issued and
  served before any traffic record moved, so the certificates had no gap at the switch. Resolvers
  that had cached the old A record still timed out for hours: see the DNS section.
- `walkingkangaroo.com` is the default domain ("Set default"). So `www`, and the
  `azurestaticapps.net` address, redirect to it.

### DNS records at VentraIP

VIPcontrol, then walkingkangaroo.com, then DNS. Nameservers are ns1 to ns3 at
`nameserver.net.au`.

Allow hours, not minutes, for a change to reach everyone. About an hour after the switch,
Cloudflare's resolver already had the new address, but Google Public DNS still gave the old A
record (`103.42.108.46`) with about 3.4 hours of cache left. Until then, anyone using it got an
error over HTTPS (a timeout or a failed handshake), and the old page over plain HTTP. Test
against VentraIP's nameservers, or with `curl --resolve` (below), rather than waiting on a public
resolver.

Records now in place for the site:

| Type | Host (VentraIP hostname field) | Value |
| --- | --- | --- |
| ALIAS | blank (the root) | `jolly-bay-0fa6cd900.6.azurestaticapps.net` |
| CNAME | `www` | `jolly-bay-0fa6cd900.6.azurestaticapps.net` |
| TXT | blank (the root) | Azure's domain-validation code for `walkingkangaroo.com`. Kept. The value is not recorded here. |

Removed:

| Type | Host | Value | Why |
| --- | --- | --- | --- |
| A | root | `103.42.108.46` | VentraIP's old blank page. Replaced by the ALIAS. |
| A | `www` | `103.42.108.46` | Replaced by the CNAME. |
| TXT | `www` | Azure's validation code for `www` | Deleted after `www` validated. A CNAME can't share its name with any other record, and the CNAME now proves ownership. |

Untouched, and never to be changed ([0005](decisions/0005-dns-stays-at-ventraip.md)):

| Type | Host | Value |
| --- | --- | --- |
| MX | root | 10 `mx1.email-hosting.net.au` |
| MX | root | 10 `mx2.email-hosting.net.au` |
| MX | root | 20 `mx3.email-hosting.net.au` |
| MX | root | 30 `mx4.email-hosting.net.au` |
| TXT | root | Google's site-verification record. The value is not recorded here. |

There are no CAA records. This matters: Azure's certificates come from DigiCert, and a CAA record
that leaves DigiCert out would block them.

The old host, `103.42.108.46`, no longer serves the site. Cancelling any VentraIP hosting behind
it is Grant's, outside the repo.

### The apex option: ALIAS

[0036](decisions/0036-apex-uses-alias-or-an-a-record.md) prefers an ALIAS, and an ALIAS is what
was used.

- VentraIP accepted an ALIAS at the root while the old A record still existed. Grant added the
  ALIAS and then deleted the A, so VentraIP's nameservers never answered without an address.
- VentraIP's nameservers ns1, ns2 and ns3 then answered `20.2.51.235` for the root, the same IP
  the `azurestaticapps.net` name gave at that moment. Later they answered `20.247.40.175`: the IP
  moves between Azure's servers, so compare it with what `$APP` resolves to at the same moment,
  not with a fixed IP.
- The A-record fallback (`stableInboundIP`, from the portal's Overview, then JSON View) was not
  needed.

### The order that worked

For the next site to copy.

0. A day ahead, check the TTL of the records you'll replace, and lower it (to 300, say) if
   VentraIP allows. Otherwise, plan for resolvers to keep the old address for that long. Here it
   was at least 13,000 seconds, nearly 4 hours.
1. In Azure, add both names with TXT validation. At VentraIP, add each TXT record at the host
   Azure shows. Wait for both to be Validated. Nothing else changes, and the old site keeps
   serving.
2. `www`: delete its TXT and its old A record, then add the CNAME.
3. The root: add the ALIAS, then delete the old A record.
4. In Azure, set the root as the default domain.

After each step, check public DNS and the MX records before the next.

### The checks

For Git Bash. Change `DOMAIN` and `APP` for another site.

```bash
DOMAIN=walkingkangaroo.com
APP=jolly-bay-0fa6cd900.6.azurestaticapps.net
NS=ns1.nameserver.net.au

# www redirects to the root. Expect 301 and Location: https://$DOMAIN/
curl -sSI --max-time 15 https://www.$DOMAIN/ | grep -iE '^(HTTP|location)'
curl -sSI --max-time 15 https://www.$DOMAIN/about/ | grep -iE '^(HTTP|location)'   # the path is kept

# The root serves. Expect 200.
curl -sSI --max-time 15 https://$DOMAIN/ | grep -iE '^HTTP'

# HTTP goes to HTTPS. Expect 301.
curl -sSI --max-time 15 http://$DOMAIN/ | grep -iE '^(HTTP|location)'
curl -sSI --max-time 15 http://www.$DOMAIN/ | grep -iE '^(HTTP|location)'

# The default Azure address redirects to the root. Expect 301.
curl -sSI --max-time 15 https://$APP/ | grep -iE '^(HTTP|location)'

# The social image. Expect 200 and image/png.
curl -sSI --max-time 15 https://$DOMAIN/og-default.png | grep -iE '^(HTTP|content-type)'

# Canonical links use the root.
curl -sS --max-time 15 https://$DOMAIN/ | grep -o '<link rel="canonical"[^>]*>'

# Public DNS (Google), then the VentraIP nameserver itself.
curl -s "https://dns.google/resolve?name=$DOMAIN&type=A"
curl -s "https://dns.google/resolve?name=www.$DOMAIN&type=CNAME"
nslookup -type=A $DOMAIN $NS

# Email is untouched. Expect the same four MX records and preferences, and the
# google-site-verification TXT still present.
nslookup -type=MX $DOMAIN $NS
nslookup -type=TXT $DOMAIN $NS

# No CAA record shuts out DigiCert. Expect no "Answer" in the reply.
# (Windows nslookup has no CAA type.)
curl -s "https://dns.google/resolve?name=$DOMAIN&type=CAA"

# Test a name against Azure before DNS moves, or while caches are stale.
# Use the IP the Azure name resolves to.
IP=$(nslookup $APP | awk '/^Address/ {a=$2} END {print a}')
curl -sSI --max-time 15 --resolve $DOMAIN:443:$IP https://$DOMAIN/ | grep -iE '^HTTP'
```

The `--resolve` check needs the custom domain already added and validated in Azure.

### Results on 2026-10-15

| Check | Result |
| --- | --- |
| `https://walkingkangaroo.com/` | 200 |
| `https://www.walkingkangaroo.com/` | **301** to `https://walkingkangaroo.com/` |
| `https://www.walkingkangaroo.com/about/` | 301 to `https://walkingkangaroo.com/about/` |
| `http://walkingkangaroo.com/` | 301 to `https://walkingkangaroo.com/` |
| `http://www.walkingkangaroo.com/` | 301 to `https://www.walkingkangaroo.com/`, then 301 to the root |
| `https://jolly-bay-0fa6cd900.6.azurestaticapps.net/` | 301 to `https://walkingkangaroo.com/` |
| `https://walkingkangaroo.com/og-default.png` | 200, `image/png` |
| Canonical links | `https://walkingkangaroo.com/` and `https://walkingkangaroo.com/projects/panepilot/` |
| MX at ns1 | The same four records and preferences as before |
| `google-site-verification` TXT | Still present |
| 390 px wide | No horizontal scroll |

The `www` redirect is a **301**, not a 302.

### Open point

Setting the default domain also redirects the `azurestaticapps.net` address. Whether it also
redirects pull-request preview links
(`jolly-bay-0fa6cd900-<PR>.eastasia.6.azurestaticapps.net`,
[0035](decisions/0035-pull-requests-get-preview-links.md)) is not known yet. The next pull
request that deploys a preview will show.

## PanePilot's site: panepilot.au

`sites/panepilot/`, on its own Azure Static Web App. It went live at `https://panepilot.au/` on
2026-11-07 (KAN-948), and `www` and the app's Azure address redirect there. Every merge to
`main` that touches it deploys.

### The app

| | |
| --- | --- |
| Service | Azure Static Web App, Free plan, in Grant's subscription |
| App name | `panepilot-site` |
| Default address | `https://calm-water-0d51c3900.3.azurestaticapps.net` |
| Region | East Asia, the same as the hub |
| Deployed by | `.github/workflows/deploy-panepilot.yml` (KAN-908) |
| Configured by | `sites/panepilot/public/staticwebapp.config.json` |
| Deploy token | The repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN_PANEPILOT`. Only its name is here. |

Decisions: [0031](decisions/0031-product-sites-on-azure-static-web-apps.md) (product sites on
Azure, one app each), [0035](decisions/0035-pull-requests-get-preview-links.md) (preview links),
[0040](decisions/0040-panepilot-site-live-on-azure-first.md) (live on the Azure address first).

### The domain

Moved on 2026-11-07 (KAN-948). panepilot.au and `www.panepilot.au` moved to this app before
PanePilot's sign-up opens ([0052](decisions/0052-panepilot-site-collects-interest-before-sign-up.md),
replacing [0040](decisions/0040-panepilot-site-live-on-azure-first.md)'s timing). The app's
side, letting go of panepilot.au, was PanePilot's KAN-947, released between steps 2 and 3.
The records table and steps below are kept as the record of how it was done.

It follows the hub's [order that worked](#the-order-that-worked) with one deliberate difference:
the hub validated `www` by TXT before touching it, while here the `www` CNAME goes in first and
Azure validates `www` through it. That is safe because `www.panepilot.au` serves nothing today,
so nothing breaks and no certificate gap opens.

#### Records at VentraIP on 2026-11-07, before the switch

Read from ns1.nameserver.net.au and Google Public DNS. Nameservers are ns1 to ns3 at
`nameserver.net.au`.

| Type | Host | Value | TTL | What happens to it |
| --- | --- | --- | --- | --- |
| A | root | `4.196.42.39` | 14400 | The app's Container Apps environment, which redirects to `https://app.panepilot.au/` (308). Replaced in step 3, removed in step 4. |
| A | `www` | `4.196.42.39` | 14400 | Answers nothing useful: HTTPS resets, HTTP gives 404. Removed in step 2, because a CNAME can't share its name with any other record. Not one of the issue's listed records; Grant approved deleting it on 2026-11-07. |
| TXT | `asuid` | The Container App's domain-verification code. Not recorded here. | 3600 | Left alone here. It belongs to the app's binding of panepilot.au, so whether it goes is KAN-947's call. |
| MX | root | The four `email-hosting.net.au` records (below) | 3600 | Never changes ([0005](decisions/0005-dns-stays-at-ventraip.md)). |
| TXT | root | `v=spf1 +a +mx +include:spf.email-hosting.net.au ~all` | 3600 | Never changes. Its `+a` means the root's address may send mail, and that address becomes Azure's after step 3; that sends no mail, so it's harmless. |
| TXT | root | Google's site-verification record. Not recorded here. | 3600 | Never changes. |

There are no CAA records, so nothing blocks Azure's DigiCert certificates.

#### Grant's steps

Grant makes every change ([0005](decisions/0005-dns-stays-at-ventraip.md)). After each step, run
the [checks](#the-checks-for-the-domain) before the next, and check the MX records are still the
four below.

1. **Email** (done, 2026-11-06). `hello@panepilot.au` set up at VentraIP and a test received.
2. **Validate both names in Azure, and point `www` at the app.** The old site keeps serving the
   root through all of this.
   1. Azure portal: `panepilot-site`, then Settings, then Custom domains, then Add, "Custom domain
      on other DNS". Add `panepilot.au` with validation type TXT. Azure shows a TXT host (for
      the hub it was `@`, the root) and a code.
   2. VentraIP: add that TXT record at exactly the host Azure shows, with Azure's code as its
      value. Leave the Google and SPF TXT records beside it as they are.
   3. In Azure, wait until `panepilot.au` shows Validated.
   4. VentraIP: delete the `www` A record to `4.196.42.39`, then add a CNAME, host `www`, value
      `calm-water-0d51c3900.3.azurestaticapps.net`.
   5. Azure: add `www.panepilot.au` ("Custom domain on other DNS"), and this time choose the
      CNAME validation type (the hostname record type), not TXT. Azure validates it by the
      CNAME from 2.4, so no TXT is added for `www`. Wait until it shows Validated and a
      certificate is issued.
   6. Check the root against Azure with the `--resolve` check below. Expect 200, which shows the
      certificate for `panepilot.au` is already served. **Step 2 done is the go-ahead for
      KAN-947's merge and release**: KAN-947 waits until panepilot.au is validated here.
3. **Pause until PanePilot's KAN-947 is released.** It frees panepilot.au from the Container App
   and deletes its certificate there, so from the release until this step is in place the root
   gives an error. Move the root straight after the release (KAN-947's runbook: tag, then
   Grant's apex change):
   - VentraIP takes an ALIAS at the root (it did for the hub), so add an ALIAS, host blank (the
     root), value `calm-water-0d51c3900.3.azurestaticapps.net`
     ([0036](decisions/0036-apex-uses-alias-or-an-a-record.md)).
   - Only if VentraIP refuses the ALIAS: an A record at the root to the app's `stableInboundIP`
     (portal: Overview, then JSON View).
4. **Remove the old root A record to `4.196.42.39`**, straight after step 3, so the nameservers
   never answer without an address. Then, in Azure, set `panepilot.au` as the default domain, so
   `www` and the `azurestaticapps.net` address redirect to it.
5. **Change no other record.** Not the MX, SPF or Google records, and not the `asuid` TXT unless
   KAN-947 says so.

Recommended, a day before KAN-947 is released: lower the TTL of the root A record from 14400 to
300 if VentraIP allows, so resolvers drop the old address in minutes instead of up to four hours.
Without it, visitors whose resolver cached `4.196.42.39` get an error over HTTPS (a failed
handshake or a 404) for up to four hours after the switch, because the Container App no longer
serves panepilot.au once KAN-947 is out. The hub had the same gap (see its DNS section).

#### The checks for the domain

The hub's [checks](#the-checks), with this site's names. Run each nameserver, not just one: a
new record can reach one before the others.

```bash
DOMAIN=panepilot.au
APP=calm-water-0d51c3900.3.azurestaticapps.net

# After step 2: www points at the app on all three nameservers. Expect the CNAME to $APP.
for NS in ns1 ns2 ns3; do nslookup -type=CNAME www.$DOMAIN $NS.nameserver.net.au; done

# After steps 3 and 4: on all three, the same IP as `nslookup $APP` gives at that moment
# (with an ALIAS, nslookup shows the address, not the ALIAS; it moves between Azure's
# servers), and no 4.196.42.39.
nslookup $APP
for NS in ns1 ns2 ns3; do nslookup -type=A $DOMAIN $NS.nameserver.net.au; done

# After step 4. Before then these give 308s or errors, which is expected.
# The root serves with a valid certificate. Expect 200 (curl fails on a bad certificate).
curl -sSI --max-time 15 https://$DOMAIN/ | grep -iE '^HTTP'

# www, plain HTTP and the Azure address redirect to the root. Expect 301 to https://$DOMAIN/.
curl -sSI --max-time 15 https://www.$DOMAIN/ | grep -iE '^(HTTP|location)'
curl -sSI --max-time 15 http://$DOMAIN/ | grep -iE '^(HTTP|location)'
curl -sSI --max-time 15 http://www.$DOMAIN/ | grep -iE '^(HTTP|location)'   # may hop via https://www first
curl -sSI --max-time 15 https://$APP/ | grep -iE '^(HTTP|location)'

# The social image. Expect 200 and image/png.
OG=$(curl -sS --max-time 15 https://$DOMAIN/ | grep -oE 'og:image" content="[^"]+' | cut -d'"' -f3)
curl -sSI --max-time 15 "$OG" | grep -iE '^(HTTP|content-type)'

# Email is untouched: the same four MX records, and the SPF and Google TXT records.
for NS in ns1 ns2 ns3; do nslookup -type=MX $DOMAIN $NS.nameserver.net.au; done
nslookup -type=TXT $DOMAIN ns1.nameserver.net.au

# No CAA record shuts out DigiCert. Expect no "Answer" in the reply.
curl -s "https://dns.google/resolve?name=$DOMAIN&type=CAA"

# Step 2.6: test the root against Azure before step 3, once it is validated there.
IP=$(nslookup $APP | awk '/^Address/ {a=$2} END {print a}')
curl -sSI --max-time 15 --resolve $DOMAIN:443:$IP https://$DOMAIN/ | grep -iE '^HTTP'
```

Then the page itself: no placeholder text, "Tell me when it opens" opens an email to
`hello@panepilot.au` with the subject "Tell me when PanePilot opens", no "Sign in" at any width,
and a link pasted into a chat app shows the title, description and image.

#### Results after step 2, on 2026-11-07

Grant added the TXT for `panepilot.au`, deleted the `www` A record, added the `www` CNAME, and
both names show Validated in Azure.

| Check | Result |
| --- | --- |
| `www` CNAME on ns1, ns2, ns3 | `calm-water-0d51c3900.3.azurestaticapps.net` on all three |
| Root A on ns1, ns2, ns3 | Still `4.196.42.39`, as expected until step 3 |
| MX on ns1, ns2, ns3 | The same four records and preferences |
| Root TXT on ns1 | Azure's validation code beside the Google and SPF records, both unchanged |
| `--resolve` root to Azure (`13.75.66.141`) | 200, with a certificate curl accepts |
| `--resolve` `www` to Azure | 200 (a redirect to the root comes once the default domain is set in step 4) |
| `https://www.panepilot.au/` through public DNS | Still the reset: Google Public DNS had the old `www` A cached with about 12,100 seconds (3.4 hours) left |

So the certificate for `panepilot.au` is served before the switch, and step 2 is done: the
go-ahead for PanePilot's KAN-947.

#### Results after steps 3 and 4, on 2026-11-07

KAN-947 was released, then Grant added the ALIAS at the root, deleted the old root A record,
and set `panepilot.au` as the default domain in Azure.

| Check | Result |
| --- | --- |
| Root A on ns1, ns2, ns3 | Azure addresses on all three (`13.75.66.141` on ns1 and ns2, `20.99.157.72` on ns3), and no `4.196.42.39`. The ALIAS follows Azure's moving IPs, so the nameservers needn't agree. |
| `www` CNAME on ns1, ns2, ns3 | `calm-water-0d51c3900.3.azurestaticapps.net` on all three |
| MX on ns1, ns2, ns3 | The same four records |
| SPF and Google TXT | Unchanged |
| CAA | None |
| `https://panepilot.au/` | 200, with a certificate curl accepts (from both nameservers' addresses) |
| `https://panepilot.au/no-such-page/` | 404 |
| `https://www.panepilot.au/` | **301** to `https://panepilot.au/` |
| `https://www.panepilot.au/a/` | 301 to `https://panepilot.au/a/` (the path is kept) |
| `http://panepilot.au/` | 301 to `https://panepilot.au/` |
| `http://www.panepilot.au/` | 301 to `https://www.panepilot.au/`, then 301 to the root |
| `https://calm-water-0d51c3900.3.azurestaticapps.net/` | 301 to `https://panepilot.au/` |
| Social image | 200, `image/png` |
| Canonical link | `https://panepilot.au/` |
| Security headers | nosniff, strict-origin-when-cross-origin, DENY |
| Page | No placeholder, no `/sign-in` link, both mailto links to `hello@panepilot.au`, the main one with the subject "Tell me when PanePilot opens" |
| Lighthouse mobile 13.5.0 | Performance 100, accessibility 100, best practices 100, SEO 100 |

Public resolvers took a while to agree. When these checks ran, Cloudflare's had the Azure
address with a 300-second TTL, while some of Google's still gave `4.196.42.39`, and this machine's
resolver too. With the Container App no longer serving panepilot.au, those visitors got a reset
over HTTPS and a 404 over HTTP until their cache ran out. The HTTP checks above were run with
`curl --resolve` to the nameservers' addresses, and Lighthouse with Chrome's
`--host-resolver-rules`, for that reason. PageSpeed Insights' free daily quota was used up.

Email for `hello@panepilot.au` ([0041](decisions/0041-panepilot-contact-address.md)) works:
Grant set it up at VentraIP and tested it on 2026-11-06. The domain switch leaves these four MX
records exactly as they are ([0005](decisions/0005-dns-stays-at-ventraip.md)):

| Preference | Mail exchanger |
| --- | --- |
| 10 | `mx1.email-hosting.net.au` |
| 10 | `mx2.email-hosting.net.au` |
| 20 | `mx3.email-hosting.net.au` |
| 30 | `mx4.email-hosting.net.au` |

### The checks

For Git Bash, against the domain. (Before 2026-11-07 these ran against the Azure address, which
now redirects to the domain.)

```bash
DOMAIN=panepilot.au

# The home page serves. Expect 200.
curl -sSI --max-time 15 https://$DOMAIN/ | grep -iE '^HTTP'

# A missing path serves the site's 404 page. Expect 404.
curl -sSI --max-time 15 https://$DOMAIN/no-such-page/ | grep -iE '^HTTP'

# The three security headers. Expect nosniff, strict-origin-when-cross-origin and DENY.
curl -sSI --max-time 15 https://$DOMAIN/ | grep -iE '^(x-content-type-options|referrer-policy|x-frame-options)'

# Built assets cache for a year. Expect public, max-age=31536000, immutable.
ASSET=$(curl -sS --max-time 15 https://$DOMAIN/ | grep -oE '/_astro/[^"]+' | head -1)
curl -sSI --max-time 15 https://$DOMAIN$ASSET | grep -iE '^(HTTP|cache-control)'
```
