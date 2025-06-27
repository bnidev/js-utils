/**
 * Filters out falsy values from an array, returning a new array with only truthy values.
 * This includes removing `null`, `undefined`, `false`, `0`, and empty strings.
 *
 * @param arr - The array to compact.
 * @returns A new array containing only the truthy values from the original array.
 *
 * @remarks
 * This utility is useful for cleaning up arrays where you want to remove unwanted or non-useful values, such as when processing user input or filtering results.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { compactArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { compactArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Compact an array with various falsy values
 * const mixedArray = [1, null, 2, undefined, 0, "hello", false, ""]
 * const compactedArray = compactArray(mixedArray)
 * // compactedArray will be [1, 2, "hello"]
 * ```
 */
export function compactArray<T>(
  arr: (T | null | undefined | false | 0 | '')[]
): T[] {
  return arr.filter(Boolean) as T[]
}
