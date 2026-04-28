export interface RgbColor {
  r: number
  g: number
  b: number
}

/**
 * Converts a hex color string to an RGB object.
 *
 * @param hex - The hex color string (with or without #).
 *
 * @returns An RGB object with r, g, b values (0-255).
 *
 * @category Color
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { hexToRgb } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { hexToRgb } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * hexToRgb('#ff0000') // { r: 255, g: 0, b: 0 }
 * hexToRgb('00ff00') // { r: 0, g: 255, b: 0 }
 * ```
 */
export function hexToRgb(hex: string): RgbColor | null {
  const cleanHex = hex.replace('#', '')

  if (
    !/^[0-9A-Fa-f]{6}$/.test(cleanHex) &&
    !/^[0-9A-Fa-f]{3}$/.test(cleanHex)
  ) {
    return null
  }

  let fullHex = cleanHex
  if (cleanHex.length === 3) {
    fullHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const r = Number.parseInt(fullHex.substring(0, 2), 16)
  const g = Number.parseInt(fullHex.substring(2, 4), 16)
  const b = Number.parseInt(fullHex.substring(4, 6), 16)

  return { r, g, b }
}
