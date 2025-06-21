# @bnidev/js-utils

A collection of modern, typed JavaScript utility functions for working with arrays, DOM elements, objects, and timing.

[![npm version](https://img.shields.io/npm/v/@bnidev/js-utils.svg)](https://www.npmjs.com/package/@bnidev/js-utils)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/bnidev/js-utils/actions/workflows/build.yaml/badge.svg)](https://github.com/bnidev/js-utils/actions/workflows/build.yaml)

## ✨ Features

- ✅ Fully typed with TypeScript
- 🧩 Modular structure (array, DOM, object, timing)
- 🧼 Consistent formatting with [Biome](https://biomejs.dev/)
- 📚 Auto-generated documentation via [TypeDoc](https://typedoc.org)

## 📦 Installation

```bash
pnpm add @bnidev/js-utils
# or
npm install @bnidev/js-utils
# or
yarn add @bnidev/js-utils
```

## 🛠 Usage

```ts
import { debounceFn, flattenArray, deepClone } from "@bnidev/js-utils";

// Debounce an input handler
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

To run lint and formatting checks:

```bash
pnpm run check
```

To build the package:

```bash
pnpm run build
```

To generate docs:

```bash
pnpm run docs:build
```
