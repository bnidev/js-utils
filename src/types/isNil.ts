/**
 * Checks if a value is `null` or `undefined`.
 *
 * Shorthand for `value === null || value === undefined`.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is `null` or `undefined`, `false` otherwise.
 *
 * @category Types
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isNil } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isNil } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * isNil('') // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}
