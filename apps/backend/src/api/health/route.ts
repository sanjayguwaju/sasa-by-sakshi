import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.status(200).json({
    status: "OK",
    service: "sasa-by-sakshi-backend",
    timestamp: new Date().toISOString(),
  })
}
