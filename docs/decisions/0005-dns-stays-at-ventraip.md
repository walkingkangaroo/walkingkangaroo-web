# 0005. DNS stays at VentraIP, and email records are never touched

- **Status:** Accepted; its GitHub Pages records are superseded by [0032](0032-hub-on-azure-static-web-apps.md)
- **Date:** 2026-10-05
- **Issues:** —

## Context

walkingkangaroo.com is registered with VentraIP and uses its nameservers
(ns1–ns3.nameserver.net.au). Email runs on VentraIP email hosting (MX mx1–mx4.email-hosting.net.au).
On 2026-10-05 the apex and www pointed at 103.42.108.46, which served a blank page, and there was
no SPF record.

## Decision

Keep DNS at VentraIP. Go live by adding GitHub Pages' apex records and a www CNAME there. Grant
makes every DNS change himself; Claude gives the exact records and checks them afterwards.

## Consequences

- MX records are never changed or removed.
- An SPF record, and the newsletter's sending records, are added as part of the newsletter work.
