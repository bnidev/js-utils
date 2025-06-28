/**
 * Gets the dimensions and position of a DOM element.
 *
 * @param element - The DOM element to measure.
 * @returns An object containing the width, height, top, left, right, and bottom values of the element.
 *
 * @remarks
 * This utility is helpful when you need to calculate layout, positioning, or do measurements for animations or interactions.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getElementDimensions } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getElementDimensions } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const el = document.getElementById('my-element')
 * if (el) {
 *   const dims = getElementDimensions(el)
 *   console.log(dims.width, dims.height)
 * }
 * ```
 */
export function getElementDimensions(element: Element) {
  const rect = element.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom
  }
}
