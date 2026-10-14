---
title: Perso, chapter one and why I took out the jump
date: 2026-10-07
project: perso
summary: Chapter one of my Perso remake is three levels, and the change I learned most from was removing the jump.
draft: true
---

Perso is a full remake of Crepe Studios' 2017 atmospheric puzzle game of the same name. The original is theirs. I'm rebuilding it in Godot 4.7, in C#.

You roll a cube from one grid cell to the next. The camera looks down from a fixed angle and turns between four directions. Each direction brings in its own separate layout of the level, so turning the view changes where the ground is. Terrain sinks and rises as you turn, with the change spreading out from the cube.

Chapter one is three levels: the doorstep, the hallway and the stairwell. I run them from the Godot editor, so there is no public build. I also have a level editor that I use to build them.

## What I learned

The cube used to be able to jump. I took it out. A jump was an answer available in every cell of every level, so it quietly undercut any puzzle built around not reaching somewhere. In chapter one, height now comes from elevator columns, which I place on purpose. I removed steering in mid-air too. A fall now lands on one cell, and you can work out which one from the grid alone.

## What comes next

More of the game. My notes point to chapters after the first, and to saving and a proper menu. None of those exist yet.
