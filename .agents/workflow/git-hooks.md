# Git Hooks

## Setup

The repo uses local git hooks in `.githooks/`. They are installed automatically by the `prepare` script on `pnpm install`:

```json
"scripts": {
  "prepare": "git config --local core.hooksPath .githooks || echo 'not in git'"
}
```

If you cloned without running `pnpm install`, set the path manually:

```bash
git config --local core.hooksPath .githooks
```

## Active hooks

### `pre-push`

Runs `pnpm run check` (Biome lint + format). If the check fails, the push is blocked.

This is intentionally lighter than CI (which also runs tests and build). Hooks should be fast.

## Bypassing

If a hook is wrong and you need to push anyway, use `--no-verify`.
