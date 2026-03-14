/**
 * Fills in default values from source into target object.
 *
 * @template T - The type of the target object.
 * @template S - The type of the source object.
 *
 * @param target - The target object to apply defaults to.
 * @param source - The source object containing default values.
 *
 * @returns A new object with defaults applied.
 *
 * @category Object
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { defaults } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { defaults } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const config = { timeout: 100 }
 * const defaultValues = { timeout: 5000, retries: 3 }
 * const result = defaults(config, defaultValues)
 * // result: { timeout: 100, retries: 3 }
 * ```
 */
export function defaults<
  T extends Record<string, unknown>,
  S extends Record<string, unknown>
>(target: T, source: S): T & S {
  const result: Record<string, unknown> = { ...target }

  for (const key of Object.keys(source)) {
    if (!(key in result)) {
      result[key] = source[key]
    }
  }

  return result as T & S
}
