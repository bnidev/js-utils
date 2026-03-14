import { describe, expect, it } from 'vitest'
import { repeat } from '../repeat'

describe('repeat', () => {
  it('should repeat string n times', () => {
    expect(repeat('abc', 3)).toBe('abcabcabc')
  })

  it('should return empty string for count 0', () => {
    expect(repeat('abc', 0)).toBe('')
  })

  it('should return empty string for count 1', () => {
    expect(repeat('abc', 1)).toBe('abc')
  })

  it('should throw for negative count', () => {
    expect(() => repeat('abc', -1)).toThrow(
      'Count must be a non-negative number'
    )
  })
})
