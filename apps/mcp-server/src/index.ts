#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import dotenv from "dotenv"
import { MedusaClient } from "./medusa-client.js"

dotenv.config()

const client = new MedusaClient(
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  process.env.MEDUSA_ADMIN_API_KEY
)

const server = new Server(
  {
    name: "sasa-by-sakshi-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// ─── List Available Tools ───────────────────────────────────────────────────
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "medusa_list_products",
        description: "Search and list products from the Sasa by Sakshi Kurtha catalog.",
        inputSchema: {
          type: "object",
          properties: {
            q: {
              type: "string",
              description: "Search term (e.g., 'silk', 'kurtha', 'cotton')",
            },
            limit: {
              type: "number",
              description: "Maximum number of products to return (default: 10)",
            },
          },
        },
      },
      {
        name: "medusa_get_product",
        description: "Get detailed information about a specific product including variants, options, and prices in NPR.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Product ID (e.g. prod_01...)",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "medusa_list_orders",
        description: "List customer orders, payment status, delivery address, and total amounts.",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "Filter by order status (pending, completed, canceled)",
            },
            limit: {
              type: "number",
              description: "Number of orders to retrieve (default: 10)",
            },
          },
        },
      },
      {
        name: "medusa_get_order",
        description: "Get full details of a specific order including line items, shipping address, and tracking status.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Order ID (e.g. order_01...)",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "medusa_check_inventory",
        description: "Check stock and inventory levels across products and variants.",
        inputSchema: {
          type: "object",
          properties: {
            q: {
              type: "string",
              description: "Search inventory items by sku or title",
            },
          },
        },
      },
      {
        name: "medusa_create_discount",
        description: "Create a new discount code or promotional campaign for the store.",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "The coupon code (e.g., 'DASHAIN15', 'FESTIVE20')",
            },
            type: {
              type: "string",
              enum: ["percentage", "standard"],
              description: "Discount type: 'percentage' or 'standard' (fixed NPR amount)",
            },
            value: {
              type: "number",
              description: "Discount value (e.g. 15 for 15% or 500 for Rs. 500 off)",
            },
          },
          required: ["code", "type", "value"],
        },
      },
      {
        name: "medusa_get_store_analytics",
        description: "Get high-level summary of store performance, catalog count, and recent orders.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  }
})

// ─── Handle Tool Execution ──────────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case "medusa_list_products": {
        const result = await client.listProducts(args as any)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "medusa_get_product": {
        const { id } = args as { id: string }
        const result = await client.getProduct(id)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "medusa_list_orders": {
        const result = await client.listOrders(args as any)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "medusa_get_order": {
        const { id } = args as { id: string }
        const result = await client.getOrder(id)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "medusa_check_inventory": {
        const result = await client.listInventoryItems(args as any)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "medusa_create_discount": {
        const { code, type, value } = args as { code: string; type: string; value: number }
        const result = await client.createPromotion({
          code,
          type: "standard",
          application_method: {
            type,
            value,
            currency_code: "npr",
          },
        })
        return {
          content: [
            {
              type: "text",
              text: `Promotion ${code} created successfully:\n${JSON.stringify(result, null, 2)}`,
            },
          ],
        }
      }

      case "medusa_get_store_analytics": {
        const [products, orders] = await Promise.all([
          client.listProducts({ limit: 1 }),
          client.listOrders({ limit: 10 }),
        ])

        const totalRevenue = orders.orders.reduce(
          (sum: number, o: any) => sum + (Number(o.total) || 0),
          0
        )

        const summary = {
          total_products_count: products.count,
          total_recent_orders: orders.count,
          recent_revenue_npr: totalRevenue,
          store_currency: "NPR",
          store_status: "Healthy / Online",
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(summary, null, 2),
            },
          ],
        }
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (error: any) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error executing ${name}: ${error.message || String(error)}`,
        },
      ],
    }
  }
})

// ─── Start Server ───────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Sasa by Sakshi Medusa MCP server running on stdio")
}

main().catch((err) => {
  console.error("Fatal error in MCP server:", err)
  process.exit(1)
})
