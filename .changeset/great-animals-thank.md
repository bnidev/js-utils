---
"@bnidev/js-utils": major
---

feat(dom)!: replace `toggleScrollLock` with `lockBodyScroll` and `unlockBodyScroll`

**BREAKING CHANGE:** `toggleScrollLock(boolean)` has been removed. Replace usages as follows:
- `toggleScrollLock(true)` → `lockBodyScroll()`
- `toggleScrollLock(false)` → `unlockBodyScroll()`
