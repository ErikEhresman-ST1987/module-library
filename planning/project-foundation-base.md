# Project Foundation Base

**Type:** Reusable planning base  
**Purpose:** Translate an approved Goal Box into the smallest durable technical and development foundation capable of growing safely toward the known destination.

Use with the project's governing development principles and applicable companion guides. Complete only sections that matter. Name concrete owners rather than inventing managers, services, frameworks, or abstractions to fill rows.

The Foundation establishes a credible path. It is not permission to build the mature product at once.

## 1. Direction and Authority

Record, as applicable:

- project, repository, branch, and host;
- governing Goal Box and approved amendments;
- intended mature experience and primary experiential surface;
- known destination requirements that affect today's foundation;
- technology selected for the known destination and why it fits;
- foreseeable scale that affects state, lifecycle, rendering, assets, or persistence;
- constraints, non-goals, parked possibilities, and deliberately open decisions;
- supported devices, browsers, orientations, and primary real-test device;
- offline/installability requirements and approved exceptions.

Identify the first meaningful proof or complete workflow that can provide useful evidence about the project.

## 2. Starting Evidence and Protection

For an existing project, distinguish:

- Implemented;
- Activated;
- Verified;
- Used or Played;
- Evaluated;
- Approved but Unbuilt;
- Parked.

Record the last recoverable checkpoint, known defects, unfinished checks, proven behavior/data/assets to protect, and prototype material to reuse, extract, leave behind, or inspect.

For a new project, state that clearly rather than manufacturing legacy concerns.

## 3. Ownership and Extension Map

Identify one authoritative owner for each applicable concern:

- authoritative state and validated transitions;
- persistence, validation, migration, and recovery;
- lifecycle such as time, turns, travel, completion, or scheduling;
- user/player intent routing;
- cross-cutting precedence;
- physical-world rendering, when applicable;
- informational/semantic UI;
- stable definitions and tunable values;
- assets, scene loading, and responsive composition;
- dependency startup and static caching.

Define the normal interaction path where applicable:

**intent → owning system validation → authoritative state change → persistence when appropriate → presentation**

Keep transient presentation state out of durable state unless the project has a demonstrated reason otherwise.

Create extension seams for known destination pressure, not empty systems for hypothetical futures.

## 4. Data and Recovery Contract — When Applicable

Record only what the project requires:

- storage type and authoritative persistence owner;
- storage key/database and data-format version;
- required data identity, types, ranges, references, and defaults;
- read → validate → migrate if necessary → validate → activate sequence;
- compatibility and rollback expectations;
- missing, corrupt, newer-version, quota, or write-failure behavior;
- user-owned backup/restore path when warranted;
- static-asset caching boundary versus user-data ownership.

Protect meaningful user data. Do not create migration machinery for disposable development data unless required.

## 5. Conditional Project Contracts

Add only contracts justified by the actual project. Examples include:

- graphical world and asset production;
- audio;
- PWA/offline delivery;
- simulation or turn lifecycle;
- scheduling/time behavior;
- privacy-sensitive data;
- accessibility;
- external dependencies;
- responsive graphical composition;
- content/data pipelines.

Do not add a conditional section merely because another project needed it.

For graphical projects, define physical-world versus informational-UI ownership, reconstruction invariants, responsive composition, smallest necessary asset set, production-source handling, and real-device performance evidence where relevant.

## 6. Next Smallest Meaningful Slice

Before selecting the next slice:

1. Re-read the governing documents.
2. Inspect the current implementation and recoverable checkpoint.
3. Distinguish what is implemented, activated, verified, used/played, evaluated, approved-but-unbuilt, and parked.
4. Identify the actual thin point or next meaningful missing part of the experience.
5. Check the Module Library for proven parts that fit without forcing them.

Then define:

- the complete meaningful result;
- why it is the next useful evidence;
- owners/files, saved data, and nearby behavior affected;
- required assets/dependencies only;
- explicit exclusions and deferred work;
- uncertainty requiring a prototype, if any;
- approximately 90% safe-success judgment;
- technical and experiential acceptance criteria;
- regression boundary;
- stop condition;
- next real-use/playtest question.

Do not predetermine every future increment. A broad provisional path may be recorded when useful, but only the next slice should normally be treated as committed.

## 7. Verification Plan and Result

Verification should be proportional to the slice and include applicable evidence for:

- new behavior;
- nearby regression risk;
- common, rare/conditional, and failure/interruption paths;
- empty/full/minimum/maximum content where relevant;
- save/reload, restore, or migration;
- target-device touch, keyboard, accessibility, composition, and performance;
- deployment/import/asset/cache activation;
- repeated activation or reconstruction where relevant.

Track separately:

**Implemented → Activated → Verified → Used/Played → Evaluated**

Do not call an increment complete merely because code exists.

## 8. Handoff and Stopping Rule

Record:

- current checkpoint and recovery point;
- what changed and why;
- meaningful documentation changes;
- tests still needed and accepted limitations;
- exact next action only after evaluation warrants it;
- useful lessons worth carrying forward.

Foundation work stops when the next approved slice has clear ownership, protected data where applicable, understood dependencies, realistic acceptance criteria, and a recovery path.

Further hardening requires a reproduced failure, demonstrated expansion pressure, or known destination requirement.

After a slice is technically ready, stop for real use or play and evaluation before automatically expanding.

---

## Foundation Completion Test

The Foundation is sufficient when it can answer:

- What is authoritative?
- Who owns each consequential change?
- What must survive?
- How can the current state be recovered?
- What known destination pressures must today's structure support?
- What is deliberately deferred?
- What complete meaningful result should be made real next?
- How will we know whether it actually worked?

If those questions are answered credibly, stop architecting and build.
