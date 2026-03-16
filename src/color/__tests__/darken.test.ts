import { describe, expect, it } from 'vitest'
import { darken } from '../darken'

describe('darken', () => {
  it('should darken color by percentage', () => {
    expect(darken('#ff0000', 20)).toBe('cc0000')
  })

  it('should darken white to gray', () => {
    expect(darken('#ffffff', 50)).toBe('808080')
  })

  it('should not go below 0', () => {
    expect(darken('#000000', 50)).toBe('000000')
  })

  it('should throw for invalid hex', () => {
    expect(() => darken('invalid', 20)).toThrow('Invalid hex color')
  })
})
