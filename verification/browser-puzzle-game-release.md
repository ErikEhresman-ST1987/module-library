# Browser Puzzle Game Release Verification

**Type:** Reusable verification recipe  
**Proven source:** Puzzle Time — Connect the Colors and Lights Out  
**Scope:** Static browser puzzle collections, especially touch-first GitHub Pages deployments

## Before publishing

1. Run all pure-rule, generator, solver, and bounded-generation audit tests.
2. Review changed imports, script paths, cache/version references, and file names; test that the collection shell can initialize.
3. Confirm an individual game's import or mount failure cannot disable every other game's entry point.
4. Preserve existing games and shared controls; check the actual diff for unrelated changes.

## After deployment, online

1. Confirm the intended deployment completed and refresh the deployed page.
2. Open **every** game card from the home screen, not only the changed game.
3. Test game-to-home navigation, including prominent bottom return controls.
4. For each game, exercise Easy/Medium/Hard if provided; confirm the **board itself** changes, not just the dropdown label.
5. Check primary touch interaction, Undo, Restart, New Puzzle, Hint if present, and completion/victory.
6. Exit and reopen; check that controls still work once per tap and state resets as intended.
7. On load failure, confirm a visible error and a working path back home.

## Real-device acceptance

- Test in the actual target browser/device, including iPad Safari.
- Confirm responsive sizing, readable instructions, touch targets, and scrolling.
- Test the **published URL**, not only a local build.
- If offline/PWA operation is part of the approved project, additionally apply [Local-First PWA Release Verification](local-first-pwa-release.md).

## Acceptance boundary

GitHub Actions passing proves only the checks those workflows run. Deployment success does **not** prove the home cards, module loading, dropdown behavior, or touch gameplay work. Record separately: implemented, deployed, automated-tested, device-playtested, and user-accepted.

## Source pointers

- [Puzzle Time test workflow](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/.github/workflows/test.yml)
- [Puzzle Time shell](https://github.com/ErikEhresman-ST1987/Puzzle-time/blob/dev/connect-colors-slice-1/js/app.js)
