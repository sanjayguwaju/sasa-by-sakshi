#!/bin/sh
set -e

SHARED_KEY_FILE="/shared/publishable_key.env"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🛍️   Sasa by Sakshi — Storefront"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Always run pnpm commands from workspace root so hoisted binaries are resolvable
cd /app

export HOSTNAME="0.0.0.0"
export PORT="8000"
export NODE_ENV="production"
export MEDUSA_SERVER_URL="${MEDUSA_SERVER_URL:-http://backend:9000}"
export NEXT_PUBLIC_MEDUSA_BACKEND_URL="${NEXT_PUBLIC_MEDUSA_BACKEND_URL:-https://sasaapi.sanjayguwaju.com.np}"
export NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL:-https://sasa.sanjayguwaju.com.np}"
export NEXT_PUBLIC_DEFAULT_REGION="${NEXT_PUBLIC_DEFAULT_REGION:-np}"

# ─── Resolve publishable key ──────────────────────────────────────────────────
if [ -n "$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" ]; then
  echo "  🔑  Using pre-configured publishable key: ${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}"
elif [ -f "$SHARED_KEY_FILE" ] && grep -q "pk_" "$SHARED_KEY_FILE"; then
  . "$SHARED_KEY_FILE"
  export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  echo "  ✅  Publishable key loaded from shared volume: ${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}"
else
  # Fallback to known provisioned key
  export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY="pk_4793917b891e38bd6da3c748ecc6884de919e11eedbed763bb54ed9652e7ea2c"
  echo "  ✅  Publishable key fallback used: ${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}"
fi

# ─── Build Next.js ────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🏗️   Building Next.js storefront..."
echo "  (This takes a few minutes on first run)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm --filter=@dtc/storefront build

# ─── Start storefront ─────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🟢  Storefront running at http://0.0.0.0:8000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exec pnpm --filter=@dtc/storefront start
