# AI Project Planning Instructions

**Type:** Reusable AI-facing operating instructions  
**Purpose:** Apply the Goal Box and Project Foundation bases consistently without turning them into bureaucracy or reducing development to microscopic technical changes.

## Governing Sequence

Use this sequence:

**Idea / Need → Goal Box → Foundation → Re-ground → Smallest Meaningful Slice → Implement → Activate → Verify → Real Use/Play → Evaluate → Next Slice**

The Goal Box defines direction.  
The Foundation establishes a safe durable path.  
The Smallest Meaningful Slice determines the next thing worth making real.  
Verification establishes whether it works.  
Real use/play establishes whether it is good enough to keep.  
Evaluation determines what comes next.

## Goal Box Authoring

Start with the user's actual idea, not the Goal Box Base as a questionnaire.

Use the base to ensure the mature destination, protected experience, known requirements, boundaries, non-goals, and intentionally open decisions are sufficiently understood.

Do not ask questions already answered by the user's description or existing evidence.

Ask only questions whose answers materially change the destination or its boundaries.

Do not force every heading to equal length or every project to contain the same detail.

Obtain approval of the Goal Box before using it to establish the Foundation.

The Goal Box is governing direction, not an immutable specification. Explicit user decisions and genuine evidence may revise it. When direction changes, update the governing understanding rather than defending the previous wording.

## Foundation Authoring

Translate the approved destination into concrete ownership, data/recovery, technology, extension boundaries, verification, and the next meaningful proof.

Complete only applicable sections.

Choose technology for the known destination. A simpler technology does not have to fail first before a more suitable technology may be selected.

Do not create infrastructure for hypothetical possibilities.

Check the Module Library for proven parts, templates, verification recipes, fixes, and lessons that match the actual requirement. Reuse is a judgment call; never force a part merely because it exists.

Stop Foundation work when the next meaningful slice can proceed with clear ownership, understood dependencies, protected data where applicable, realistic acceptance criteria, and a recovery path.

## Smallest Meaningful Slice (SMS)

Select the smallest **complete, meaningful, evaluable slice of behavior or experience**, not the smallest amount of code or the smallest technical change.

### Selection order

**Determine what constitutes a meaningful complete slice first. Only then minimize its scope while preserving that meaning. Never minimize first and ask afterward whether the result is meaningful.**

A proposed slice qualifies only when all of the following are true:

1. **Meaningful advancement** — Completing it materially changes what the user/player can do, experience, evaluate, or learn, or it proves an important project assumption.
2. **Complete behavior** — It includes the supporting UI, state, persistence, rendering, lifecycle, or interaction behavior necessary for that coherent experience to function correctly. Do not split an interaction merely because its implementation crosses files or systems.
3. **Diagnostic boundedness** — If it fails or behaves poorly, the new work is coherent and bounded enough that the cause can reasonably be isolated without untangling several unrelated new capabilities.
4. **Interaction verification** — Its verification boundary includes relevant interaction with existing behavior. New code working in isolation is not sufficient.
5. **Meaningful stop condition** — After implementation and verification, stop and evaluate the result before automatically proceeding.

### Critical interpretation

**Smallness is not the objective. Meaningful progress and useful evidence are the objectives. Smallness is the constraint that preserves diagnosability.**

Do not interpret "smallest" as an instruction to minimize code, files, controls, implementation steps, or visible change.

Do not implement partial UI, scaffolding, half an interaction, or a technical stub as an increment unless that partial implementation itself answers a meaningful question that cannot be answered more effectively by completing the interaction.

Prefer the **smallest vertical path through the system that creates one coherent piece of working experience**.

### Rejection tests

**Too small:**  
"It works, but the user cannot meaningfully experience, exercise, evaluate, or learn anything important from it."

Reject it. Enlarge the slice until it produces meaningful evidence.

**Right size:**  
"This materially advances the intended experience, can actually be evaluated, and remains straightforward to verify and diagnose."

Choose it.

**Too large:**  
"This introduces several independent new behaviors, and failure or feedback would be difficult to attribute."

Reduce or separate it while preserving one complete meaningful experience.

A useful shorthand is:

> **Not a brick, not the whole house—one usable room.**

## Increment Selection

Do not treat the Goal Box as a backlog to decompose sequentially.

Before every increment:

- re-read the governing Goal Box, Foundation, and applicable principles;
- inspect the current implementation rather than relying on conversational momentum;
- identify the actual thin point;
- distinguish implemented, activated, verified, used/played, evaluated, approved-but-unbuilt, and parked work;
- check the Module Library for applicable proven parts;
- define one Smallest Meaningful Slice and its stop condition.

A known destination capability does not automatically belong in the current slice merely because it appears in the Goal Box.

A broad future sequence may be useful for orientation, but later slices remain provisional and should be selected again after evidence from real use.

## Verification and Learning

Track separately:

**Implemented → Activated → Verified → Used/Played → Evaluated**

Technical success does not establish experiential success.

After a bounded proof works technically, use or play it under the conditions that matter. Ask whether it actually accomplishes its intended job.

Evaluation should result in one of three practical outcomes:

- **Keep** — the result works and remains part of the project;
- **Modify** — the result is directionally right but evidence identifies a concrete correction;
- **Remove** — the result does not earn its place.

Then re-ground and choose the next Smallest Meaningful Slice.

## Anti-Drift Rule

The governing documents outrank conversational momentum.

Do not continue an apparent implementation sequence merely because previous conversation implied it.

Before proposing or beginning the next increment, re-ground in the approved destination and inspect what actually exists now.

The user may explicitly change direction. When that happens, adapt the governing plan deliberately rather than resisting the change or silently preserving obsolete assumptions.

## Planning Economy

Planning exists to support development, not replace it.

Do not create extra documents, managers, abstractions, checklists, or architectural layers merely to make the planning system appear complete.

The reusable bases are prompts for disciplined judgment, not forms that must be filled mechanically.

The objective is consistent, recoverable, evidence-driven development with the least planning overhead necessary to achieve it.
