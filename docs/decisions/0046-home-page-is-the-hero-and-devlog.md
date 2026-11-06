# 0046. The home page is the hero, then the devlog and the newsletter band

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** none (Grant's request of 2026-11-06)
- **Supersedes:** [0025](0025-home-sections-panepilot-first.md)

## Context

[0025](0025-home-sections-panepilot-first.md) put three sections between the hero and the devlog:
"How a visit goes", "Built on our own round" and "Also in the works", with "Hi, I'm Grant" (the
about section) after the devlog. Grant wants a slimmer site, and panepilot.au now explains the app
in full, so the hub doesn't need to.

## Decision

The home page is the header, the hero ([0024](0024-home-hero-is-the-fogged-pane.md)), the devlog
once posts are published, the newsletter band once it is live, and the footer.

- "How a visit goes", "Built on our own round" and "Also in the works" are removed, with their
  components (`VisitStops`, `OwnRound`, `GameRow`).
- "Hi, I'm Grant" comes off the home page. It stays on `/about/`.
- The hero's "See how it works" button went to "How a visit goes", so it is removed. The hero keeps
  its one button, "Visit panepilot.au".
- The header's "Games" link went to "Also in the works", so it is removed. The game pages stay at
  `/projects/<slug>/`, reachable by their address, and their breadcrumb goes to Home.

## Alternatives considered

- **Move the games list to its own `/games/` page:** Grant chose to drop games from the navigation
  instead.
- **Remove the game pages too:** they cost nothing to keep and can be linked from posts.

## Consequences

- The four games aren't linked from the hub's navigation until a later decision brings them back.
- The featured project's `screenshots` with a `stop` number are no longer shown on the home page.
