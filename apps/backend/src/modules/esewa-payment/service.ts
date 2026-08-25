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
  merchant_id: string
  secret_key: string
  test_mode?: boolean
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

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    this.logger_.info(`eSewa payment initiated for amount: ${input.amount}`)
    const transactionId = `esewa_${Date.now()}`
    return {
      id: transactionId,
      data: {
        amount: input.amount,
        currency: input.currency_code,
        transaction_id: transactionId,
      },
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    this.logger_.info(`Authorizing eSewa payment...`)
    return {
      status: "authorized" as PaymentSessionStatus,
      data: {
        ...input.data,
      },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    this.logger_.info(`Canceling eSewa payment`)
    return {
      data: input.data,
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    this.logger_.info(`Capturing eSewa payment`)
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
    this.logger_.info(`Refunding eSewa payment`)
    return {
      data: input.data,
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
