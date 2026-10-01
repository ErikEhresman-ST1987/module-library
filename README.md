# Module Library

A small library of proven, discrete reusable code for Erik's lightweight browser apps and games.

## Purpose

The Module Library exists to reduce development, debugging, and maintenance friction by preserving capabilities that have already proved useful in real projects.

It is a **toolbox, not a framework**.

Projects remain authoritative for their own architecture. No project is required to conform to this library, and a module should be adopted only when it fits the project's actual requirements.

## Parts-Bin Operating Rule

The Module Library is the proven-parts bin for future development.

Before implementing a capability that may have been solved in an earlier project, **check the Module Library first**. If an admitted module fits the current requirement, use it as the starting point rather than generating another independent implementation.

The purpose is not merely to save typing. Reusing a module preserves code that has already survived development, debugging, deployment, and real use. Do not pay again to invent and debug a wheel that is already proven.

This rule applies to small sections of code and foundational files as well as larger discrete modules. A useful reusable part does not need to be architecturally impressive; boring, dependable code that repeatedly solves the same problem may be exactly what belongs here.

Library reuse is still a judgment call. If the proven part does not fit the current project's actual requirement, do not force it. The project remains authoritative.

## What the Parts Bin May Preserve

The primary contents are **proven code modules**: complete files or bounded sections of code that solve recurring problems and have earned reuse through real projects.

The same evidence-first rule also applies to four supporting kinds of proven parts:

### Proven configurations and templates

Not every reusable wheel is JavaScript. A configuration, manifest structure, HTML shell, path convention, or other setup may belong here when substantially the same setup has been repeatedly used and proven.

Preserve these only when reuse saves meaningful setup, debugging, or compatibility work. Do not create templates for hypothetical future projects.

### Micro-utilities

Small functions can earn reuse too. Date helpers, escaping functions, file helpers, safe parsing, ID utilities, and similar code may be worth preserving when the same small solution keeps being rewritten.

Size is not an admission criterion. A five-line function that is repeatedly needed and already debugged can be more valuable than a large abstraction.

Do not catalog trivial code merely because it can be reused. Preserve it when doing so actually reduces repeated work or increases reliability.

### Verification recipes

When a reusable part has a proven way to verify it, preserve that verification knowledge with the part.

A compact verification recipe should capture the meaningful checks that established confidence in the implementation: for example, online and offline behavior, reload behavior, replacement/restore safety, cache-version changes, or real-device checks.

This allows future projects to reuse not only proven code but also the proven way of checking that the code is correctly integrated.

### Proven fixes and lessons

When real use exposes a bug, browser edge case, deployment problem, compatibility issue, or other weakness in a reusable part, preserve the verified improvement in the canonical part.

Record a short explanation when it helps future development understand why the fix exists or prevents the same problem from being rediscovered.

Updating the canonical part improves the starting point for future projects. Existing working projects are not automatically rewritten; back-port an improvement only when there is a concrete reason to change them.

## Core Rule

> **Populate by extraction, not invention.**

Do not create modules for hypothetical future needs. Start with working project implementations. When substantially the same capability proves useful across projects, evaluate whether its smallest coherent implementation deserves extraction.

## Six-Point Module Gate

A candidate module should be evaluated against these questions:

1. **Repeated need** — Has essentially the same capability appeared in at least two real projects?
2. **Clear ownership** — Is its responsibility clearly bounded?
3. **Low coupling** — Can it operate without knowing much about the application around it?
4. **Real friction reduction** — Would reuse actually save development, debugging, or maintenance effort?
5. **Adaptability** — Can another project use or adapt it without fighting assumptions inherited from the original project?
6. **Proven implementation** — Has it already been demonstrated to work reliably in a real project?

These are a judgment gate, not a mechanical score. A candidate does not need a bureaucratic 6/6 when one criterion is genuinely inapplicable, but uncertainty is not a reason to promote speculative code.

## Extraction Rules

- Build for the current project first.
- Extract only after evidence of reuse appears.
- Extract the smallest coherent capability that provides useful reuse.
- Prefer one clear responsibility and a small documented interface.
- Preserve project-specific behavior in the project.
- Do not create chains of tiny wrappers merely to call code "modular."
- Do not force an existing project to adopt a library module simply because the module exists.
- A future project may copy, import, or adapt a module according to what produces the lowest-maintenance result.
- When a module evolves, protect proven behavior and avoid adding options for imagined consumers.

## Candidate Workflow

**Project need → working implementation → real use → repeated need observed → Six-Point Module Gate → extract/adapt → verify independently → make available for future projects**

When beginning a future project, inspect this library for useful proven starting points. Library presence is evidence that a capability has been useful before; it is not evidence that the current project needs it.

## Module Documentation

Each admitted module should record, compactly:

- what responsibility it owns;
- what it deliberately does not own;
- source project(s) that established the repeated need;
- expected inputs/outputs or public interface;
- assumptions and dependencies;
- how to integrate it;
- how it was verified;
- known limitations or adaptation points.

Keep documentation proportional to the module. The library should reduce work, not create administrative work.

## Initial Status

Repository foundation established. The library currently contains admitted reusable parts documented in `MODULE-INDEX.md`.

Continue auditing existing and future projects for code we are repeatedly writing and debugging. Apply the Six-Point Module Gate, then extract the smallest useful proven part.
