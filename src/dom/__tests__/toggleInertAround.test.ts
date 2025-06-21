import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { toggleInertAround } from '../toggleInertAround'

describe('toggleInertAround', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'root'

    container.innerHTML = `
      <div id="level1a">
        <div id="level2a">
          <div id="target"></div>
          <div id="sibling2a"></div>
        </div>
        <div id="level2b"></div>
      </div>
      <div id="level1b"></div>
    `

    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  it('toggles inert attribute on siblings of the target and its ancestors', () => {
    const sibling2a = document.getElementById('sibling2a')!
    const level2b = document.getElementById('level2b')!
    const level1b = document.getElementById('level1b')!

    // Initial: no inert attributes
    expect(sibling2a.hasAttribute('inert')).toBe(false)
    expect(level2b.hasAttribute('inert')).toBe(false)
    expect(level1b.hasAttribute('inert')).toBe(false)

    toggleInertAround('target')

    // Siblings should now have inert
    expect(sibling2a.hasAttribute('inert')).toBe(true)
    expect(level2b.hasAttribute('inert')).toBe(true)
    expect(level1b.hasAttribute('inert')).toBe(true)

    // Toggle again to remove inert
    toggleInertAround('target')

    expect(sibling2a.hasAttribute('inert')).toBe(false)
    expect(level2b.hasAttribute('inert')).toBe(false)
    expect(level1b.hasAttribute('inert')).toBe(false)
  })

  it('does nothing if the target does not exist', () => {
    // Should not throw
    expect(() => toggleInertAround('non-existent')).not.toThrow()
  })
})
