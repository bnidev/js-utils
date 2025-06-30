/**
 * Removes all HTML tags from a string, returning plain text.
 *
 * Applies the tag-stripping regular expression in a loop to handle nested or malformed tags safely. To mitigate potential performance risks from ambiguous regular expressions (e.g. catastrophic backtracking), the function enforces a maximum input length.
 *
 * @param html - The input string that may contain HTML.
 * @param maxLength - Maximum allowed input length. Defaults to 1000 characters.
 * Throws an error if the input exceeds this limit.
 *
 * @returns The plain text string with all HTML tags removed.
 *
 * @throws If the input exceeds the maximum allowed length.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { stripHtmlTags } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { stripHtmlTags } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * stripHtmlTags('<p>Hello <strong>World</strong></p>')
 * // → 'Hello World'
 * ```
 */
export function stripHtmlTags(html: string, maxLength = 1000): string {
  if (!html) return ''
  if (html.length > maxLength) {
    throw new Error(`Input too long (max ${maxLength} characters)`)
  }

  let prev: string
  let current = html

  do {
    prev = current
    current = current.replace(/<[^<>]*>/g, '')
  } while (current !== prev)

  return current
}
