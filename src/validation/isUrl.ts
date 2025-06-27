/**
 * Checks if a string is a valid URL.
 *
 * @param url - The string to validate as a URL.
 * @returns `true` if valid URL format, otherwise `false`.
 *
 * @category Validation
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isUrl } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isUrl } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isUrl('https://example.com') // true
 * isUrl('ftp://example.com/file') // true
 * isUrl('invalid-url') // false
 * ```
 */
export function isUrl(url: string): boolean {
  if (typeof url !== 'string') return false

  try {
    const parsed = new URL(url)

    // Protocol must be one of these
    if (!['http:', 'https:', 'ftp:'].includes(parsed.protocol)) return false

    // Hostname must not be empty
    if (!parsed.hostname) return false

    // Basic sanity check: url must contain "//" after protocol (e.g., http://)
    if (!url.match(/^[a-zA-Z]+:\/\/.+/)) return false

    return true
  } catch {
    return false
  }
}
