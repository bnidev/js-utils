import { describe, expect, it } from 'vitest'
import { isEmail } from '../isEmail'

describe('isEmail', () => {
  it('returns true for valid email addresses', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('user.name+tag+sorting@example.co.uk')).toBe(true)
    expect(isEmail('user_name@example.io')).toBe(true)
  })

  it('returns false for invalid email addresses', () => {
    expect(isEmail('plainaddress')).toBe(false)
    expect(isEmail('@missingusername.com')).toBe(false)
    expect(isEmail('username@.com')).toBe(false)
    expect(isEmail('username@com')).toBe(false)
    expect(isEmail('username@site..com')).toBe(false)
  })

  it('returns false for emails starting or ending with a dot', () => {
    expect(isEmail('.username@example.com')).toBe(false)
    expect(isEmail('username.@example.com')).toBe(false)
    expect(isEmail('username@example.com.')).toBe(false)
    expect(isEmail('.username.@example.com')).toBe(false)
  })

  it('returns false for emails containing consecutive dots', () => {
    expect(isEmail('user..name@example.com')).toBe(false)
    expect(isEmail('username@site..com')).toBe(false)
  })

  it('returns false for emails exceeding 254 characters', () => {
    const localPart = 'a'.repeat(64)
    const domainPart = `${'b'.repeat(189)}.com`
    const longEmail = `${localPart}@${domainPart}`
    expect(longEmail.length).toBeGreaterThan(254)
    expect(isEmail(longEmail)).toBe(false)
  })

  it('returns false for empty string or non-string inputs', () => {
    expect(isEmail('')).toBe(false)
    // @ts-expect-error testing invalid input
    expect(isEmail(null)).toBe(false)
    // @ts-expect-error testing invalid input
    expect(isEmail(undefined)).toBe(false)
  })
})
