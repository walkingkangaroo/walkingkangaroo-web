---
title: Why the arm keeps turning when it latches
date: 2026-10-07
project: arcsine
summary: Arcsine is still a plain-shape prototype, and fixing one small jerk in the latch taught me where the swing's momentum goes.
draft: true
---

Arcsine is a puzzle game on a grid of points. An arm is pinned to one point and spins around it. Let go at the right moment and it latches onto a neighbouring point, and then it spins around that one instead. You chain the swings to reach the goal.

It is still a prototype. Everything is plain shapes, played with the keyboard. There are buttons that open gates, mines that a button can switch off, and checkpoints, so a mine sends you back to the last one you passed. The first question was whether swinging feels good before anything is polished. I played it, and it did. A first playtest build was packaged for testers, but no outside player's feedback has come back yet.

## What I learned

The arm latches anywhere within about 14 degrees of a point. My first version snapped the arm to the exact angle back at the point it had just left. That threw away up to 14 degrees of sweep on every latch. It also jerked a different way each time, depending on whether I let go early or late. A chain of swings never kept its own momentum.

The fix is to add half a turn instead of snapping. The arm keeps its angle and keeps turning the same way. I noticed the problem while playing the new levels.

I'm holding that choice lightly. I played it and passed it for now. The other ways of handling a latch are still on a key, so I can compare them later.

## What comes next

Next is the rest of the toy box: swinging wands, roaming enemies, and fences. I've decided on paper what happens when two arms touch, but nothing has been played against it yet. A second round of playtesting follows. The final art is further off.
