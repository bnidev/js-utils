# TypeScript Conventions

## Compiler settings

Defined in `tsconfig.json`. Do not change without good reason.

- `strict: true` — no `any`, no implicit `any`
- `target: ES2022`, `module: commonjs`
- `lib: ["es2023", "dom", "dom.iterable"]`
- `noUncheckedIndexedAccess: true`
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `ignoreDeprecations: "6.0"` — required for TypeScript 6.0 compatibility

## Rules

- **No `any` types.** Use `unknown` and narrow with type guards, or define a proper type.
- **Explicit return types on all exported functions.** Private helpers may rely on inference.
- **Co-locate types with the function that uses them.** Promote to a shared file only when reused across modules.
- **Use `import type` for type-only imports** — keeps the runtime bundle smaller and makes intent obvious.
- **No `I` prefix for interfaces** — just the name (`Config`, not `IConfig`).
- **No `T` prefix for types** — the name carries the meaning (`DistanceUnit`, not `TDistanceUnit`).

## Verifying types

```bash
pnpm exec tsc --noEmit
```

Not a script in `package.json` — run ad-hoc. CI runs `pnpm run build` which compiles via tsup.
