import { describe, expect, it } from 'vitest'
import { lighten } from '../lighten'

describe('lighten', () => {
  it('should lighten color by percentage', () => {
    expect(lighten('#ff0000', 20)).toBe('ff3333')
  })

  it('should lighten black to gray', () => {
    expect(lighten('#000000', 50)).toBe('808080')
  })

  it('should not exceed 255', () => {
    expect(lighten('#ffffff', 50)).toBe('ffffff')
  })

  it('should throw for invalid hex', () => {
    expect(() => lighten('invalid', 20)).toThrow('Invalid hex color')
  })
})
