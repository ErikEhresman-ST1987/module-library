# Browser Game Lifecycle and Failure Isolation

**Type:** Reusable architecture lesson  
**Proven source:** Puzzle Time — Connect the Colors and Lights Out  
**Status:** Reference, not an extracted module

## Problem

A collection of browser games must open, operate, and close individual games without leaving stale event listeners or breaking the home menu. During Puzzle Time development, a loading regression made both home game cards unresponsive; isolating one game's module load from the other helped restore entry.

## Pattern

- Give each game an explicit `mount(host, ...)` entry point returning a small controller (for example `restart`, `next`, `destroy`).
- Keep rules, generator, solver, and rendering separate. UI wiring belongs to the game's controller; collection navigation belongs to the shell.
- Register input and resize handlers on mount; remove them on destroy.
- Destroy PixiJS renderers and other owned resources when leaving a game.
- Keep each game's loading failure isolated. Lazy-loading an individual game is a useful boundary; catch and present failures so the user can return to the collection.
- Ensure both top and bottom return controls work on a touch device.
- Reopen a game after exiting it to check for duplicate handlers, stale state, or leaks.

## Evidence and limitations

Puzzle Time currently has per-game mount/destroy interfaces and independent home navigation. Its Lights Out module is dynamically imported from the shell. These are **working project-specific patterns**, not yet a hardened general-purpose lifecycle library. Automated rules tests alone do not prove lifecycle correctness in Safari.

## Future extraction gate

After a third game reuses the same interface successfully, consider a small shared adapter. Do not create a game framework in advance of a demonstrated need.

## Source pointer

- [Puzzle Time app shell](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/js/app.js)
