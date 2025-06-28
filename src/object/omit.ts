/**
 * Creates a shallow copy of an object without the specified keys.
 *
 * @param obj - The source object to copy from.
 * @param keys - An array of keys to omit from the copied object.
 * @returns A new object with the specified keys omitted.
 *
 * @remarks
 * This utility is useful for creating a new object that excludes certain properties, such as when you want to remove sensitive information or unnecessary data before sending it over a network or storing it.
 * It can help maintain immutability by not modifying the original object.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { omit } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { omit } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Original object
 * const user = {
 *  id: 1,
 *  name: 'John Doe',
 *  email: 'johndoe@example.com'
 * }
 *
 * // Omit the 'email' property
 * const userWithoutEmail = omit(user, ['email'])
 * // userWithoutEmail will be { id: 1, name: 'John Doe' }
 */

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const clone = { ...obj }
  for (const key of keys) {
    delete clone[key]
  }
  return clone
}
