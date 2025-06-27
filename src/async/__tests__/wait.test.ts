import { describe, expect, it, vi } from 'vitest'
import { wait } from '../wait'

describe('wait (real timer)', () => {
  it('resolves after approximately the specified delay', async () => {
    const start = Date.now()
    const delay = 100
    await wait(delay)
    const elapsed = Date.now() - start

    expect(elapsed).toBeGreaterThanOrEqual(delay - 5)
  })
})

describe('wait (fake timer)', () => {
  it('waits for the specified time using fake timers', async () => {
    vi.useFakeTimers()

    const waitPromise = wait(100)
    vi.advanceTimersByTime(100)

    await expect(waitPromise).resolves.toBeUndefined()

    vi.useRealTimers()
  })
})
