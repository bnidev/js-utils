import { describe, expect, it } from 'vitest'
import { isNil } from '../isNil'

describe('isNil', () => {
  it('returns true for null', () => {
    expect(isNil(null)).toBe(true)
  })

  it('returns true for undefined', () => {
    expect(isNil(undefined)).toBe(true)
    expect(isNil(void 0)).toBe(true)
  })

  it('returns false for falsy non-nil values', () => {
    expect(isNil(0)).toBe(false)
    expect(isNil('')).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil(NaN)).toBe(false)
  })

  it('returns false for objects and other values', () => {
    expect(isNil({})).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil('hello')).toBe(false)
    expect(isNil(42)).toBe(false)
  })
})
