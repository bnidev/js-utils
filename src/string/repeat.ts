/**
 * Repeats a string a specified number of times.
 *
 * @param str - The string to repeat.
 * @param count - The number of times to repeat the string.
 *
 * @returns The repeated string.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { repeat } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { repeat } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * repeat('abc', 3) // 'abcabcabc'
 * repeat('x', 5) // 'xxxxx'
 * ```
 */
export function repeat(str: string, count: number): string {
  if (count < 0) throw new Error('Count must be a non-negative number')
  return str.repeat(count)
}
