import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

/**
 * Background worker to automatically reconcile pending eSewa and Khalti payments.
 * Solves "ghost payments" when customers pay in the wallet/bank app but close the browser
 * before the redirect callback finishes.
 */
export default async function reconcileNepaliPayments(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const paymentModule = container.resolve(Modules.PAYMENT)

  logger.info("[Reconciliation Worker] Starting check for pending Nepali payment sessions...")

  try {
    // 1. Query pending payment sessions for eSewa and Khalti
    const { data: paymentSessions } = await query.graph({
      entity: "payment_session",
      fields: ["id", "status", "provider_id", "data", "payment_collection_id", "created_at"],
      filters: {
        status: "pending",
        provider_id: ["pp_esewa_esewa", "pp_khalti_khalti"],
      },
    })

    if (!paymentSessions || paymentSessions.length === 0) {
      logger.info("[Reconciliation Worker] No pending sessions found.")
      return
    }

    const now = Date.now()
    const THREE_MINUTES = 3 * 60 * 1000
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

    for (const session of paymentSessions) {
      const createdAt = new Date(session.created_at).getTime()
      const age = now - createdAt

      // Skip sessions created less than 3 minutes ago (give customer time to finish on phone)
      // and skip sessions older than 24 hours
      if (age < THREE_MINUTES || age > TWENTY_FOUR_HOURS) {
        continue
      }

      const sessionData = (session.data || {}) as Record<string, any>

      // ─── Reconcile eSewa ───────────────────────────────────────────────────────
      if (session.provider_id === "pp_esewa_esewa") {
        const productCode = sessionData.product_code || process.env.ESEWA_MERCHANT_ID || "EPAYTEST"
        const totalAmount = sessionData.total_amount || sessionData.amount
        const transactionUuid = sessionData.transaction_uuid

        if (!transactionUuid || !totalAmount) continue

        const isTest = process.env.ESEWA_TEST_MODE !== "false"
        const statusUrl = isTest
          ? "https://rc.esewa.com.np/api/epay/transaction/status/"
          : "https://esewa.com.np/api/epay/transaction/status/"

        try {
          const checkUrl = `${statusUrl}?product_code=${productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`
          const res = await fetch(checkUrl)

          if (res.ok) {
            const check = await res.json()
            if (check.status === "COMPLETE") {
              logger.info(`[Reconciliation Worker] eSewa confirmed payment for UUID=${transactionUuid}, Ref=${check.ref_id || check.transaction_code}`)
              
              await paymentModule.authorizePaymentSession(session.id, {
                ...sessionData,
                esewa_status: "COMPLETE",
                reconciled_by_worker: true,
                ref_id: check.ref_id || check.transaction_code,
                reconciled_at: new Date().toISOString(),
              })
            }
          }
        } catch (err: any) {
          logger.warn(`[Reconciliation Worker] eSewa check error for ${transactionUuid}: ${err.message}`)
        }
      }

      // ─── Reconcile Khalti ──────────────────────────────────────────────────────
      if (session.provider_id === "pp_khalti_khalti") {
        const pidx = sessionData.pidx

        if (!pidx) continue

        const isTest = process.env.KHALTI_TEST_MODE !== "false"
        const lookupUrl = isTest
          ? "https://dev.khalti.com/api/v2/epayment/lookup/"
          : "https://khalti.com/api/v2/epayment/lookup/"

        const secretKey = process.env.KHALTI_SECRET_KEY || "live_secret_key_68622e030cdd42129e92b3438a0f9b6b"

        try {
          const res = await fetch(lookupUrl, {
            method: "POST",
            headers: {
              Authorization: `Key ${secretKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pidx }),
          })

          if (res.ok) {
            const check = await res.json()
            if (check.status === "Completed") {
              logger.info(`[Reconciliation Worker] Khalti confirmed payment for pidx=${pidx}, TxnID=${check.transaction_id}`)

              await paymentModule.authorizePaymentSession(session.id, {
                ...sessionData,
                khalti_status: "Completed",
                reconciled_by_worker: true,
                transaction_id: check.transaction_id,
                reconciled_at: new Date().toISOString(),
              })
            }
          }
        } catch (err: any) {
          logger.warn(`[Reconciliation Worker] Khalti check error for ${pidx}: ${err.message}`)
        }
      }
    }

    logger.info("[Reconciliation Worker] Completed scheduled reconciliation run.")
  } catch (err: any) {
    logger.error(`[Reconciliation Worker] Error in scheduled reconciliation: ${err.message}`)
  }
}

export const config = {
  name: "reconcile-nepali-payments",
  schedule: "*/10 * * * *", // Runs every 10 minutes
}
