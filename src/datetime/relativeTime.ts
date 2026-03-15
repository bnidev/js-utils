/**
 * Converts a date to a relative time string (e.g., "2 hours ago").
 *
 * @param date - The date to convert.
 *
 * @returns A relative time string.
 *
 * @category DateTime
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { relativeTime } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { relativeTime } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const date = new Date(Date.now() - 3600000) // 1 hour ago
 * relativeTime(date) // '1 hour ago'
 * ```
 */
export function relativeTime(date: Date): string {
  const now = Date.now()
  const timestamp = date.getTime()
  const diff = now - timestamp

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'just now'
  if (minutes === 1) return '1 minute ago'
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  if (years === 1) return '1 year ago'
  return `${years} years ago`
}
