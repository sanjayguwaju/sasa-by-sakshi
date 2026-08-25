# Sasa by Sakshi — Medusa MCP Server 🤖

Model Context Protocol (MCP) server for managing **Sasa by Sakshi** eCommerce store with AI (Claude Desktop, Cursor, Antigravity, or custom WhatsApp bots).

---

## 🛠️ Exposed Tools for AI Agents

1. **`medusa_list_products`**: Search and list products in the catalog.
2. **`medusa_get_product`**: Retrieve full product details, variants, prices in NPR, and descriptions.
3. **`medusa_check_inventory`**: Check stock and inventory quantities for sizes and variants.
4. **`medusa_list_orders`**: Query recent customer orders, fulfillment status, and totals.
5. **`medusa_get_order`**: Inspect specific order line items, customer details, and shipping address.
6. **`medusa_create_discount`**: Auto-generate coupon codes (percentage or fixed NPR discount).
7. **`medusa_get_store_analytics`**: High-level store health report (total products, recent revenue in NPR, order count).

---

## 🚀 How to Connect to Claude Desktop / Cursor / Antigravity

Add this to your `claude_desktop_config.json` (or Cursor / Antigravity MCP settings):

```json
{
  "mcpServers": {
    "sasa-by-sakshi": {
      "command": "node",
      "args": [
        "/Users/sanjayguwaju/Documents/general/sasa-by-sakshi/apps/mcp-server/dist/index.js"
      ],
      "env": {
        "MEDUSA_BACKEND_URL": "http://localhost:9000",
        "MEDUSA_ADMIN_API_KEY": "YOUR_MEDUSA_ADMIN_API_KEY_HERE"
      }
    }
  }
}
```

For production on your VPS:
```json
{
  "mcpServers": {
    "sasa-by-sakshi": {
      "command": "node",
      "args": ["/path/to/apps/mcp-server/dist/index.js"],
      "env": {
        "MEDUSA_BACKEND_URL": "https://api.sasabysakshi.com",
        "MEDUSA_ADMIN_API_KEY": "your_production_secret_token"
      }
    }
  }
}
```
