/**
 * Gets the value of a query parameter from a URL.
 *
 * Returns the first value when a key is repeated. When `url` is omitted,
 * reads the live `window.location.href` instead.
 *
 * @param key - The query parameter name to look up.
 * @param url - An absolute URL to read from. Defaults to the live page URL.
 *
 * @returns The decoded parameter value, or `null` when the key is missing,
 * the URL is unparseable, or there is no `window` (SSR) with no `url` given.
 *
 * @category Url
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getQueryParam } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getQueryParam } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * getQueryParam('page', 'https://example.com/?page=2') // '2'
 * getQueryParam('missing', 'https://example.com/?page=2') // null
 * getQueryParam('page') // reads window.location.href
 * ```
 */
export function getQueryParam(key: string, url?: string): string | null {
  try {
    const href =
      url ?? (typeof window === 'undefined' ? null : window.location.href)
    if (typeof href !== 'string') return null
    return new URL(href).searchParams.get(key)
  } catch {
    return null
  }
}
