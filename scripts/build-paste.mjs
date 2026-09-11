import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildSync } from 'esbuild'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const src = join(root, 'src')

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const version = pkg.version
const today = new Date().toISOString().slice(0, 10)

// Directories whose functions guard security or browser-state behavior.
// Pastes for these carry an install-recommended warning; everything else
// (plus validation/isUrl + validation/isEmail) is paste-first.
const TIER2_DIRS = new Set(['sanitize', 'storage', 'dom'])
const TIER2_VALIDATION = new Set(['isUrl', 'isEmail'])

export function tierFor(dir, name) {
  if (TIER2_DIRS.has(dir)) return 2
  if (dir === 'validation' && TIER2_VALIDATION.has(name)) return 2
  return 1
}

const isDir = (path) => {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

// Mirror scripts/check-exports.mjs: only barrel-wired files get a paste.
function wiredFiles() {
  const files = []
  for (const entry of readdirSync(src)) {
    const dir = join(src, entry)
    if (entry === '__tests__' || !isDir(dir)) continue
    let barrel
    try {
      barrel = readFileSync(join(dir, 'index.ts'), 'utf8')
    } catch {
      continue
    }
    for (const m of barrel.matchAll(
      /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g
    )) {
      files.push({ dir: entry, name: m[1], path: join(dir, `${m[1]}.ts`) })
    }
  }
  return files
}

const EXPORT_PATTERN =
  /export\s+(?:async\s+)?(?:function|const|let|var|interface|type|class|enum)\s+([A-Za-z_$][\w$]*)/g

function exportedNames(source) {
  const names = []
  for (const m of source.matchAll(EXPORT_PATTERN)) {
    names.push(m[1])
  }
  return [...new Set(names)]
}

function stamp(names) {
  return [
    `// ${names.join(', ')} — self-contained paste from @bnidev/js-utils v${version} (MIT)`,
    `// Generated ${today}. Pastes go stale: prefer \`pnpm add @bnidev/js-utils\` for production use.`,
    ''
  ].join('\n')
}

export function buildPasteBundles() {
  const bundles = []
  for (const file of wiredFiles()) {
    const source = readFileSync(file.path, 'utf8')
    const names = exportedNames(source)
    if (names.length === 0) {
      throw new Error(`no exports found in ${file.dir}/${file.name}.ts`)
    }
    const result = buildSync({
      entryPoints: [file.path],
      bundle: true,
      write: false,
      format: 'esm',
      platform: 'neutral',
      target: 'es2022',
      legalComments: 'none',
      // Dynamic import(path) in loadModules only warns during bundling;
      // real failures still throw.
      logLevel: 'error'
    })
    const code = stamp(names) + result.outputFiles[0].text.trimEnd() + '\n'
    if (/(?:import|export)[^'";]*from\s*['"]\.[^'"]*['"]/.test(code)) {
      throw new Error(
        `paste for ${file.dir}/${file.name} is not self-contained (relative import survived bundling)`
      )
    }
    bundles.push({
      dir: file.dir,
      file: file.name,
      names,
      tier: Math.max(...names.map((n) => tierFor(file.dir, n))),
      code
    })
  }
  return bundles
}

function main() {
  const args = process.argv.slice(2)
  const bundles = buildPasteBundles()
  const functions = bundles.reduce((n, b) => n + b.names.length, 0)

  const dumpAt = args.indexOf('--dump-paste-dir')
  if (dumpAt !== -1) {
    const dir = args[dumpAt + 1]
    if (!dir) throw new Error('--dump-paste-dir needs a directory argument')
    mkdirSync(dir, { recursive: true })
    for (const b of bundles) {
      writeFileSync(join(dir, `${b.file}.ts`), b.code)
    }
    console.log(`wrote ${bundles.length} paste files to ${dir}`)
  }

  if (args.includes('--check')) {
    console.log(
      `paste check ok: ${bundles.length} bundles, ${functions} functions, all self-contained`
    )
  } else if (dumpAt === -1) {
    console.log(
      `paste: ${bundles.length} bundles for ${functions} functions (v${version})`
    )
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
