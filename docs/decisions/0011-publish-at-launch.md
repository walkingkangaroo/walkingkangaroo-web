# 0011. The site is first published at launch, not while it's built

- **Status:** Accepted; "first published at launch" is superseded by [0033](0033-hub-goes-live-on-its-azure-address-first.md)
- **Date:** 2026-10-05
- **Issues:** KAN-726
- **Round:** [docs/rounds/build-the-site.md](../rounds/build-the-site.md), question 4

## Context

Publishing to `walkingkangaroo.github.io/website/` during the build would put bracketed
placeholder text live and need a `/website` base path that comes out again at launch.

## Decision

The Build the site milestone runs and checks the site locally only. The GitHub Pages workflow
and `public/CNAME` are built in the Launch step, together with the DNS records (0004, 0005).

## Alternatives considered

- **Publish to github.io now:** Grant could open it on his phone, at the cost of placeholders
  going public and a base path to undo.

## Consequences

- Grant sees the site through screenshots and `pnpm dev` until launch.
- The site is configured for `https://walkingkangaroo.com` with no base path from the start.
