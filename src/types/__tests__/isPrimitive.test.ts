import { describe, expect, it } from 'vitest'
import { isPrimitive } from '../isPrimitive'

describe('isPrimitive', () => {
  it('returns true for string primitives', () => {
    expect(isPrimitive('hello')).toBe(true)
    expect(isPrimitive('')).toBe(true)
  })

  it('returns true for number primitives', () => {
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive(0)).toBe(true)
    expect(isPrimitive(NaN)).toBe(true)
  })

  it('returns true for boolean primitives', () => {
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(false)).toBe(true)
  })

  it('returns true for symbol and bigint primitives', () => {
    expect(isPrimitive(Symbol('sym'))).toBe(true)
    expect(isPrimitive(10n)).toBe(true)
  })

  it('returns true for null and undefined', () => {
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
  })

  it('returns false for objects and arrays', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive({ a: 1 })).toBe(false)
    expect(isPrimitive([])).toBe(false)
  })

  it('returns false for functions and built-ins', () => {
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(/regex/)).toBe(false)
  })
})
