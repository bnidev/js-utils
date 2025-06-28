import { describe, expect, it } from 'vitest'
import { waitForElementRemoved } from '../waitForElementRemoved'

describe('waitForElementRemoved', () => {
  it('resolves when element is removed', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    container.innerHTML = `<div id="toRemove"></div>`

    const element = container.querySelector('#toRemove')

    if (!element) {
      throw new Error('Element not found in the test setup')
    }

    const promise = waitForElementRemoved(element)

    setTimeout(() => {
      element.remove()
    }, 100)

    await expect(promise).resolves.toBeUndefined()

    document.body.removeChild(container)
  })

  it('resolves immediately if element does not exist (selector)', async () => {
    const promise = waitForElementRemoved('#nonexistent')
    await expect(promise).resolves.toBeUndefined()
  })

  it('rejects after timeout if element is not removed', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    container.innerHTML = `<div id="stay"></div>`

    const element = container.querySelector('#stay')

    if (!element) {
      throw new Error('Element not found in the test setup')
    }

    const promise = waitForElementRemoved(element, 200)

    await expect(promise).rejects.toThrow(
      'Timeout waiting for element to be removed'
    )

    document.body.removeChild(container)
  })
})
