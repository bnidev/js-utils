/**
 * Returns a new array with only unique elements from the input array.
 *
 * @param arr - The array to filter for unique values.
 * @returns A new array containing only unique elements.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * import { uniqueArray } from '@bnidev/js-utils'
 * ```
 *
 * @example Usage
 * ```ts
 * const arr = [1, 2, 2, 3, 4, 4, 5]
 * const unique = uniqueArray(arr) // [1, 2, 3, 4, 5]
 * ```
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}
