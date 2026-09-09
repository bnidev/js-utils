# Releases

> **NOTE: This workflow is temporary and will be adjusted in the future.**

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation.

## Workflow

1. **Add a changeset** when shipping a user-facing change:

   ```bash
   pnpm changeset
   ```

   This creates a markdown file under `.changeset/` with a bump level (`patch`, `minor`, `major`) and a summary.

2. **Version packages** — `changeset version` bumps `package.json`, writes `CHANGELOG.md`, and deletes consumed changesets.

3. **Publish** — `changeset publish` publishes to npm.

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
