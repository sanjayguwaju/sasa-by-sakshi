/**
 * Sasa by Sakshi — Autonomous AI Sales Assistant for WhatsApp & Web Chat
 */

export type WhatsAppMessage = {
  from: string
  text: string
  name?: string
}

export async function processCustomerMessage(message: WhatsAppMessage): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY
  const medusaUrl = process.env.MEDUSA_SERVER_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sasabysakshi.com"

  // 1. Fetch live product catalog from Medusa
  let catalogContext = ""
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (publishableKey) headers["x-publishable-api-key"] = publishableKey

    const res = await fetch(`${medusaUrl}/store/products?limit=20`, { headers, next: { revalidate: 60 } })
    if (res.ok) {
      const data = await res.json()
      const products = data.products || []
      catalogContext = products
        .map((p: any) => {
          const variants = (p.variants || []).map((v: any) => `${v.title} (${v.inventory_quantity ?? "In Stock"} available)`).join(", ")
          return `- Product: ${p.title} | Handle: ${p.handle} | Variants: [${variants}] | Description: ${p.description || "Designer Kurtha"}`
        })
        .join("\n")
    }
  } catch (err) {
    console.error("Error fetching Medusa catalog for AI sales agent:", err)
  }

  // 2. If no LLM API key configured yet, use smart rule-based fallback
  if (!apiKey) {
    return generateSmartRuleResponse(message.text, baseUrl)
  }

  // 3. Call LLM (supports OpenAI / Groq / OpenAI-compatible APIs)
  try {
    const endpoint = process.env.AI_ENDPOINT || "https://api.openai.com/v1/chat/completions"
    const model = process.env.AI_MODEL || "gpt-4o-mini"

    const systemPrompt = `
You are the friendly, polite AI Sales Stylist for "Sasa by Sakshi", an exclusive boutique in Kathmandu, Nepal selling designer Kurthas.
Customer Name: ${message.name || "Customer"}
Store Base URL: ${baseUrl}

Our Kurtha Catalog:
${catalogContext || "Catalog loaded from Sasa by Sakshi."}

Store Policies:
- Delivery: Cash on Delivery (COD) is available all across Nepal! Inside Kathmandu Valley: Rs. 100 (24-48 hrs). Outside Valley: Rs. 250 (3-5 days).
- Payments: Cash on Delivery (COD), eSewa, and Online Cards.
- Sizing: Available in S, M, L, XL, XXL. We also offer custom stitching assistance!

Instructions:
- Be warm, helpful, and hospitable (use "Namaste! 🙏" or warm Nepali greetings when appropriate).
- Format your response for WhatsApp using *bold text* and bullet points.
- If a customer asks for a product or fabric (e.g. Silk, Georgette, Cotton, Red Kurtha), recommend matching items from the catalog with their direct links: ${baseUrl}/products/[handle].
- Always encourage them to order online with Cash on Delivery or message custom measurements.
- Keep responses concise, clear, and easy to read on mobile WhatsApp.
`

    const aiRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message.text },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    })

    if (aiRes.ok) {
      const data = await aiRes.json()
      return data.choices?.[0]?.message?.content || generateSmartRuleResponse(message.text, baseUrl)
    } else {
      console.error("AI API returned error:", await aiRes.text())
      return generateSmartRuleResponse(message.text, baseUrl)
    }
  } catch (err) {
    console.error("AI Sales Agent execution error:", err)
    return generateSmartRuleResponse(message.text, baseUrl)
  }
}

function generateSmartRuleResponse(query: string, baseUrl: string): string {
  const q = query.toLowerCase()

  if (q.includes("price") || q.includes("cost") || q.includes("katti")) {
    return (
      `Namaste! 🙏 Our designer Kurtha sets start from *Rs. 2,500 to Rs. 4,500* depending on fabric (Silk, Georgette, Cotton).\n\n` +
      `✨ Browse our full collection & live prices here:\n👉 ${baseUrl}/store\n\n` +
      `We provide *Cash on Delivery* all across Nepal! 🚚`
    )
  }

  if (q.includes("delivery") || q.includes("ship") || q.includes("location") || q.includes("kathmandu")) {
    return (
      `Namaste! 🙏 We deliver all over Nepal! 🇳🇵\n\n` +
      `• *Inside Kathmandu Valley:* Rs. 100 (Delivered in 24-48 hrs)\n` +
      `• *Outside Valley / All Nepal:* Rs. 250 (Delivered in 3-5 days)\n` +
      `• *Cash on Delivery (COD)* is available for all orders! 💵\n\n` +
      `Order directly at: ${baseUrl}`
    )
  }

  if (q.includes("size") || q.includes("stitch") || q.includes("custom")) {
    return (
      `Namaste! 🙏 We offer standard sizes *S, M, L, XL, XXL* as well as Unstitched Kurtha fabric.\n\n` +
      `If you have custom measurements, please send them right here on WhatsApp and our designer team will assist you! 📏👗`
    )
  }

  return (
    `Namaste! 🙏 Welcome to *Sasa by Sakshi*.\n\n` +
    `We are delighted to assist you with our latest Kurtha collections, custom stitching, and orders.\n\n` +
    `🛍️ *View Our Online Store:* ${baseUrl}/store\n` +
    `🚚 *Cash on Delivery Available Across Nepal*\n\n` +
    `How can we help you today? Let us know which design or size you are looking for!`
  )
}
