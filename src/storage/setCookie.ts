/**
 * Sets a cookie with the given name, value, and optional attributes.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param days - Number of days until expiration.
 * @param path - The path for the cookie.
 *
 * @category Storage
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { setCookie } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { setCookie } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * setCookie('session', 'abc123', 7, '/')
 * setCookie('preferences', 'dark', 30)
 * ```
 */
export function setCookie(
  name: string,
  value: string,
  days?: number,
  path = '/'
): void {
  if (typeof document === 'undefined') return

  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`
}
