import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadModules } from '../loadModules'

describe('loadModules', () => {
  let container: HTMLElement

  beforeEach(() => {
    // Set up DOM container
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // Clean up DOM
    document.body.removeChild(container)
    vi.resetAllMocks()
  })

  it('loads modules from elements with specified data attribute and calls their default export', async () => {
    const mockModuleFn = vi.fn()

    // Mock importer function to simulate dynamic import
    const mockImporter = vi.fn((path: string) => {
      if (
        path === './mockModules/testModule.ts' ||
        path === './mockModules/testModule.js'
      ) {
        return Promise.resolve({ default: mockModuleFn })
      }
      return Promise.reject(new Error('Module not found'))
    })

    container.innerHTML = `<div data-loadmodule="testModule"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).toHaveBeenCalled() // Check importer was called
    expect(mockModuleFn).toHaveBeenCalledTimes(1)
    expect(mockModuleFn).toHaveBeenCalledWith(
      container.querySelector('[data-loadmodule]')
    )

    const el = container.querySelector<HTMLElement>('[data-loadmodule]')
    expect(el?.dataset.loadmoduleHasLoaded).toBe('true')
  })

  it('logs warning when module import fails', async () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    // Mock importer that always rejects to simulate import failure
    const failingImporter = vi.fn(async () => {
      throw new Error('fail')
    })

    container.innerHTML = `
      <div data-loadmodule="failModule"></div>
    `

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: failingImporter
    })

    const el = container.querySelector<HTMLElement>('[data-loadmodule]')
    expect(el?.dataset.loadmoduleHasLoaded).toBe('true')

    expect(consoleWarnSpy).toHaveBeenCalled()
    consoleWarnSpy.mockRestore()
  })

  it('handles multiple modules in a single attribute', async () => {
    const mockFn1 = vi.fn()
    const mockFn2 = vi.fn()

    const mockImporter = vi.fn((path: string) => {
      if (path.endsWith('mod1.ts') || path.endsWith('mod1.js')) {
        return Promise.resolve({ default: mockFn1 })
      }
      if (path.endsWith('mod2.ts') || path.endsWith('mod2.js')) {
        return Promise.resolve({ default: mockFn2 })
      }
      return Promise.reject(new Error('not found'))
    })

    container.innerHTML = `<div data-loadmodule="mod1, mod2"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockFn1).toHaveBeenCalled()
    expect(mockFn2).toHaveBeenCalled()
  })

  it('skips elements with empty data attribute', async () => {
    const mockImporter = vi.fn()

    container.innerHTML = `<div data-loadmodule=""></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).not.toHaveBeenCalled()
  })

  it('does not reload modules that are already marked as loaded', async () => {
    const mockImporter = vi.fn()

    container.innerHTML = `<div data-loadmodule="testModule" data-loadmodule-has-loaded="true"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).not.toHaveBeenCalled()
  })

  it('supports custom attribute and loadedAttrSuffix', async () => {
    const mockFn = vi.fn()
    const mockImporter = vi.fn(() => Promise.resolve({ default: mockFn }))

    container.innerHTML = `<div data-custommod="customModule"></div>`

    await loadModules({
      attribute: 'data-custommod',
      loadedAttrSuffix: 'Done',
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    const el = container.querySelector<HTMLElement>('[data-custommod]')
    expect(el?.dataset.custommodDone).toBe('true')
  })

  it('handles empty moduleDirs gracefully', async () => {
    const mockImporter = vi.fn()

    container.innerHTML = `<div data-loadmodule="testModule"></div>`

    await loadModules({
      moduleDirs: [],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).not.toHaveBeenCalled()
  })

  it('loads multiple comma-separated modules from one element', async () => {
    const mockModuleA = vi.fn()
    const mockModuleB = vi.fn()
    const mockImporter = vi.fn((path: string) => {
      if (path.includes('modA'))
        return Promise.resolve({ default: mockModuleA })
      if (path.includes('modB'))
        return Promise.resolve({ default: mockModuleB })
      return Promise.reject(new Error('not found'))
    })

    container.innerHTML = `<div data-loadmodule="modA, modB"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockModuleA).toHaveBeenCalled()
    expect(mockModuleB).toHaveBeenCalled()
  })

  it('tries both .ts and .js before warning if module not found', async () => {
    const mockImporter = vi.fn(() => Promise.reject(new Error('fail')))
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    container.innerHTML = `<div data-loadmodule="missingModule"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).toHaveBeenCalledTimes(2) // tries .ts then .js
    expect(warnSpy).toHaveBeenCalledWith(
      '[loadModules] Failed to load module "missingModule" from:',
      ['./mockModules']
    )

    warnSpy.mockRestore()
  })

  it('respects custom attribute and loadedAttrSuffix', async () => {
    const mockModule = vi.fn()
    const mockImporter = vi.fn(() => Promise.resolve({ default: mockModule }))

    container.innerHTML = `<div data-custom-module="myModule"></div>`

    await loadModules({
      attribute: 'data-custom-module',
      loadedAttrSuffix: 'WasRun',
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    const el = container.querySelector<HTMLElement>('[data-custom-module]')
    expect(mockModule).toHaveBeenCalledWith(el)
    expect(el?.dataset.customModuleWasRun).toBe('true')
  })

  it('skips elements missing the module attribute', async () => {
    const mockImporter = vi.fn()

    container.innerHTML = `<div></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockImporter).not.toHaveBeenCalled()
  })

  it('awaits async module default export', async () => {
    const mockAsyncModule = vi.fn(async () => {
      await new Promise((r) => setTimeout(r, 5))
    })

    const mockImporter = vi.fn(() =>
      Promise.resolve({ default: mockAsyncModule })
    )

    container.innerHTML = `<div data-loadmodule="asyncMod"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(mockAsyncModule).toHaveBeenCalled()
  })

  it('supports async module default export', async () => {
    const asyncFn = vi.fn(async () => Promise.resolve())
    const mockImporter = vi.fn(() => Promise.resolve({ default: asyncFn }))

    container.innerHTML = `<div data-loadmodule="asyncMod"></div>`

    await loadModules({
      moduleDirs: ['./mockModules'],
      rootElement: container,
      importer: mockImporter
    })

    expect(asyncFn).toHaveBeenCalled()
  })
})
