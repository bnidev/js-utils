/**
 * Parses a query string into an object.
 *
 * Repeated keys are collected into arrays. Accepts the string with or
 * without a leading `?`.
 *
 * @param query - A query string such as `'a=1&b=2'` or `'?a=1&b=2'`.
 *
 * @returns An object mapping keys to decoded values (or arrays of values
 * for repeated keys). Returns `{}` for empty or invalid input.
 *
 * @category Url
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { parseQueryString } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { parseQueryString } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * parseQueryString('a=1&b=2') // { a: '1', b: '2' }
 * parseQueryString('?a=1&a=2') // { a: ['1', '2'] }
 * parseQueryString('') // {}
 * ```
 */
export function parseQueryString(
  query: string
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {}
  if (typeof query !== 'string') return result
  const search = query.startsWith('?') ? query.slice(1) : query
  if (search === '') return result

  const params = new URLSearchParams(search)
  params.forEach((value, key) => {
    const existing = result[key]
    if (existing === undefined) {
      result[key] = value
    } else if (Array.isArray(existing)) {
      existing.push(value)
    } else {
      result[key] = [existing, value]
    }
  })
  return result
}
