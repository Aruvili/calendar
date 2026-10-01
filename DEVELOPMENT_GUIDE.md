# Rapid Development Guide

Welcome to the development environment for **Calendar**! This guide walks through spinning up the entire development stack locally in minutes.

---

## Architecture Overview

The repository is organized as a unified monorepo:

```text
calender/
├── api/             # High-performance Backend API (Rust + Actix Web)
├── app/             # Mobile & Desktop Client (Flutter + Riverpod + GoRouter)
├── web/             # Web Client (Next.js 16 + React 19 + TailwindCSS)
├── .github/         # CI/CD Workflows & Issue/PR Templates
├── .husky/          # Git Hooks (commit-msg, pre-commit, pre-push)
├── docker-compose.yml # PostgreSQL 16 & Redis 7 services
└── Makefile         # Rapid development shortcuts
```

---

## Quick Start (5 Minutes)

### 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v20 or later & `npm`
- **Docker & Docker Compose**: For local PostgreSQL and Redis
- **Rust Toolchain**: `cargo` & `rustc` (latest stable)
- **Flutter SDK**: (for mobile/desktop development)

### 2. Initial Setup

Run the setup command from the repository root:

```bash
# Clone the repository
git clone <repo-url>
cd calender

# Copy environment template
cp .env.example .env

# Install tooling dependencies and initialize Git hooks
npm install

# Configure Git commit template (optional but recommended)
git config commit.template .gitmessage
```

Or simply run:

```bash
make setup
```

### 3. Start Database & Cache Services

Launch background PostgreSQL (port `5432`) and Redis (port `6379`):

```bash
npm run services:up
# or
make up
```

To inspect logs:

```bash
make logs
```

To open the **Adminer** database GUI (optional):

```bash
docker compose --profile debug up -d adminer
# Visit http://localhost:8080 (Server: postgres, User: postgres, Pass: postgres)
```

---

## Running Applications

### Web Application (Next.js)

```bash
# Start Next.js with hot reloading at http://localhost:3000
npm run dev:web
# or
make dev-web
```

### API Backend (Rust + Actix Web)

```bash
# Start Actix Web API server with auto-compilation at http://localhost:8080
npm run dev:api
# or
make dev-api
```

### Mobile / Desktop App (Flutter)

```bash
# Start Flutter app on connected device, simulator, or desktop
npm run dev:app
# or
make dev-app
```

---

## Developer Tooling & Commands

| Task               | npm Command             | Make Shortcut | Description                                  |
| :----------------- | :---------------------- | :------------ | :------------------------------------------- |
| **Start Services** | `npm run services:up`   | `make up`     | Starts Postgres & Redis containers           |
| **Stop Services**  | `npm run services:down` | `make down`   | Stops background containers                  |
| **Commit Wizard**  | `npm run commit`        | `make commit` | Interactive prompt for Conventional Commits  |
| **Lint Code**      | `npm run lint`          | `make lint`   | Runs linters across Web and API              |
| **Format Code**    | `npm run format`        | `make format` | Formats all TS, JS, Rust, JSON, and Markdown |
| **Verify All**     | `npm run format:check`  | `make check`  | CI verification before pushing               |
| **Clean Build**    | -                       | `make clean`  | Removes cache and target build directories   |

---

## Commit Conventions & Git Hooks (Monorepo-Friendly)

This repository is optimized for **atomic monorepo commits** (no need to make separate commits for each folder):

1. **Monorepo Commits**: You can change `web`, `api`, `app`, and `db` in a single commit:
   ```bash
   git commit -m "feat: implement real-time calendar sync across api and web"
   ```
2. **Optional Scopes**: Use a scope if helpful (`feat(web): ...`, `feat(auth): ...`, `feat(fullstack): ...`), or omit it entirely (`feat: ...`).
3. **Interactive Commit Wizard**: Run `npm run commit` (or `make commit`) to guide you step-by-step.
4. **Pre-commit**: Automatically formats and lints staged files across any modified folders using `lint-staged`.
5. **Commit-msg**: Enforces Conventional Commits type validation.
6. **Pre-push**: Blocks direct pushes to `main` to protect trunk stability.

---

## Troubleshooting

### Port Conflicts

- **PostgreSQL (5432)**: If local Postgres is already running, change `POSTGRES_PORT` in `.env` (e.g. `5433`).
- **Redis (6379)**: Change `REDIS_PORT` in `.env`.

### Rust Formatting or Clippy Issues

Run rustfmt and clippy directly inside `api/`:

```bash
cargo fmt --manifest-path api/Cargo.toml
cargo clippy --manifest-path api/Cargo.toml -- -D warnings
```

### Web Dependencies Issue

Clear web `.next` and re-install:

REDIS_PORT`in`.env`.

### Rust Formatting or Clippy Issues

Run rustfmt and clippy directly inside `api/`:

```bash
cargo fmt --manifest-path api/Cargo.toml
cargo clippy --manifest-path api/Cargo.toml -- -D warnings
```

### Web Dependencies Issue

Clear web `.next` and re-install:

```bash
cd web
rm -rf .next node_modules
npm install
```
