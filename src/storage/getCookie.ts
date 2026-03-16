/**
 * Gets a cookie value by name.
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

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  if (!match) return null

  const value = match[2]
  return value ? decodeURIComponent(value) : null
}
