---
paths: ["sites/panepilot/**"]
---

# PanePilot's site (`sites/panepilot/`)

- The design is `sites/panepilot/design-plan.md`, and the working prototype it was approved from
  is `sites/panepilot/prototype.html` ([0039](../../docs/decisions/0039-panepilot-site-follows-its-design-plan.md)).
  Where they differ, the plan wins.
- Colours are tokens in `src/styles/tokens.css`, named for the plan's palette:
  - Glass `#F4F8F8`, Deep Water `#0B2F33`, Harbour `#0E7C86`, Harbour Dark `#07646C`;
  - Muted `#52696D`, Mint `#E6FFFB`, Frame `#D3DFE0`, and white.

  Small teal text is Harbour Dark, never Harbour. The app's status colours appear only in the
  demos' badges, chip edges and form errors, as the app uses them.
- Type: Manrope 700 and 800 for headings, Geist 400 and 500 for everything else. Both are
  self-hosted from Fontsource, Latin subset.
- PanePilot's lockup, mark and favicons are copied unchanged from `C:\dev\panepilot\public\brand\`.
  Screenshots are copied unchanged from `C:\dev\panepilot\docs\screenshots\website\` (0026).
- **The demos:**
  - Every control is one the app really has, with the app's own words.
  - A drawing only follows the numbers and is never a control.
  - Names and addresses come from the demo business only.
  - Each demo is a plain-script island that loads when its tab is first opened.
- The site collects nothing: no forms that post anywhere, no analytics, no cookies. The privacy
  policy and terms are the site's own pages, `/privacy` and `/terms`, moved word for word from the
  app (0053). Change their words only with Grant, and bump `LEGAL_EFFECTIVE_DATE` in
  `src/data/publisher.ts` in the same commit.
- Australian English. Buttons say exactly what happens. Claude drafts the words and Grant
  rewrites them (0014).
