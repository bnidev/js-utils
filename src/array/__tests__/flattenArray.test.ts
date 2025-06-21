import { describe, expect, it } from 'vitest'
import { flattenArray } from '../flattenArray'

describe('flattenArray', () => {
  it('should flatten a nested array', () => {
    const input = [1, [2, [3, 4], 5], 6]
    const expected = [1, 2, 3, 4, 5, 6]
    expect(flattenArray(input)).toEqual(expected)
  })

  it('should return an empty array when input is empty', () => {
    expect(flattenArray([])).toEqual([])
  })

  it('should handle arrays with no nested elements', () => {
    const input = [1, 2, 3]
    expect(flattenArray(input)).toEqual(input)
  })

  it('should handle deeply nested arrays', () => {
    const input = [1, [2, [3, [4, [5]]]]]
    const expected = [1, 2, 3, 4, 5]
    expect(flattenArray(input)).toEqual(expected)
  })
})
