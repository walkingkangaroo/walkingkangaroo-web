# 0050. Nothing links to the devlog or About until they have content

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** WEB-2
- **Round:** [docs/rounds/home-rust-wall.md](../rounds/home-rust-wall.md), question 1

## Context

[0047](0047-header-is-the-logo-alone.md) left About and the project pages without links. The home
page's Devlog section was the devlog's only way in, and
[0049](0049-home-page-is-the-rust-wall.md) removes it. KAN-919 publishes the five first devlog
posts on launch day.

## Decision

Nothing on the site links to the devlog or About. Both stay built and work at `/devlog/` and
`/about/`. Grant brings links back when they have content to fill them: "nothing links because
there's nothing of note there yet. I'll bring them in when I have content to fill them."

## Alternatives considered

- **"Devlog" and "About" links in the footer:** Claude's recommendation, so the launch-day posts
  have a way in. Grant chose to wait for content first.

## Consequences

- The devlog posts KAN-919 publishes are reached only by their addresses until links come back.
- Bringing the links back, and rewriting About's "there's a devlog too", is held in Backlog.
