import { describe, expect, it } from 'vitest'
import { pointInCircle } from '../pointInCircle'

describe('pointInCircle', () => {
  it('returns true for a point inside the circle', () => {
    expect(pointInCircle(1, 1, 0, 0, 2)).toBe(true)
  })

  it('returns true for a point on the boundary of the circle', () => {
    expect(pointInCircle(2, 0, 0, 0, 2)).toBe(true)
  })

  it('returns false for a point outside the circle', () => {
    expect(pointInCircle(3, 0, 0, 0, 2)).toBe(false)
  })

  it('works with negative coordinates', () => {
    expect(pointInCircle(-1, -1, 0, 0, 2)).toBe(true)
    expect(pointInCircle(-3, 0, 0, 0, 2)).toBe(false)
  })

  it('throws if any parameter is missing', () => {
    // @ts-expect-error
    expect(() => pointInCircle(1, 1, 0, 0)).toThrow(TypeError)
  })

  it('throws if any parameter is not a number', () => {
    // @ts-expect-error
    expect(() => pointInCircle('a', 1, 0, 0, 2)).toThrow(TypeError)
  })
})
