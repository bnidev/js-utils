/**
 * Gets a value from localStorage and parses it as JSON.
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
 * @param key - The key to retrieve.
 * @param defaultValue - Default value if key doesn't exist.
 *
 * @returns The parsed value or default.
 *
 * @category Storage
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getStorage } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getStorage } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * getStorage('user') // { name: 'Alice' }
 * getStorage('nonexistent', 'default') // 'default'
 * ```
 */
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  if (typeof localStorage === 'undefined') return defaultValue ?? null

  const item = localStorage.getItem(key)
  if (!item) return defaultValue ?? null

  try {
    return JSON.parse(item) as T
  } catch {
    return defaultValue ?? null
  }
}
