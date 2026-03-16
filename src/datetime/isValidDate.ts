/**
 * Validates if a value is a valid date.
 *
 * @param value - The value to validate.
 *
 * @returns `true` if the value is a valid date, `false` otherwise.
 *
 * @category DateTime
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isValidDate } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isValidDate } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isValidDate(new Date()) // true
 * isValidDate('2024-03-15') // true
 * isValidDate('invalid') // false
 * isValidDate(1234567890) // true (timestamp)
 * ```
 */
export function isValidDate(value: unknown): boolean {
  if (value instanceof Date) return !Number.isNaN(value.getTime())
  if (typeof value === 'number') return value > 0
  if (typeof value === 'string') {
    const date = new Date(value)
    return !Number.isNaN(date.getTime())
  }
  return false
}
