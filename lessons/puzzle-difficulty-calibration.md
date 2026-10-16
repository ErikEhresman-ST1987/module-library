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

## Tiny Railway Dispatcher retrospective — October 2026

The game delivered appealing animation, reliable track-following, switches, varied layouts, and verified solvability. However, the user found even Hard immediately obvious. Its difficulty measure (minimum switches to change) counted actions rather than reasoning. The game was removed from the collection menu, with code preserved for reuse.

**Lesson:** solvability, variety, visual quality, and number of actions do not establish engaging puzzle difficulty. Distinguish mechanical effort, reasoning required to discover a solution, and frustration from unclear or repetitive play.

**Proposed early evaluation gate:** Before major art or procedural generation, build three representative Easy, Medium, and Hard puzzles. Have the intended player solve them without knowing the answers. Observe whether the solution is obvious, requires satisfying deductions, and provides useful feedback on mistakes. If Hard is still obvious, reconsider the core mechanic before polishing or multiplying layouts. Proceed to generation and presentation only when this small playtest establishes meaningful challenge. This gate is a proposed practice, not a proven universal formula.
