/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert.
 *
 * @returns The string in kebab-case format.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { kebabCase } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { kebabCase } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello world') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 * ```
 */
export function kebabCase(str: string): string {
  return str
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .toLowerCase()
}
