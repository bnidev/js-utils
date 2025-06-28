/**
 * Retrieves a nested value from an object using a dot-separated path.
 * If the value is undefined or null, it returns the provided fallback value.
 *
 * @param obj - The object to retrieve the value from.
 * @param path - The dot-separated path to the nested value.
 * @param fallback - The value to return if the nested value is undefined or null.
 * @returns The nested value or the fallback value if not found.
 *
 * @remarks
 * This utility is useful for safely accessing deeply nested properties in objects without having to check each level for existence. It can help avoid runtime errors when trying to access properties that may not exist.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getNestedValue } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getNestedValue } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const data = {
 *   user: {
 *     profile: {
 *       name: 'John Doe',
 *       age: 30,
 *       address: null
 *     }
 *   }
 * }
 *
 * // With fallback provided:
 * const name = getNestedValue(data, 'user.profile.name', 'Unknown')
 * console.log(name) // Output: 'John Doe'
 *
 * const address = getNestedValue(data, 'user.profile.address', 'No address provided')
 * console.log(address) // Output: 'No address provided' (because address is null)
 *
 * const phone = getNestedValue(data, 'user.profile.phone', 'No phone number')
 * console.log(phone) // Output: 'No phone number' (property doesn't exist)
 *
 * // Without fallback:
 * const age = getNestedValue(data, 'user.profile.age')
 * console.log(age) // Output: 30
 *
 * const email = getNestedValue(data, 'user.profile.email')
 * console.log(email) // Output: undefined (property doesn't exist, no fallback)
 *
 */
export function getNestedValue<T, R = unknown>(
  obj: T,
  path: string,
  fallback?: R
): R | unknown {
  if (!path) return obj

  const result = path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)

  return result === undefined || result === null ? fallback : result
}
