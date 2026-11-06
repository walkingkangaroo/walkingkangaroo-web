# 0047. The header is the logo alone, with no navigation links

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** none (Grant's request of 2026-11-06)
- **Supersedes:** [0013](0013-phone-header-wraps.md)

## Context

After [0046](0046-home-page-is-the-hero-and-devlog.md) slimmed the home page, the header still
carried PanePilot, Devlog, About and, once the newsletter is live, "Get updates". Grant doesn't
need any of them at this point.

## Decision

The header is the Walking Kangaroo logo, linking home, and nothing else.

## Consequences

- The devlog index is reached from the home page's "All posts →" link.
- `/about/` and the project pages stay built but aren't linked from the header or footer. They can
  be reached by their address, and a later decision can bring links back.
- When the newsletter goes live, its band on the home page is the only way to it.
