/**
 * Scrolls the element with the specified ID into view after the next render frame.
 *
 * Uses `requestAnimationFrame` to ensure the scroll occurs after rendering.
 *
 * @param id - The ID of the element to scroll into view.
 * @param smooth - Whether to use smooth scrolling. Defaults to true.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { scrollToElementAfterRender } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { scrollToElementAfterRender } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Scroll to an element with ID 'myElement' smoothly after render
 * scrollToElementAfterRender('myElement')
 *
 * // Scroll to an element with ID 'myElement' instantly after render
 * scrollToElementAfterRender('myElement', false)
 * ```
 */

export function scrollToElementAfterRender(
  id: string,
  smooth: boolean = true
): void {
  requestAnimationFrame(() => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  })
}
