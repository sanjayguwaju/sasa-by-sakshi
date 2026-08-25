import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import EsewaPaymentProviderService from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [EsewaPaymentProviderService],
})
