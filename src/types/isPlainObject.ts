/**
 * Checks if a value is a plain old JavaScript object (POJO).
 *
 * A plain object is created by an object literal, `new Object()`, or
 * `Object.create(null)`. Arrays, `Date`s, `Map`s, class instances, and
 * other built-ins return `false`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a plain object, `false` otherwise.
 *
 * @category Types
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isPlainObject } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isPlainObject } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject({ a: 1 }) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * ```
 */
export function isPlainObject(
  value: unknown
): value is Record<PropertyKey, unknown> {
  if (typeof value !== 'object' || value === null) return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}
