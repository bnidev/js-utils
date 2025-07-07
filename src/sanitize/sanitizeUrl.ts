/**
 * Sanitizes a URL string by validating its syntax and protocol.
 *
 * Ensures the input is a valid URL and the protocol is included in the allowed list.
 * By default, allows only `http:`, `https:`, and `ftp:` protocols for safety.
 * Users can override or extend the allowed protocols via options.
 *
 * @param input - The input string to sanitize as a URL.
 * @param options - Optional settings to customize behavior.
 * @param options.allowedProtocols - Array of allowed URL protocols (including colon).
 *   Defaults to ['http:', 'https:', 'ftp:'].
 * @param options.normalize - If true (default), returns a normalized URL string.
 *   If false, returns the original input string when valid.
 *
 * @returns An object indicating success, sanitized value, and optional error.
 *
 * @category Sanitize
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { sanitizeUrl } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { sanitizeUrl } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * sanitizeUrl('https://example.com')
 * // → { success: true, value: 'https://example.com/' }
 *
 * sanitizeUrl('mailto:user@example.com')
 * // → { success: false, value: null, error: Error('Disallowed protocol: mailto:') }
 *
 * sanitizeUrl('mailto:user@example.com', { allowedProtocols: ['mailto:'] })
 * // → { success: true, value: 'mailto:user@example.com' }
 *
 * sanitizeUrl('invalid-url')
 * // → { success: false, value: null, error: Error('Invalid URL') }
 * ```
 */
export function sanitizeUrl(
  input: string,
  options: {
    allowedProtocols?: string[]
    normalize?: boolean
  } = {}
): { success: boolean; value: string | null; error?: Error } {
  const { allowedProtocols = ['http:', 'https:', 'ftp:'], normalize = true } =
    options

  try {
    const url = new URL(input)

    if (!allowedProtocols.includes(url.protocol)) {
      return {
        success: false,
        value: null,
        error: new Error(`Disallowed protocol: ${url.protocol}`)
      }
    }

    return {
      success: true,
      value: normalize ? url.toString() : input
    }
  } catch (err) {
    return {
      success: false,
      value: null,
      error: err instanceof Error ? err : new Error('Invalid URL')
    }
  }
}
