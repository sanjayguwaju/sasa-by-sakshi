import { NextRequest, NextResponse } from "next/server"
import { processCustomerMessage } from "@lib/ai/sales-agent"

/**
 * Meta WhatsApp Cloud API Webhook Verification (GET)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "sasabysakshi_verify_token"

  if (mode === "subscribe" && token === verifyToken) {
    console.log("✅ WhatsApp webhook verified successfully.")
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse("Forbidden", { status: 403 })
}

/**
 * Handle Incoming WhatsApp Messages & AI Replies (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Check if this is a WhatsApp message event
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const message = value?.messages?.[0]
    const contact = value?.contacts?.[0]

    if (message && message.type === "text") {
      const from = message.from // e.g. "97798XXXXXXXX"
      const text = message.text?.body
      const customerName = contact?.profile?.name

      console.log(`📩 Incoming WhatsApp from ${customerName || from}: "${text}"`)

      // Generate AI response
      const aiReply = await processCustomerMessage({
        from,
        text,
        name: customerName,
      })

      // Send reply back to customer via WhatsApp Cloud API (if configured)
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

      if (accessToken && phoneNumberId) {
        await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: { body: aiReply },
          }),
        })
        console.log(`📤 AI reply sent to ${from}`)
      } else {
        console.log(`ℹ️ WhatsApp credentials not set. Generated AI reply:\n${aiReply}`)
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 })
  } catch (error: any) {
    console.error("Error processing WhatsApp webhook:", error)
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 })
  }
}
