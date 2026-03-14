/**
 * Checks if an object, array, string, or collection is empty.
 *
 * @template T - The type of the value to check.
 *
 * @param value - The value to check for emptiness.
 *
 * @returns `true` if the value is empty, `false` otherwise.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isEmpty } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isEmpty } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isEmpty({}) // true
 * isEmpty([]) // true
 * isEmpty('') // true
 * isEmpty({ a: 1 }) // false
 * isEmpty([1, 2]) // false
 * ```
 */
export function isEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' || Array.isArray(value))
    return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
