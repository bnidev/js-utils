# CI

Defined in `.github/workflows/ci.yaml`. Three jobs, run in order: `lint → test → build`.

## Jobs

### `lint` — Biome check

- Node 24
- Runs `pnpm install --frozen-lockfile` then `pnpm run check`
- Blocks the pipeline on any lint or format error

### `test` — Vitest with coverage

- Node 24
- Needs: `lint`
- Runs `pnpm run test:coverage`
- Coverage report uploaded as a workflow artifact

### `build` — tsup

- Node 24
- Needs: `lint`, `test`
- Runs `pnpm install --frozen-lockfile` then `pnpm run build`
- Output goes to `dist/`

## Triggers

- `push` to any branch
- `pull_request` against any branch
- `workflow_dispatch` (manual)

## Rules

- **CI order matters**: lint blocks test, lint + test block build. Don't add jobs that bypass this.
- **Use `pnpm install --frozen-lockfile`** in CI to catch lockfile drift early.
