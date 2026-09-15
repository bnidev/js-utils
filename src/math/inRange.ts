/**
 * Checks if a number lies within the inclusive range [`min`, `max`].
 *
 * @param value - The number to check.
 * @param min - The lower bound (inclusive).
 * @param max - The upper bound (inclusive).
 *
 * @returns `true` when `min <= value <= max`, otherwise `false`.
 *
 * @throws {TypeError} When any argument is not a number.
 * @throws {Error} When `min` is greater than `max`.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { inRange } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { inRange } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * inRange(5, 0, 10) // true
 * inRange(10, 0, 10) // true
 * inRange(11, 0, 10) // false
 * ```
 */
export function inRange(value: number, min: number, max: number): boolean {
  if (
    typeof value !== 'number' ||
    typeof min !== 'number' ||
    typeof max !== 'number'
  ) {
    throw new TypeError('All arguments must be numbers')
  }
  if (min > max) {
    throw new Error('Min must be less than or equal to max')
  }
  return value >= min && value <= max
}
