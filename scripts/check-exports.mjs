import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src')
const errors = []

const readBarrelTargets = (file) => {
  const content = readFileSync(file, 'utf8')
  return [
    ...content.matchAll(/export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g)
  ].map((m) => m[1])
}

const isDir = (path) => {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

// Every module barrel must be re-exported from the package root, and every
// root re-export must point at a real module barrel.
const rootTargets = readBarrelTargets(join(root, 'index.ts'))
for (const entry of readdirSync(root)) {
  if (
    entry === '__tests__' ||
    entry === 'index.ts' ||
    !isDir(join(root, entry))
  ) {
    continue
  }
  try {
    statSync(join(root, entry, 'index.ts'))
  } catch {
    continue
  }
  if (!rootTargets.includes(entry)) {
    errors.push(`src/index.ts does not re-export './${entry}'`)
  }
}
for (const target of rootTargets) {
  try {
    statSync(join(root, target, 'index.ts'))
  } catch {
    errors.push(
      `src/index.ts re-exports './${target}', which has no index.ts barrel`
    )
  }
}

// Every utility file must be re-exported from its module barrel.
for (const entry of readdirSync(root)) {
  const dir = join(root, entry)
  if (entry === '__tests__' || !isDir(dir)) {
    continue
  }
  let barrel
  try {
    barrel = join(dir, 'index.ts')
    statSync(barrel)
  } catch {
    continue
  }
  const targets = readBarrelTargets(barrel)
  for (const file of readdirSync(dir)) {
    if (
      !file.endsWith('.ts') ||
      file === 'index.ts' ||
      file.endsWith('.test.ts')
    ) {
      continue
    }
    const name = file.slice(0, -'.ts'.length)
    if (!targets.includes(name)) {
      errors.push(`src/${entry}/index.ts does not re-export './${name}'`)
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`)
  }
  process.exit(1)
}

console.log('all barrel exports are wired up')
