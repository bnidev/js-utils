---
"@bnidev/js-utils": patch
---

fix: SonarQube static analysis compliance across src/

Internal fixes with no behavioral changes: modern globals (`globalThis`, `Number.*`,
`Math.hypot`, `replaceAll`, `RegExp.exec`), readonly modifiers, type improvements,
extracted constants, and reduced cognitive complexity in `loadModules` and `isEqual`.
