import { hexToRgb } from './hexToRgb'
import { rgbToHex } from './rgbToHex'

/**
 * Lightens a hex color by a given percentage.
 *
 * @param hex - The hex color string.
 * @param percent - The percentage to lighten (0-100).
 *
 * @returns A new hex color string.
 *
 * @category Color
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { lighten } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { lighten } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * lighten('#ff0000', 20) // '#ff3333'
 * lighten('#000000', 50) // '#808080'
 * ```
 */
export function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) throw new Error('Invalid hex color')

  const amount = (percent / 100) * 255
  const r = Math.min(255, rgb.r + amount)
  const g = Math.min(255, rgb.g + amount)
  const b = Math.min(255, rgb.b + amount)

  return rgbToHex(r, g, b)
}
