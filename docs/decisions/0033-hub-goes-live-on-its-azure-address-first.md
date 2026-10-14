# 0033. The hub goes live on its Azure address before the domain points at it

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-733
- **Round:** [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md), question 1

## Context

[0011](0011-publish-at-launch.md) kept the site off line until launch. Its reasons were
placeholder text going public and a `/website` base path to undo. Neither applies on Azure: there
are no placeholders left, and an Azure address needs no base path.

## Decision

The deploy workflow merges first, and the hub is public at its `azurestaticapps.net` address.
Grant checks it there on his phone. The launch is the later switch of walkingkangaroo.com to the
app.

## Alternatives considered

- **Deploy and switch the domain on the same day:** a deploy problem would land on the same day
  as the DNS change.

## Consequences

- From that merge on, every merge to `main` that touches the hub is live at the Azure address.
- The canonical links already point at walkingkangaroo.com, so search engines are pointed there.
- 0011's "first published at launch" is superseded. Its other consequence stands: the site is
  built for `https://walkingkangaroo.com` with no base path.
