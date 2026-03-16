import { hexToRgb } from './hexToRgb'
import { rgbToHex } from './rgbToHex'

/**
 * Darkens a hex color by a given percentage.
 *
 * @param hex - The hex color string.
 * @param percent - The percentage to darken (0-100).
 *
 * @returns A new hex color string.
 *
 * @category Color
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { darken } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { darken } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * darken('#ff0000', 20) // '#cc0000'
 * darken('#ffffff', 50) // '#808080'
 * ```
 */
export function darken(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) throw new Error('Invalid hex color')

  const amount = (percent / 100) * 255
  const r = Math.max(0, rgb.r - amount)
  const g = Math.max(0, rgb.g - amount)
  const b = Math.max(0, rgb.b - amount)

  return rgbToHex(r, g, b)
}
