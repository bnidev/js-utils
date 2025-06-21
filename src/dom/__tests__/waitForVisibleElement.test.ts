import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { waitForVisibleElement } from '../waitForVisibleElement'

describe('waitForVisibleElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.useFakeTimers()
    // Stub performance.now() to simulate time progression
    let now = 0
    vi.stubGlobal('performance', {
      now: () => now,
    })
    // Mock setTimeout to increment our fake clock
    const realSetTimeout = setTimeout
    vi.stubGlobal('setTimeout', (fn: any, delay: number) => {
      now += delay
      return realSetTimeout(fn, 0)
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('resolves when the element becomes visible', async () => {
    const promise = waitForVisibleElement('visible-element')

    // Inject the element after a short "timeout"
    setTimeout(() => {
      const el = document.createElement('div')
      el.id = 'visible-element'
      el.style.display = 'block'
      el.style.visibility = 'visible'
      el.style.opacity = '1'
      document.body.appendChild(el)
    }, 100)

    // Run all pending timers (these now also simulate time passing)
    vi.runAllTimers()

    // Finally resolve the promise
    const el = await promise
    expect(el).toBeInstanceOf(HTMLElement)
    expect(el.id).toBe('visible-element')
  })

  it('resolves using a custom displayCheck function', async () => {
    const el = document.createElement('div')
    el.id = 'custom-display-check'
    el.style.display = 'none'
    document.body.appendChild(el)

    setTimeout(() => {
      el.style.display = 'block'
    }, 50)

    const customCheck = (style: CSSStyleDeclaration) => style.display === 'block'

    const promise = waitForVisibleElement('custom-display-check', {
      timeout: 200,
      interval: 10,
      displayCheck: customCheck,
    })

    vi.runAllTimers()

    const resolvedEl = await promise
    expect(resolvedEl).toBe(el)
  })

  it('rejects if element does not become visible within timeout', async () => {
    const timeout = 100
    const interval = 10

    const promise = waitForVisibleElement('missing-element', { timeout, interval })

    // Advance timers step-by-step to trigger polling and eventually timeout
    let rejected = false
    promise.catch(() => {
      rejected = true
    })

    for (let elapsed = 0; elapsed <= timeout + interval; elapsed += interval) {
      vi.advanceTimersByTime(interval)
      // flush any microtasks after advancing timers
      await Promise.resolve()
    }

    // Now the promise should be rejected
    await expect(promise).rejects.toThrow(`Element #missing-element not visible within ${timeout}ms`)
  })

})
