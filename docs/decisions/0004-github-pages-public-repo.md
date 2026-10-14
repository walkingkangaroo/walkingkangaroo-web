# 0004. Public repo, published to GitHub Pages on merge

- **Status:** Accepted; the GitHub Pages hosting is superseded by [0032](0032-hub-on-azure-static-web-apps.md), and the repo stays public
- **Date:** 2026-10-05
- **Issues:** —

## Context

Grant first asked for a private repo, but GitHub Pages needs a paid plan for private repos and
the `walkingkangaroo` account didn't appear to have one. Offered Cloudflare Pages, GitHub Pro or
Netlify, Grant chose to make the repo public and use GitHub Pages.

## Decision

`walkingkangaroo/website` is a public repo. A GitHub Actions workflow builds the site and
publishes it to GitHub Pages when a pull request merges to `main`. Claude handles deploys.

## Consequences

- Nothing secret goes in the repo: no API keys, no unpublished plans for other projects.
- Keep media small (compressed images, short clips) so the repo and the site stay light.
