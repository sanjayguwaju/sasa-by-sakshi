#!/bin/sh
set -e

SHARED_KEY_FILE="/shared/publishable_key.env"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🛍️   Sasa by Sakshi — Storefront"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Always run pnpm commands from workspace root so hoisted binaries are resolvable
cd /app

# ─── Resolve publishable key ──────────────────────────────────────────────────
if [ -n "$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" ]; then
  echo "  🔑  Using pre-configured publishable key."
else
  echo "  ⏳  Waiting for publishable key from backend..."
  RETRIES=0
  MAX_RETRIES=60  # wait up to 5 minutes (60 × 5s)

  until [ -f "$SHARED_KEY_FILE" ] && grep -q "pk_" "$SHARED_KEY_FILE"; do
    RETRIES=$((RETRIES + 1))
    if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
      echo "  ❌  Timed out waiting for publishable key. Is the backend running?"
      exit 1
    fi
    sleep 5
  done

  # Source the key into the environment
  . "$SHARED_KEY_FILE"
  export NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  echo "  ✅  Publishable key loaded: ${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}"
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
echo "  🟢  Storefront running at http://localhost:8000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exec pnpm --filter=@dtc/storefront start
