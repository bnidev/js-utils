# CONTEXT.md

Domain language for `@bnidev/js-utils`: a collection of often-used utility functions
(array, DOM, object, string, timing, validation, and more).

## Dual use

The library serves two consumers:

- **Install consumers** import from the package (tree-shakable ESM) and receive updates.
- **Paste consumers** copy a single self-contained function into their project to avoid
  a dependency. Paste bundles are generated at docs-build time (internal dependencies
  inlined), never hand-maintained, and stamped with the source version.

## Tiers

- **Paste-first** — pure, stable helpers (arrays, strings, math, timing, plain object
  reads). Copying is the intended lightweight use.
- **Install-recommended** — `sanitize/`, `storage/`, `validation/isUrl` +
  `validation/isEmail`, `dom/` (browser-dependent: focus, scroll-lock, observers,
  waits). These guard security or browser-state behavior; stale copies can stay
  vulnerable, so their copy blocks carry a warning and production use should install.

## Architecture rules (codebase-design vocabulary)

- Each public **module** keeps a small **interface**; the **interface** is the test surface.
- Source **modules** may share narrow internal **modules** under `src/internal/`
  (e.g. `internal/protocols`) for **locality** (fix once, fixed everywhere)
  and **leverage** across call sites — promotion follows the rule: co-locate
  until reuse across modules demands sharing. `src/internal/` has no barrel
  and is exempt from the export checks, so its helpers never leak onto the
  public surface; paste bundles inline them at build time.
- The paste pipeline keeps the copy promise intact: source may import, pastes are
  always flat. A shared snippet used once is a hypothetical **seam**; shared policy
  with two real **adapters** (`sanitizeUrl`, `isUrl`) is a real one.
- `sanitizeHtml` is tags-first with its own permissive policy and is out of scope for
  the URL protocol policy shared by `sanitizeUrl` and `isUrl`.
