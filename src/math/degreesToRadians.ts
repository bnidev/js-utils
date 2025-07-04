/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees.
 * @returns The angle in radians.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { degreesToRadians } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { degreesToRadians } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const radians = degreesToRadians(180) // radians will be π (approximately 3.14159)
 * ```
 */
export function degreesToRadians(degrees: number): number {
  if (typeof degrees !== 'number') {
    throw new TypeError('Input must be a number')
  }

  return degrees * (Math.PI / 180)
}
