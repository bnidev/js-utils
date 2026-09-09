# Commit Conventions

This repo follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec. Convention only — no tooling enforces it.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

The first line is the **header** and is the only required part.

## Types

| Type       | When to use                                                |
| ---------- | ---------------------------------------------------------- |
| `feat`     | New feature                                                |
| `fix`      | Bug fix                                                    |
| `docs`     | Documentation only                                         |
| `style`    | Formatting, whitespace (no code change)                    |
| `refactor` | Code change that neither fixes a bug nor adds a feature    |
| `perf`     | Performance improvement                                    |
| `test`     | Adding or correcting tests                                 |
| `build`    | Build system, external dependencies                        |
| `ci`       | CI configuration files and scripts                         |
| `chore`    | Tooling, dependencies, misc maintenance                    |
| `revert`   | Reverts a previous commit                                  |

## Scope

**Free-form.** Use whatever conveys the area of the codebase affected. Common scopes:

- `array`, `async`, `color`, `datetime`, `dom`, `math`, `object`, `sanitize`, `storage`, `string`, `timing`, `validation` — module names
- `deps`, `deps-dev` — dependency changes
- `ci` — `.github/workflows/`
- `docs` — documentation files

Scope is optional. Omit it when the change is project-wide.

## Subject

- **Lowercase** — no capital first letter
- **Imperative mood** — `add`, not `added` or `adds`
- **No trailing period**
- **<=72 characters**
- **Specific** — say what changed, not just "update" or "fix"

## Body (optional)

- Wrap at 72 characters
- Blank line between subject and body
- Explain **why**, not what. The diff shows what.

## Footer (optional)

- **Breaking changes**: `BREAKING CHANGE: <description>` on its own line
- **Issue refs**: `Refs: #123`, `Closes: #456`

## Breaking changes

Append `!` after the type/scope and add a `BREAKING CHANGE:` footer:

```
feat(string)!: drop support for Node 16

BREAKING CHANGE: minimum supported Node version is now 18.
```
