type ModuleInitFn = (el: HTMLElement) => void | Promise<void>

/**
 * Options for the `loadModules` function.
 *
 * @remarks
 * This type defines the configuration for loading modules from HTML elements.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { LoadModulesOptions } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { LoadModulesOptions } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * const options: LoadModulesOptions = {
 *  attribute: 'data-custom-module',
 *  moduleDirs: ['../modules', '../shared'],
 *  rootElement: document.getElementById('app'),
 *  loadedAttrSuffix: 'HasLoaded'
 * }
 *
 * loadModules(options)
 * // This will look for elements like <div data-custom-module="myModule"></div>
 */
export type LoadModulesOptions = {
  /**
   * The data attribute to scan for.
   * Defaults to "data-loadmodule"
   */
  attribute?: string

  /**
   * One or more directories to search for modules.
   * E.g., ["../modules", "../shared"]
   */
  moduleDirs: string[]

  /**
   * Root DOM element to search inside.
   * Defaults to `document`.
   */
  rootElement?: HTMLElement | Document

  /**
   * Suffix to mark an element as having been loaded.
   * Defaults to "HasLoaded" → becomes data-loadmodule-has-loaded
   */
  loadedAttrSuffix?: string

  /**
   * Custom importer function to load modules.
   * Defaults to dynamic import.
   * Can be used to override the default import behavior, e.g., for testing or custom module loading logic.
   *
   * @internal
   */
  importer?: (path: string) => Promise<{ default: ModuleInitFn }>
}

/**
 * Loads modules specified in HTML elements with a given data attribute.
 *
 * This function scans the DOM for elements with a specific data attribute,
 * imports the specified modules from given directories, and initializes them
 * by calling the exported default function with the element as an argument.
 *
 * @param userOptions - Configuration options for loading modules. Optional.
 *
 * @param userOptions.attribute - The data attribute to scan for. Default is `"data-loadmodule"`.
 * @param userOptions.moduleDirs - One or more directories to search for modules. No default; required.
 * @param userOptions.rootElement - Root DOM element to search inside. Default is `document`.
 * @param userOptions.loadedAttrSuffix - Suffix to mark an element as loaded. Default is `"HasLoaded"`.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { loadModules } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { loadModules } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Load without additional options (uses default settings)
 * loadModules({moduleDirs: ['../modules', '../shared']})
 *
 * // Load with options
 * loadModules({
 *   attribute: 'data-custom-module',
 *   moduleDirs: ['../modules', '../shared'],
 *   rootElement: document.getElementById('app'),
 *   loadedAttrSuffix: 'HasLoaded'
 *   // This will look for elements like <div data-custom-module="myModule"></div>
 * })
 * ```
 */
export async function loadModules(
  userOptions: LoadModulesOptions
): Promise<void> {
  const options: Required<LoadModulesOptions> = {
    attribute: 'data-loadmodule',
    rootElement: document,
    loadedAttrSuffix: 'HasLoaded',
    importer: (path) => import(path),
    ...userOptions
  }

  const { attribute, moduleDirs, rootElement, loadedAttrSuffix, importer } =
    options
  const selector = `[${attribute}]`
  const elements = rootElement.querySelectorAll<HTMLElement>(selector)

  for (const el of elements) {
    const rawModules = el.getAttribute(attribute)
    if (!rawModules) continue

    const baseAttr = attribute.replace(/^data-/, '')
    const suffixCamel = loadedAttrSuffix ?? 'HasLoaded'
    const hasLoadedAttr = baseAttr + suffixCamel
    const dataset = el.dataset as Record<string, string | undefined>

    if (dataset[hasLoadedAttr]) continue

    const modules = rawModules.split(',').map((m) => m.trim())

    for (const moduleName of modules) {
      let loaded = false

      for (const dir of moduleDirs) {
        const tryImport = async (ext: '.ts' | '.js') => {
          try {
            const module = await importer(`${dir}/${moduleName}${ext}`)
            await module.default(el)
            loaded = true
            return true
          } catch {
            return false
          }
        }

        if (await tryImport('.ts')) break
        if (await tryImport('.js')) break
      }

      if (!loaded) {
        console.warn(
          `[loadModules] Failed to load module "${moduleName}" from:`,
          moduleDirs
        )
      }
    }

    dataset[hasLoadedAttr] = 'true'
  }
}
