# 0034. The newsletter band and the links to it are hidden until Kit is connected

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-733
- **Round:** [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md), question 2

## Context

The newsletter band's form posts nowhere. The Newsletter step connects it to Kit
([0006](0006-kit-newsletter.md)). The brief put that step before Launch, but it needs its own
round and new records at VentraIP.

## Decision

- Launch doesn't wait for the Newsletter step.
- Until Kit is connected, the hub leaves out:
  - the newsletter band, on the home page and the about page;
  - every link to it: the header's "Get updates" and the project pages' "Follow this project".
- One setting turns all of these back on, and the Newsletter step flips it.

## Alternatives considered

- **Launch waits for the Newsletter step:** launch would wait on Kit, and PanePilot goes live in
  November.
- **Leave the band as it is:** a Subscribe button that does nothing would go live.

## Consequences

- The brief's steps 5 and 6 swap order.
- The Newsletter step's shape includes turning the band and its links back on.
