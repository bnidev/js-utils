import { describe, expect, it } from 'vitest'
import { randomInt } from '../randomInt'

describe('randomInt', () => {
  it('returns min when the range is a single value', () => {
    expect(randomInt(5, 5)).toBe(5)
  })

  it('always returns integers within the inclusive range', () => {
    for (let i = 0; i < 1000; i++) {
      const value = randomInt(1, 10)
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(1)
      expect(value).toBeLessThanOrEqual(10)
    }
  })

  it('covers both endpoints over many runs', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 1000; i++) seen.add(randomInt(1, 2))
    expect(seen.has(1)).toBe(true)
    expect(seen.has(2)).toBe(true)
  })

  it('rounds non-integer bounds inward', () => {
    for (let i = 0; i < 200; i++) {
      const value = randomInt(1.2, 5.8)
      expect(value).toBeGreaterThanOrEqual(2)
      expect(value).toBeLessThanOrEqual(5)
    }
  })

  it('throws when no integer fits the range', () => {
    expect(() => randomInt(10, 0)).toThrow(
      'Min must be less than or equal to max'
    )
    expect(() => randomInt(1.2, 1.8)).toThrow('Range contains no integer')
  })

  it('throws a TypeError for non-number inputs', () => {
    // @ts-expect-error testing invalid input
    expect(() => randomInt('1', 10)).toThrow(TypeError)
  })
})
