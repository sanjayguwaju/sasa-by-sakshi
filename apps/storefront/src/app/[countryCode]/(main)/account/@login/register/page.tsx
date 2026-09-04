import { Metadata } from "next"
import RegisterTemplate from "@modules/account/templates/register-template"

export const metadata: Metadata = {
  title: "Register | Sasa by Sakshi",
  description: "Create your Sasa by Sakshi account.",
}

export default function RegisterPage() {
  return <RegisterTemplate />
}
