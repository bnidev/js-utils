/**
 * Scrolls the element with the specified ID or element reference into view after the next render frame.
 *
 * Uses `requestAnimationFrame` to ensure the scroll occurs after rendering.
 *
 * @param selectorOrElement - A CSS selector or an element to scroll into view.
 * @param smooth - Whether to use smooth scrolling. Defaults to true.
 * @param onScrollComplete - Optional callback invoked after scroll attempt with info about the element,
 *   any error, and how long the scroll attempt took (in milliseconds).
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
 * // Scroll to an element by CSS selector
 * scrollToElementAfterRender('#myElement')
 *
 * // Scroll to an element by CSS selector instantly (no smooth scrolling)
 * scrollToElementAfterRender('#myElement', false)
 *
 * // Scroll to a DOM element reference
 * const el = document.getElementById('myElement')
 * if (el) {
 *   scrollToElementAfterRender(el)
 * }
 *
 * // Scroll with a completion callback
 * scrollToElementAfterRender('#myElement', true, ({ element, error, durationMs }) => {
 *   if (error) console.error('Scroll failed:', error)
 *   else console.log('Scrolled element:', element, 'in', durationMs, 'ms')
 * })
 * ```
 */

export function scrollToElementAfterRender(
  selectorOrElement: string | HTMLElement,
  smooth: boolean = true,
  onScrollComplete?: (info: {
    element: HTMLElement | null
    error?: unknown
    durationMs: number
  }) => void
): void {
  const start = performance.now()

  requestAnimationFrame(() => {
    let element: HTMLElement | null = null
    let error: unknown

    try {
      if (typeof selectorOrElement === 'string') {
        element = document.querySelector<HTMLElement>(selectorOrElement)
      } else {
        element = selectorOrElement
      }

      if (element) {
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      }
    } catch (err) {
      error = err
      console.warn('scrollToElementAfterRender: Failed to scroll element', err)
    }

    if (onScrollComplete) {
      onScrollComplete({
        element,
        error,
        durationMs: performance.now() - start
      })
    }
  })
}
