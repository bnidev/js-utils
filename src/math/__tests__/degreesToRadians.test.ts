import { describe, expect, it } from 'vitest'
import { degreesToRadians } from '../degreesToRadians'

describe('degreesToRadians', () => {
  it('converts 0 degrees to 0 radians', () => {
    expect(degreesToRadians(0)).toBe(0)
  })

  it('converts 180 degrees to PI radians', () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI)
  })

  it('converts 90 degrees to PI/2 radians', () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2)
  })

  it('converts negative degrees', () => {
    expect(degreesToRadians(-180)).toBeCloseTo(-Math.PI)
  })

  it('throws if input is not a number', () => {
    // @ts-expect-error
    expect(() => degreesToRadians('foo')).toThrow(TypeError)
  })

  it('throws if input is undefined or null', () => {
    // @ts-expect-error
    expect(() => degreesToRadians(undefined)).toThrow(TypeError)
    // @ts-expect-error
    expect(() => degreesToRadians(null)).toThrow(TypeError)
  })
})
