/**
 * Returns a new array with the elements shuffled using the Fisher–Yates algorithm.
 *
 * @template T
 * @param {Array<T | undefined>} arr - The array to shuffle.
 * @returns {Array<T | undefined>} A new array with elements shuffled.
 *
 * @remarks
 * This function uses the [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle) algorithm to randomly reorder the elements of the input array. It is efficient and ensures that each permutation of the array is equally likely.
 *
 * @category Array
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { shuffleArray } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { shuffleArray } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Shuffle an array of numbers
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers);
 *
 * // Shuffle an array of strings
 * const strings = ['apple', 'banana', 'cherry'];
 * const shuffledStrings = shuffleArray(strings);
 *
 * // Shuffle an array with undefined values
 * const mixedArray = [1, undefined, 2, undefined, 3];
 * const shuffledMixedArray = shuffleArray(mixedArray);
 * ```
 */
export function shuffleArray<T>(
  arr: Array<T | undefined>
): Array<T | undefined> {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}
