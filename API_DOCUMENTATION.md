# Sasa by Sakshi — API & Developer Reference 📚

This document covers the complete API architecture for **Sasa by Sakshi**, including standard Medusa v2 Store & Admin endpoints, custom payment flows (eSewa), WhatsApp AI webhooks, and the MCP AI server.

---

## 🌐 1. Base URLs

| Environment | Storefront Base URL | Backend API Base URL | Admin Dashboard URL |
|---|---|---|---|
| **Local Development** | `http://localhost:8000` | `http://localhost:9000` | `http://localhost:9000/app` |
| **Production (VPS)** | `https://sasabysakshi.com` | `https://api.sasabysakshi.com` | `https://api.sasabysakshi.com/app` |

---

## 🔑 2. Authentication & Headers

### Storefront Requests (Store API)
All public store requests require the **Publishable API Key**:
```http
GET /store/products
x-publishable-api-key: pk_01XXXXXXXXXXXXXX
Content-Type: application/json
```

### Admin Requests (Admin API)
Admin requests require either an Admin Bearer Token or Session Cookie:
```http
GET /admin/orders
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json
```

---

## 🛍️ 3. Core Store Endpoints (Customer Facing)

### A. Products & Catalog
* **`GET /store/products`** — List all Kurtha products with prices and variant options.
  * *Query Params:* `?limit=20&offset=0&category_id[]=...&q=silk`
* **`GET /store/products/:id`** — Get a single product with full details.
* **`GET /store/categories`** — List product categories (e.g. *Silk Sets*, *Daily Cotton*, *Festive*).
* **`GET /store/collections`** — List curated collections.

### B. Cart & Checkout Flow
1. **Create Cart:** `POST /store/carts`
   ```json
   { "region_id": "reg_01XXXXXXXX" }
   ```
2. **Add Kurtha Item:** `POST /store/carts/:id/line-items`
   ```json
   { "variant_id": "variant_01XXXXXXXX", "quantity": 1 }
   ```
3. **Add Shipping Address in Nepal:** `POST /store/carts/:id`
   ```json
   {
     "shipping_address": {
       "first_name": "Sita",
       "last_name": "Sharma",
       "address_1": "Baneshwor, Ward 10",
       "city": "Kathmandu",
       "country_code": "np",
       "phone": "9800000000"
     }
   }
   ```
4. **Select Shipping Method:** `POST /store/carts/:id/shipping-methods`
   * Inside Ring Road (Rs. 100) or Outside Valley (Rs. 250).
5. **Initiate Payment Session:** `POST /store/carts/:id/payment-collections`
   * Select `manual_cod` for Cash on Delivery or `pp_esewa_esewa` for eSewa.
6. **Complete Cart / Place Order:** `POST /store/carts/:id/complete`

---

## 🇳🇵 4. Custom Nepali Integrations

### A. eSewa Payment Integration
* **Provider ID:** `pp_esewa_esewa`
* **Initiation:** Generates transaction token and verification signatures for eSewa ePay.
* **Callback Handler:** Automatically verifies payment signature upon customer return and marks order as `captured`.

### B. Cash on Delivery (COD)
* **Provider ID:** `pp_system_default` (Manual payment)
* **Behavior:** Order is placed immediately in `awaiting_fulfillment` status. Payment is captured upon delivery handoff.

---

## 🤖 5. AI & Webhook Endpoints

### A. Meta WhatsApp Cloud API Webhook
* **Endpoint:** `GET & POST /api/whatsapp/webhook`
* **Verification (GET):**
  * `GET /api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=sasabysakshi_verify_token&hub.challenge=1234`
  * Returns `1234` with `200 OK`.
* **Inbound Message Event (POST):**
  * Receives incoming text messages from WhatsApp users.
  * Queries live Medusa product stock and returns automated AI recommendations in Nepali / English.

### B. Model Context Protocol (MCP) Server (`@dtc/mcp-server`)
Connects Claude Desktop, Cursor, or Antigravity to Medusa:
* `medusa_list_products` — Search catalog with filters.
* `medusa_get_product` — Detailed product view.
* `medusa_check_inventory` — Real-time variant stock check.
* `medusa_list_orders` — Recent orders and status.
* `medusa_create_discount` — Promo codes generation.
* `medusa_get_store_analytics` — Revenue and order metrics.

---

## 📖 6. Official Medusa Interactive Docs & Postman

* **Interactive Store API Docs:** [https://docs.medusajs.com/api/store](https://docs.medusajs.com/api/store)
* **Interactive Admin API Docs:** [https://docs.medusajs.com/api/admin](https://docs.medusajs.com/api/admin)
* **OpenAPI Specs (Swagger / Postman import):** Available in Medusa's official documentation for 1-click import into Postman or Insomnia.
