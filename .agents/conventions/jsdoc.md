# JSDoc Conventions

All exported functions and types must have JSDoc. This repo uses TypeDoc to auto-generate docs — the JSDoc drives the documentation site.

## Template

```ts
/**
 * Converts a hex color string to an RGB object.
 *
 * @param hex - A 3 or 6 digit hex color string (with or without `#`).
 * @returns An object with `r`, `g`, `b` properties, or `null` if the input is invalid.
 * @example
 * ```ts
 * // ESM
 * import { hexToRgb } from '@bnidev/js-utils'
 * hexToRgb('#ff0000') // { r: 255, g: 0, b: 0 }
 * ```
 *
 * ```ts
 * // CommonJS
 * const { hexToRgb } = require('@bnidev/js-utils')
 * hexToRgb('#ff0000') // { r: 255, g: 0, b: 0 }
 * ```
 */
export function hexToRgb(hex: string): RGB | null { /* ... */ }
```

## Required tags

- **`@category`** — groups functions in the TypeDoc sidebar. Use the module name: `array`, `async`, `color`, `datetime`, `dom`, `math`, `object`, `sanitize`, `storage`, `string`, `timing`, `validation`.
- **`@param`** — one per parameter, with a short description.
- **`@returns`** — describe the return value, including error/null cases.
- **`@example`** — include **both ESM and CommonJS** import examples. This shows consumers that both module systems work.

## Style

- First line is a single-sentence summary
- Use `@param` and `@returns` (not `@return`)
- Use `@throws` when the function can throw
- Keep it short — one sentence per tag is usually enough

## Do not use JSDoc for

- Self-evident one-liners that are not exported
- Private helpers that are clearly named
