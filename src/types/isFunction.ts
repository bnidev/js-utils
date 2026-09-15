/**
 * Checks if a value is a callable function.
 *
 * Covers regular functions, arrow functions, async functions, generator
 * functions, and classes (which are `typeof 'function'`).
 *
 * @param value - The value to check.
 *
 * @returns `true` if the value is a function, `false` otherwise.
 *
 * @category Types
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isFunction } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isFunction } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isFunction(() => {}) // true
 * isFunction(async () => {}) // true
 * isFunction(class Foo {}) // true
 * isFunction({}) // false
 * ```
 */
export function isFunction(
  value: unknown
): value is (...args: never[]) => unknown {
  return typeof value === 'function'
}
