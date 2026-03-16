import { describe, expect, it } from 'vitest'
import { rgbToHex } from '../rgbToHex'

describe('rgbToHex', () => {
  it('should convert red', () => {
    expect(rgbToHex(255, 0, 0)).toBe('ff0000')
  })

  it('should convert green', () => {
    expect(rgbToHex(0, 255, 0)).toBe('00ff00')
  })

  it('should convert blue', () => {
    expect(rgbToHex(0, 0, 255)).toBe('0000ff')
  })

  it('should pad single digit values', () => {
    expect(rgbToHex(0, 0, 0)).toBe('000000')
  })

  it('should clamp values over 255', () => {
    expect(rgbToHex(300, 0, 0)).toBe('ff0000')
  })

  it('should clamp negative values', () => {
    expect(rgbToHex(-10, 0, 0)).toBe('000000')
  })
})
