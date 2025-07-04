import { describe, expect, it } from 'vitest'
import { haversineDistance } from '../haversineDistance'

describe('haversineDistance', () => {
  it('returns 0 for identical points', () => {
    expect(haversineDistance(10, 20, 10, 20)).toBe(0)
  })

  it('calculates distance in meters', () => {
    const dist = haversineDistance(
      52.2296756,
      21.0122287,
      41.89193,
      12.51133,
      'meters'
    )
    expect(dist).toBeGreaterThan(1_200_000)
    expect(dist).toBeLessThan(1_250_000)
  })

  it('calculates distance in kilometers', () => {
    const dist = haversineDistance(
      52.2296756,
      21.0122287,
      41.89193,
      12.51133,
      'kilometers'
    )
    expect(dist).toBeGreaterThan(1220)
    expect(dist).toBeLessThan(1230)
  })

  it('calculates distance in miles', () => {
    const dist = haversineDistance(
      52.2296756,
      21.0122287,
      41.89193,
      12.51133,
      'miles'
    )
    expect(dist).toBeGreaterThan(750)
    expect(dist).toBeLessThan(770)
  })

  it('calculates distance in yards', () => {
    const dist = haversineDistance(
      52.2296756,
      21.0122287,
      41.89193,
      12.51133,
      'yards'
    )
    expect(dist).toBeGreaterThan(1_320_000)
    expect(dist).toBeLessThan(1_340_000)
  })

  it('does not throws for valid unit', () => {
    expect(() => haversineDistance(0, 0, 1, 1, 'miles')).not.toThrow()
    expect(() => haversineDistance(0, 0, 1, 1, 'kilometers')).not.toThrow()
    expect(() => haversineDistance(0, 0, 1, 1, 'meters')).not.toThrow()
    expect(() => haversineDistance(0, 0, 1, 1, 'yards')).not.toThrow()
  })

  it('throws for invalid unit', () => {
    // @ts-expect-error
    expect(() => haversineDistance(0, 0, 1, 1, 'feet')).toThrow(TypeError)
  })

  it('throws for missing coordinates', () => {
    // @ts-expect-error
    expect(() => haversineDistance(undefined, 0, 1, 1)).toThrow()
  })

  it('throws when coordinates are not numbers', () => {
    // @ts-expect-error
    expect(() => haversineDistance('a', 0, 1, 1)).toThrow()
    // @ts-expect-error
    expect(() => haversineDistance(0, 'b', 1, 1)).toThrow()
    // @ts-expect-error
    expect(() => haversineDistance(0, 0, 'c', 1)).toThrow()
    // @ts-expect-error
    expect(() => haversineDistance(0, 0, 1, 'd')).toThrow()
  })
})
