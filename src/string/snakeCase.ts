/**
 * Converts a string to snake_case.
 *
 * @param str - The string to convert.
 *
 * @returns The string in snake_case format.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { snakeCase } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { snakeCase } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello world') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
}
