.PHONY: help setup up down logs dev-web dev-api dev-app lint format check commit clean

help: ## Show this help message
	@echo "Calendar Monorepo - Quick Commands"
	@echo "=================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

setup: ## Install all dependencies and setup git hooks
	npm install
	git config commit.template .gitmessage
	@echo "Setup complete! Ready for rapid development."

up: ## Start local PostgreSQL and Redis docker services
	docker compose up -d

down: ## Stop local docker services
	docker compose down

logs: ## Follow docker services logs
	docker compose logs -f

dev-web: ## Start Next.js web application
	npm run dev:web

dev-api: ## Start Rust Actix Web API
	npm run dev:api

dev-app: ## Start Flutter mobile/desktop application
	npm run dev:app

lint: ## Run linters across the repo
	npm run lint

format: ## Auto-format code across the repo
	npm run format

check: ## Run formatting check and linting
	npm run format:check
	npm run lint

commit: ## Interactive Conventional Commit prompt
	npm run commit

clean: ## Clean build artifacts and temporary files
	rm -rf web/.next web/out api/target
