/**
 * Retries a promise-returning function a specified number of times with delay between attempts.
 *
 * @template T - The return type of the async function.
 *
 * @param fn - The async function to retry.
 * @param retries - Maximum number of retry attempts. Default is 3.
 * @param delay - Delay between retries in milliseconds. Default is 500ms.
 *
 * @returns A promise that resolves with the result of the function, or rejects after all retries fail.
 *
 * @remarks
 * This utility is useful for handling transient errors in asynchronous operations, such as network requests or database queries, where a retry might succeed after a failure.
 *
 * @category Async
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { retryAsyncFn } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { retryAsyncFn } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * await retryAsyncFn(() => fetch('/api/data'), 5, 1000);
 * ```
 */
export async function retryAsyncFn<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 500
): Promise<T> {
  let lastError: unknown

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < retries - 1) {
        await sleep(delay)
      }
    }
  }

  throw lastError
}
