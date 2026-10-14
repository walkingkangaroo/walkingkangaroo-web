# 0036. An apex domain uses an ALIAS record, or else an A record, never forwarding

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-733
- **Round:** [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md), question 4

## Context

[0031](0031-product-sites-on-azure-static-web-apps.md) listed three ways to point an apex domain
at an Azure Static Web App, in this order: ALIAS, forwarding to `www`, then an A record. VentraIP
lists ALIAS as a record type, but nobody has confirmed it works at the apex. VentraIP's
forwarding probably doesn't do HTTPS (unverified), so `https://` on the apex would fail.

## Decision

- For the hub and for every product site on its own domain:
  1. Try an ALIAS record at the apex to the app's `azurestaticapps.net` name.
  2. If VentraIP won't take it, use an A record to the app's `stableInboundIP`.
- VentraIP forwarding isn't used.
- Grant makes every DNS change (0005).

## Alternatives considered

- **Forward the apex to `www` and make `www` the main address:** typing
  `https://walkingkangaroo.com` would probably fail, and the canonical links would move.

## Consequences

- With an A record, the site is served from one Azure region instead of worldwide. Most visitors
  are in Australia, so that costs little.
- 0031's list of apex options is superseded. The rest of 0031 stands.
