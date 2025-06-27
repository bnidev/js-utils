/**
 * Wraps a promise with a timeout. If the promise does not resolve within the specified time,
 * it rejects with a 'Timeout' error.
 *
 * @param promise - The promise to wrap.
 * @param ms - The timeout duration in milliseconds.
 * @returns A new promise that resolves or rejects based on the original promise and the timeout.
 *
 * @remarks
 * This utility is useful for ensuring that asynchronous operations do not hang indefinitely.
 *
 * @category Async
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { timeoutAsyncFn } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { timeoutAsyncFn } = require('@bnidev/js-utils')
 * ```
 * @example Usage
 * ```ts
 * // Wrap a fetch request with a timeout
 * const fetchWithTimeout = timeoutAsyncFn(fetch('https://api.example.com/data'), 5000)
 * fetchWithTimeout
 *  .then(response => response.json())
 *  .then(data => console.log(data))
 *  .catch(error => console.error('Error:', error))
 *  // If the fetch does not complete within 5 seconds, it will reject with 'Timeout'
 *  ```
 */

export function timeoutAsyncFn<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), ms)
    promise.then(
      (val) => {
        clearTimeout(timer)
        resolve(val)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      }
    )
  })
}
