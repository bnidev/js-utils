import { describe, expect, it } from 'vitest'
import { inRange } from '../inRange'

describe('inRange', () => {
  it('returns true for values inside the range', () => {
    expect(inRange(5, 0, 10)).toBe(true)
  })

  it('treats the bounds as inclusive', () => {
    expect(inRange(0, 0, 10)).toBe(true)
    expect(inRange(10, 0, 10)).toBe(true)
  })

  it('returns false for values outside the range', () => {
    expect(inRange(-1, 0, 10)).toBe(false)
    expect(inRange(11, 0, 10)).toBe(false)
  })

  it('throws when min is greater than max', () => {
    expect(() => inRange(5, 10, 0)).toThrow(
      'Min must be less than or equal to max'
    )
  })

  it('throws a TypeError for non-number inputs', () => {
    // @ts-expect-error testing invalid input
    expect(() => inRange('5', 0, 10)).toThrow(TypeError)
  })
})
