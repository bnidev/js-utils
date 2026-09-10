# @bnidev/js-utils

## 1.0.0 (2026-09-10)

### 🚨 Breaking Changes

- Replace `toggleScrollLock` with `lockBodyScroll` and `unlockBodyScroll` (4899224)

### ❓ Uncategorized

- **BREAKING CHANGE:** `toggleScrollLock(boolean)` has been removed. Replace usages as follows: (4899224)
- - `toggleScrollLock(true)` → `lockBodyScroll()` (4899224)
- - `toggleScrollLock(false)` → `unlockBodyScroll()` (4899224)
- Internal fixes with no behavioral changes: modern globals (`globalThis`, `Number.*`, (4899224)
- `Math.hypot`, `replaceAll`, `RegExp.exec`), readonly modifiers, type improvements, (4899224)
- Extracted constants, and reduced cognitive complexity in `loadModules` and `isEqual`. (4899224)

### ✨ Features

- Add `hexToRgb`, `rgbToHex`, `lighten`, and `darken` utilities (12287e2)
- Add `formatDate`, `relativeTime`, and `isValidDate` utilities (69162f2)
- Add `camelCase`, `kebabCase`, `snakeCase`, `slugify`, `template`, and `repeat` utilities (5811641)
- Add `getCookie`, `setCookie`, `getStorage`, and `setStorage` utilities (eae8e02)
- Add `merge`, `isEmpty`, `invert`, `defaults`, and `setNestedValue` utilities (c92843b)

### 🛠️ Fixes

- SonarQube static analysis compliance across src/ (4899224)

## 0.3.0 (2025-08-08)

### ✨ Features

- **DOM:** Add `onOrientationChange` utility to listen for device orientation changes (#28) (929622d)
- **DOM:** Add `onResize` utility with support for `window`, `document`, and `HTMLElement` resize (#28) (929622d)
- **String:** Add `escapeHtml` utility to escape special HTML characters (#27) (5ac2432)
- **Sanitize:** Add `sanitizeJson` utility for safe JSON parsing (#22) (3b15f92)
- **Sanitize:** Add `sanitizeHtml` utility for rich-text HTML cleaning (#22) (3b15f92)
- **Sanitize:** Add `sanitizeUrl` utility with protocol allowlist (#22) (3b15f92)

## 0.2.0 (2025-07-04)

### ✨ Features

- **DOM:** Accept both CSS selector strings and HTMLElements as input (all utilities) (#19) (d6149dc)
- **DOM:** Add `onScrollComplete` callback and error handling in `scrollToElementAfterRender` (#19) (d6149dc)
- **DOM:** Return `null` or empty array when elements are not found (`getElementDimensions`, `getFocusableElements`, `isElementInViewport`) (#19) (d6149dc)
- **DOM:** Return an object in `focusElement` to provide useful feedback and enable follow-up handling (#19) (d6149dc)
- **DOM:** Add error handling and return error in `focusElement` if `focus()` throws (#19) (d6149dc)
- **Math:** Add `degreesToRadians` and `radiansToDegrees` utilities to convert between degrees and radians (#18) (0114415)
- **Math:** Add `haversineDistance` utility to calculate the distance between two geographic coordinates (#18) (0114415)
- **Math:** Add `distance` utility to calculate the distance between two points (#18) (0114415)
- **Math:** Add `pointInCircle` utility to check whether a point lies inside or on the boundary of a circle (#18) (0114415)
- **String:** `stripHtmlTags` now supports an optional `maxLength` parameter to mitigate regex denial-of-service (ReDoS) risks (#17) (ec109d1)

### 🛠️ Fixes

- **DOM:** Safely handle null parent nodes in `toggleInertAround` to prevent errors (#19) (d6149dc)

## 0.1.0 (2025-06-28)

### ✨ Features

- **Array:** Add `chunkArray` utility to split an array into chunks (#7) (1eb48e3)
- **Array:** Add `compactArray` utility to remove falsy values from an array (#7) (1eb48e3)
- **Array:** Add `differenceArray`, `intersectionArray`, and `uniqueArray` utilities for array set operations (#7) (1eb48e3)
- **Array:** Add `shuffleArray` utility to shuffle an array (#7) (1eb48e3)
- **Async:** Add `retryAsyncFn` utility to retry an async function with exponential backoff (#6) (a73eedc)
- **Async:** Add `timeoutAsyncFn` utility to run an async function with a timeout (#6) (a73eedc)
- **Async:** Add `wait` utility to create a delay (#6) (a73eedc)
- **DOM:** Add utilities: `getElementDimensions`, `getFocusableElements`, `isElementInViewport`, `loadModules`, `toggleScrollLock`, and `waitForElementRemoved` (#11) (c5c7f47)
- **DOM:** Expand `waitForVisibleElement` to accept a CSS selector or an `HTMLElement` (#11) (c5c7f47)
- **Object:** Add `getNestedValue`, `mapValues`, `omit`, and `pick` utilities for object manipulation (#10) (130d9dc)
- **String:** Add `capitalize`, `stripHtmlTags`, and `truncate` utilities for string manipulation (#9) (2fbb25c)
- **Timing:** Add `everyNthCall` utility to invoke a function every Nth time it's called (#12) (7af2d86)
- **Timing:** Add `intervalFn` utility for managing interval timers with cancel support (#12) (7af2d86)
- **Validation:** Add `isEmail`, `isEqual`, and `isUrl` utilities for data validation (#8) (3766f07)

### 🧪 Tests

- Add complete unit tests for array, DOM, object, and timing utilities (#5) (fe0773c)

### 🏡 Chores

- Set up `vitest` configuration with coverage reporting (#4) (6759b42)
- Add `changeset-formatter` to improve changelog formatting (#13) (88c9c4c)

### 🤖 CI

- Add GitHub Actions workflow to run tests with `vitest` (#4) (6759b42)

## 0.0.1 (2025-06-20)

- Initial release of `@bnidev/js-utils`, a collection of modern, typed JavaScript utility functions including array manipulation, DOM helpers, object utilities, and timing functions.
