/**
 * Waits for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified time.
 *
 * @remarks
 * This utility is useful for creating delays in asynchronous operations, such as waiting for a certain condition to be met or pacing operations. It can be used in conjunction with `async/await` syntax for cleaner code.
 *
 * @category Async
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { wait } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { wait } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Wait for 2 seconds
 * await wait(2000)
 * console.log('2 seconds have passed')
 * ```
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
