/**
 * Toggles the 'inert' attribute on all sibling elements of the target element and its ancestors.
 *
 * For each ancestor of the target element (up to the document root), this function finds all sibling elements
 * and toggles their 'inert' attribute. If a sibling has the 'inert' attribute, it is removed; otherwise, it is added.
 *
 * @param targetId - The id of the target element around which to toggle 'inert' on siblings.
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
 * toggleInertAround('myElementId');
 * ```
 */

export function toggleInertAround(targetId: string): void {
  let element: HTMLElement | null = document.getElementById(targetId)

  while (element && element.parentNode !== document) {
    const parent: HTMLElement = element.parentElement as HTMLElement

    if (parent) {
      const siblings: HTMLElement[] = Array.from(parent.children).filter(
        (sibling) => sibling !== element && sibling.nodeType === 1
      ) as HTMLElement[]

      if (siblings.length) {
        siblings.forEach((sibling) => {
          if (sibling.hasAttribute('inert')) {
            sibling.removeAttribute('inert')
          } else {
            sibling.setAttribute('inert', '')
          }
        })
      }
    }

    element = parent
  }
}
