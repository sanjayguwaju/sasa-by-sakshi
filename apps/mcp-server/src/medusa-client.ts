export class MedusaClient {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000", apiKey = process.env.MEDUSA_ADMIN_API_KEY) {
    this.baseUrl = baseUrl.replace(/\/$/, "")
    this.apiKey = apiKey
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
      headers["x-medusa-access-token"] = this.apiKey
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Medusa API error (${response.status}): ${errorText}`)
    }

    return response.json() as Promise<T>
  }

  // ─── Products & Catalog ───────────────────────────────────────────────────
  async listProducts(params: { q?: string; limit?: number; offset?: number } = {}) {
    const query = new URLSearchParams()
    if (params.q) query.set("q", params.q)
    if (params.limit) query.set("limit", String(params.limit))
    if (params.offset) query.set("offset", String(params.offset))

    return this.request<{ products: any[]; count: number }>(`/admin/products?${query.toString()}`)
  }

  async getProduct(id: string) {
    return this.request<{ product: any }>(`/admin/products/${id}`)
  }

  async createProduct(data: any) {
    return this.request<{ product: any }>(`/admin/products`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request<{ product: any }>(`/admin/products/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // ─── Orders ───────────────────────────────────────────────────────────────
  async listOrders(params: { limit?: number; offset?: number; status?: string } = {}) {
    const query = new URLSearchParams()
    if (params.limit) query.set("limit", String(params.limit))
    if (params.offset) query.set("offset", String(params.offset))
    if (params.status) query.set("status", params.status)

    return this.request<{ orders: any[]; count: number }>(`/admin/orders?${query.toString()}`)
  }

  async getOrder(id: string) {
    return this.request<{ order: any }>(`/admin/orders/${id}`)
  }

  // ─── Inventory ────────────────────────────────────────────────────────────
  async listInventoryItems(params: { q?: string; limit?: number } = {}) {
    const query = new URLSearchParams()
    if (params.q) query.set("q", params.q)
    if (params.limit) query.set("limit", String(params.limit || 20))

    return this.request<{ inventory_items: any[]; count: number }>(`/admin/inventory-items?${query.toString()}`)
  }

  // ─── Promotions & Discounts ───────────────────────────────────────────────
  async listPromotions() {
    return this.request<{ promotions: any[] }>(`/admin/promotions`)
  }

  async createPromotion(data: any) {
    return this.request<{ promotion: any }>(`/admin/promotions`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // ─── Customers ────────────────────────────────────────────────────────────
  async listCustomers(params: { q?: string; limit?: number } = {}) {
    const query = new URLSearchParams()
    if (params.q) query.set("q", params.q)
    if (params.limit) query.set("limit", String(params.limit || 20))

    return this.request<{ customers: any[]; count: number }>(`/admin/customers?${query.toString()}`)
  }
}
