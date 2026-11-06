# 0052. panepilot.au goes live before sign-up, asking visitors to email for launch news, at A$39 a month with a founders' price of A$27

- **Status:** Accepted
- **Date:** 2026-11-06
- **Issues:** —

## Context

[0040](0040-panepilot-site-live-on-azure-first.md) held panepilot.au back until PanePilot's
self-serve sign-up shipped, so "Start your free trial" worked from day one. On 2026-11-06 Grant
chose to put the site up before then, so people can find PanePilot before they can sign up. Sign-up
opens in Q1 2027. He also wanted a lower price than A$49. A check of published prices on
2026-11-06 found the window-cleaning tools (Squeegee, CleanerPlanner) start at about A$30 to A$37
for one person, and the general trade tools (ServiceM8, Tradify, Fergus, Jobber, Housecall Pro)
cost about A$90 to A$270 a month for a business with one to five workers. A$27 would have been the
cheapest by some way, and a price is harder to raise than to set. Kit isn't connected yet
([0034](0034-newsletter-hidden-until-kit.md)), so there's no list to sign up to.

## Decision

- Until sign-up opens, the main button reads "Tell me when it opens" and is a `mailto:` link to
  `hello@panepilot.au` ([0041](0041-panepilot-contact-address.md)) with the subject "Tell me when
  PanePilot opens". The hero's line beside it reads "Opening in Q1 2027. Founders' price A$27 a
  month."
- "Sign in" is hidden until sign-up opens. On a phone the header shows the button instead.
- One setting, `isOpen` in `sites/panepilot/src/data/site.ts`, turns "Start your free trial",
  its trial line and "Sign in" back on.
- The price is A$39 a month. A business that signs up before 30 June 2027 (a trial started before
  then counts) pays the founders' price, A$27 a month, for as long as it stays subscribed. One that
  lapses and comes back pays A$39. Both are set in `src/data/offer.ts`; the trial terms are
  unchanged.
- The deadline isn't extended: under Australian consumer law, a "limited time" offer that keeps
  being extended can mislead. The page shows the two prices side by side, never A$39 struck out.
- The footer shows the contact address on its own, without "Contact:".
- panepilot.au can be pointed at the site before sign-up ships. This replaces 0040's timing for
  the domain switch; the rest of 0040 stands.

## Alternatives considered

- **A Kit sign-up form:** a real list to write to at launch, but the site would wait on Kit, and
  the site collects nothing (0039).
- **A$27 for everyone:** the cheapest on the market by a wide margin, and hard to raise later.
- **Founders' price for the first 50 businesses, or for 12 months only:** a count may never fill
  in a niche this size, and a price that rises after a year catches people out.
- **"Join the waitlist" or "Register your interest":** a waitlist implies a queue, and "register"
  reads as formal.

## Consequences

- Interest arrives as email, so `hello@panepilot.au` must receive mail (the MX record and
  forwards at VentraIP, 0041) before the domain points here.
- The app's own A$49 price (PanePilot decisions 0057 and 0058) and its Stripe prices change in the
  PanePilot repo, not here: A$39, and A$27 for businesses that sign up before 30 June 2027.
- At launch, flip `isOpen` and email everyone who wrote in.
- After 30 June 2027, the founders' lines come off the site.
