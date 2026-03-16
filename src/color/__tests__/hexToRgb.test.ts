import { describe, expect, it } from 'vitest'
import { hexToRgb } from '../hexToRgb'

describe('hexToRgb', () => {
  it('should convert 6-digit hex with hash', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('should convert 6-digit hex without hash', () => {
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('should convert 3-digit hex', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('should return null for invalid hex', () => {
    expect(hexToRgb('invalid')).toBeNull()
  })

  it('should handle lowercase hex', () => {
    expect(hexToRgb('#aabbcc')).toEqual({ r: 170, g: 187, b: 204 })
  })
})
