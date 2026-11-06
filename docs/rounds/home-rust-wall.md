# Decision round: the home page and header become the Rust wall

Status: Answered
Opened: 2026-11-06
Issue: WEB-2
Research: [docs/research/home-rust-wall.md](../research/home-rust-wall.md)

To answer, edit the `Answer:` lines, reply in chat, or run `/shape home-rust-wall 1: A, 2: yes`.
Say "use the defaults" to take every default below.

Most of this is already settled in chat on 2026-11-06 (see "Already answered"). These two
questions are what's left.

## Questions

### 1. With the devlog gone from the home page, should anything link to the devlog and About?

Nothing links to About now (0047). Once the home page's Devlog section goes, nothing links to the
devlog either, so the five posts KAN-919 publishes on launch day can only be reached by their
addresses.

- **A:** Nothing links to them. They stay at `/devlog/` and `/about/` for anyone with the
  address, and a later decision can bring links back. About's bio still says "there's a devlog
  too", so that line goes to Backlog for you to rewrite.
- **B:** Two quiet text links, "Devlog" and "About", in the footer on every page. No new
  section, and the home page still fits one laptop screen, because the footer is already there.
- **Recommendation:** B, because otherwise the posts you publish on launch day have no way in,
  and the footer adds them without adding a section.
- **Default if unanswered:** A, because it is what you asked for, with nothing added.
- **For:** Grant
- **Answer:** A. Grant, 2026-11-06: "nothing links because there's nothing of note there yet. I'll bring
  them in when I have content to fill them."

### 2. Should every other page get the wall as a slim Rust band?

About, the devlog, the project pages and 404 share the header with the home page. The mockup's
"Any other page" tab shows them with a slim Rust band and the Paper horizontal logo, linking home.

- **A:** Yes, the slim Rust band, about 82 px tall on a laptop and 66 px on a phone, as in the
  mockup.
- **B:** No. Other pages keep today's Paper header with the full-colour logo, and only the home
  page has the wall.
- **Recommendation:** A, because Rust is then Walking Kangaroo's colour on every page, and the
  home page doesn't look like a different site from the rest.
- **Default if unanswered:** A, the version you saw in the mockup before saying "Yes, shape it".
- **For:** Grant
- **Answer:** A. Grant, 2026-11-06: "A"

## Already answered

Grant's words in chat, 2026-11-06. They are recorded as decisions without asking again.

- **Which option:** "I like B." The Rust wall with the Paper stacked logo, centred, and
  PanePilot's pane hung across its lower edge.
- **The home page's sections:** "I don't want the devlog section, or any more sections on
  panepilot other than the hero." The home page is the wall, the hero and the footer.
- **The rework:** "redesign it with my comments in mind". Version 2 of the mockup puts the label
  beside the pane on laptops, below the wall's edge, so the page fits one screen. Grant then said
  "Yes, shape it."

## Decided without asking

- **The page's `h1`** is the line on the wall. PanePilot's lockup becomes the hero's `h2`, still
  never set in Outfit (PanePilot's brand rule in 0024 stands). The page should have one `h1`, and
  it is now Walking Kangaroo's.
- **The words on the wall** are built as drafted: "I make games and apps as Walking Kangaroo."
  and "The first one to go live is PanePilot, an app for window cleaners. Four games are on the
  way." Grant rewrites them at Human QA (0014). The first line is from his About bio.
- **The progress meter** loses its " · Web, Phone" detail on the home page, because the eyebrow
  above it already says "Web and phone". Project pages keep theirs.
- **Sizes and positions** follow version 2 of the mockup (the numbers are in the research and
  will be in the decision record). The pane's inside, its sweep and its reduced-motion still are
  unchanged (0024, 0038).
- **The newsletter band** still goes after the hero once Kit is connected (0034, 0046). It is
  hidden now, and moving it was not asked about.
- **No new colours.** Rust, Paper and Ink are brand colours already, and the pane's teal comes
  only from PanePilot's own images (0010, 0024).
- **Milestone:** Launch, because this is the home page visitors see at launch.

## Held out

- **Links to the devlog and About, and About's line "there's a devlog too":** Backlog, until
  Grant has content to fill them (question 1).

## Outcome

Filled in when the answers are recorded.

- Decisions:
- Spec or design changes:
- Issues:
