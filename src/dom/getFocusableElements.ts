/**
 * Returns an array of focusable elements within a given container.
 * Focusable elements include links, buttons, textareas, inputs, selects,
 * and elements with a positive tabindex.
 *
 * @param containerOrSelector - A CSS selector string or an HTMLElement representing the container.
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
 * // With a selector
 * const focusables = getFocusableElements('.modal')
 *
 * // With a direct HTMLElement
 * const modal = document.querySelector('.modal')
 * if (modal) {
 *   const focusables = getFocusableElements(modal)
 * }
 * ```
 */
export function getFocusableElements(
  containerOrSelector: string | HTMLElement
): HTMLElement[] {
  let container: HTMLElement | null

  if (typeof containerOrSelector === 'string') {
    container = document.querySelector<HTMLElement>(containerOrSelector)
  } else {
    container = containerOrSelector
  }

  if (!container) return []

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
