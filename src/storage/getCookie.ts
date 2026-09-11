/**
 * Gets a cookie value by name.
 *
 * ### Codec & Storage Comparison
 *
 * | Feature | `getStorage` / `setStorage` | `getCookie` / `setCookie` |
 * | :--- | :--- | :--- |
 * | **Scope** | Domain-wide origin persistence | Client-side cookie transport |
 * | **Capacity** | ~5MB (browser limit) | ~4KB per cookie |
 * | **Codec** | JSON-serialized (`JSON.parse` / `JSON.stringify`) | URL-encoded (`encodeURIComponent` / `decodeURIComponent`) |
 * | **Empty values** | Encoded as `"null"` or empty JSON | Empty string or missing cookie |
 * | **Failure modes** | Returns fallback on corrupt JSON or missing `localStorage` | Returns `null` on missing `document` or missing cookie |
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
