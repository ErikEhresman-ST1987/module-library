# Puzzle Difficulty Calibration: Logic, Guidance, and Real Play

**Type:** Reusable design lesson  
**Proven source:** Puzzle Time — Lights Out and Connect the Colors  
**Status:** Observed gameplay lesson, not a universal difficulty formula

## Problem

Grid size and raw move counts are convenient generation parameters, but do not by themselves predict how difficult a puzzle feels. A player may find a small puzzle opaque until a simple strategy is explained.

## Observations

- In Lights Out, a friendly explanation of the top-down clearing strategy made the puzzle more approachable for the intended audience.
- Easy Lights Out puzzles were constrained to short solver solutions and were successfully played on an iPad without hints.
- The user later tested larger difficulty selections, revealing that UI state (selected difficulty) and actual board state must be verified separately.
- Connect the Colors currently uses grid size and color-pair counts as difficulty parameters; those are **proxies**, not evidence of calibrated difficulty.

## Reusable practice

1. Define measurable generation properties (for example solution length, number of decisions, branching, dead ends, or search effort).
2. Do not equate a measurable proxy with human difficulty.
3. Provide concise, optional strategy guidance without solving the puzzle for the player.
4. Playtest with the intended audience on the intended device.
5. Observe confusion, repeated errors, hints used, and whether puzzles feel too similar.
6. Adjust difficulty bands only after evidence; preserve the distinction between solver difficulty and player experience.

## Application to Tiny Railway Dispatcher

Candidate measures include number of switches, reachable destinations, wrong-route branches, and minimum switches needing correction. Start with one train and no timing. Test whether a puzzle requires genuine route planning rather than memorizing a static track layout.

## Source pointers

- [Lights Out generation profiles](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/lights-out/generator.js)
- [Connect the Colors generation profiles](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/connect-colors/generator.js)
