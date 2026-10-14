---
paths: ["sites/hub/**"]
---

# The hub (`sites/hub/`)

- Brand assets come from `C:\dev\walkingkangaroo\brand\dist\walking-kangaroo-brand-pack\`,
  copied in unchanged. Never redraw, recolour or re-letter the logo.
- Colours: Rust `#9E3B22`, Ink `#2B1A12`, Paper `#F4EBDD`, Rust Light `#E0785A` (on Ink only).
  Rust on Ink and Rust Light on Paper fail contrast: never for text.
  Seven site tints sit beside them, and no other colours: [0010](../../docs/decisions/0010-site-tints.md).
- PanePilot's lockup, cover and screenshots are its own, copied unchanged from
  `C:\dev\panepilot\public\brand\`. Its teal never enters the site's CSS:
  [0024](../../docs/decisions/0024-home-hero-is-the-fogged-pane.md).
- Type: Outfit, SemiBold 600 for headings (sentence case, -2.5% tracking at 48 px and up),
  Regular 400 for body.
