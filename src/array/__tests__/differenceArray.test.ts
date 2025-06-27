import { describe, expect, it } from 'vitest'
import { differenceArray } from '../differenceArray'

describe('differenceArray', () => {
  it('returns the correct difference', () => {
    expect(differenceArray([1, 2, 3], [2])).toEqual([1, 3])
    expect(differenceArray(['a', 'b', 'c'], ['c'])).toEqual(['a', 'b'])
    expect(differenceArray([true, false], [false])).toEqual([true])
    expect(differenceArray([], [1, 2])).toEqual([])
    expect(differenceArray([1, 2], [])).toEqual([1, 2])
  })
})
