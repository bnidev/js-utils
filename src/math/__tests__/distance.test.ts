import { describe, expect, it } from 'vitest'
import { distance } from '../distance'

describe('distance', () => {
  it('calculates distance between (0,0) and (3,4)', () => {
    expect(distance(0, 0, 3, 4)).toBe(5)
  })

  it('returns 0 for the same point', () => {
    expect(distance(1, 1, 1, 1)).toBe(0)
  })

  it('calculates distance with negative coordinates', () => {
    expect(distance(-1, -1, 2, 3)).toBe(5)
  })

  it('calculates distance for horizontal line', () => {
    expect(distance(2, 5, 7, 5)).toBe(5)
  })

  it('calculates distance for vertical line', () => {
    expect(distance(3, 2, 3, 7)).toBe(5)
  })
})
