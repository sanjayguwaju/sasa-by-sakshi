import { Metadata } from "next"
import ResetPasswordTemplate from "@modules/account/templates/reset-password-template"

export const metadata: Metadata = {
  title: "Reset Password | Sasa by Sakshi",
  description: "Create a new password for your Sasa by Sakshi account.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordTemplate />
}
