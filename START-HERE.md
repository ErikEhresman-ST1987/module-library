# START HERE — Module Library Operating Instructions

**Audience:** Any ChatGPT development chat or project using this repository.
**Purpose:** Use proven parts and contribute verified learning without imposing a framework on projects.

## First-read sequence
1. Read this file and [README.md](README.md) for governing principles.
2. Consult [MODULE-INDEX.md](MODULE-INDEX.md) to find relevant code, templates, verification recipes, lessons, and planning guidance.
3. Read the actual item's contract, source, verification and limits before deciding to use it.
4. For project planning, consult [AI Project Planning Instructions](planning/ai-project-planning-instructions.md), [Goal Box Base](planning/goal-box-base.md), and [Project Foundation Base](planning/project-foundation-base.md) as applicable.

## Retrieve and apply (library → project)
- At project startup, before a relevant capability is built, and when debugging recurring friction, check the library for a proven starting point.
- Match the project's actual needs, dependencies, constraints and target devices; do not force adoption.
- Preserve project ownership of architecture, UI, state schema, and acceptance criteria.
- Copy, import or adapt the smallest coherent part. Check its known limits and past failed approaches before changing it.
- Verify integration in the target project, including interactions with existing behavior and real-device/offline checks when relevant.
- Library admission is evidence of prior usefulness, **not** proof of compatibility or verification in the new project.

## Harvest and contribute (project → library)
At meaningful checkpoints after verification and real use, ask whether a reusable improvement was discovered: code, configuration, planning method, verification recipe, fix, or lesson.
1. Identify the concrete friction and evidence from the project.
2. Check whether an existing library item covers it; prefer improving that item over creating a duplicate.
3. Apply the README's Six-Point Module Gate and extraction rules. Do not promote hypothetical, untested or tightly project-specific work.
4. Extract the smallest coherent reusable part; keep project-specific assumptions in the project.
5. Verify the extracted/adapted part and document the evidence and remaining limits. Real-project success alone does not guarantee independent reuse.
6. Propose a precise library change for user approval before modifying canonical content. Do not silently overwrite proven parts or change working projects.
7. Update the authoritative item, its Improvement Record and the index if a new item is admitted. Existing projects are not automatically back-ported.

## Compact Improvement Record
For each reusable item, maintain a brief history in its own documentation (or link to an existing detailed lesson rather than duplicating it). Each meaningful attempt should record:

- **Failure or friction:** What actually went wrong or what recurring effort needed reducing?
- **Change made:** What was tried, including unsuccessful or regressive attempts?
- **Verification performed:** Tests, deployments, target devices, real use, and any untested scenarios.
- **Result:** **Verified**, **Partially verified**, **Failed/regressive**, or **Not yet verified**, with observed evidence rather than inferred success.
- **Known limits:** Remaining uncertainty, compatibility boundaries, or regression risks.

Keep the **current proven version authoritative**. A failed or promising experiment never replaces it. Preserve unsuccessful attempts concisely when they prevent rediscovery; do not archive full debugging transcripts. If no improvement attempts exist, say so rather than inventing a record. Existing incident histories may satisfy this requirement if the five fields are discoverable.

## Evidence and promotion
Distinguish **implemented → activated/deployed → verified → used/played → evaluated**. Passing CI alone is not device validation. Do not claim a fix is proven until the relevant evidence supports it. Label partial confidence accurately. A failed experiment can be a valuable recorded lesson without being promoted as canonical code.

## Scope and economy
This library is a **toolbox and development touchstone, not a framework**. The project remains authoritative. Avoid unnecessary documentation, speculative modules and forced reuse. Preserve the minimum history needed to make future decisions better.

## Quick invocation for another chat
“Consult `ErikEhresman-ST1987/module-library/START-HERE.md`, follow its retrieval and contribution instructions, and check the module index for relevant proven parts before implementing. After verified real use, identify any reusable improvements for review; do not change the library without my approval.”

If repository access is unavailable, say so and request access or the relevant files rather than claiming the library was consulted.
