import { degreesToRadians as toRadians } from './degreesToRadians'

/**
 * The radius of the Earth in meters.
 */
const EARTH_RADIUS_METERS = 6_371_000

/**
 * Unit of measurement for distance.
 *
 * @remarks
 * This type defines the units that can be used for distance calculations in the `haversineDistance` function.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { DistanceUnit } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { DistanceUnit } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const unit: DistanceUnit = 'kilometers'
 * // This can be used in the haversineDistance function to specify the unit of measurement.
 * ```
 */
export type DistanceUnit = 'meters' | 'kilometers' | 'miles' | 'yards'

/**
 * Converts a distance in meters to the specified unit.
 *
 * @internal
 */
const convertRadius = (meters: number, toUnit: DistanceUnit): number => {
  const conversions = {
    meters: 1,
    kilometers: 1 / 1_000,
    miles: 1 / 1_609.344,
    yards: 1.09361
  }

  return meters * conversions[toUnit]
}

/**
 * Calculates the Haversine distance between two geographical points.
 * @param lat1 - Latitude of the first point in degrees.
 * @param lon1 - Longitude of the first point in degrees.
 * @param lat2 - Latitude of the second point in degrees.
 * @param lon2 - Longitude of the second point in degrees.
 * @param unit - The unit of measurement for the result ('meters', 'kilometers', or 'miles').
 * @returns The distance between the two points in the specified unit.
 *
 * @category Math
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { haversineDistance } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { haversineDistance } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const dist = haversineDistance(52.2296756, 21.0122287, 41.8919300, 12.5113300, 'kilometers')
 * // dist will be approximately 1317.19 kilometers
 * ```
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: DistanceUnit = 'meters'
): number {
  if (
    lat1 === undefined ||
    lat1 === null ||
    lon1 === undefined ||
    lon1 === null ||
    lat2 === undefined ||
    lat2 === null ||
    lon2 === undefined ||
    lon2 === null
  ) {
    throw new TypeError('Latitude and longitude must be provided')
  }

  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  }

  if (
    typeof lat1 !== 'number' ||
    typeof lon1 !== 'number' ||
    typeof lat2 !== 'number' ||
    typeof lon2 !== 'number'
  ) {
    throw new TypeError('Latitude and longitude must be numbers')
  }

  const validUnits: DistanceUnit[] = ['meters', 'kilometers', 'miles', 'yards']

  if (typeof unit !== 'string' || !validUnits.includes(unit)) {
    throw new TypeError(
      'Unit must be one of "meters", "kilometers", "miles", or "yards"'
    )
  }

  const R = convertRadius(EARTH_RADIUS_METERS, unit)
  const lat1Rad = toRadians(lat1)
  const lat2Rad = toRadians(lat2)
  const deltaLat = toRadians(lat2 - lat1)
  const deltaLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLat / 2) *
      Math.sin(deltaLat / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
