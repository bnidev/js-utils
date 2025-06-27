/**
 * Maps the values of an object to a new value based on a provided function.
 *
 * @param obj - The object whose values are to be mapped.
 * @param fn - A function that takes a value and its key, and returns a new value.
 * @returns A new object with the same keys but with values transformed by the function.
 *
 * @remarks
 * This utility is useful for transforming the values of an object without modifying the original object. It iterates over each key-value pair in the object and applies the provided function to generate a new value.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { mapValues } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { mapValues } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Map the values of an object to their lengths
 * const obj = { a: 'apple', b: 'banana', c: 'cherry' }
 * const lengths = mapValues(obj, (value, key) => value.length)
 * // lengths will be { a: 5, b: 6, c: 6 }
 *
 * // Map the values of an object to uppercase strings
 * const mixedObj = { x: 'hello', y: 'world' }
 * const uppercased = mapValues(mixedObj, (value, key) => value.toUpperCase())
 * // uppercased will be { x: 'HELLO', y: 'WORLD' }
 * ```
 */
export function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): { [K in keyof T]: U } {
  const result = {} as { [K in keyof T]: U }
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = fn(obj[key], key)
    }
  }
  return result
}
