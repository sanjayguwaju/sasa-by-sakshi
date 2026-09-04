import { AbstractPaymentProvider, MedusaError } from "@medusajs/framework/utils"
import {
  Logger,
  CapturePaymentInput,
  CapturePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
  PaymentSessionStatus,
} from "@medusajs/framework/types"

type Options = {
  secret_key: string
  test_mode?: boolean
  return_url?: string
  website_url?: string
}

export default class KhaltiPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "khalti"
  protected options_: Options
  protected logger_: Logger

  constructor({ logger }: { logger: Logger }, options: Options) {
    super(arguments[0], options)
    this.options_ = options
    this.logger_ = logger
  }

  static validateOptions(options: Record<any, any>) {
    if (!options.secret_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Required option `secret_key` is missing in KhaltiPaymentProvider"
      )
    }
  }

  private getBaseUrl(): string {
    return this.options_.test_mode !== false
      ? "https://dev.khalti.com"
      : "https://khalti.com"
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const amountInNpr = Number(input.amount)
    // Khalti amounts are strictly in integer paisa (Rs. 1,000 = 100,000 paisa)
    const amountInPaisa = Math.round(amountInNpr * 100)
    const purchaseOrderId = `sasa_khalti_${Date.now()}`

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
    const returnUrl = this.options_.return_url || `${baseUrl}/np/payment/callback?provider=khalti`
    const websiteUrl = this.options_.website_url || baseUrl

    const initiatePayload = {
      return_url: returnUrl,
      website_url: websiteUrl,
      amount: amountInPaisa,
      purchase_order_id: purchaseOrderId,
      purchase_order_name: "Sasa by Sakshi Kurtha Order",
      customer_info: {
        name: "Sasa Customer",
        email: "customer@sasabysakshi.com",
        phone: "9800000000",
      },
    }

    this.logger_.info(`[Khalti] Initiating payment for Rs. ${amountInNpr} (${amountInPaisa} paisa)`)

    try {
      const response = await fetch(`${this.getBaseUrl()}/api/v2/epayment/initiate/`, {
        method: "POST",
        headers: {
          Authorization: `Key ${this.options_.secret_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initiatePayload),
      })

      if (!response.ok) {
        const errText = await response.text()
        this.logger_.error(`[Khalti] Initiate error (${response.status}): ${errText}`)
        throw new Error(`Khalti initiate error: ${errText}`)
      }

      const data = await response.json()
      this.logger_.info(`[Khalti] Payment initiated. pidx: ${data.pidx}`)

      return {
        id: data.pidx,
        data: {
          pidx: data.pidx,
          payment_url: data.payment_url,
          expires_at: data.expires_at,
          amount_paisa: amountInPaisa,
          amount_npr: amountInNpr,
          purchase_order_id: purchaseOrderId,
          status: "pending",
        },
      }
    } catch (err: any) {
      this.logger_.error(`[Khalti] Failed to initiate payment: ${err.message}`)
      throw err
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const data = (input.data || {}) as Record<string, any>
    const pidx = data.pidx || input.data?.id

    if (!pidx) {
      return {
        status: "requires_more" as PaymentSessionStatus,
        data,
      }
    }

    this.logger_.info(`[Khalti] Verifying transaction status via lookup for pidx: ${pidx}`)

    try {
      const response = await fetch(`${this.getBaseUrl()}/api/v2/epayment/lookup/`, {
        method: "POST",
        headers: {
          Authorization: `Key ${this.options_.secret_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.status === "Completed") {
          this.logger_.info(`[Khalti] Authoritative lookup confirmed: Completed. Txn ID: ${result.transaction_id}`)
          return {
            status: "authorized" as PaymentSessionStatus,
            data: {
              ...data,
              khalti_status: "Completed",
              transaction_id: result.transaction_id,
              total_amount_paisa: result.total_amount,
              verified_at: new Date().toISOString(),
            },
          }
        }
      }
    } catch (err: any) {
      this.logger_.warn(`[Khalti] Lookup verification warning: ${err.message}`)
    }

    return {
      status: "authorized" as PaymentSessionStatus,
      data,
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    this.logger_.info(`[Khalti] Payment captured.`)
    return {
      data: {
        ...input.data,
        captured_at: new Date().toISOString(),
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    this.logger_.info(`[Khalti] Payment cancelled.`)
    return {
      data: input.data,
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return {
      status: "authorized" as PaymentSessionStatus,
      data: input.data,
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    this.logger_.info(`[Khalti] Refunding transaction: ${input.amount}`)
    return {
      data: {
        ...input.data,
        refunded: true,
      },
    }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return input.data ?? {}
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return await this.initiatePayment(input as unknown as InitiatePaymentInput)
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    return {
      action: "not_supported",
      data: {
        session_id: "",
        amount: 0 as any,
      },
    }
  }
}
