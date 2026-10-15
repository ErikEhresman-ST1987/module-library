# Verified Procedural Puzzle Generation — Puzzle Time

**Type:** Reusable design and implementation reference  
**Proven source:** Puzzle Time — Connect the Colors and Lights Out  
**Status:** Documented pattern, not a drop-in module

## Problem

Random puzzles can be unsolvable, repetitive, trivial, or expensive to generate. A successful generator must not be confused with a difficulty-calibrated or unique-solution generator.

## Reusable pattern

1. Define authoritative, renderer-independent game rules and completion conditions.
2. Construct candidate puzzles from known-valid arrangements where feasible.
3. Independently verify the candidate with a solver or exhaustive state search.
4. Apply explicit acceptance gates: solvability, bounded work, meaningful challenge, and recent-puzzle exclusion.
5. Return a validated puzzle within an attempt/time budget; define an independently verified fallback or a clear failure result.
6. Test many generated candidates at each difficulty and playtest on the target device.

## Evidence from Puzzle Time

- **Connect the Colors:** constructs candidate paths and uses an independent bounded Numberlink solver; a successful check establishes at least one solution, **not uniqueness**. The solver can report budget exhaustion. Its generator may return no accepted puzzle; the caller must handle that outcome.
- **Lights Out:** generates boards by toggling from an all-off state and uses a separate solver to check solution length. Its difficulty profiles use 4×4, 5×5, and 6×6 boards with target solution-length bands. A fallback exists, but a fallback must still be verified against every acceptance requirement before being called equivalent to a normal generated puzzle.
- Both games use pure JavaScript rules/solver/generator files, independently testable without PixiJS.

## Reuse guidance

Use this as an architectural checklist for Tiny Railway Dispatcher: a deterministic route simulator, bounded switch-configuration search, puzzle signatures, and separate visual animation. Verify layout connectivity, loops, destinations, and meaningful decision count.

**Keep distinct:** solvable ≠ unique ≠ difficult ≠ varied. Track and test each claim separately.

## Source pointers

- [Connect the Colors generator](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/connect-colors/generator.js)
- [Connect the Colors solver](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/connect-colors/solver.js)
- [Lights Out generator](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/lights-out/generator.js)
- [Lights Out solver](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/games/lights-out/solver.js)
