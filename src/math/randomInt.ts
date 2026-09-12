/**
 * Generates a random integer within the inclusive range [`min`, `max`].
 *
 * Non-integer bounds are rounded inward (`min` up, `max` down).
 *
 * @param min - The lower bound (inclusive, rounded up).
 * @param max - The upper bound (inclusive, rounded down).
 *
 * @returns A random integer `n` with `min <= n <= max`.
 *
 * @throws {TypeError} When any argument is not a number.
 * @throws {Error} When `min` is greater than `max`, or when no integer
 * fits the range.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { randomInt } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { randomInt } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * randomInt(1, 10) // e.g. 7
 * randomInt(5, 5) // 5
 * ```
 */
export function randomInt(min: number, max: number): number {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('All arguments must be numbers')
  }
  if (min > max) {
    throw new Error('Min must be less than or equal to max')
  }
  const lower = Math.ceil(min)
  const upper = Math.floor(max)
  if (lower > upper) {
    throw new Error('Range contains no integer')
  }
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
