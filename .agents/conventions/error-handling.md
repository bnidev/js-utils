# Error Handling

Three core patterns. Pick the one that matches the function's contract.

## 1. Throw on invalid input

When the function **cannot do its job** with the given input, throw a descriptive `Error`. Let it propagate — the caller decides what to do.

```ts
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0')
  }
  // ...
}
```

**Use when:** math, string, array, color, or timing functions receive bad data (wrong type, out of range, missing required parameter).

**Error type:** `Error` with a clear message. Use `TypeError` only for `typeof` checks where the semantic distinction matters.

## 2. Result-object

Return `{ success, value, error }` instead of throwing. The caller inspects the result and handles failure gracefully.

```ts
export function sanitizeUrl(input: string): { success: boolean; value: string | null; error?: Error } {
  try {
    const url = new URL(input)
    return { success: true, value: url.toString() }
  } catch (err) {
    return { success: false, value: null, error: err instanceof Error ? err : new Error('Invalid URL') }
  }
}
```

**Use when:** parsing or sanitizing untrusted input where failure is expected and the caller should decide what to do.

## 3. Graceful return

Return a sensible default instead of throwing. No logging, no error object.

```ts
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof localStorage === 'undefined') return defaultValue ?? null
  // ...
}

export function isEmail(email: string): boolean {
  if (typeof email !== 'string') return false
  // ...
}
```

**Use when:**
- Browser APIs are unavailable (SSR/Node) — return `null` or the default
- The function is a validator (`isEmail`, `isUrl`) — return `false`
- The element or value is not found — return `null` or an empty result

## Rules

- **Never swallow errors silently** without returning a meaningful default
- **Never use `console.error`** — this is a library, not an app
- **`console.warn`** is acceptable for non-fatal developer warnings (e.g., missing browser API)
- **Error messages should be descriptive** — `"Invalid hex color"` not `"Error"`
