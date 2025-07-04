/**
 * Converts an angle from radians to degrees.
 *
 * @param {number} radians - The angle in radians to convert.
 * @returns {number} The angle in degrees.
 * @throws {TypeError} If the input is not a number.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { radiansToDegrees } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { radiansToDegrees } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const degrees = radiansToDegrees(Math.PI) // degrees will be 180
 * // Convert 90 degrees to radians and back
 * const radians = Math.PI / 2
 * const degrees = radiansToDegrees(radians) // degrees will be 90
 * ```
 */
export function radiansToDegrees(radians: number): number {
  if (typeof radians !== 'number') {
    throw new TypeError('Input must be a number')
  }

  return radians * (180 / Math.PI)
}
