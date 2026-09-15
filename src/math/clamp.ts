/**
 * Restricts a number to the inclusive range [`min`, `max`].
 *
 * @param value - The number to clamp.
 * @param min - The lower bound (inclusive).
 * @param max - The upper bound (inclusive).
 *
 * @returns `min` when `value` is smaller, `max` when `value` is larger,
 * otherwise `value` unchanged.
 *
 * @throws {TypeError} When any argument is not a number.
 * @throws {Error} When `min` is greater than `max`.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { clamp } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { clamp } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
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
  return Math.min(Math.max(value, min), max)
}
