/**
 * Determines if a given element is currently visible in the viewport.
 *
 * @param selectorOrElement - A CSS selector string or an HTMLElement.
 * @returns `true` if the element is in the viewport, `false` otherwise.
 *
 * @remarks
 * Useful for lazy loading, animations on scroll, or tracking visible content.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * //ES Module
 * import { isElementInViewport } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { isElementInViewport } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // With a CSS selector
 * if (isElementInViewport('#my-element')) {
 *   console.log('Visible')
 * }
 *
 * // With an element
 * const el = document.getElementById('my-element')
 * if (el && isElementInViewport(el)) {
 *   console.log('Also visible')
 * }
 * ```
 */
export function isElementInViewport(
  selectorOrElement: string | HTMLElement
): boolean {
  const element =
    typeof selectorOrElement === 'string'
      ? document.querySelector(selectorOrElement)
      : selectorOrElement

  if (!element) return false

  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
