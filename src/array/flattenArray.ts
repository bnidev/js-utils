/**
 * Recursively flattens an array of nested arrays into a single-level array.
 *
 * @typeParam T - The type of elements in the array.
 * @param arr - The array to flatten, which may contain nested arrays.
 * @returns A new array with all nested elements flattened into a single level.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { flattenArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { flattenArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const nestedArray = [1, [2, 3], [[4]], 5]
 * const flatArray = flattenArray(nestedArray)
 * console.log(flatArray) // Output: [1, 2, 3, 4, 5]
 * ```
 */

export function flattenArray<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val as (T | T[])[]))
    } else {
      acc.push(val as T)
    }
    return acc
  }, [])
}
