# 0044. panepilot.au says "job" and "visit" as the app does, and claims only what the app does

- **Status:** Accepted
- **Date:** 2026-11-04
- **Issues:** KAN-939
- **Round:** none: Grant's answers in the KAN-939 session on 2026-11-04

## Context

Before writing the home page, every claim in `sites/panepilot/design-plan.md` was checked
against PanePilot's `master` and its decisions 0056 to 0062. Most held. These didn't:

- PanePilot split "visit" into two words on screen (its decision 0088). Anything about money,
  completion or the job as a whole says "job": "New job", "Complete job", "Jobs to invoice".
  A booking on the calendar is still a "visit": the calendar, "Today's visits", "Visit 2 of 3".
  The plan's Voice said never "job", and its rule for the demos says every control uses the
  app's own words. The two now conflict.
- "Reminders before a visit": the app has a "due for a clean" email instead. The owner sets it
  up for a property, checks it and sends it, and the customer taps "Book it" or "Not this time".
  Nothing is sent before a booked job, there's no SMS, and nothing sends on its own.
- "A share of the visit": the app pays "A share of the invoice", split by time on site.
- Completing a job raises a draft invoice only once it's approved. An owner's own completion is
  approved in the same step, and a worker's waits in "Completions to approve".

## Decision

- **The site uses the app's two words, as 0088 splits them,** in its own sentences and in the
  demos: "job" for what is quoted, completed, approved and invoiced, and "visit" for a booking
  on the calendar. The hero's approved line keeps "runs the visit on your phone" until Grant
  rewrites it.
- **Reminders are described as they work:** a "due for a clean" email you check and send, for
  customers who like to be asked first, answered with "Book it" or "Not this time".
- **Workers' pay** is "By the hour" or "A share of the invoice".
- **No claim goes on the site that the app at `master` or PanePilot's decisions 0056 to 0062 don't
  support.** Sign-up, the trial, the A$49 plan, the setup call, the CSV import and cancelling
  online are decided there and ship before launch (0040), so the site may state them.

## Alternatives considered

- **Keep "visit" in the site's own sentences, and "job" only in quoted app labels:** the page
  and the demos would use two words for one thing.
- **Drop reminders from "Made for window cleaning":** the "due for a clean" email is real, and
  it suits the customers the plan had in mind.

## Consequences

- The plan's Voice, section 4 and the demo rows now say "job" and "A share of the invoice".
- The demo issues (KAN-940 to KAN-944) use the app's current labels: "Complete job" and
  "Job completed. …" on the job card and invoice, "visit" on the calendar.
- The plan's "Visits" demo tab is a copy of the job card. Whether it becomes "Jobs" is Grant's
  call when KAN-942 is built. At KAN-942 (2026-11-04) he kept "Visits": the tabs name the steps
  of the round, and a worker runs the day from "Today's visits". The card inside says
  "Complete job".
- At KAN-943 (2026-11-04) the plan's Invoicing words had drifted from the app's invoice screen,
  and Grant chose the app's. The words are now "What customers see on each line", the Record
  payment form's "How did they pay?" (Bank transfer or Cash) and its "Record payment" button, the
  Dates list ("Issued", "Due"), and the app's GST sentence. A recorded payment is listed under
  Payments, as in the app, with no "Payment of … recorded" message, which the app doesn't show.
- When the app renames something again, the site follows, and its README's "Screens to check
  when the app changes" is where that's caught.
