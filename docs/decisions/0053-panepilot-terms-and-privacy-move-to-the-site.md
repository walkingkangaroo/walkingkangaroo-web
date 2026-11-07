# 0053. PanePilot's terms and privacy policy move from the app to panepilot.au

- **Status:** Accepted
- **Date:** 2026-11-07
- **Issues:** —

## Context

The terms of service and the privacy policy were pages of the PanePilot app, at
`app.panepilot.au/terms` and `/privacy`, under the app's signed-out header with its "Sign in"
button. The site linked out to them. Grant wants them on the website (2026-11-07), where a visitor
who hasn't signed up reads them in the site's own header and footer.

## Decision

- The two documents are pages of PanePilot's site, at `/terms` and `/privacy`, word for word as
  the app had them on 2026-11-07, in the site's header and footer.
- Who publishes them (`PUBLISHER`) and the date they last changed (`LEGAL_EFFECTIVE_DATE`) move
  with them, to `sites/panepilot/src/data/publisher.ts`. A change to either document bumps that
  date in the same commit.
- The site's footer and questions link to its own pages.
- The app's `/terms` and `/privacy` redirect permanently to `https://panepilot.au/terms` and
  `/privacy`, and the app's own links point there. That change is in the PanePilot repo and
  merges only once panepilot.au serves this site (KAN-948), so no link breaks in between.
- Google's OAuth consent screen gets the new addresses after that. Grant changes it; Google may
  ask him to verify panepilot.au first.

## Alternatives considered

- **Leave them in the app and drop its "Sign in" button there:** the smaller change, but the
  documents would still sit outside the site a visitor is reading.

## Consequences

- The documents no longer sit beside the code they describe. When the app starts handling data in
  a new way (a new provider, a new field kept about a person), the change to the privacy policy is
  a pull request here, made alongside the app's.
- Until panepilot.au points here, the pages are at the site's Azure address only; the app's pages
  stay as they are.
