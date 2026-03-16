import { describe, expect, it } from 'vitest'
import { isValidDate } from '../isValidDate'

describe('isValidDate', () => {
  it('should return true for valid Date object', () => {
    expect(isValidDate(new Date())).toBe(true)
  })

  it('should return true for valid date string', () => {
    expect(isValidDate('2024-03-15')).toBe(true)
  })

  it('should return true for valid timestamp', () => {
    expect(isValidDate(1234567890000)).toBe(true)
  })

  it('should return false for invalid date string', () => {
    expect(isValidDate('invalid')).toBe(false)
  })

  it('should return false for null', () => {
    expect(isValidDate(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isValidDate(undefined)).toBe(false)
  })

  it('should return false for object', () => {
    expect(isValidDate({})).toBe(false)
  })
})
