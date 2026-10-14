# Walking Kangaroo: design log

Every shipped site gets an entry here, newest first. Read this before planning a new site so it goes somewhere new, and update an entry when a site is redesigned.

## Walking Kangaroo hub: walkingkangaroo.com

- **Shipped**: not yet (redesigned 2026-10)
- **Signature moment**: one clean sweep. The hero's media pane opens fogged, like a shop window before the round. About 0.4 s after load a single squeegee stroke crosses it, following the curve of PanePilot's Curved Sweep mark from top right to bottom left, and clears the glass to reveal the PanePilot cover. A thin wet edge trails the blade and fades. It runs once, takes about 1 s, and is CSS only. Reduced motion gets a clean pane from the start.
- **Palette**: Red Earth. `--wk-paper` #F4EBDD (page), `--wk-ink` #2B1A12 (text, buttons), `--wk-rust` #9E3B22 (stage-meter footprints, the primary button), `--wk-rust-light` #E0785A (on Ink only), `--site-panel` #EFE3D0 (the "How a visit goes" band), `--site-media` #E6D8C2 (media panels, and the fog at 70% opacity), `--site-text-quiet` #4A362B (secondary text), plus the other 0010 tints (#FBF6EE, #DCCDB6, #CDBBA0, #6B5646). No teal in the CSS: PanePilot's teal lives only in its own assets inside the pane.
- **Type**: Outfit (everything), SemiBold 600 for headings with -2.5% tracking at 48 px and up, Regular 400 for body. The one exception is the PanePilot lockup, an outlined SVG that is the hero's h1.
- **Layout idea**: the studio hub leads with one product, PanePilot, and the games follow as a short list. Hero with text left and the fogged pane right (the pane first on a phone). Then "How a visit goes": four numbered stops in order on a full-width panel band, numbers in Ink circles, no footprints between them. Then "Built on our own round", a left-aligned first-person block with no image. Then "Also in the works": four rows (112 px cover thumbnail, name, one line, small stage meter), not cards, about one phone screen tall.
- **Motion**: the sweep is the only motion on load. Nothing animates on scroll and sections don't fade in. Buttons and links get a plain hover and focus state.
- **Voice**: first person, Grant's, plain and specific. PanePilot's own working words: visit, pane, run, invoice. Never job, appointment or bill. Claude drafts and Grant rewrites (0014).
- **What worked / what Grant liked**: not yet known. Grant reviewed the clickable mockup on 2026-10-14. His first notes: no footprints on the hero image and none between the four stops, "Go to panepilot.au" as the primary action, and show Beta (step 4 of 5) for now.
- **Don't repeat**: a teal accent (it would make the next site a sibling of the future PanePilot site, which should go to PanePilot's own teal, Manrope and Geist, far from this page), and the fog-and-sweep (a squeegee stroke along the logo's curve belongs to PanePilot and this hub).
