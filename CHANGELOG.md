# @bnidev/js-utils

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
