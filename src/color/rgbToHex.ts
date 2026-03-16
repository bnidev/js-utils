/**
 * Converts an RGB color to a hex string.
 *
 * @param r - Red value (0-255).
 * @param g - Green value (0-255).
 * @param b - Blue value (0-255).
 *
 * @returns A hex color string (without #).
 *
 * @category Color
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { rgbToHex } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { rgbToHex } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * rgbToHex(255, 0, 0) // 'ff0000'
 * rgbToHex(0, 255, 0) // '00ff00'
 * ```
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)))
    return clamped.toString(16).padStart(2, '0')
  }

  return `${toHex(r)}${toHex(g)}${toHex(b)}`
}
