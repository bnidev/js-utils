import { describe, expect, it } from 'vitest'
import { chunkArray } from '../chunkArray'

describe('chunkArray', () => {
  it('chunks an array evenly', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const result = chunkArray(input, 2)
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6]
    ])
  })

  it('chunks an array with a final smaller chunk if not evenly divisible', () => {
    const input = [1, 2, 3, 4, 5]
    const result = chunkArray(input, 2)
    expect(result).toEqual([[1, 2], [3, 4], [5]])
  })

  it('returns empty array when input is empty', () => {
    expect(chunkArray([], 3)).toEqual([])
  })

  it('returns an array with one chunk if size is greater than array length', () => {
    const input = [1, 2]
    expect(chunkArray(input, 10)).toEqual([[1, 2]])
  })

  it('throws or behaves correctly when chunk size is zero or negative', () => {
    expect(() => chunkArray([1, 2, 3], 0)).toThrow(
      'Chunk size must be greater than 0'
    )
    expect(() => chunkArray([1, 2, 3], -2)).toThrow()
  })

  it('works with different types', () => {
    const input = ['a', 'b', 'c', 'd']
    const result = chunkArray(input, 2)
    expect(result).toEqual([
      ['a', 'b'],
      ['c', 'd']
    ])
  })
})
