/**
 * Checks if a string is a valid email address.
 *
 * @param email - The string to validate as an email.
 * @returns `true` if valid email format, otherwise `false`.
 *
 * @category Validation
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { isEmail } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isEmail } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * isEmail('user@example.com') // true
 * isEmail('invalid-email') // false
 * isEmail('user@.com') // false
 * ```
 */
export function isEmail(email: string): boolean {
  if (typeof email !== 'string') return false

  if (email.length === 0) return false
  if (email.length > 254) return false

  if (email.startsWith('.') || email.endsWith('.')) return false

  if (email.includes('..')) return false

  const [local, domain] = email.split('@')
  if (!local || !domain) return false

  if (local.startsWith('.') || local.endsWith('.')) return false
  if (domain.startsWith('.') || domain.endsWith('.')) return false

  const emailRegex = /^[^\s@]+@([^\s@.]+\.)+[^\s@.]{2,}$/

  return emailRegex.test(email)
}
