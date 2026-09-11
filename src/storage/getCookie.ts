/**
 * Gets a cookie value by name.
 *
 * ### Cookie Storage Characteristics
 *
 * Cookies are lightweight, client-side browser storage structures transferred with HTTP requests.
 * Under this library, they are URL-encoded (`encodeURIComponent`/`decodeURIComponent`), limited
 * to ~4KB, and return `null` on failure.
 *
 * For a detailed comparison between standard `localStorage` and `cookie` transport options (including
 * capacity, serialization codecs, and fallback modes), see the comparison table in `getStorage`.
 *
 * @param name - The name of the cookie.
 *
 * @returns The cookie value, or `null` if not found.
 *
 * @category Storage
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getCookie } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getCookie } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * getCookie('session') // 'abc123'
 * getCookie('nonexistent') // null
 * ```
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const match = new RegExp(`(^| )${name}=([^;]+)`).exec(document.cookie)
  if (!match) return null

  const value = match[2]
  return value ? decodeURIComponent(value) : null
}
