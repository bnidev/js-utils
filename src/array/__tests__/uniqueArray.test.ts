import { describe, expect, it } from 'vitest'
import { uniqueArray } from '../uniqueArray'

describe('uniqueArray', () => {
  it('removes duplicates and returns unique elements', () => {
    const input = [1, 2, 2, 3, 4, 4, 5]
    const result = uniqueArray(input)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('returns the same array if all elements are unique', () => {
    const input = [1, 2, 3, 4, 5]
    const result = uniqueArray(input)
    expect(result).toEqual(input)
  })

  it('works with strings', () => {
    const input = ['a', 'b', 'a', 'c', 'b']
    const result = uniqueArray(input)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('works with empty arrays', () => {
    const input: number[] = []
    const result = uniqueArray(input)
    expect(result).toEqual([])
  })

  it('preserves order of first occurrence', () => {
    const input = [3, 1, 2, 3, 2, 1]
    const result = uniqueArray(input)
    expect(result).toEqual([3, 1, 2])
  })
})
