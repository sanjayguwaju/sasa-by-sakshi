FROM node:20-alpine AS base
RUN apk add --no-cache curl jq
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

# ─── Install dependencies ───────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --filter=@dtc/backend...

# ─── Build ─────────────────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

COPY apps/backend ./apps/backend

RUN cd apps/backend && pnpm build

# ─── Runtime ───────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

# Bring in installed node_modules (root + app level)
COPY --from=deps /app/node_modules ./node_modules

# Bring in built output and source (needed for medusa CLI migrations/user creation)
COPY --from=builder /app/apps/backend ./apps/backend
COPY package.json pnpm-workspace.yaml .npmrc ./

COPY apps/backend/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["/docker-entrypoint.sh"]
