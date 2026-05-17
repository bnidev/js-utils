import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { lockBodyScroll, unlockBodyScroll } from '../bodyScrollLock'

function mockViewportWidths(innerWidth: number, clientWidth: number): void {
  Object.defineProperty(globalThis, 'innerWidth', {
    configurable: true,
    writable: true,
    value: innerWidth
  })
  Object.defineProperty(document.documentElement, 'clientWidth', {
    configurable: true,
    writable: true,
    value: clientWidth
  })
}

describe('bodyScrollLock', () => {
  let originalOverflow: string
  let originalPaddingRight: string
  let originalInnerWidth: number
  let originalClientWidth: number

  beforeEach(() => {
    originalOverflow = document.body.style.overflow
    originalPaddingRight = document.body.style.paddingRight
    originalInnerWidth = globalThis.innerWidth
    originalClientWidth = document.documentElement.clientWidth

    // Clear any dataset state from previous tests
    delete document.body.dataset.scrollLock
    delete document.body.dataset.originalOverflow
    delete document.body.dataset.originalPaddingRight
  })

  afterEach(() => {
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight

    Object.defineProperty(globalThis, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      writable: true,
      value: originalClientWidth
    })

    delete document.body.dataset.scrollLock
    delete document.body.dataset.originalOverflow
    delete document.body.dataset.originalPaddingRight
  })

  it('locks scroll: sets overflow hidden and adjusts paddingRight when scrollbar present', () => {
    mockViewportWidths(1000, 980)

    document.body.style.paddingRight = '5px'

    lockBodyScroll()

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('20px')

    expect(document.body.dataset.scrollLock).toBe('true')
    expect(document.body.dataset.originalOverflow).toBe(originalOverflow)
    expect(document.body.dataset.originalPaddingRight).toBe('5px')
  })

  it('locks scroll: does not add paddingRight if no scrollbar', () => {
    mockViewportWidths(1000, 1000)

    document.body.style.paddingRight = '5px'

    lockBodyScroll()

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('5px')

    expect(document.body.dataset.scrollLock).toBe('true')
    expect(document.body.dataset.originalOverflow).toBe(originalOverflow)
    expect(document.body.dataset.originalPaddingRight).toBe('5px')
  })

  it('does not override lock if already locked', () => {
    mockViewportWidths(1000, 980)

    document.body.style.paddingRight = '5px'

    lockBodyScroll()

    document.body.style.paddingRight = '50px'

    lockBodyScroll()

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('50px')
    expect(document.body.dataset.scrollLock).toBe('true')
  })

  it('unlocks scroll: restores original styles and removes dataset attributes', () => {
    document.body.dataset.scrollLock = 'true'
    document.body.dataset.originalOverflow = 'original-overflow'
    document.body.dataset.originalPaddingRight = '15px'

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '20px'

    unlockBodyScroll()

    expect(document.body.style.overflow).toBe('original-overflow')
    expect(document.body.style.paddingRight).toBe('15px')

    expect('scrollLock' in document.body.dataset).toBe(false)
    expect('originalOverflow' in document.body.dataset).toBe(false)
    expect('originalPaddingRight' in document.body.dataset).toBe(false)
  })

  it('unlocks scroll: does nothing if not locked', () => {
    expect('scrollLock' in document.body.dataset).toBe(false)

    document.body.style.overflow = 'foo'
    document.body.style.paddingRight = '10px'

    unlockBodyScroll()

    expect(document.body.style.overflow).toBe('foo')
    expect(document.body.style.paddingRight).toBe('10px')
  })

  it('lock scroll twice: second call does not override dataset attributes', () => {
    mockViewportWidths(1000, 980)
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 980
    })

    lockBodyScroll()

    const overflowBefore = document.body.dataset.originalOverflow
    const paddingBefore = document.body.dataset.originalPaddingRight

    document.body.style.overflow = 'changed'
    document.body.style.paddingRight = 'changed'

    lockBodyScroll()

    expect(document.body.dataset.originalOverflow).toBe(overflowBefore)
    expect(document.body.dataset.originalPaddingRight).toBe(paddingBefore)
  })

  it('unlock scroll when attributes missing: no changes happen', () => {
    delete document.body.dataset.scrollLock
    document.body.style.overflow = 'foo'
    document.body.style.paddingRight = '10px'

    unlockBodyScroll()

    expect(document.body.style.overflow).toBe('foo')
    expect(document.body.style.paddingRight).toBe('10px')
  })
})
