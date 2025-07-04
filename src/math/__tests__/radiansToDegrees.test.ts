import { describe, expect, it } from 'vitest'
import { radiansToDegrees } from '../radiansToDegrees'

describe('radiansToDegrees', () => {
  it('converts 0 radians to 0 degrees', () => {
    expect(radiansToDegrees(0)).toBe(0)
  })

  it('converts PI radians to 180 degrees', () => {
    expect(radiansToDegrees(Math.PI)).toBe(180)
  })

  it('converts PI/2 radians to 90 degrees', () => {
    expect(radiansToDegrees(Math.PI / 2)).toBe(90)
  })

  it('converts negative radians', () => {
    expect(radiansToDegrees(-Math.PI)).toBe(-180)
  })

  it('throws if input is not a number', () => {
    // @ts-expect-error
    expect(() => radiansToDegrees('foo')).toThrow(TypeError)
  })

  it('throws if input is undefined or null', () => {
    // @ts-expect-error
    expect(() => radiansToDegrees(undefined)).toThrow(TypeError)
    // @ts-expect-error
    expect(() => radiansToDegrees(null)).toThrow(TypeError)
  })
})
