import { describe, expect, it } from 'vitest'
import { intersectionArray } from '../intersectionArray'

describe('intersectionArray', () => {
  it('returns common elements in both arrays', () => {
    expect(intersectionArray([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })

  it('returns an empty array if there are no common elements', () => {
    expect(intersectionArray(['a', 'b'], ['x', 'y'])).toEqual([])
  })

  it('handles empty arrays', () => {
    expect(intersectionArray([], [1, 2, 3])).toEqual([])
    expect(intersectionArray([1, 2, 3], [])).toEqual([])
    expect(intersectionArray([], [])).toEqual([])
  })

  it('removes duplicates in result if present in input', () => {
    expect(intersectionArray([1, 2, 2, 3], [2, 3, 3])).toEqual([2, 2, 3])
  })

  it('works with mixed types', () => {
    expect(intersectionArray(['a', 2, true], [true, 'b', 2])).toEqual([2, true])
  })
})
