/**
 * Sets a value in localStorage, JSON-serialized.
 *
 * @param key - The key to store.
 * @param value - The value to store.
 *
 * @category Storage
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { setStorage } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { setStorage } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * setStorage('user', { name: 'Alice' })
 * setStorage('count', 42)
 * ```
 */
export function setStorage<T>(key: string, value: T): void {
  if (typeof localStorage === 'undefined') return

  localStorage.setItem(key, JSON.stringify(value))
}
