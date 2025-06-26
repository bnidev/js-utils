/**
 * Focuses the HTML element with the specified ID.
 *
 * Sets the element's `tabIndex` to -1 to make it focusable if necessary,
 * focuses the element, and optionally removes the `tabindex` attribute after focusing.
 *
 * @param targetId - The ID of the element to focus.
 * @param removeTabIndex - Whether to remove the `tabindex` attribute after focusing. Defaults to true.
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
 * // Focus an element with ID 'myElement'
 * focusElement('myElement')
 *
 * // Focus an element with ID 'myElement' without removing tabindex
 * focusElement('myElement', false)
 * ```
 */

export function focusElement(
  targetId: string,
  removeTabIndex: boolean = true
): void {
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.tabIndex = -1
    targetElement.focus()
    if (removeTabIndex) {
      targetElement.removeAttribute('tabindex')
    }
  }
}
