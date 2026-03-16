/**
 * Gets a value from localStorage and parses it as JSON.
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
