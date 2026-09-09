# AGENTS.md

TypeScript utility-function library — arrays, DOM, objects, strings, and more. Published as `@bnidev/js-utils`.

## Stack

- TypeScript 6 (strict)
- pnpm 10
- Node.js 24 (see `.nvmrc`)
- Biome for lint and format
- Vitest for tests
- tsup for build
- TypeDoc for auto-generated docs

## Commands

```bash
pnpm install              # install deps and set up .githooks
pnpm run build            # tsup build to dist/
pnpm run check            # biome lint + format check
pnpm run check:fix        # biome auto-fix
pnpm test                 # vitest (watch mode)
pnpm run test:coverage    # vitest run --coverage
pnpm exec tsc --noEmit    # ad-hoc typecheck (no dedicated script)
```

CI order: `lint → test → build`.

A `pre-push` git hook runs `pnpm run check` automatically.

## Layout

- `src/array/` — array utilities (chunk, flatten, unique, etc.)
- `src/async/` — retry, timeout, wait
- `src/color/` — hex/rgb conversion, lighten, darken
- `src/datetime/` — formatting, validation, relative time
- `src/dom/` — scroll, focus, resize, element observation
- `src/math/` — trig, distance, geometry
- `src/object/` — deep clone, merge, pick, omit, nested access
- `src/sanitize/` — HTML, JSON, URL sanitization
- `src/storage/` — cookies, localStorage
- `src/string/` — case conversion, escape, template, truncate
- `src/timing/` — debounce, throttle, interval
- `src/validation/` — email, URL, deep equality

Each module has an `index.ts` barrel, one file per utility, and a `__tests__/` folder with matching `.test.ts` files.

## Conventions

### Code

- [TypeScript](.agents/conventions/typescript.md)
- [Imports](.agents/conventions/imports.md)
- [Naming](.agents/conventions/naming.md)
- [JSDoc](.agents/conventions/jsdoc.md)
- [Linting](.agents/conventions/linting.md)
- [Error handling](.agents/conventions/error-handling.md)

### Testing

- [Vitest patterns](.agents/testing/vitest-patterns.md)

### Workflow

- [CI](.agents/workflow/ci.md)
- [Commit conventions](.agents/workflow/commit-conventions.md)
- [Git hooks](.agents/workflow/git-hooks.md)
- [Releases](.agents/workflow/release.md)
