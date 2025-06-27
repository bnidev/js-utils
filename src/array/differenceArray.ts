/**
 * Returns a new array containing elements from the first array that are not present in the second array.
 * @param a - The first array.
 * @param b - The second array.
 * @returns A new array with elements from `a` that are not in `b`.
 *
 * @remarks
 * This function is useful for finding the difference between two arrays, effectively removing elements from the first array that are also present in the second array. It uses a `Set` for efficient lookups.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { differenceArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { differenceArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Find elements in array1 that are not in array2
 * const array1 = [1, 2, 3, 4, 5]
 * const array2 = [3, 4, 5, 6, 7]
 * const difference = differenceArray(array1, array2)
 *
 */
export function differenceArray<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => !setB.has(item))
}
