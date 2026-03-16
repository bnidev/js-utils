/**
 * Formats a date according to a pattern string.
 *
 * @param date - The date to format.
 * @param pattern - The format pattern (YYYY=year, MM=month, DD=day, HH=hour, mm=minute, ss=second).
 *
 * @returns The formatted date string.
 *
 * @category DateTime
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { formatDate } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { formatDate } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const date = new Date('2024-03-15T14:30:00')
 * formatDate(date, 'YYYY-MM-DD') // '2024-03-15'
 * formatDate(date, 'DD/MM/YYYY') // '15/03/2024'
 * formatDate(date, 'HH:mm') // '14:30'
 * ```
 */
export function formatDate(date: Date, pattern: string): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return pattern
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}
