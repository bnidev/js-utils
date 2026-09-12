/**
 * A single query string parameter value.
 */
export type QueryParamValue =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[]
  | null
  | undefined

/**
 * Converts an object into a query string (without a leading `?`).
 *
 * Arrays expand into repeated keys. `null` and `undefined` values are
 * skipped. The output round-trips through {@link parseQueryString}.
 *
 * @param params - An object mapping keys to scalar or array values.
 *
 * @returns A `URLSearchParams`-encoded query string, or `''` for empty
 * or invalid input.
 *
 * @category Url
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { stringifyQueryString } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { stringifyQueryString } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * stringifyQueryString({ a: '1', b: '2' }) // 'a=1&b=2'
 * stringifyQueryString({ a: ['1', '2'] }) // 'a=1&a=2'
 * stringifyQueryString({}) // ''
 * ```
 */
export function stringifyQueryString(
  params: Record<string, QueryParamValue>
): string {
  if (typeof params !== 'object' || params === null) return ''

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue
    if (Array.isArray(value)) {
      for (const item of value) search.append(key, String(item))
    } else {
      search.append(key, String(value))
    }
  }
  return search.toString()
}
