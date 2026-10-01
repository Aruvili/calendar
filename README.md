# Calendar

> A lightning-fast, lightweight, cross-platform calendar built for speed, simplicity, and scale.

[![CI](https://github.com/fondness/calender/actions/workflows/ci.yml/badge.svg)](https://github.com/fondness/calender/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Tech Stack

| Component            | Stack                                                                                                     | Purpose                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **Web**              | [Next.js](https://nextjs.org/) + [React 19](https://react.dev/) + [TailwindCSS](https://tailwindcss.com/) | Modern, responsive web experience                                   |
| **API**              | [Rust](https://www.rust-lang.org/) + [Actix Web](https://actix.rs/)                                       | Blazing-fast, memory-safe backend services                          |
| **Mobile & Desktop** | [Flutter](https://flutter.dev/) + Riverpod + GoRouter                                                     | Smooth cross-platform clients (iOS, Android, macOS, Linux, Windows) |
| **Database & Cache** | [PostgreSQL 16](https://www.postgresql.org/) + [Redis 7](https://redis.io/)                               | ACID persistence with low-latency caching                           |

---

## Quick Start

Get your local environment running in 3 commands:

```bash
# 1. Setup repo tooling and git hooks
make setup

# 2. Start PostgreSQL and Redis containers
make up

# 3. Launch development servers
npm run dev:web    # Web app at http://localhost:3000
npm run dev:api    # Rust API at http://localhost:8080
npm run dev:app    # Flutter client
```

For complete instructions, refer to the [Development Guide](DEVELOPMENT_GUIDE.md).

---

## Repository & Developer Tooling

This repository is optimized for **rapid development** and team collaboration:

- **Conventional Commits**: Enforced via **Commitlint** and **Husky** git hooks.
- **Fast Interactive Commits**: Run `npm run commit` or `make commit` for an emoji-driven commit wizard.
- **Staged Code Quality**: `lint-staged` lints and formats only changed files prior to commit.
- **Local Services in Docker**: Ready-to-go PostgreSQL 16 & Redis 7 with persistent storage.
- **Automated CI/CD**: GitHub Actions workflows for Web, Rust API, Flutter, and PR title semantics.

---

## Commit Conventions & Rules (Monorepo-Friendly)

All commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format. **Single atomic commits across multiple folders are supported and encouraged**—no need to separate commits per directory:

```text
<type>(optional-scope): <subject>
```

**Common Examples:**

- `feat: implement user calendar sync across rust api and next.js web` _(monorepo commit)_
- `feat(fullstack): add JWT session refresh between backend and frontend`
- `fix: resolve timezone conversion between database and client apps`
- `feat(web): add monthly recurring event picker`
- `refactor: simplify event payload data structures`

See the full [Contributing Guide](CONTRIBUTING.md) for details on branch naming, git hooks, and PR workflow.

---

## Repository Structure

```text
calender/
├── api/             # Rust Actix Web backend service
├── app/             # Flutter mobile and desktop application
├── web/             # Next.js web application
├── .github/         # CI/CD workflows and PR/Issue templates
├── .husky/          # Git hook scripts (commit-msg, pre-commit, pre-push)
├── docker-compose.yml # PostgreSQL & Redis local services
├── Makefile         # Developer convenience shortcuts
├── CONTRIBUTING.md  # Commit rules & collaboration guidelines
└── DEVELOPMENT_GUIDE.md # Detailed local environment setup
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
