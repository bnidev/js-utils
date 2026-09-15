import { describe, expect, it } from 'vitest'
import { lerp } from '../lerp'

describe('lerp', () => {
  it('returns start when t is 0', () => {
    expect(lerp(0, 10, 0)).toBe(0)
  })

  it('returns end when t is 1', () => {
    expect(lerp(0, 10, 1)).toBe(10)
  })

  it('interpolates midway values', () => {
    expect(lerp(0, 10, 0.5)).toBe(5)
    expect(lerp(10, 20, 0.25)).toBe(12.5)
  })

  it('extrapolates outside [0, 1] without clamping', () => {
    expect(lerp(0, 10, 2)).toBe(20)
    expect(lerp(0, 10, -1)).toBe(-10)
  })

  it('throws a TypeError for non-number inputs', () => {
    // @ts-expect-error testing invalid input
    expect(() => lerp('0', 10, 0.5)).toThrow(TypeError)
    // @ts-expect-error testing invalid input
    expect(() => lerp(0, 10, null)).toThrow(TypeError)
  })
})
