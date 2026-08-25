#!/bin/sh
set -e

ADMIN_EMAIL="${MEDUSA_ADMIN_EMAIL:-admin@medusa.local}"
ADMIN_PASSWORD="${MEDUSA_ADMIN_PASSWORD:-supersecret}"
SHARED_KEY_FILE="/shared/publishable_key.env"

cd /app/apps/backend

# ─── Migrations ──────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ⏳  Running database migrations..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm medusa db:migrate
echo "  ✅  Migrations complete."

# ─── Admin user ──────────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  👤  Creating admin user: ${ADMIN_EMAIL}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm medusa user -e "${ADMIN_EMAIL}" -p "${ADMIN_PASSWORD}" 2>&1 \
  && echo "  ✅  Admin user ready." \
  || echo "  ℹ️   Admin user may already exist — continuing."

# ─── Start backend ───────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀  Starting Medusa backend on :9000 ..."
echo "  (production mode — serving pre-built admin assets)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm medusa start &
MEDUSA_PID=$!

# ─── Wait for backend health ──────────────────────────────────────────────────
echo "  ⏳  Waiting for backend to become healthy..."
RETRIES=0
MAX_RETRIES=60
until curl -sf http://localhost:9000/health > /dev/null 2>&1; do
  RETRIES=$((RETRIES + 1))
  if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
    echo "  ❌  Backend did not become healthy after ${MAX_RETRIES} attempts. Exiting."
    exit 1
  fi
  sleep 3
done
echo "  ✅  Backend is healthy!"

# ─── Generate publishable API key ─────────────────────────────────────────────
# Skip if we already generated one (handles container restarts gracefully)
if [ -f "$SHARED_KEY_FILE" ] && grep -q "pk_" "$SHARED_KEY_FILE"; then
  echo ""
  echo "  🔑  Publishable key already exists — skipping generation."
else
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  🔑  Generating publishable API key..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Authenticate as admin
  LOGIN_RESPONSE=$(curl -s -X POST http://localhost:9000/auth/user/emailpass \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\"}")

  TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token // empty')

  if [ -z "$TOKEN" ]; then
    echo "  ⚠️   Could not authenticate with admin credentials."
    echo "       Response: $LOGIN_RESPONSE"
  else
    echo "  ✅  Authenticated as admin."

    # Create a publishable API key
    KEY_RESPONSE=$(curl -s -X POST http://localhost:9000/admin/api-keys \
      -H "Authorization: Bearer ${TOKEN}" \
      -H "Content-Type: application/json" \
      -d '{"title":"Docker Storefront Key","type":"publishable"}')

    PUB_KEY=$(echo "$KEY_RESPONSE" | jq -r '.api_key.token // empty')

    if [ -n "$PUB_KEY" ]; then
      echo "  ✅  Publishable key: ${PUB_KEY}"

      # Link the key to the default sales channel (if it exists)
      SC_RESPONSE=$(curl -s \
        -H "Authorization: Bearer ${TOKEN}" \
        http://localhost:9000/admin/sales-channels)

      SC_ID=$(echo "$SC_RESPONSE" | jq -r '.sales_channels[0].id // empty')
      KEY_ID=$(echo "$KEY_RESPONSE" | jq -r '.api_key.id // empty')

      if [ -n "$SC_ID" ] && [ -n "$KEY_ID" ]; then
        curl -s -X POST "http://localhost:9000/admin/api-keys/${KEY_ID}/sales-channels" \
          -H "Authorization: Bearer ${TOKEN}" \
          -H "Content-Type: application/json" \
          -d "{\"add\":[\"${SC_ID}\"]}" > /dev/null
        echo "  🔗  Linked key to sales channel: ${SC_ID}"
      fi

      # Write key to shared volume for the storefront
      mkdir -p /shared
      printf "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=%s\n" "${PUB_KEY}" > "$SHARED_KEY_FILE"
      echo "  📝  Key saved to ${SHARED_KEY_FILE}"
    else
      echo "  ⚠️   Could not generate publishable key."
      echo "       Response: $KEY_RESPONSE"
    fi
  fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🟢  Backend running at http://localhost:9000"
echo "  🖥️   Admin panel:   http://localhost:9000/app"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Keep container alive by waiting on the Medusa process
wait $MEDUSA_PID
