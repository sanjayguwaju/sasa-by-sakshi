import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import KhaltiPaymentProviderService from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [KhaltiPaymentProviderService],
})
