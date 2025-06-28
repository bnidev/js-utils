/**
 * Capitalizes the first character of a string.
 *
 * @param str - The input string to capitalize.
 * @returns The capitalized string.
 *
 * @remarks
 * If the input is an empty string, it returns the empty string.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { capitalize } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { capitalize } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * capitalize('hello') // → 'Hello'
 * capitalize('Hello') // → 'Hello'
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
