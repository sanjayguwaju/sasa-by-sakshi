import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Sasa by Sakshi",
  description: "Terms and conditions for purchases and services at Sasa by Sakshi.",
}

export default function TermsPage() {
  return (
    <div className="content-container max-w-3xl mx-auto py-16 px-4">
      <h1
        className="text-3xl font-bold uppercase tracking-tight text-black mb-8"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Terms of Service
      </h1>
      <div className="space-y-6 text-xs text-gray-600 font-light leading-relaxed">
        <p>
          Welcome to <strong>Sasa by Sakshi</strong>. By accessing our website, browsing our collections, and placing orders, you agree to comply with the following terms and conditions.
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wider text-black pt-4">Products & Sizing</h3>
        <p>
          All our garments are handcrafted in Kathmandu. Due to the artisanal nature of textiles and screen-dyeing, subtle variations in embroidery and weave may occur, adding to the uniqueness of each piece.
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wider text-black pt-4">Pricing & Payment</h3>
        <p>
          Prices are listed in Nepalese Rupees (NPR) and include applicable taxes. We accept Cash on Delivery (COD) and major digital payments across Nepal.
        </p>
      </div>
    </div>
  )
}
