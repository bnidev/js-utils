import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onOrientationChange } from '../onOrientationChange'

describe('onOrientationChange', () => {
  let originalScreen: typeof window.screen

  beforeEach(() => {
    originalScreen = window.screen
    // @ts-ignore
    window.screen = {
      orientation: {
        type: 'portrait-primary',
        angle: 0,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        onchange: null,
        unlock: vi.fn(),
        dispatchEvent: vi.fn()
      }
    }
  })

  afterEach(() => {
    window.screen = originalScreen
    vi.restoreAllMocks()
  })

  it('should register and cleanup orientation change listener', () => {
    const callback = vi.fn()
    const listener = onOrientationChange(callback)
    expect(window.screen.orientation.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
    expect(listener).toBeDefined()
    listener?.stop()
    expect(window.screen.orientation.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('should return undefined if Screen Orientation API is not supported', () => {
    // @ts-ignore
    window.screen = {}
    const callback = vi.fn()
    const listener = onOrientationChange(callback)
    expect(listener).toBeUndefined()
  })
})
