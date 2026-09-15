/**
 * Adds, updates, or removes a query parameter in a URL.
 *
 * Pass `null` as the value to remove the key. When `url` is omitted, the
 * live page URL is updated in place via `history.replaceState` (no reload,
 * no new history entry).
 *
 * @param key - The query parameter name.
 * @param value - The new value, or `null` to remove the parameter.
 * @param url - An absolute URL to update as a pure string operation.
 * Defaults to the live page URL (which is also written back to history).
 *
 * @returns The updated URL string, or `null` when the URL is unparseable
 * or there is no `window` (SSR) with no `url` given.
 *
 * @category Url
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { updateQueryParam } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { updateQueryParam } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * updateQueryParam('page', '2', 'https://example.com/list')
 * // 'https://example.com/list?page=2'
 *
 * updateQueryParam('page', null, 'https://example.com/?page=2&sort=asc')
 * // 'https://example.com/?sort=asc'
 *
 * updateQueryParam('page', '2') // updates window.location via replaceState
 * ```
 */
export function updateQueryParam(
  key: string,
  value: string | null,
  url?: string
): string | null {
  const isLive = url === undefined
  try {
    const href =
      url ?? (typeof window === 'undefined' ? null : window.location.href)
    if (typeof href !== 'string') return null

    const parsed = new URL(href)
    if (value === null) {
      parsed.searchParams.delete(key)
    } else {
      parsed.searchParams.set(key, value)
    }
    const updated = parsed.toString()

    if (
      isLive &&
      typeof window !== 'undefined' &&
      typeof window.history !== 'undefined'
    ) {
      window.history.replaceState(null, '', updated)
    }
    return updated
  } catch {
    return null
  }
}
