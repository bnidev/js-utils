# Vitest Patterns

## Setup

- **Globals enabled** — `describe`, `it`, `expect`, `vi`, `beforeEach` are available without imports
- **Environment: `happy-dom`** — DOM APIs are available in tests (no need for `jsdom`)
- Test files live in `__tests__/` folders colocated with the source they test

## File structure

Test files match the source 1:1:

```
src/string/camelCase.ts        → src/string/__tests__/camelCase.test.ts
src/array/chunkArray.ts        → src/array/__tests__/chunkArray.test.ts
src/dom/focusElement.ts        → src/dom/__tests__/focusElement.test.ts
```

## Structure

```ts
describe('chunkArray', () => {
  it('splits an array into chunks of the given size', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('throws when size is zero', () => {
    expect(() => chunkArray([1, 2], 0)).toThrow('Chunk size must be greater than 0')
  })
})
```

## Running tests

```bash
pnpm test                  # all tests, watch mode
pnpm run test:coverage     # all tests with coverage
pnpm vitest run path/to/file   # single file
pnpm vitest run -t "test name"  # single test by name
```

## Rules

- **Test both success and failure cases** — every throw should have a corresponding `expect(...).toThrow()`
- **Use `beforeEach` to reset state**, never `beforeAll` for mutable state
- **Globals are available** — no need to `import { describe, it, expect } from 'vitest'`
- **Import source functions directly** — not from barrel files
