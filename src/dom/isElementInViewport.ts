/**
 * Determines if a given element is currently visible in the viewport.
 *
 * @param el - The DOM element to check.
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
 * const el = document.querySelector('#my-element')
 * if (isElementInViewport(el)) {
 *   console.log('Element is visible')
 * }
 * ```
 */
export function isElementInViewport(el: HTMLElement): boolean {
  if (!el) {
    return false
  }

  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
