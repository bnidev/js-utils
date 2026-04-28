/**
 * Sets a value at a nested path in an object.
 *
 * @template T - The type of the object.
 *
 * @param obj - The object to set the value in.
 * @param path - The dot-notation path (e.g., 'a.b.c').
 * @param value - The value to set.
 *
 * @returns A new object with the value set at the specified path.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { setNestedValue } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { setNestedValue } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const obj = { a: { b: 1 } }
 * const result = setNestedValue(obj, 'a.c', 2)
 * // result: { a: { b: 1, c: 2 } }
 * ```
 */
export function setNestedValue<T extends object>(
  obj: T,
  path: string,
  value: unknown
): T {
  const keys = path.split('.')
  const result = { ...obj }
  let current: Record<string, unknown> = result as Record<string, unknown>

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!key) continue
    if (
      !(key in current) ||
      typeof current[key] !== 'object' ||
      current[key] === null
    ) {
      current[key] = {}
    }
    current[key] = { ...(current[key] as Record<string, unknown>) }
    current = current[key] as Record<string, unknown>
  }

  const lastKey = keys.at(-1)
  if (lastKey) {
    current[lastKey] = value
  }
  return result
}
