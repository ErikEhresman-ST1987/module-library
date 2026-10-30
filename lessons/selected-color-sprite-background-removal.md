# Removing solid-color backgrounds from generated game sprites

## Problem in everyday language
“Generated artwork has a colored rectangle behind it. Removing white destroys white flowers or other details; changing the background color leaves colored fringes. I don't know the exact HEX color the image generator actually used.”

## Proven source and current implementation
- **Sprite Factory:** https://github.com/ErikEhresman-ST1987/sprite-factory
- **Current production implementation:** [app.js](https://github.com/ErikEhresman-ST1987/sprite-factory/blob/main/app.js) and [index.html](https://github.com/ErikEhresman-ST1987/sprite-factory/blob/main/index.html)
- **Live tool:** https://erikehresman-st1987.github.io/sprite-factory/
- The production implementation incorporates the tested **Version 3** selected-color removal and a tap-to-sample background-color preview. Reuse the bounded processing and sampler behavior from these files; do not assume the whole Sprite Factory app is a drop-in module.

## What solved it
1. Generate the master artwork on a solid contrasting background color that is not used in the subject.
2. Upload the image; tap a clear background area to sample its **actual** RGB/HEX color. The generated color can differ substantially from the requested color.
3. In Selected color mode, remove matching background pixels, including enclosed gaps between leaves or stems; retain original white flowers and details.
4. Use conservative edge cleanup that estimates contamination from the selected key color and nearby foreground colors. The key is **not hardcoded to magenta**; use the selected RGB value.
5. Export a transparent WebP and inspect both the transparent gaps and delicate subject details.

## Improvement Record

### Failure or friction
- White-background removal could erase legitimate white artwork.
- Initial selected-color removal left colored fringes in fine plant foliage.
- Guessing the intended background HEX caused a blue test to retain a solid rectangle: the actual image blue was around `#0179FD`, not the requested `#0000FF`.
- GitHub Pages commits sometimes appeared as 404 before deployment completed; a commit alone is not a verified live test page.

### Change made
- Added selectable HEX background removal with enclosed-area cleanup.
- Iterated edge-color decontamination through versions 1–4; **Version 3** was retained as the best tested balance. Version 4's more conservative boundary-only experiment did not improve the measured result and was not adopted.
- Added a tap-to-sample preview in the production Sprite Factory and accepted HEX input with or without `#`.
- Preserved the original file input rather than replacing it after each selection, addressing a suspected cause of iPad repeated-picker failures; repeated-selection reliability should be verified separately.

### Verification performed
- A complex flowering plant with overlapping leaves, white flowers and narrow internal gaps was exported and compared across successive WebP versions.
- User tested magenta, orange and blue backgrounds, including a blue retry after sampling/correcting the actual background color.
- User confirmed the production Version 3 + sampler integration **passed a real-device test on iPad** on 2026-10-29.
- Comparative color-contamination counts supported Version 3 over Version 4, but are heuristic and do not by themselves establish visual quality.

### Result
**Verified for the tested workflow:** usable transparent WebP output from complex plant artwork; color-key removal works with multiple selected colors; production sampler passed the user's real-device test.

**Not independently verified for every use case:** other subject types, all browser versions, offline encoding, and repeated file selection over extended sessions.

### Known limits
- Solid contrasting backgrounds work best. Gradients, textured backgrounds, shadows and JPEG compression can make removal harder.
- The sampled pixel must be representative of the background; sample a flat area away from the subject.
- Background-like colors inside the artwork may be removed. Avoid choosing a key color present in important details.
- Anti-aliased fringes can remain. Do not aggressively raise tolerance or repeatedly erode edges without comparing against the original.
- An image generator's requested HEX is **not proof** of the image's actual RGB values.
- The WebP export may require an internet connection on browsers that need the encoder, as indicated by the Sprite Factory UI.

## Reuse and verification recipe
- Check this lesson and inspect the current Sprite Factory source before recreating color-key removal in another project.
- Start with a deliberately difficult image containing light-colored details and enclosed holes, then test at least one different key color.
- Confirm transparent outer background **and interior gaps**, preservation of thin stems and light-colored details, clean edges at actual game display size, and a real WebP download.
- Verify the live deployed page rather than relying only on GitHub commit success; test on the target device.
- Stop when improvements are no longer visibly worthwhile. Keep the last verified baseline while experimenting.

## Decision
**Production baseline: Version 3 with sampled background color.** Stop plant-specific edge refinements unless real artwork exposes a meaningful new failure.
