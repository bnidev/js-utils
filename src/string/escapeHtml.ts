/**
 * Escapes special HTML characters in a string to their corresponding HTML entities.
 *
 * This prevents HTML injection by replacing characters like `<`, `>`, `&`, `"`, and `'`
 * with their safe HTML entity equivalents, so the string can be safely inserted into HTML
 * without being interpreted as markup.
 *
 * @param html - The input string that may contain HTML special characters.
 * @returns A string with HTML characters escaped.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * import { escapeHtml } from '@bnidev/js-utils'
 * ```
 *
 * @example Usage
 * ```ts
 * const unsafe = '<div class="test">Hello & welcome!</div>'
 * const safe = escapeHtml(unsafe)
 * // safe: '&lt;div class=&quot;test&quot;&gt;Hello &amp; welcome!&lt;/div&gt;'
 * ```
 */
export function escapeHtml(html: string): string {
  return html.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      default:
        // This should never happen because of the regex, but included for safety
        throw new Error(`Unexpected character: ${char}`)
    }
  })
}
