# Add a new game story without losing existing progress

**Type:** Verified lesson and verification recipe (not a drop-in code module)  
**Source:** Little Field Farm, [PR #14](https://github.com/ErikEhresman-ST1987/little-field-farm/pull/14), verified on iPad November 8, 2026.

## The problem in everyday words
“We added another story, but I need the old story and my saved game to keep working.” A second problem was avoiding a complicated preview-hosting setup just to test a story in a single-player GitHub Pages game.

## What worked
- Preserve existing story IDs and saved progress. When restoring an older save, accept missing records for **newly registered** stories and initialize those records without overwriting the old ones. Keep validation for malformed or unknown records.
- Build from the actual Ink story source and manifest, then verify generated registry, compiled data, and browser bundle include **both** old and new stories. Do not assume a source file alone is playable.
- Run automated tests for old saves, story choices, chapter progression, and completion. Test the real game on the target device as a separate gate.
- For a single-player GitHub Pages project, temporarily switch Pages publishing from `main` to the feature branch (same root folder), test the existing save, then merge after explicit approval and return Pages to `main`. A separate preview package was unnecessary.
- Back up the game before testing on the same URL, since browser storage is shared with the regular game.

## Improvement record
**Failure or friction:** The earlier save loaders expected exactly the previous number of registered stories, risking rejection of existing saves when Andy was added. The first proposed preview-artifact workflow introduced extra steps without giving a playable URL.

**Change made:** Added Andy’s three Ink chapters and manifest; changed invitation, chapter-session, and shared progress restore paths to add missing new-story records while preserving existing records; compiled both stories; added regression checks; removed the unnecessary preview-artifact step and used Pages branch switching.

**Verification performed:** GitHub Actions build passed and generated files were inspected for both Andy and Juliette. The operator played Andy’s three chapters on iPad to completion, reloaded the game, and saw both Andy and Juliette marked **Completed**; the farm and coin balance remained visible. PR #14 was merged to `main`, and the operator confirmed the game working afterward.

**Result:** **Verified** for the tested story, existing save, real-device completion, and reload persistence. Automated checks cover additional paths.

**Known limits:** Not every alternate choice was individually tested on iPad. Offline play and multi-story JSON export/import were not specifically verified. The build workflow’s branch trigger was specific to that feature branch; future stories must adjust it. Branch switching is suitable here because there is only one player; it changes the public live URL and may be inappropriate for multi-user apps.

## Reuse guidance
This is a **problem-aware pattern**, not a universal Ink module. In another project, inspect its actual save schema, compiler, hosting, and entry point before adapting. Preserve strict validation while allowing legitimate schema growth. Verify old and new progress together after reload. For source code and the exact implementation, inspect Little Field Farm PR #14 and its current `scene-rebuild/story-engine/`, `story-ink-entry.cjs`, and build workflow.
