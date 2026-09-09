# Linting and Formatting

This project uses **Biome** for both linting and formatting. There is no ESLint or Prettier — Biome handles everything.

## Commands

```bash
pnpm run check            # lint + format check (used in CI and pre-push hook)
pnpm run check:fix        # autofix lint and format issues
```

## Key rules

- **Single quotes** for strings
- **No trailing commas**
- **Semicolons** only as needed (`asNeeded`)
- **Arrow parens** always (`(x) => x`, not `x => x`)
- **Space indentation**
- **Organize imports** — Biome sorts imports into the 3-group order automatically

## Config

Defined in `biome.json`. Do not change without good reason.

Ignores: `node_modules`, `dist`, `docs`, `coverage`.
