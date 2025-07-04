/**
 * Focuses the specified HTML element or the first element matching a CSS selector.
 *
 * Sets the element's `tabIndex` to -1 to make it focusable if necessary,
 * attempts to focus it, and optionally removes the `tabindex` attribute afterward.
 *
 * Returns a result object containing the element, whether focus was attempted,
 * whether it was successful, and any error encountered.
 *
 * @param selectorOrElement - A CSS selector string or a DOM Element to focus.
 * @param removeTabIndex - Whether to remove the `tabindex` attribute after focusing. Defaults to true.
 * @returns An object describing the focus attempt:
 * - `element`: The resolved element or null.
 * - `attempted`: Whether the function attempted to focus an element.
 * - `focused`: Whether the element successfully received focus.
 * - `error` (optional): Any error thrown during the focus attempt.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { focusElement } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { focusElement } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Just focus the element (no need to capture the return value)
 * focusElement('#myElement');
 *
 * // Focus an element without removing tabindex
 * focusElement('#myElement', false);
 *
 * // Focus a specific DOM element
 * const myElement = document.getElementById('myElement');
 * focusElement(myElement);
 *
 * // Use the returned result object (destructured)
 * const { element, attempted, focused, error } = focusElement('#myElement');
 *
 * if (focused) {
 *   console.log('Element focused successfully:', element);
 * } else if (!element) {
 *   console.warn('Element not found.');
 * } else if (!attempted) {
 *   console.warn('Focus was not attempted.');
 * } else {
 *   console.warn('Focus failed.', error);
 * }
 * ```
 */
export function focusElement(
  selectorOrElement: string | HTMLElement,
  removeTabIndex: boolean = true
): {
  element: HTMLElement | null
  attempted: boolean
  focused: boolean
  error?: unknown
} {
  let element: HTMLElement | null
  let attempted = false
  let focused = false
  let error: unknown

  if (typeof selectorOrElement === 'string') {
    element = document.querySelector<HTMLElement>(selectorOrElement)
  } else {
    element = selectorOrElement
  }
  if (element) {
    attempted = true
    try {
      element.tabIndex = -1
      element.focus()
      focused = document.activeElement === element
      if (removeTabIndex) {
        element.removeAttribute('tabindex')
      }
    } catch (err) {
      error = err
      console.warn('focusElement: Failed to focus element', err)
    }
  }

  return {
    element,
    attempted,
    focused,
    ...(error ? { error } : {})
  }
}
