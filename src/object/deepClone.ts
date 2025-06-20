/**
 * Creates a deep clone of the provided value.
 *
 * Recursively copies all properties of objects and elements of arrays,
 * ensuring that nested objects and arrays are also cloned.
 * Primitives are returned as-is.
 *
 * @typeParam T - The type of the value to clone.
 * @param obj - The value to deep clone (object, array, or primitive).
 * @returns A deep clone of the input value.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { deepClone } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { deepClone } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(original)
 * console.log(cloned) // Output: { a: 1, b: { c: 2 } }
 *
 * // Modifying the clone does not affect the original
 * cloned.b.c = 3
 * console.log(original.b.c); // Output: 2
 * ```
 */

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }

  const clonedObj = {} as { [K in keyof T]: T[K] }
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key]
      clonedObj[key] = deepClone(value)
    }
  }
  return clonedObj
}
