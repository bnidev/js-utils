/**
 * Gets the dimensions and position of a DOM element or the first element matching a CSS selector.
 *
 * @param selectorOrElement - A CSS selector string or a DOM Element to measure.
 * @returns An object containing the width, height, top, left, right, and bottom values of the element,
 * or `null` if no element is found.
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
 * const dims = getElementDimensions('#my-element')
 * if (dims) {
 *   console.log(dims.width, dims.height)
 * }
 *
 * // Or with a DOM element
 * const el = document.getElementById('my-element')
 * const dims2 = getElementDimensions(el)
 * if (dims2) {
 *   console.log(dims2.top, dims2.left)
 * }
 * ```
 */
export function getElementDimensions(selectorOrElement: string | Element): {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
} | null {
  let element: Element | null

  if (typeof selectorOrElement === 'string') {
    element = document.querySelector<HTMLElement>(selectorOrElement)
  } else {
    element = selectorOrElement
  }

  if (!element) return null

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
