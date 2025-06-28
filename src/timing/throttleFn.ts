/**
 * Creates a throttled version of a function that ensures the original function
 * is invoked at most once every specified number of milliseconds.
 *
 * @remarks
 * This utility is useful for rate-limiting a function that might be called frequently,
 * such as an event handler or API call, to improve performance or avoid overloading a system.
 *
 * @typeParam T - The type of the function to throttle.
 *
 * @param func - The function to be throttled.
 * @param delay - The minimum time interval (in milliseconds) between invocations of `func`.
 *
 * @returns A new function that wraps `func` and enforces the throttling behavior.
 *
 * @category Timing
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { throttleFn } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { throttleFn } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const log = () => console.log('Hello')
 * const throttledLog = throttleFn(log, 1000)
 *
 * window.addEventListener('scroll', throttledLog)
 * ```
 */

export function throttleFn<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}
