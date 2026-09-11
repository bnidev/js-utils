/**
 * Creates a debounced version of the provided function that delays its execution until after
 * a specified delay has elapsed since the last time it was invoked.
 *
 * ### Cancellation & Cleanup Semantics
 *
 * Across timing and DOM registration utilities, this library enforces consistent cleanup patterns:
 * - **Event Listeners / Observers**: Return a unified parameterless `() => void` cleanup/unsubscribe function (e.g. `onResize`).
 * - **Schedules / Pollers**: Expose `cancel()` or `stop()` methods depending on class-based (`IntervalFn.stop()`) vs functional control.
 *
 * @template T - The type of the function to debounce.
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A debounced function that delays invoking `func` until after `delay` milliseconds have elapsed since the last invocation.
 *
 * @category Timing
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { debounceFn } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { debounceFn } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const saveInput = (input: string) => {
 *   console.log(`Saving input: ${input}`)
 * }
 *
 * debounceFn(saveInput, 300)
 * ```
 */

export function debounceFn<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
