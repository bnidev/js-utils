/**
 * Creates a function that only invokes the provided callback every Nth time it's called.
 *
 * @param fn - The function to be conditionally executed.
 * @param n - The number of calls between each execution. Must be ≥ 1.
 * @returns A new function that tracks call count and only invokes `fn` every Nth time.
 *
 * @throws Will throw an error if `n` is less than 1 or not an integer.
 *
 * @category Timing
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { everyNthCall } from 'your-library/timing';
 *
 * // CommonJS
 * const { everyNthCall } = require('your-library/timing');
 * ```
 *
 * @example Usage
 * ```ts
 * const logEvery3 = everyNthCall(() => console.log("called"), 3);
 * logEvery3() // nothing
 * logEvery3() // nothing
 * logEvery3() // logs "called"
 * ```
 */
export function everyNthCall(fn: () => void, n: number): () => void {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('`n` must be an integer >= 1')
  }

  let counter = 0

  return () => {
    counter += 1
    if (counter % n === 0) {
      fn()
    }
  }
}
