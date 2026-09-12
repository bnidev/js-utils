/**
 * Linearly interpolates between `start` and `end` by factor `t`.
 *
 * Values of `t` outside [0, 1] extrapolate beyond the segment; use
 * {@link clamp} first when extrapolation is not wanted.
 *
 * @param start - The value returned when `t` is 0.
 * @param end - The value returned when `t` is 1.
 * @param t - The interpolation factor.
 *
 * @returns `start + (end - start) * t`.
 *
 * @throws {TypeError} When any argument is not a number.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { lerp } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { lerp } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * lerp(0, 10, 0.5) // 5
 * lerp(10, 20, 0.25) // 12.5
 * ```
 */
export function lerp(start: number, end: number, t: number): number {
  if (
    typeof start !== 'number' ||
    typeof end !== 'number' ||
    typeof t !== 'number'
  ) {
    throw new TypeError('All arguments must be numbers')
  }
  return start + (end - start) * t
}
