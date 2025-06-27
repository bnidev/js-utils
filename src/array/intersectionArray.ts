/**
 * Returns the intersection of two arrays.
 * @param a - The first array.
 * @param b - The second array.
 * @returns An array containing the elements that are present in both arrays.
 *
 * @remarks
 * This function is useful for finding common elements between two arrays. It uses a `Set` for efficient lookups, ensuring that the operation is performed in linear time relative to the size of the input arrays.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { intersectionArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { intersectionArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Find common elements between two arrays
 * const array1 = [1, 2, 3, 4, 5]
 * const array2 = [3, 4, 5, 6, 7]
 * const intersection = intersectionArray(array1, array2)
 * // intersection will be [3, 4, 5]
 * ```
 */
export function intersectionArray<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((item) => setB.has(item))
}
