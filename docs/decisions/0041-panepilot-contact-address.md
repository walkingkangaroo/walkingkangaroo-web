# 0041. panepilot.au's contact address is hello@panepilot.au

- **Status:** Accepted
- **Date:** 2026-10-16
- **Issues:** KAN-937
- **Round:** [docs/rounds/panepilot-au-site.md](../rounds/panepilot-au-site.md), question 2

## Context

The footer and the questions section need an address to write to. panepilot.au has no MX
record (checked with `nslookup -type=MX panepilot.au` on 2026-10-16), so it can't receive
email yet.

## Decision

- The site shows `hello@panepilot.au`.
- Grant sets up a mailbox or a forward for it at VentraIP first. That means an MX record on
  panepilot.au, which this repo never touches (0005).
- Until he confirms it receives mail, the site shows `[TODO: contact address]` in its place.
  The launch issue replaces it.

## Alternatives considered

- **An address Grant already has:** it puts his own inbox on a public page.
- **No address:** a visitor who isn't ready to sign up would have no way to ask.

## Consequences

- Launching at panepilot.au waits on the address working.
- The placeholder is public on the Azure address until then. That's Grant's sign-off on it,
  for the Azure address only.
