import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Sasa by Sakshi",
  description: "Privacy policy and data protection at Sasa by Sakshi.",
}

export default function PrivacyPage() {
  return (
    <div className="content-container max-w-3xl mx-auto py-16 px-4">
      <h1
        className="text-3xl font-bold uppercase tracking-tight text-black mb-8"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Privacy Policy
      </h1>
      <div className="space-y-6 text-xs text-gray-600 font-light leading-relaxed">
        <p>
          At <strong>Sasa by Sakshi</strong>, we are committed to respecting and protecting your privacy. This policy explains how we collect, use, and safeguard personal information when you visit our website or make a purchase.
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wider text-black pt-4">Information We Collect</h3>
        <p>
          When you place an order or create an account, we collect necessary details including your name, email address, delivery phone number, and physical delivery address in Nepal to fulfill your order.
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wider text-black pt-4">Security</h3>
        <p>
          Your information is stored securely and is never sold, leased, or shared with unauthorized third parties. We use trusted delivery courier partners solely for the purpose of package delivery.
        </p>
      </div>
    </div>
  )
}
