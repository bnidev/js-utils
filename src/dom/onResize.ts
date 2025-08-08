/**
 * Registers a resize callback that works for either the `window`, `document`, or a specific `HTMLElement`.
 *
 * Internally uses `ResizeObserver` for elements, and a debounced `resize` event for the window or document.
 *
 * @param callback - The function to call when the target is resized.
 * @param options - Optional configuration:
 * - `element`: Target to observe (`window`, `document`, or an `HTMLElement`). Defaults to `window`.
 * - `delay`: Debounce delay in milliseconds (only applies to window/document). Defaults to `50`.
 * @returns A cleanup function to remove the listener or disconnect the observer.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { onResize } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { onResize } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Register a resize listener for the window
 * onResize(() => {
 *   console.log('Window resized')
 * }, { delay: 100 })
 *
 * // Register a resize listener for a specific element
 * const div = document.querySelector('#myDiv')!
 * onResize(() => {
 *   console.log('Element resized')
 * }, { element: div })
 * ```
 */
export function onResize(
  callback: () => void,
  options?: {
    element?: typeof window | typeof document | HTMLElement
    delay?: number
  }
): () => void {
  const { element = window, delay = 50 } = options ?? {}
  if (element === window || element === document) {
    return onWindowResize(callback, delay)
  }

  if (element instanceof HTMLElement) {
    return onElementResize(element, callback)
  }

  console.warn(
    'Invalid element provided for onResize. Expected window, document, or HTMLElement.'
  )
  return () => {}
}

/**
 * Registers a debounced callback for the window resize event.
 *
 * @param callback - The function to call after a resize event.
 * @param delay - Debounce delay in milliseconds. Defaults to `50`.
 * @returns A cleanup function to remove the event listener.
 *
 * @category DOM
 *
 * @example Usage
 * ```ts
 * onWindowResize(() => {
 *   console.log('Window resized')
 * }, 100)
 * ```
 */
export function onWindowResize(callback: () => void, delay = 50) {
  let timeout: ReturnType<typeof setTimeout>
  const handler = () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}

/**
 * Observes size changes on a specific HTML element using `ResizeObserver`.
 *
 * @param element - The target HTML element to observe.
 * @param callback - Called with a `ResizeObserverEntry` when the element resizes.
 * @returns A cleanup function to disconnect the observer.
 *
 * @category DOM
 *
 * @example Usage
 * ```ts
 * const box = document.querySelector('#box')!
 * const stop = onElementResize(box, (entry) => {
 *   console.log('Element resized:', entry.contentRect)
 * })
 *
 * // Later, to stop observing:
 * stop()
 * ```
 */
export function onElementResize(
  element: HTMLElement,
  callback: (entry: ResizeObserverEntry) => void
) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      callback(entry)
    }
  })
  observer.observe(element)
  return () => observer.disconnect()
}
