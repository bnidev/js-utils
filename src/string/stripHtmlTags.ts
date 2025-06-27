/**
 * Removes all HTML tags from a string, returning plain text.
 *
 * @param html - The input string containing HTML.
 * @returns The string without HTML tags.
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
 * stripHtml('<p>Hello <strong>World</strong></p>') // → 'Hello World'
 * ```
 */
export function stripHtmlTags(html: string): string {
  if (!html) return ''
  // Simple regex to remove anything between < and >
  return html.replace(/<[^>]*>/g, '')
}
