import { describe, expect, it } from 'vitest'
import { compactArray } from '../compactArray'

describe('compactArray', () => {
  it('removes all falsy values from the array', () => {
    const input = [0, 1, false, 2, '', 3, null, undefined]
    const result = compactArray(input)
    expect(result).toEqual([1, 2, 3])
  })

  it('returns an empty array when all values are falsy', () => {
    const input = [false, 0, '', null, undefined]
    const result = compactArray(input)
    expect(result).toEqual([])
  })

  it('returns the same array when all values are truthy', () => {
    const input = [1, 'hello', true, {}, []]
    const result = compactArray(input)
    expect(result).toEqual([1, 'hello', true, {}, []])
  })

  it('handles empty array input', () => {
    expect(compactArray([])).toEqual([])
  })

  it('preserves the order of truthy values', () => {
    const input = [0, 'first', null, 'second', false, 'third']
    const result = compactArray(input)
    expect(result).toEqual(['first', 'second', 'third'])
  })
})
