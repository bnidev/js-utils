import { describe, expect, it } from 'vitest'
import * as publicApi from '../index'

// Every utility module outside of barrels and tests. index.ts barrels are
// excluded because `export *` intentionally skips them as files (their
// symbols are covered through the modules they re-export).
const utilityModules = import.meta.glob('../*/*.ts')

describe('public API surface', () => {
  it('re-exports every utility from the package root', async () => {
    const api = publicApi as Record<string, unknown>
    const missing: string[] = []

    for (const path of Object.keys(utilityModules)) {
      if (path.endsWith('/index.ts')) {
        continue
      }
      // src/internal/ holds shared helpers with no barrel: internal seams,
      // deliberately absent from the public surface.
      if (path.includes('/internal/')) {
        continue
      }
      const loader = utilityModules[path] as () => Promise<
        Record<string, unknown>
      >
      const mod = await loader()
      for (const name of Object.keys(mod)) {
        if (!(name in api)) {
          missing.push(`${name} (${path})`)
        }
      }
    }

    expect(missing).toEqual([])
  })
})
