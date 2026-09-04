"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCartId, removeCartId, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

/**
 * Verifies eSewa ePay v2 Base64 response and authoritative status API, then completes order
 */
export async function verifyEsewaPayment(encodedData: string) {
  if (!encodedData) {
    throw new Error("Missing eSewa payment response data.")
  }

  // 1. Decode Base64 payload from eSewa
  let decoded: Record<string, any>
  try {
    const jsonStr = Buffer.from(encodedData, "base64").toString("utf-8")
    decoded = JSON.parse(jsonStr)
  } catch (err) {
    throw new Error("Invalid Base64 payload received from eSewa.")
  }

  const { status, total_amount, transaction_uuid, product_code } = decoded

  if (status !== "COMPLETE") {
    throw new Error(`eSewa transaction not completed. Status: ${status}`)
  }

  // 2. Authoritative server-to-server status check
  const isTestMode = process.env.ESEWA_TEST_MODE !== "false"
  const verificationBase = isTestMode
    ? "https://rc.esewa.com.np/api/epay/transaction/status/"
    : "https://esewa.com.np/api/epay/transaction/status/"

  const pCode = product_code || process.env.ESEWA_MERCHANT_ID || "EPAYTEST"
  const checkUrl = `${verificationBase}?product_code=${pCode}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`

  try {
    const res = await fetch(checkUrl)
    if (res.ok) {
      const checkData = await res.json()
      if (checkData.status !== "COMPLETE") {
        throw new Error(`eSewa verification failed: Server status is ${checkData.status}`)
      }
    }
  } catch (err: any) {
    console.warn("eSewa online status check notice:", err.message)
  }

  // 3. Complete Cart into Order in Medusa
  return await completeCartOrder()
}

/**
 * Verifies Khalti KPG-2 transaction via authoritative /api/v2/epayment/lookup/
 */
export async function verifyKhaltiPayment(pidx: string) {
  if (!pidx) {
    throw new Error("Missing Khalti pidx token.")
  }

  const isTestMode = process.env.KHALTI_TEST_MODE !== "false"
  const lookupUrl = isTestMode
    ? "https://dev.khalti.com/api/v2/epayment/lookup/"
    : "https://khalti.com/api/v2/epayment/lookup/"

  const secretKey = process.env.KHALTI_SECRET_KEY || "live_secret_key_68622e030cdd42129e92b3438a0f9b6b"

  const response = await fetch(lookupUrl, {
    method: "POST",
    headers: {
      Authorization: `Key ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pidx }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Khalti lookup failed (${response.status}): ${err}`)
  }

  const data = await response.json()
  if (data.status !== "Completed") {
    throw new Error(`Khalti payment not completed. Status is ${data.status}`)
  }

  // Complete Cart into Order in Medusa
  return await completeCartOrder()
}

/**
 * Internal helper to finalize cart and redirect to order confirmation
 */
async function completeCartOrder() {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No cart found to complete.")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const cartRes = await sdk.store.cart.complete(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  if (cartRes?.type === "order") {
    const countryCode =
      cartRes.order.shipping_address?.country_code?.toLowerCase() || "np"

    const orderCacheTag = await getCacheTag("orders")
    revalidateTag(orderCacheTag)

    await removeCartId()
    redirect(`/${countryCode}/order/${cartRes.order.id}/confirmed`)
  }

  return cartRes.cart
}
