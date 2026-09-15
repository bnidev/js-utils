import { describe, expect, it } from 'vitest'
import { clamp } from '../clamp'

describe('clamp', () => {
  it('returns the value when inside the range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('returns min when the value is below the range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('returns max when the value is above the range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('treats the bounds as inclusive', () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('throws when min is greater than max', () => {
    expect(() => clamp(5, 10, 0)).toThrow(
      'Min must be less than or equal to max'
    )
  })

  it('throws a TypeError for non-number inputs', () => {
    // @ts-expect-error testing invalid input
    expect(() => clamp('5', 0, 10)).toThrow(TypeError)
    // @ts-expect-error testing invalid input
    expect(() => clamp(5, null, 10)).toThrow(TypeError)
  })
})
