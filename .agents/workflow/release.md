# Releases

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation, with [`changeset-formatter`](https://github.com/bnidev/changeset-formatter) as the changelog formatter and npm trusted publishing (OIDC, no `NPM_TOKEN`).

## Workflow (all manual via `workflow_dispatch`)

1. **Add a changeset** when shipping a user-facing change:

   ```bash
   pnpm changeset
   ```

   This creates a markdown file under `.changeset/` with a bump level (`patch`, `minor`, `major`) and a summary.

2. **Create Release PR** — dispatch the `Create Release PR` workflow (`.github/workflows/release-create.yml`). It runs `pnpm run release:version` (`changeset version && changeset-formatter`) via `changesets/action@v1`, which bumps `package.json`, writes `CHANGELOG.md`, and deletes consumed changesets on a `Version Packages` PR.

3. **Merge the Version Packages PR** after review.

4. **Publish** — dispatch the `Publish to npm` workflow (`.github/workflows/release-publish.yml`). It runs `pnpm changeset publish` via `changesets/action@v1`, which publishes to npm (with provenance) and creates the GitHub tag + release.

## Changeset format

A changeset file under `.changeset/`:

```md
---
"@bnidev/js-utils": minor
---

add `merge` and `isEmpty` object utilities
```

- **Frontmatter** — `"<pkg>": "<bump>"`
- **Body** — the changelog summary. Write it as the line you want readers to see.

## Config

- `.changeset/config.json` — changesets configuration
- `.changesetformatterrc.json` — changelog formatting options (emojis, categorization, capitalization)
