---
name: PanePilot
type: App
stage: 4
featured: true
order: 5
platforms: [Web, Phone]
oneLiner: "Scheduling, quoting, invoicing and field work for window cleaners."
cover: ../../assets/projects/panepilot.jpg
lockup: ../../assets/projects/panepilot-lockup.svg
eyebrow: "Going live in November · Web and phone"
headline: "The window-cleaning round, start to finish."
summary: "Quote per pane, book the recurring visits, work each one from your phone, then invoice it and pay whoever did the job."
link:
  label: "Visit panepilot.au"
  href: "https://panepilot.au"
heroBackdrop: ../../assets/projects/panepilot-backdrop.jpg
wide: ../../assets/projects/panepilot/calendar-wide.png
phone: ../../assets/projects/panepilot/job-card.png
# Every entry is shown on the project page, in this order. An entry with `stop` also shows, whole, on
# that stop of the home page's "How a visit goes". The approved-time screenshot has no `stop`, so it
# is on the project page only. Stop 2 (the week calendar) has no screenshot yet: KAN-913 adds it as
# one more entry here with `stop: 2`.
screenshots:
  - src: ../../assets/projects/panepilot/job-card.png
    alt: "A visit on a phone: Example Bakery today from 9:30 to 10:45 am, with the address and Navigate, Sam Sample on the crew, the hazard, access and parking notes, and a Start button."
  - src: ../../assets/projects/panepilot/quote.png
    alt: "A per-pane quote: 18 standard panes for $81.00 and 6 large panes with a 20% Ladder surcharge for $43.20, $124.20 in total."
    stop: 1
  - src: ../../assets/projects/panepilot/time-card.png
    alt: "A visit's time card: finished at 8:41 am, with all three checklist items ticked."
    stop: 3
  - src: ../../assets/projects/panepilot/invoice-paid.png
    alt: "An invoice marked paid, with a $124.20 bank transfer recorded under Payments."
    stop: 4
  - src: ../../assets/projects/panepilot/approved-time.png
    alt: "Sam Sample's time approved: 1 hour 15 minutes on a 9:30 to 10:45 am visit, $40.00 at $32.00 an hour."
---

I'm making PanePilot, an app for scheduling jobs, quoting, invoicing, field work and paying workers at an Australian window-cleaning business. It's for an owner-operator who does most of the jobs personally, with occasional workers, and it's a web app that works on a phone.

What's built today covers the owner's side: customers and their properties, per-pane quotes, recurring services that book visits onto a calendar, and invoices sent by email. Workers have a small app of their own for their visits and their hours, and the owner approves their time and records their pay each week.
