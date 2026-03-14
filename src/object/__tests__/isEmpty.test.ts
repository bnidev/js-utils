import { describe, expect, it } from 'vitest'
import { isEmpty } from '../isEmpty'

describe('isEmpty', () => {
  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return false for non-empty object', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2])).toBe(false)
  })

  it('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false)
  })
})
