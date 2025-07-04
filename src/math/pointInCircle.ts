/**
 * Checks if a point is inside or on the boundary of a circle.
 *
 * @param {number} pointX - The x-coordinate of the point.
 * @param {number} pointY - The y-coordinate of the point.
 * @param {number} circleX - The x-coordinate of the circle's center.
 * @param {number} circleY - The y-coordinate of the circle's center.
 * @param {number} radius - The radius of the circle.
 * @returns {boolean} True if the point is inside or on the boundary of the circle, false otherwise.
 * @throws {TypeError} If any parameter is missing or not a number.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { pointInCircle } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { pointInCircle } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const isInside = pointInCircle(1, 1, 0, 0, 2) // true, since (1,1) is inside the circle centered at (0,0) with radius 2
 * const isOnBoundary = pointInCircle(2, 0, 0, 0, 2) // true, since (2,0) is on the boundary of the circle centered at (0,0) with radius 2
 */
export function pointInCircle(
  pointX: number,
  pointY: number,
  circleX: number,
  circleY: number,
  radius: number
): boolean {
  if (
    pointX === undefined ||
    pointY === undefined ||
    circleX === undefined ||
    circleY === undefined ||
    radius === undefined
  ) {
    throw new TypeError('All parameters must be provided')
  }

  if (
    typeof pointX !== 'number' ||
    typeof pointY !== 'number' ||
    typeof circleX !== 'number' ||
    typeof circleY !== 'number' ||
    typeof radius !== 'number'
  ) {
    throw new TypeError('All parameters must be numbers')
  }

  const dx = pointX - circleX
  const dy = pointY - circleY
  return dx * dx + dy * dy <= radius * radius
}
