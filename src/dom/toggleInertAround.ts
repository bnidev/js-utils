/**
 * Toggles the 'inert' attribute on all sibling elements of the target element and its ancestors.
 *
 * For each ancestor of the target element (up to the document root), this function finds all sibling elements
 * and toggles their 'inert' attribute. If a sibling has the 'inert' attribute, it is removed; otherwise, it is added.
 *
 * @param target - The target element or the ID of the target element around which to toggle 'inert' on siblings.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { toggleInertAround } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { toggleInertAround } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Toggle 'inert' around an element by ID
 * toggleInertAround('myElementId')
 *
 * // Toggle 'inert' around a DOM element
 * const el = document.getElementById('myElementId')
 * if (el) {
 *   toggleInertAround(el)
 * }
 * ```
 */

export function toggleInertAround(target: string | HTMLElement): void {
  let element: HTMLElement | null =
    typeof target === 'string' ? document.getElementById(target) : target

  while (element && element.parentNode !== document) {
    const parent = element.parentElement
    if (!parent) break

    const siblings = Array.from(parent.children).filter(
      (sibling) => sibling !== element && sibling.nodeType === 1
    ) as HTMLElement[]

    siblings.forEach((sibling) => {
      if (sibling.hasAttribute('inert')) {
        sibling.removeAttribute('inert')
      } else {
        sibling.setAttribute('inert', '')
      }
    })

    element = parent
  }
}
