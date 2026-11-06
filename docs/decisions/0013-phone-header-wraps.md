# 0013. On a phone the header links wrap under the logo, with no menu button

- **Status:** Superseded by [0047](0047-header-is-the-logo-alone.md): the header has no links
- **Date:** 2026-10-05
- **Issues:** KAN-726
- **Round:** [docs/rounds/build-the-site.md](../rounds/build-the-site.md), question 6

## Context

There is no B2 phone board. B2's markup wraps the nav; the rejected A board used a menu button.

## Decision

At narrow widths the logo sits on one line and Games, Devlog, About and "Get updates" wrap onto
the next. No script.

## Alternatives considered

- **A menu button:** needs a script and its own focus handling.

## Consequences

- The site ships with no client script.
