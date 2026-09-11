# @bnidev/js-utils

A collection of modern, typed JavaScript utility functions for working with arrays, DOM elements, objects, and timing.

[![npm version](https://img.shields.io/npm/v/@bnidev/js-utils.svg)](https://www.npmjs.com/package/@bnidev/js-utils)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/bnidev/js-utils/actions/workflows/ci.yaml/badge.svg)](https://github.com/bnidev/js-utils/actions/workflows/ci.yaml)

## ✨ Features

- ✅ Fully typed with TypeScript
- 📦 Tree-shakable (ESM support)
- 🧩 Modular structure (array, DOM, object, validation, etc.)
- 📚 Auto-generated documentation via [TypeDoc](https://typedoc.org)
- 🧪 Tested with [Vitest](https://vitest.dev)

## 📦 Installation

### npm

```bash
npm install @bnidev/js-utils
```

### pnpm

```bash
pnpm add @bnidev/js-utils
```

### yarn

```bash
yarn add @bnidev/js-utils
```

### No install: copy a single function

Don't want another dependency for one or two functions? Every function page in the
[documentation](https://bnidev.github.io/js-utils) has a **"Copy self-contained function"**
block: the function's code with its internal dependencies already inlined, stamped with
the version it was copied from. Paste it into your project and it works standalone.

Two tiers apply:

- **Paste-first** (arrays, strings, math, timing, plain object helpers): copying is the
  intended lightweight use. Re-copy when you upgrade for bug fixes.
- **Install-recommended** (sanitize, storage, URL/email validation, DOM):
  these guard security or browser-state behavior, so stale copies can stay vulnerable.
  The copy block says so explicitly — for production use, install the package so updates
  reach you.

## 🛠 Usage

```ts
import { debounceFn, flattenArray, deepClone } from "@bnidev/js-utils";

// Debounce any function
const log = (val: string) => console.log(val);
const debouncedLog = debounceFn(log, 300);

// Flatten nested arrays
flattenArray([1, [2, 3], [[4]], 5]); // → [1, 2, 3, 4, 5]

// Deep clone objects
const copy = deepClone({ a: { b: 1 } });
```

## 📚 Documentation

You can find the full documentation for all utility functions, including parameters and return types here:<br/>
👉 [View full documentation](https://bnidev.github.io/js-utils)

Generated automatically using [TypeDoc](https://typedoc.org/).

## 🧪 Development & Testing

Run lint and formatting checks:

```bash
pnpm run check
```

Run lint and formatting checks & autofix if possible:

```bash
pnpm run check:fix
```

Run tests with coverage report:

```bash
pnpm run test:coverage
```

Build the package:

```bash
pnpm run build
```

Generate docs:

```bash
pnpm run docs:build
```
