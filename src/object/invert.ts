/**
 * Creates a new object with keys and values swapped.
 *
 * @template T - The type of the source object.
 *
 * @param obj - The object to invert.
 *
 * @returns A new object with keys and values swapped.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { invert } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { invert } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const obj = { a: '1', b: '2', c: '3' }
 * const result = invert(obj)
 * // result: { '1': 'a', '2': 'b', '3': 'c' }
 * ```
 */
export function invert<T extends Record<string, string | number>>(
  obj: T
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    result[String(value)] = key
  }

  return result
}
