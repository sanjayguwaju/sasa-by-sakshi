FROM node:20-alpine AS base
RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

# ─── Install dependencies ───────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
ENV NODE_ENV=development

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY apps/storefront/package.json ./apps/storefront/

# Install ALL deps (including devDeps — needed for next build at runtime)
RUN pnpm install --prod=false --frozen-lockfile --filter=@dtc/storefront...

# ─── Runtime ───────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Bring in installed node_modules (root + per-package .bin symlinks)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/storefront/node_modules ./apps/storefront/node_modules

# Copy monorepo config + storefront source
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY apps/storefront ./apps/storefront

COPY apps/storefront/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/docker-entrypoint.sh"]
