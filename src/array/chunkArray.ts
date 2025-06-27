/**
 * Splits an array into chunks of a specified size.
 *
 * @param arr - The array to be chunked.
 * @param size - The size of each chunk.
 * @returns An array of arrays, where each sub-array is a chunk of the specified size.
 *
 * @remarks
 * This utility is useful for processing large arrays in smaller, manageable pieces, such as when handling pagination or batching operations.
 * It can help improve performance and reduce memory usage by avoiding operations on very large arrays at once.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { chunkArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { chunkArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Chunk an array into sub-arrays of size 2
 * const numbers = [1, 2, 3, 4, 5, 6]
 * const chunked = chunkArray(numbers, 2)
 * // chunked will be [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0')
  }

  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}
