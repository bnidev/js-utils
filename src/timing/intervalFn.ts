/**
 * A utility class to repeatedly execute a function at a fixed interval with start/stop control.
 *
 * @remarks
 * This class wraps the native `setInterval` and `clearInterval` APIs to provide an easy way
 * to start and stop repeated execution of a function. The interval can optionally run
 * a fixed number of times before automatically stopping.
 *
 * @category Timing
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { IntervalFn } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { IntervalFn } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Basic usage
 * const interval = new IntervalFn(() => console.log('tick'), 1000)
 * interval.start() // begins logging "tick" every second
 * setTimeout(() => interval.stop(), 5000) // stops after 5 seconds
 *
 * // With max runs
 * const interval = new IntervalFn(() => console.log('tick'), 1000, 3)
 * interval.start() // will log "tick" 3 times then stop automatically
 * ```
 */
export class IntervalFn {
  private id: ReturnType<typeof setInterval> | null = null

  /**
   * Creates an IntervalFn instance.
   *
   * @param fn - The function to execute repeatedly.
   * @param ms - Interval time in milliseconds.
   * @param maxRuns - Optional. The maximum number of times to run the function before stopping automatically.
   */
  constructor(
    private fn: () => void,
    private ms: number,
    private maxRuns?: number
  ) {}

  /**
   * Starts the interval timer. If already started, it does nothing.
   *
   * The function provided in the constructor will be called every `ms` milliseconds.
   * If `maxRuns` was set, the interval will stop automatically after that many executions.
   */
  start(): void {
    if (this.id !== null) return

    let runCount = 0

    this.id = setInterval(() => {
      this.fn()
      runCount++

      if (this.maxRuns !== undefined && runCount >= this.maxRuns) {
        this.stop()
      }
    }, this.ms)
  }

  /**
   * Stops the interval timer if it is running.
   *
   * Clears the internal timer ID so that the function no longer executes.
   */
  stop(): void {
    if (this.id !== null) {
      clearInterval(this.id)
      this.id = null
    }
  }
}
