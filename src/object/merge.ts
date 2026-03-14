type FlatObject = Record<string, unknown>
type MergeSource = FlatObject | null | undefined

/**
 * Deeply merges multiple objects into a single object.
 *
 * @template T - The type of the objects to merge.
 *
 * @param sources - An array of objects to merge. Later sources override earlier ones.
 *
 * @returns A new object with all properties merged.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { merge } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { merge } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const obj1 = { a: 1, b: { c: 2 } }
 * const obj2 = { b: { d: 3 }, e: 4 }
 * const result = merge(obj1, obj2)
 * // result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 */
export function merge(...sources: MergeSource[]): FlatObject {
  const result: FlatObject = {}

  for (const source of sources) {
    if (!source || typeof source !== 'object') continue

    for (const key of Object.keys(source)) {
      const sourceValue = source[key]
      const resultValue = result[key]

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        resultValue &&
        typeof resultValue === 'object' &&
        !Array.isArray(resultValue)
      ) {
        const sourceObj = sourceValue as FlatObject
        const resultObj = resultValue as FlatObject
        result[key] = merge(resultObj, sourceObj)
      } else {
        result[key] = sourceValue
      }
    }
  }

  return result
}
