# Module Library

A small library of proven, discrete reusable code for Erik's lightweight browser apps and games.

## Purpose

The Module Library exists to reduce development, debugging, and maintenance friction by preserving capabilities that have already proved useful in real projects.

It is a **toolbox, not a framework**.

Projects remain authoritative for their own architecture. No project is required to conform to this library, and a module should be adopted only when it fits the project's actual requirements.

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

Repository foundation established. No code modules have yet been admitted.

The next step is to inspect existing projects for repeated, proven capabilities and create a conservative candidate inventory before extracting code.
