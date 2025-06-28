import { describe, expect, it, vi } from 'vitest'
import { IntervalFn } from '../intervalFn'

describe('IntervalFn', () => {
  it('calls the function repeatedly at the given interval', async () => {
    vi.useFakeTimers()

    const fn = vi.fn()
    const interval = new IntervalFn(fn, 1000)

    interval.start()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(4)

    interval.stop()
    vi.advanceTimersByTime(5000)
    expect(fn).toHaveBeenCalledTimes(4)

    vi.useRealTimers()
  })

  it('does not start multiple intervals if start is called multiple times', () => {
    vi.useFakeTimers()

    const fn = vi.fn()
    const interval = new IntervalFn(fn, 1000)

    interval.start()
    interval.start() // second call should do nothing

    vi.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(3)

    interval.stop()

    vi.useRealTimers()
  })

  it('stops the interval and prevents further calls', () => {
    vi.useFakeTimers()

    const fn = vi.fn()
    const interval = new IntervalFn(fn, 1000)

    interval.start()
    vi.advanceTimersByTime(2000)
    interval.stop()

    vi.advanceTimersByTime(2000)
    expect(fn).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })

  it('automatically stops after maxRuns executions', () => {
    vi.useFakeTimers()

    const fn = vi.fn()
    const interval = new IntervalFn(fn, 1000, 3)

    interval.start()
    vi.advanceTimersByTime(5000) // advance more than needed

    expect(fn).toHaveBeenCalledTimes(3)

    // Advance more time, should not call again
    vi.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(3)

    vi.useRealTimers()
  })
})
