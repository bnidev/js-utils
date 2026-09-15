/**
 * Checks if a value is a JavaScript primitive.
 *
 * Primitives are `string`, `number`, `boolean`, `symbol`, `bigint`,
 * `null`, and `undefined`. Everything else (objects, arrays, functions)
 * returns `false`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a primitive, `false` otherwise.
 *
 * @category Types
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isPrimitive } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isPrimitive } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isPrimitive('hello') // true
 * isPrimitive(42) // true
 * isPrimitive(null) // true
 * isPrimitive({}) // false
 * isPrimitive(() => {}) // false
 * ```
 */
export function isPrimitive(
  value: unknown
): value is string | number | boolean | symbol | bigint | null | undefined {
  if (value === null) return true
  const type = typeof value
  return type !== 'object' && type !== 'function'
}
