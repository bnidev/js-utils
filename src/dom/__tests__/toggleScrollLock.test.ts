import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { toggleScrollLock } from '../toggleScrollLock'

describe('toggleScrollLock (data-attribute state)', () => {
  let originalOverflow: string
  let originalPaddingRight: string
  let originalInnerWidth: number
  let originalClientWidth: number

  beforeEach(() => {
    // Save original styles and properties
    originalOverflow = document.body.style.overflow
    originalPaddingRight = document.body.style.paddingRight
    originalInnerWidth = window.innerWidth
    originalClientWidth = document.documentElement.clientWidth

    // Clear any data attributes from previous tests
    document.body.removeAttribute('data-scroll-lock')
    document.body.removeAttribute('data-original-overflow')
    document.body.removeAttribute('data-original-padding-right')
  })

  afterEach(() => {
    // Restore original styles and properties
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      writable: true,
      value: originalClientWidth
    })

    // Remove data attributes
    document.body.removeAttribute('data-scroll-lock')
    document.body.removeAttribute('data-original-overflow')
    document.body.removeAttribute('data-original-padding-right')
  })

  it('locks scroll: sets overflow hidden and adjusts paddingRight when scrollbar present', () => {
    // Mock scrollbar presence: scrollbar width = 20px
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      writable: true,
      value: 980
    })

    // Set some original paddingRight to test preservation
    document.body.style.paddingRight = '5px'

    toggleScrollLock(true)

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('20px') // scrollbar width overrides original paddingRight

    // Data attributes set correctly
    expect(document.body.getAttribute('data-scroll-lock')).toBe('true')
    expect(document.body.getAttribute('data-original-overflow')).toBe(
      originalOverflow
    )
    expect(document.body.getAttribute('data-original-padding-right')).toBe(
      '5px'
    )
  })

  it('locks scroll: does not add paddingRight if no scrollbar', () => {
    // No scrollbar: innerWidth == clientWidth
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      writable: true,
      value: 1000
    })

    document.body.style.paddingRight = '5px'

    toggleScrollLock(true)

    expect(document.body.style.overflow).toBe('hidden')
    // paddingRight remains unchanged because scrollbar width is 0
    expect(document.body.style.paddingRight).toBe('5px')

    expect(document.body.getAttribute('data-scroll-lock')).toBe('true')
    expect(document.body.getAttribute('data-original-overflow')).toBe(
      originalOverflow
    )
    expect(document.body.getAttribute('data-original-padding-right')).toBe(
      '5px'
    )
  })

  it('does not override lock if already locked', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      writable: true,
      value: 980
    })

    document.body.style.paddingRight = '5px'

    // First lock
    toggleScrollLock(true)

    // Change paddingRight manually (simulate other code)
    document.body.style.paddingRight = '50px'

    // Second lock should do nothing
    toggleScrollLock(true)

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('50px') // unchanged

    // data attributes still present
    expect(document.body.getAttribute('data-scroll-lock')).toBe('true')
  })

  it('unlocks scroll: restores original styles and removes data attributes', () => {
    // Prepare locked state
    document.body.setAttribute('data-scroll-lock', 'true')
    document.body.setAttribute('data-original-overflow', 'original-overflow')
    document.body.setAttribute('data-original-padding-right', '15px')

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '20px'

    toggleScrollLock(false)

    expect(document.body.style.overflow).toBe('original-overflow')
    expect(document.body.style.paddingRight).toBe('15px')

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false)
    expect(document.body.hasAttribute('data-original-overflow')).toBe(false)
    expect(document.body.hasAttribute('data-original-padding-right')).toBe(
      false
    )
  })

  it('unlocks scroll: does nothing if not locked', () => {
    // Make sure no data attributes present
    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false)

    // Set some valid styles to see if they remain unchanged
    document.body.style.overflow = 'foo'
    document.body.style.paddingRight = '10px'

    toggleScrollLock(false)

    expect(document.body.style.overflow).toBe('foo')
    expect(document.body.style.paddingRight).toBe('10px')
  })

  it('lock scroll twice: second call does not override data attributes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      writable: true,
      configurable: true,
      value: 980
    })

    toggleScrollLock(true)

    const overflowBefore = document.body.getAttribute('data-original-overflow')
    const paddingBefore = document.body.getAttribute(
      'data-original-padding-right'
    )

    // Change styles to nonsense, to check if second lock call changes them
    document.body.style.overflow = 'changed'
    document.body.style.paddingRight = 'changed'

    toggleScrollLock(true)

    // Attributes should be unchanged
    expect(document.body.getAttribute('data-original-overflow')).toBe(
      overflowBefore
    )
    expect(document.body.getAttribute('data-original-padding-right')).toBe(
      paddingBefore
    )
  })

  it('unlock scroll when attributes missing: no changes happen', () => {
    // Ensure attributes are not present
    document.body.removeAttribute('data-scroll-lock')
    document.body.style.overflow = 'foo'
    document.body.style.paddingRight = '10px'

    toggleScrollLock(false)

    expect(document.body.style.overflow).toBe('foo')
    expect(document.body.style.paddingRight).toBe('10px')
  })
})
