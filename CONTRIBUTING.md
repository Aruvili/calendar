# Contributing Guide & Commit Rules

Thank you for contributing to **Calendar**! To maintain rapid development, high velocity, and clean history across our monorepo, all contributors follow these standards.

---

## 1. Git Workflow & Branch Naming

We use a feature-branch workflow. **Direct pushes to `main` are strictly blocked by pre-push hooks**.

### Branch Naming Convention

Branches should use lowercase kebab-case with one of the following prefixes:

| Branch Prefix | Usage                                      | Example                          |
| :------------ | :----------------------------------------- | :------------------------------- |
| `feat/`       | New features or capabilities               | `feat/google-calendar-sync`      |
| `fix/`        | Bug fixes                                  | `fix/event-timezone-offset`      |
| `refactor/`   | Code refactoring without behavioral change | `refactor/api-auth-middleware`   |
| `perf/`       | Performance optimizations                  | `perf/month-grid-virtualization` |
| `docs/`       | Documentation improvements                 | `docs/api-setup-guide`           |
| `chore/`      | Tooling, dependencies, maintenance         | `chore/upgrade-rust-actix`       |

---

## 2. Commit Rules (Conventional Commits)

This repository enforces the **[Conventional Commits](https://www.conventionalcommits.org/)** specification using **Commitlint** and **Husky** hooks. Every commit message is validated automatically upon commit and on pull requests.

### Commit Format

```text
<type>(<scope>): <short description in imperative mood>

[optional body explaining context and reasons]

[optional footer(s), e.g., Closes #123]
```

### Commit Types

| Type       | Description                                               |
| :--------- | :-------------------------------------------------------- |
| `feat`     | A new feature for users or clients                        |
| `fix`      | A bug fix                                                 |
| `docs`     | Documentation only changes                                |
| `style`    | Formatting, missing semi-colons, white-space changes      |
| `refactor` | Code restructuring without adding features or fixing bugs |
| `perf`     | Code changes that measurably improve performance          |
| `test`     | Adding or updating tests                                  |
| `build`    | Build system, bundler, or external package changes        |
| `ci`       | CI/CD pipelines, workflows, or scripts                    |
| `chore`    | Maintenance tasks that do not modify src or test code     |
| `revert`   | Reverts a previous commit                                 |

### Scopes (Optional for Monorepo Commits)

You do **NOT** need separate commits for each folder. You can commit changes across `web`, `api`, `app`, and `db` in a single atomic commit.

Scope is completely **optional**. You can:

- **Omit the scope completely** for fullstack or monorepo-wide changes:
  - `feat: add user authentication and sync across api and web`
  - `fix: correct event timezone parsing across backend and frontend`
- **Use a feature or domain scope**:
  - `feat(calendar): implement recurring event generation in api and web`
  - `feat(auth): add JWT session refresh between rust and client apps`
  - `feat(fullstack): add real-time calendar notification channel`
- **Use a component scope** when changes are isolated to a single folder:
  - `web` — Next.js web application
  - `api` — Rust Actix Web backend
  - `app` — Flutter mobile/desktop client
  - `db` — Database schema, migrations, Redis
  - `infra` — Docker Compose & deployment
  - `repo` — Root tooling, hooks, CI/CD

### Commit Examples

| Style                               | Commit Message                                                     |
| :---------------------------------- | :----------------------------------------------------------------- |
| **Monorepo / Fullstack (No Scope)** | `feat: integrate google calendar sync across api and web`          |
| **Feature Domain Scope**            | `feat(calendar): add drag-and-drop rescheduling in web and app`    |
| **Fullstack Scope**                 | `feat(fullstack): implement user profile settings and preferences` |
| **Single Component Scope**          | `fix(web): prevent calendar event modal re-rendering on scroll`    |
| **API Only Scope**                  | `feat(api): add recurrence rule parser with rrule crate`           |
| **Repository Maintenance**          | `chore: update dependencies and optimize build scripts`            |

---

## 3. Fast Interactive Commit Wizard

Instead of manually formatting commit messages, use our built-in interactive commit helper:

```bash
npm run commit
# or
git cz
```

This interactive tool prompts you through type selection with emojis, scope selection, subject length limits, and issue closing tags.

---

## 4. Automated Git Hooks (Husky & Lint-Staged)

When you make a commit:

1. **`commit-msg`**: Validates the commit message using `@commitlint/config-conventional`.
2. **`pre-commit`**: Automatically runs `lint-staged`:
   - Checks/formats changed `web/**/*.{ts,tsx}` files using ESLint & Prettier
   - Validates formatting on changed `api/**/*.rs` files via `cargo fmt`
   - Formats Markdown, JSON, and YAML files
3. **`pre-push`**: Ensures you cannot push directly to `main` without a pull request.

---

## 5. Development Quality Checks

Before pushing, verify your code passes all checks locally:

```bash
# Check code formatting across the repository
npm run format:check

# Run linters
npm run lint

# Or run the single make command
make check
```

---

## 6. Pull Request Lifecycle

1. Fork or branch from `main`.
2. Ensure tests pass and linters succeed.
3. Push to your branch and open a Pull Request.
4. Fill in the PR template (`.github/pull_request_template.md`).
5. Ensure your PR title also follows Conventional Commits (e.g., `feat(web): add dark mode toggle`).
6. Request review from the designated component code owners.
