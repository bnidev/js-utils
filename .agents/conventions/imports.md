# Import Conventions

## Order

Three groups, in this order, separated by blank lines. Biome enforces this via `organizeImports`.

1. **Built-in** — `node:*` modules
2. **External** — packages from `node_modules`
3. **Internal** — code under `src/`, using relative paths

```ts
// Built-in
import fs from 'node:fs'

// External
import { describe, it, expect } from 'vitest'

// Internal
import { hexToRgb } from '../color/hexToRgb'
import type { DistanceUnit } from './types'
```

## Rules

- **Use relative imports** — no `@/*` alias exists. Use `../` or `./` as needed.
- **Use `import type`** for type-only imports. Biome will auto-fix this where it can.
- **Use named imports where possible.** Default imports only when the module's contract is a single object.
- **No barrel files** unless shared across three or more modules. Each `import { foo } from './barrel'` hides the real source.
