# Naming Conventions

## Files

- **kebab-case** for all source and test files: `hex-to-rgb.ts`, `chunk-array.test.ts`
- Test files live in `__tests__/` next to the code they test, with the `.test.ts` suffix
- One file per utility; a module is a directory with an `index.ts` barrel

## Functions and variables

- **camelCase** for functions, methods, variables, and parameters
- **Booleans prefix with `is`, `has`, `should`, or `can`**: `isEmail`, `isEmpty`, `isElementInViewport`

## Types and interfaces

- **PascalCase** for types, interfaces, and enums
- **No `I` prefix** for interfaces — just the name (`DistanceUnit`, not `IDistanceUnit`)
- **No `T` prefix** for types — the name carries the meaning (`Config`, not `TConfig`)

## Examples

```ts
export function chunkArray<T>(arr: T[], size: number): T[][] { /* ... */ }

export function isEmail(email: string): boolean { /* ... */ }

type DistanceUnit = 'meters' | 'kilometers' | 'miles' | 'yards'
```
