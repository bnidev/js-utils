import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onElementResize, onResize, onWindowResize } from '../onResize'

/**
 * We create a minimal mock ResizeObserverEntry to satisfy typings.
 * Note: In practice ResizeObserverEntry is a browser-native interface.
 */
function createResizeObserverEntry(
  target: Element,
  contentRect: DOMRect
): ResizeObserverEntry {
  return {
    target,
    contentRect,
    borderBoxSize: [],
    contentBoxSize: [],
    devicePixelContentBoxSize: []
  } as ResizeObserverEntry // forced only here, shape matches minimal interface
}

class ResizeObserverMock {
  private callback: ResizeObserverCallback
  private elements = new Set<Element>()

  static instances: ResizeObserverMock[] = []

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    ResizeObserverMock.instances.push(this)
  }

  observe = vi.fn((element: Element) => {
    this.elements.add(element)
  })

  unobserve = vi.fn((element: Element) => {
    this.elements.delete(element)
  })

  disconnect = vi.fn(() => {
    this.elements.clear()
  })

  trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this as unknown as ResizeObserver)
  }
}

// Properly extend global to include ResizeObserver for testing environment
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ResizeObserver: typeof ResizeObserverMock
    }
  }
}

beforeEach(() => {
  global.ResizeObserver = ResizeObserverMock
  ResizeObserverMock.instances = []
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('onResize', () => {
  it('calls callback on window resize', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const cleanup = onResize(callback, { delay: 100 })

    window.dispatchEvent(new Event('resize'))
    vi.advanceTimersByTime(99)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledOnce()

    cleanup()
    callback.mockClear()

    window.dispatchEvent(new Event('resize'))
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled() // cleaned up
  })

  it('calls callback on element resize', () => {
    const callback = vi.fn()
    const div = document.createElement('div')
    document.body.appendChild(div)

    const cleanup = onResize(callback, { element: div })
    const observerInstance = ResizeObserverMock.instances[0]

    observerInstance.trigger([
      createResizeObserverEntry(div, div.getBoundingClientRect())
    ])

    expect(callback).toHaveBeenCalledOnce()
    cleanup()
  })

  it('warns on invalid element', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const callback = vi.fn()

    // Passing a plain object not assignable to element types triggers warning
    onResize(callback, { element: {} as unknown as HTMLElement })

    expect(warnSpy).toHaveBeenCalledWith(
      'Invalid element provided for onResize. Expected window, document, or HTMLElement.'
    )

    warnSpy.mockRestore()
  })
})

describe('onWindowResize', () => {
  it('debounces window resize events', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const cleanup = onWindowResize(callback, 100)

    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('resize'))
    vi.advanceTimersByTime(99)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledOnce()

    cleanup()
  })
})

describe('onElementResize', () => {
  it('observes and disconnects element resize', () => {
    const callback = vi.fn()
    const div = document.createElement('div')
    document.body.appendChild(div)

    const cleanup = onElementResize(div, callback)
    const observerInstance = ResizeObserverMock.instances[0]

    expect(observerInstance.observe).toHaveBeenCalledWith(div)

    observerInstance.trigger([
      createResizeObserverEntry(div, div.getBoundingClientRect())
    ])

    expect(callback).toHaveBeenCalledOnce()

    cleanup()
    expect(observerInstance.disconnect).toHaveBeenCalled()
  })
})
