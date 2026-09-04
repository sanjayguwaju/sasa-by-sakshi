import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Delivery & Shipping | Sasa by Sakshi",
  description: "Delivery zones, rates, and timelines across Nepal for Sasa by Sakshi orders.",
}

export default function ShippingPage() {
  return (
    <div className="content-container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Nepal Shipping
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Delivery & Shipping Policy
        </h1>
        <p className="text-xs text-gray-500 font-light mt-2 max-w-md mx-auto leading-relaxed">
          Fast, reliable doorstep delivery with Cash on Delivery across Kathmandu and nationwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-[#faf9f6] border border-gray-200">
          <span className="text-2xl mb-2 block">🛵</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
            Inside Ring Road (Kathmandu)
          </h3>
          <p className="text-xs font-bold text-[#cda434] mb-2">NPR 100 · 24-48 Hours</p>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Same-day and next-day express delivery across central Kathmandu, Lalitpur, and Bhaktapur.
          </p>
        </div>

        <div className="p-6 bg-[#faf9f6] border border-gray-200">
          <span className="text-2xl mb-2 block">🚗</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
            Outside Ring Road
          </h3>
          <p className="text-xs font-bold text-[#cda434] mb-2">NPR 150 · 2-3 Days</p>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Suburbs and extended Kathmandu valley areas including Budhanilkantha, Godawari, and Kirtipur.
          </p>
        </div>

        <div className="p-6 bg-[#faf9f6] border border-gray-200">
          <span className="text-2xl mb-2 block">✈️</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
            Outside Valley (Major Cities)
          </h3>
          <p className="text-xs font-bold text-[#cda434] mb-2">NPR 250 · 3-5 Days</p>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Pokhara, Chitwan, Butwal, Biratnagar, Dharan, Nepalgunj, and major courier hubs across Nepal.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-xs text-gray-600 font-light leading-relaxed bg-white border border-gray-100 p-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-black">
          Cash on Delivery (COD)
        </h3>
        <p>
          We offer Cash on Delivery for all addresses across Nepal. You can pay our delivery partner in cash or via mobile banking (eSewa / Khalti / Fonepay QR) upon receiving your package.
        </p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-black pt-4">
          Order Tracking
        </h3>
        <p>
          Once your order is dispatched from our Kathmandu facility, our team will share a tracking link and SMS update with courier details.
        </p>
      </div>
    </div>
  )
}
