/**
 * Waits for an element with the specified ID to become visible in the DOM.
 *
 * The function repeatedly checks for the element's presence and visibility,
 * using the provided or default display check, until the element is visible or the timeout is reached.
 *
 * @param selectorOrElement - The CSS selector string or HTMLElement to wait for.
 * @param options - Optional configuration:
 *   - timeout: Maximum time to wait in milliseconds (default: 2000).
 *   - interval: Polling interval in milliseconds (default: 16).
 *   - displayCheck: Custom function to determine element visibility.
 * @returns A promise that resolves with the HTMLElement when visible, or rejects on timeout.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { waitForVisibleElement } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { waitForVisibleElement } = require('@bnidev/js-utils')
 * ```
 *
 * @example
 * ```ts
 * // Wait for an element with ID 'myElement' to become visible
 * waitForVisibleElement('myElement')
 *   .then((el) => {
 *     console.log('Element is visible:', el)
 *   })
 *   .catch((error) => {
 *     console.error('Error:', error)
 *   })
 *
 * // Wait for an element with ID 'myElement' with custom options
 * waitForVisibleElement('myElement', {
 *   timeout: 5000,
 *   interval: 100,
 *   displayCheck: (style) => style.display !== 'none' && style.visibility !== 'hidden'
 * })
 *   .then((el) => {
 *     console.log('Element is visible:', el)
 *   })
 *   .catch((error) => {
 *     console.error('Error:', error)
 *   })
 * ```
 */

export function waitForVisibleElement(
  selectorOrElement: string | HTMLElement,
  options?: {
    timeout?: number
    interval?: number
    displayCheck?: (style: CSSStyleDeclaration) => boolean
  }
): Promise<HTMLElement> {
  const timeout = options?.timeout ?? 2000
  const interval = options?.interval ?? 16 // ~60fps

  const defaultDisplayCheck = (style: CSSStyleDeclaration) =>
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    parseFloat(style.opacity) > 0

  const displayCheck = options?.displayCheck ?? defaultDisplayCheck

  return new Promise((resolve, reject) => {
    let element: HTMLElement | null

    const start = performance.now()

    const check = () => {
      if (typeof selectorOrElement === 'string') {
        element = document.querySelector<HTMLElement>(selectorOrElement)
      } else {
        element = selectorOrElement
      }

      if (element) {
        const style = getComputedStyle(element)
        if (displayCheck(style)) return resolve(element)
      }

      if (performance.now() - start > timeout) {
        return reject(new Error(`Element was not visible within ${timeout}ms`))
      }

      setTimeout(check, interval)
    }

    check()
  })
}
