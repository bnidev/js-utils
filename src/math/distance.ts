/**
 * Calculates the Euclidean distance between two points in a 2D space.
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @returns The distance between the two points.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { distance } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { distance } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const dist = distance(0, 0, 3, 4) // dist will be 5
 * ```
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}
