/**
 * Locks scrolling on the document body to prevent background scroll.
 *
 * Sets `overflow: hidden` on the `<body>` and adjusts `padding-right` to
 * compensate for the scrollbar width, preventing layout shift.
 * Stores original styles in `data-*` attributes so they can be restored.
 *
 * This is useful for modal dialogs, sidebars, or any UI that requires
 * disabling background scroll while keeping layout stable.
 *
 * @returns `void`
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { lockBodyScroll } from '@bnidev/js-utils'
 * // CommonJS
 * const { lockBodyScroll } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Lock scroll (e.g., when opening a modal)
 * lockBodyScroll()
 * ```
 */
export function lockBodyScroll(): void {
  if ('scrollLock' in document.body.dataset) return

  const scrollBarWidth =
    globalThis.innerWidth - document.documentElement.clientWidth

  document.body.dataset.scrollLock = 'true'
  document.body.dataset.originalOverflow = document.body.style.overflow
  document.body.dataset.originalPaddingRight = document.body.style.paddingRight

  document.body.style.overflow = 'hidden'
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }
}

/**
 * Unlocks scrolling on the document body, restoring original styles.
 *
 * Restores the `overflow` and `padding-right` styles that were saved when
 * `lockBodyScroll` was called, then removes the `data-*` state attributes.
 *
 * Does nothing if the body is not currently scroll-locked.
 *
 * @returns `void`
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { unlockBodyScroll } from '@bnidev/js-utils'
 * // CommonJS
 * const { unlockBodyScroll } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Unlock scroll (e.g., when closing a modal)
 * unlockBodyScroll()
 * ```
 */
export function unlockBodyScroll(): void {
  if (!('scrollLock' in document.body.dataset)) return

  document.body.style.overflow = document.body.dataset.originalOverflow ?? ''
  document.body.style.paddingRight =
    document.body.dataset.originalPaddingRight ?? ''

  delete document.body.dataset.scrollLock
  delete document.body.dataset.originalOverflow
  delete document.body.dataset.originalPaddingRight
}
