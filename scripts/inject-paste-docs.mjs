import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildPasteBundles, tierFor } from './build-paste.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

const START = '<!-- PASTE-BLOCK-START -->'
const END = '<!-- PASTE-BLOCK-END -->'

const TIER2_WARNING = `<div class="tsd-comment tsd-typography"><p><strong>Paste with care — prefer install for this one.</strong> This function guards security or browser-state behavior (sanitization policy, URL protocol policy, cookie/storage codec, focus/scroll handling). A paste is a snapshot: it will not receive fixes when the policy updates, and stale copies can stay vulnerable. For production use, install instead — <code>pnpm add @bnidev/js-utils</code> — so updates reach you.</p></div>`

// TypeDoc's exact text escaping, observed in generated pages:
// ' -> &#39 (no semicolon), " -> &quot;, the rest as usual.
function escapeText(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39')
}

// Themes TypeDoc highlights with (verified: their token color pairs match
// docs/assets/highlight.css exactly).
const LIGHT_THEME = 'light-plus'
const DARK_THEME = 'dark-plus'

// Invert highlight.css into color-pair -> hl-N, mirroring TypeDoc's global
// class assignment (its getClass keys on "lightColor | darkColor").
// Plain line parsing keeps this linear; marked lines from previous runs
// are included so indices stay stable.
function cssVars(css, mode) {
  const vars = {}
  const prefix = `--${mode}-hl-`
  for (const line of css.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith(prefix)) continue
    const rest = trimmed.slice(prefix.length)
    const colon = rest.indexOf(':')
    if (colon === -1) continue
    const afterColon = rest.slice(colon + 1)
    const semi = afterColon.indexOf(';')
    const value = (semi === -1 ? afterColon : afterColon.slice(0, semi)).trim()
    if (value) vars[rest.slice(0, colon)] = value
  }
  return vars
}

function cssPairIndex(docsDir) {
  try {
    const css = readFileSync(join(docsDir, 'assets', 'highlight.css'), 'utf8')
    const light = cssVars(css, 'light')
    const dark = cssVars(css, 'dark')
    const map = new Map()
    for (const [index, color] of Object.entries(light)) {
      if (dark[index]) {
        map.set(
          `${color.toUpperCase()} | ${dark[index].toUpperCase()}`,
          `hl-${index}`
        )
      }
    }
    return map.size > 0 ? map : null
  } catch {
    return null
  }
}

// Reuse the mini-shiki bundled with the repo's TypeDoc (no new dependency).
// Anything failing here falls back to plain escaped code.
let highlighterPromise = null
function loadHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const base = createRequire(import.meta.url)
      const typedocDir = dirname(base.resolve('typedoc/package.json'))
      const scoped = createRequire(join(typedocDir, 'index.js'))
      const shiki = await import(scoped.resolve('@gerrit0/mini-shiki'))
      await shiki.loadBuiltinWasm()
      const engine = await shiki.createOnigurumaEngine()
      const hl = await shiki.createShikiInternal({
        engine,
        themes: [
          shiki.bundledThemes[LIGHT_THEME],
          shiki.bundledThemes[DARK_THEME]
        ],
        langs: [shiki.bundledLanguages.typescript]
      })
      return { shiki, hl }
    })().catch((error) => {
      console.log(
        `paste highlight: mini-shiki unavailable (${error.message}), using plain code`
      )
      return null
    })
  }
  return highlighterPromise
}

// Mirror TypeDoc's ShikiHighlighter.highlight: one span per token, lines
// joined with <br/>, trailing empty lines dropped (its double pop).
// Token color pairs TypeDoc never saw (e.g. regex scopes, absent from all
// JSDoc examples) get fresh hl-N classes past the CSS base, and the matching
// rules are appended to highlight.css the same way its getStyles would.
const HL_MARK = '/*paste-hl*/'

function tokenizeAll(shiki, hl, bundles) {
  return bundles.map((b) => {
    const tokens = shiki.codeToTokensWithThemes(hl, b.code, {
      themes: { light: LIGHT_THEME, dark: DARK_THEME },
      lang: 'typescript'
    })
    while (tokens.length > 0 && tokens[tokens.length - 1].length === 0) {
      tokens.pop()
    }
    return tokens
  })
}

function pairKey(token) {
  return `${token.variants.light.color.toUpperCase()} | ${token.variants.dark.color.toUpperCase()}`
}

// Deterministic: unseen pairs sorted with an explicit comparator, so
// indices are stable across runs (bundles are deterministic output).
function compareStrings(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

const THEME_VAR = /^ {4}--hl-\d+: var\(--(?:light|dark)-hl-\d+\);$/
const COLOR_VAR = /^ {4}--(?:light|dark)-hl-\d+: [^;]+;$/
const HL_RULE = /^\.hl-\d+ \{ color: var\(--hl-\d+\); \}$/

function runEndKind(line, nextLine) {
  if (THEME_VAR.test(line) && !THEME_VAR.test(nextLine)) return 'theme'
  if (COLOR_VAR.test(line) && !COLOR_VAR.test(nextLine)) return 'color'
  if (HL_RULE.test(line) && !HL_RULE.test(nextLine)) return 'rule'
  return null
}

function appendClassLines(out, added, pairIndex, kind, anchor) {
  const themeMode =
    kind === 'theme' && anchor.includes('light-hl') ? 'light' : 'dark'
  for (const key of added) {
    const cls = pairIndex.get(key)
    if (kind === 'rule') {
      out.push(`.${cls} { color: var(--${cls}); } ${HL_MARK}`)
    } else if (kind === 'color') {
      // :root interleaves light/dark definitions in one run, so emit both.
      const [lightColor, darkColor] = key.split(' | ')
      out.push(
        `    --light-${cls}: ${lightColor}; ${HL_MARK}`,
        `    --dark-${cls}: ${darkColor}; ${HL_MARK}`
      )
    } else {
      out.push(`    --${cls}: var(--${themeMode}-${cls}); ${HL_MARK}`)
    }
  }
}

function extendPairIndex(pairIndex, allTokens) {
  const baseMax = Math.max(
    ...[...pairIndex.values()].map((cls) => Number(cls.slice(3)))
  )
  const unseen = new Set()
  for (const tokens of allTokens) {
    for (const line of tokens) {
      for (const token of line) {
        const key = pairKey(token)
        if (!pairIndex.has(key)) unseen.add(key)
      }
    }
  }
  let next = baseMax + 1
  const sorted = [...unseen].sort(compareStrings)
  for (const key of sorted) {
    pairIndex.set(key, `hl-${next}`)
    next++
  }
  return sorted
}

// Append our classes to highlight.css in getStyles shape. Old marked lines
// are stripped first, so re-runs are idempotent.
function extendHighlightCss(docsDir, pairIndex, added) {
  if (added.length === 0) return
  const file = join(docsDir, 'assets', 'highlight.css')
  const fresh = readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => !line.includes(HL_MARK))
  const out = []
  for (let i = 0; i < fresh.length; i++) {
    out.push(fresh[i])
    const kind = runEndKind(fresh[i], fresh[i + 1] ?? '')
    if (kind) appendClassLines(out, added, pairIndex, kind, fresh[i])
  }
  writeFileSync(file, out.join('\n'))
  const first = pairIndex.get(added[0])
  const last = pairIndex.get(added[added.length - 1])
  console.log(`paste highlight: extended highlight.css with ${first}..${last}`)
}

function renderTokens(tokens, pairIndex) {
  return tokens
    .map((line) =>
      line
        .map(
          (token) =>
            `<span class="${pairIndex.get(pairKey(token))}">${escapeText(token.content)}</span>`
        )
        .join('')
    )
    .join('<br/>')
}

const ANCHOR =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="../assets/icons.svg#icon-anchor"></use></svg>'

// Native TypeDoc theme markup: the h4 + pre shape of code examples
// (copy button wired by main.js at load), so no custom CSS or JS.
// codeHtml is already highlighted (or plain escaped fallback).
function blockFor(codeHtml, tier) {
  return `${START}
<div class="tsd-tag-example" style="margin-top:3rem">
<h3 class="tsd-anchor-link" id="paste">Drop-in snippet<a href="#paste" aria-label="Permalink" class="tsd-anchor-icon">${ANCHOR}</a></h3>${tier === 2 ? `\n${TIER2_WARNING}` : ''}
<pre><code class="ts">${codeHtml}</code><button type="button">Copy</button></pre>
</div>
${END}`
}

// TypeDoc renders most utilities under functions/, but constants and types
// can land under classes/, interfaces/, types/ or variables/. First hit wins.
function findPage(docsDir, name) {
  for (const section of [
    'functions',
    'classes',
    'interfaces',
    'types',
    'variables'
  ]) {
    const page = join(docsDir, section, `${name}.html`)
    if (existsSync(page)) return page
  }
  return null
}

// Anchor the block as the last element of the description. Exactly one
// tsd-sources aside exists per page; <footer> is the fallback.
function insertBlock(stripped, block) {
  if (stripped.includes('</aside></div>')) {
    return stripped.replace('</aside></div>', () => `</aside>${block}</div>`)
  }
  if (stripped.includes('<footer>')) {
    return stripped.replace('<footer>', () => `${block}<footer>`)
  }
  return null
}

export async function injectPasteBlocks(docsDir, bundles) {
  const pairIndex = cssPairIndex(docsDir)
  const loaded = pairIndex ? await loadHighlighter() : null
  // Two passes so unseen pairs get stable indices before any span renders.
  const allTokens = loaded ? tokenizeAll(loaded.shiki, loaded.hl, bundles) : []
  const added = loaded ? extendPairIndex(pairIndex, allTokens) : []
  if (loaded) extendHighlightCss(docsDir, pairIndex, added)
  const codeHtmls = loaded
    ? allTokens.map((tokens) => renderTokens(tokens, pairIndex))
    : bundles.map((b) => escapeText(b.code))
  let injected = 0
  const missing = []
  for (const [i, b] of bundles.entries()) {
    const blockForBundle = (tier) => blockFor(codeHtmls[i], tier)
    for (const name of b.names) {
      const page = findPage(docsDir, name)
      if (!page) {
        missing.push(name)
        continue
      }
      const tier = tierFor(b.dir, name)
      const block = blockForBundle(tier)
      const pattern = new RegExp(String.raw`${START}[\s\S]*?${END}`)
      // Strip any previous block first (it may sit at the old <footer>
      // anchor), then insert the new one.
      const stripped = readFileSync(page, 'utf8').replace(pattern, '')
      const next = insertBlock(stripped, block)
      if (!next) {
        missing.push(`${name} (no description or footer anchor)`)
        continue
      }
      writeFileSync(page, next)
      injected++
    }
  }
  return { injected, missing }
}

async function main() {
  const args = process.argv.slice(2)
  const docsAt = args.indexOf('--docs-dir')
  const docsDir = docsAt !== -1 ? args[docsAt + 1] : join(root, 'docs')
  const dryRun = args.includes('--dry-run')
  const bundles = buildPasteBundles()

  if (dryRun) {
    let pages = 0
    const missing = []
    for (const b of bundles) {
      for (const name of b.names) {
        if (findPage(docsDir, name)) pages++
        else missing.push(name)
      }
    }
    console.log(
      `paste inject dry-run: ${pages} pages found in ${docsDir}` +
        (missing.length > 0 ? `, missing: ${missing.join(', ')}` : '')
    )
    return
  }

  const { injected, missing } = await injectPasteBlocks(docsDir, bundles)
  console.log(`paste inject: ${injected} pages updated in ${docsDir}`)
  if (missing.length > 0) {
    console.log(`paste inject: no page found for: ${missing.join(', ')}`)
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    await main()
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}
