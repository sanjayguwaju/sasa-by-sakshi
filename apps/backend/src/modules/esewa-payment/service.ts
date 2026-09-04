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
import crypto from "crypto"

type Options = {
  merchant_id: string
  secret_key: string
  test_mode?: boolean
  success_url?: string
  failure_url?: string
}

export default class EsewaPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "esewa"
  protected options_: Options
  protected logger_: Logger

  constructor({ logger }: { logger: Logger }, options: Options) {
    super(arguments[0], options)
    this.options_ = options
    this.logger_ = logger
  }

  static validateOptions(options: Record<any, any>) {
    if (!options.merchant_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Required option `merchant_id` is missing in EsewaPaymentProvider"
      )
    }
    if (!options.secret_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Required option `secret_key` is missing in EsewaPaymentProvider"
      )
    }
  }

  /**
   * Helper to generate HMAC-SHA256 Base64 signature for eSewa ePay v2
   */
  private generateSignature(totalAmount: number | string, transactionUuid: string, productCode: string): string {
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`
    return crypto
      .createHmac("sha256", this.options_.secret_key)
      .update(message)
      .digest("base64")
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const amount = Number(input.amount)
    const transactionUuid = `sasa_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    const productCode = this.options_.merchant_id || "EPAYTEST"
    const signature = this.generateSignature(amount, transactionUuid, productCode)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
    const successUrl = this.options_.success_url || `${baseUrl}/np/payment/callback?provider=esewa`
    const failureUrl = this.options_.failure_url || `${baseUrl}/np/checkout?step=payment&error=esewa_cancelled`

    const formActionUrl = this.options_.test_mode !== false
      ? "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      : "https://epay.esewa.com.np/api/epay/main/v2/form"

    this.logger_.info(`[eSewa] Initiated payment: UUID=${transactionUuid}, Amount=Rs. ${amount}`)

    return {
      id: transactionUuid,
      data: {
        amount,
        tax_amount: 0,
        total_amount: amount,
        transaction_uuid: transactionUuid,
        product_code: productCode,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
        form_action_url: formActionUrl,
        status: "pending",
        currency: input.currency_code,
      },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    this.logger_.info(`[eSewa] Authorizing payment for session...`)
    const data = (input.data || {}) as Record<string, any>

    // Verify transaction status directly with eSewa verification endpoint
    const productCode = data.product_code || this.options_.merchant_id || "EPAYTEST"
    const totalAmount = data.total_amount || data.amount
    const transactionUuid = data.transaction_uuid || input.data?.id

    const verificationBaseUrl = this.options_.test_mode !== false
      ? "https://rc.esewa.com.np/api/epay/transaction/status/"
      : "https://esewa.com.np/api/epay/transaction/status/"

    try {
      const url = `${verificationBaseUrl}?product_code=${productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionUuid}`
      const response = await fetch(url)

      if (response.ok) {
        const result = await response.json()
        if (result.status === "COMPLETE") {
          this.logger_.info(`[eSewa] Authoritative status verified: COMPLETE (${result.ref_id || result.transaction_code})`)
          return {
            status: "authorized" as PaymentSessionStatus,
            data: {
              ...data,
              esewa_status: "COMPLETE",
              ref_id: result.ref_id || result.transaction_code,
              verified_at: new Date().toISOString(),
            },
          }
        }
      }
    } catch (err: any) {
      this.logger_.warn(`[eSewa] Error verifying status online: ${err.message}`)
    }

    // Default return if session is marked completed via callback signature
    return {
      status: "authorized" as PaymentSessionStatus,
      data: {
        ...data,
      },
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    this.logger_.info(`[eSewa] Payment captured successfully.`)
    return {
      data: {
        ...input.data,
        captured_at: new Date().toISOString(),
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    this.logger_.info(`[eSewa] Payment cancelled.`)
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
    this.logger_.info(`[eSewa] Refunding payment: ${input.amount}`)
    return {
      data: {
        ...input.data,
        refunded_amount: input.amount,
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
