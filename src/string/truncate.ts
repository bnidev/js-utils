/**
 * Truncates a string to a specified maximum length and appends a suffix if truncated.
 *
 * @param str - The string to truncate.
 * @param maxLength - Maximum length of the truncated string including suffix.
 * @param suffix - String to append after truncation (default: '...').
 * @returns The truncated string with suffix if truncated, otherwise the original string.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { truncate } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { truncate } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * truncate('Hello World', 8) // → 'Hello...'
 * truncate('Hello', 10) // → 'Hello'
 * truncate('Hello World', 5, '~~') // → 'Hel~~'
 * ```
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix = '...'
): string {
  if (str.length <= maxLength) return str

  if (maxLength <= suffix.length) {
    // If maxLength is less than suffix length, just slice the string
    return str.slice(0, maxLength)
  }

  return str.slice(0, maxLength - suffix.length) + suffix
}
