# 0035. Pull requests from this repo get a public preview link

- **Status:** Accepted
- **Date:** 2026-10-15
- **Issues:** KAN-733
- **Round:** [docs/rounds/kan-733-hub-on-azure.md](../rounds/kan-733-hub-on-azure.md), question 3

## Context

Azure Static Web Apps can deploy each pull request to its own preview environment. Azure:
"Anyone can access the staged versions of your application via their URL." The URL is the
production name plus the pull request's number. The Free plan allows 3 at a time.

## Decision

- Each pull request from a branch of this repo deploys to a preview and gets the link in a
  comment. Closing the pull request removes the preview.
- Pull requests from forks don't deploy.
- This applies to the hub and to every product site (0031).

## Alternatives considered

- **Only `main` deploys:** Grant would keep checking changes through screenshots.

## Consequences

- Grant can open a change on his phone before he merges it.
- Claude's drafts of Grant's words are public at a guessable link until he rewrites them
  ([0014](0014-claude-drafts-grant-rewrites.md)). Posts marked `draft: true` stay out of every
  build.
- With more than 3 open pull requests that touch one site, the fourth preview fails until one
  closes.
