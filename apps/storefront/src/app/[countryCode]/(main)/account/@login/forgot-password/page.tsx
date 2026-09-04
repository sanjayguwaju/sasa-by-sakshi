import { Metadata } from "next"
import ForgotPasswordTemplate from "@modules/account/templates/forgot-password-template"

export const metadata: Metadata = {
  title: "Forgot Password | Sasa by Sakshi",
  description: "Reset your Sasa by Sakshi account password.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordTemplate />
}
