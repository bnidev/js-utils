import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { onOrientationChange } from '../onOrientationChange'

describe('onOrientationChange', () => {
  const mockOrientation = {
    type: 'portrait-primary',
    angle: 0,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    onchange: null,
    unlock: vi.fn(),
    dispatchEvent: vi.fn()
  }

  beforeEach(() => {
    vi.stubGlobal('screen', {
      orientation: mockOrientation,
      availHeight: 0,
      availWidth: 0,
      colorDepth: 0,
      height: 0,
      width: 0,
      pixelDepth: 0
    } as unknown as Screen)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('should register and cleanup orientation change listener', () => {
    const callback = vi.fn()
    const listener = onOrientationChange(callback)
    expect(globalThis.screen.orientation.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
    expect(listener).toBeDefined()
    listener?.stop()
    expect(
      globalThis.screen.orientation.removeEventListener
    ).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should return undefined if Screen Orientation API is not supported', () => {
    vi.stubGlobal('screen', {} as Screen)
    const callback = vi.fn()
    const listener = onOrientationChange(callback)
    expect(listener).toBeUndefined()
  })
})
