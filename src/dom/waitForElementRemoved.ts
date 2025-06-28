/**
 * Waits for an element matching the selector (or the given element) to be removed from the DOM.
 *
 * @param selectorOrElement - A CSS selector string or a DOM Element to wait for removal.
 * @param timeoutMs - Optional timeout in milliseconds. Defaults to 5000ms.
 * @returns Promise that resolves when the element is removed, rejects on timeout.
 *
 * @remarks
 * This function uses a `MutationObserver` to monitor changes in the DOM and checks if the specified element is removed. If the element is not found within the specified timeout, it rejects with an error.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { waitForElementRemoved } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { waitForElementRemoved } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Wait for an element with ID 'myElement' to be removed
 * waitForElementRemoved('#myElement')
 *  .then(() => {
 *    console.log('Element was removed from the DOM')
 *  })
 *  .catch((error) => {
 *    console.error('Error:', error)
 *  })
 *
 * // Wait for a specific element to be removed
 * const myElement = document.getElementById('myElement')
 * waitForElementRemoved(myElement)
 *  .then(() => {
 *    console.log('Element was removed from the DOM')
 *  })
 *  .catch((error) => {
 *    console.error('Error:', error)
 *  })
 *```
 */
export function waitForElementRemoved(
  selectorOrElement: string | Element,
  timeoutMs = 5000
): Promise<void> {
  return new Promise((resolve, reject) => {
    let element: Element | null

    const checkRemoved = () => {
      if (typeof selectorOrElement === 'string') {
        element = document.querySelector(selectorOrElement)
      } else {
        element = selectorOrElement
      }

      if (!element || !document.body.contains(element)) {
        cleanup()
        resolve()
      }
    }

    const observer = new MutationObserver(() => {
      checkRemoved()
    })

    const timeoutId = setTimeout(() => {
      cleanup()
      reject(new Error('Timeout waiting for element to be removed'))
    }, timeoutMs)

    function cleanup() {
      clearTimeout(timeoutId)
      observer.disconnect()
    }

    // Start observing the entire document body for changes
    observer.observe(document.body, { childList: true, subtree: true })

    // Initial check in case element is already removed
    checkRemoved()
  })
}
