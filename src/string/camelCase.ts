/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert.
 *
 * @returns The string in camelCase format.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { camelCase } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { camelCase } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  return str
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replaceAll(/^(.)/g, (char) => char.toLowerCase())
}
