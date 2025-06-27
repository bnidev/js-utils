import { describe, expect, it } from 'vitest'
import { shuffleArray } from '../shuffleArray'

describe('shuffleArray', () => {
  it('returns an array with the same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(input)

    // Same elements, order may differ
    expect(shuffled.sort()).toEqual(input.sort())
  })

  it('shuffles the array elements randomly over multiple runs', () => {
    const input = [1, 2, 3, 4, 5]
    let differentOrderCount = 0
    const runs = 10

    for (let i = 0; i < runs; i++) {
      const shuffled = shuffleArray(input)
      if (!shuffled.every((v, idx) => v === input[idx])) {
        differentOrderCount++
      }
    }

    // Expect at least one shuffle to change the order over several tries
    expect(differentOrderCount).toBeGreaterThan(0)
  })

  it('does not mutate the original array', () => {
    const input = [1, 2, 3]
    const original = [...input]
    shuffleArray(input)
    expect(input).toEqual(original)
  })

  it('works with strings and undefined values', () => {
    const input = ['a', undefined, 'b', undefined, 'c']
    const shuffled = shuffleArray(input)
    expect(shuffled.sort()).toEqual(input.sort())
  })

  it('returns empty array when input is empty', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('returns same array when array has one element', () => {
    expect(shuffleArray([42])).toEqual([42])
  })

  it('returns an array with same length as input', () => {
    const input = Array.from({ length: 100 }, (_, i) => i)
    const shuffled = shuffleArray(input)
    expect(shuffled).toHaveLength(100)
  })
})
