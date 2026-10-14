---
title: Where Aussie Trucker has got to
date: 2026-10-07
project: aussie-trucker
summary: Aussie Trucker has a compiled stretch of South Australia and a truck that drives it, and nothing a player can play yet.
draft: true
---

Aussie Trucker is a trucking game I'm making for Windows. It's set in a 1:1 scale Australia built from real-world data. The first stretch is a 10 to 20 km route between Port Augusta and Stirling North in South Australia.

Nothing is playable yet. What I have is the groundwork.

A tool compiles map and elevation data into tiles of terrain and road. A client streams those tiles in around a viewer travelling the route. A prime mover chassis, with suspension, steering, an engine and a twelve-speed gearbox, drives that route at 110 km/h. The truck is fictional, and a route pilot does the driving, not a person. The brakes are still stand-ins.

## What I learned

I built a test harness that runs each manoeuvre as data. It runs it once without the engine and once inside Godot through the Jolt physics engine, and the two results have to agree.

Building it showed that the project had not been running Jolt at all. A setting was never made, so Godot ran its own physics. Every measurement taken in the engine up to then came from the wrong one.

The project now selects Jolt, and a test fails if that setting goes missing. The first chassis experiment has been measured again on Jolt. The documents had said Jolt all along, so it looked settled. Now every report records which engine ran.

## What comes next

The roadmap's vehicle milestone isn't finished. It still lists proper brakes, and keyboard, controller and wheel input. After that, the plan is a first freight job and a delivery.

Map data © OpenStreetMap contributors.
