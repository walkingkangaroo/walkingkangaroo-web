# Hosting and DNS

What each site is hosted on and which DNS records point at it, written down when the site goes
live. Each section also has the checks to rerun, so the next site can copy them.

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
