---
title: Rejecting my first test puzzles
date: 2026-10-07
project: common-ground
summary: My first test puzzles were solvable but felt rigid, so Common Ground's levels are now open landscapes.
draft: true
---

Common Ground is a 3D puzzle game where the ground changes shape depending on which way you face. Each level has four heightmaps, one each for north, east, south and west. When you turn the camera, the game blends the two nearest, so the ground rises and sinks as you look around.

It's built in Godot with C#. So far you can walk, jump and switch between several characters. The ones you leave behind stay in the world and ride the moving ground. There are checkpoints, a beacon you light by reaching it, fog over most of each level, and an anchor that holds the ground still while you look elsewhere. Nothing can kill you. A fall just returns you to your last checkpoint.

## What I learned

My first test puzzles were solvable, and my tools checked them. I still didn't accept them. Next to the loose, organic demo map I'd been testing on, they felt rigid and grid-like.

The numbers showed why. On the demo map, under 1% of the ground never moves. In those puzzles it was 30 to 92%. So I decided levels should be roamable landscapes where nearly all the ground moves. Still ground becomes rare and deliberate: a start, a rest, a beacon. I'm treating this as something to try, not a final answer.

The four test puzzles in the game now are redesigned in that style. Each still teaches one idea, like looking to raise a bridge, or using one character as a step for another.

## What comes next

Those four can't be played as designed yet, because the game has no water, drowning or holes. These are plans. None of them are in the game proper yet:

- Low ground as water. A character that stays under too long is sent back to its checkpoint, like a fall.
- Holes that open and close as you turn.
- A smaller jump, just high enough to climb onto a parked character.
- Fixed walls and platforms that the moving ground reveals or swallows.

Some numbers, like how long a character lasts under water, are still open.
