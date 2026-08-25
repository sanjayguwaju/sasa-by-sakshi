#!/bin/sh
set -e

ADMIN_EMAIL="${MEDUSA_ADMIN_EMAIL:-admin@medusa.local}"
ADMIN_PASSWORD="${MEDUSA_ADMIN_PASSWORD:-supersecret}"
SHARED_KEY_FILE="/shared/publishable_key.env"

cd /app/apps/backend

# ─── Check Database Connection ────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ⏳  Checking PostgreSQL connection..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
node -e "
const net = require('net');
const raw = process.env.DATABASE_URL || 'postgres://localhost:5432';
let host = 'localhost';
let port = 5432;
try {
  const u = new URL(raw);
  host = u.hostname || 'localhost';
  port = Number(u.port) || 5432;
} catch (e) {}

async function check() {
  for (let i = 1; i <= 30; i++) {
    const ok = await new Promise((resolve) => {
      const socket = net.createConnection({ host, port, timeout: 3000 });
      socket.on('connect', () => { socket.end(); resolve(true); });
      socket.on('error', () => { socket.destroy(); resolve(false); });
      socket.on('timeout', () => { socket.destroy(); resolve(false); });
    });
    if (ok) {
      console.log('  ✅  PostgreSQL TCP port ' + host + ':' + port + ' is reachable!');
      process.exit(0);
    }
    console.log('  ⏳  [Attempt ' + i + '/30] Waiting for PostgreSQL (' + host + ':' + port + ')...');
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('  ⚠️  Continuing to migration attempt...');
  process.exit(0);
}
check();
"

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

# Ensure admin static build assets are present in both root and .medusa/server
mkdir -p /app/apps/backend/public
cp -r /app/apps/backend/.medusa/server/public/* /app/apps/backend/public/ 2>/dev/null || true
mkdir -p /app/apps/backend/.medusa/server/public
cp -r /app/apps/backend/public/* /app/apps/backend/.medusa/server/public/ 2>/dev/null || true

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
