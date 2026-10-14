---
title: PanePilot gets runs
date: 2026-10-07
project: panepilot
summary: PanePilot now groups customers who are cleaned together into a run, and the schedule belongs to the run.
draft: true
---

PanePilot is an app for scheduling jobs, quoting, invoicing, field work and paying workers at an Australian window-cleaning business. It's for an owner-operator who does most of the jobs personally, with occasional workers, and it works on a phone as well as a computer.

The owner's side is built: customers and their properties, per-pane quotes, recurring services that book visits onto a calendar, and invoices sent by email. Workers have a small app of their own for their visits and their hours. The owner approves their time and records their pay each week.

The newest piece is runs. Some work happens together on a regular schedule, such as every shop along one street. Until now each shop was its own recurring service with its own schedule, so moving the street meant handling every shop one by one.

## What I learned

I could have linked the services so they move together. The decision record says why I didn't. Each service would keep its own rule, the rules could drift apart, and nothing would say which one was right.

So the run carries the schedule instead. A service joins a run and follows the run's schedule while it's in it. Prices and invoices stay with each customer.

What I learned is that grouping things isn't enough. Something has to own the rule. It also has a cost: the visit generator now reads rules from two places, and every later change to recurrence has to handle both.

## What comes next

The plan for runs adds a crew that takes turns on each run day, and ways to move or skip a whole run day.
