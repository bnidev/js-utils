/**
 * Toggles the scroll lock on the document body to prevent or allow scrolling.
 *
 * When locking scroll, it sets `overflow: hidden` on the `<body>` and adjusts
 * `padding-right` to compensate for the scrollbar width, preventing layout shift.
 * When unlocking, it restores the original styles.
 *
 * This is useful for modal dialogs, sidebars, or any UI that requires disabling background scroll
 * while keeping layout stable.
 *
 * @param lock - If `true`, locks scrolling and adjusts padding. If `false`, restores scrolling and styles.
 *
 * @returns `void`
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { toggleScrollLock } from '@bnidev/js-utils'
 * // CommonJS
 *
 * const { toggleScrollLock } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Lock scroll (e.g., when opening a modal)
 * toggleScrollLock(true)
 *
 * // Unlock scroll (e.g., when closing a modal)
 * toggleScrollLock(false)
 * ```
 */
export function toggleScrollLock(lock: boolean): void {
  if (lock) {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    if (!document.body.hasAttribute('data-scroll-lock')) {
      document.body.setAttribute('data-scroll-lock', 'true')
      document.body.setAttribute(
        'data-original-overflow',
        document.body.style.overflow
      )
      document.body.setAttribute(
        'data-original-padding-right',
        document.body.style.paddingRight
      )

      document.body.style.overflow = 'hidden'
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
    }
  } else {
    if (document.body.hasAttribute('data-scroll-lock')) {
      document.body.style.overflow =
        document.body.getAttribute('data-original-overflow') || ''
      document.body.style.paddingRight =
        document.body.getAttribute('data-original-padding-right') || ''

      document.body.removeAttribute('data-scroll-lock')
      document.body.removeAttribute('data-original-overflow')
      document.body.removeAttribute('data-original-padding-right')
    }
  }
}
