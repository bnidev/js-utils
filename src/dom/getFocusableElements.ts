/**
 * Returns an array of focusable elements within a given container.
 * Focusable elements include links, buttons, textareas, inputs, selects,
 * and elements with a positive tabindex.
 *
 * @param {HTMLElement} container - The container element to search within.
 * @returns {HTMLElement[]} An array of focusable elements.
 *
 * @remarks
 * This utility is useful for accessibility purposes, allowing you to easily find and manage focusable elements within a specific part of the DOM.
 * It can be used in scenarios such as modal dialogs, dropdowns, or any component where you need to control focus behavior.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { getFocusableElements } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { getFocusableElements } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Get all focusable elements within a modal dialog
 * const modal = document.querySelector('.modal')
 * const focusableElements = getFocusableElements(modal)
 * // Log the focusable elements
 * console.log(focusableElements)
 * ```
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )

  return Array.from(elements).filter(isFocusable)
}

/**
 * Checks if an element is focusable based on its attributes and styles.
 *
 * @param {HTMLElement} el - The element to check.
 * @returns {boolean} `true` if the element is focusable, `false` otherwise.
 */
function isFocusable(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el)

  return (
    !el.hasAttribute('disabled') &&
    !el.hasAttribute('hidden') &&
    el.tabIndex !== -1 &&
    style.display !== 'none' &&
    style.visibility !== 'hidden'
  )
}
