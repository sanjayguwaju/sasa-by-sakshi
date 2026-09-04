import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Care | Sasa by Sakshi",
  description: "Get in touch with Sasa by Sakshi customer service in Kathmandu, Nepal.",
}

export default function CustomerServicePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9779800000000"
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`

  return (
    <div className="content-container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            We're Here to Help
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Customer Care & Concierge
        </h1>
        <p className="text-xs text-gray-500 font-light mt-2 max-w-md mx-auto leading-relaxed">
          Need styling advice, order updates, or sizing assistance? Our Kathmandu team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-[#faf9f6] border border-gray-200 text-center">
          <span className="text-2xl mb-2 block">💬</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-1">
            WhatsApp Concierge
          </h3>
          <p className="text-xs text-gray-500 font-light mb-4">Fastest response for sizing & orders</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#25D366] text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="p-6 bg-[#faf9f6] border border-gray-200 text-center">
          <span className="text-2xl mb-2 block">✉️</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-1">
            Email Support
          </h3>
          <p className="text-xs text-gray-500 font-light mb-4">For corporate & general inquiries</p>
          <a
            href="mailto:info@sasabysakshi.com"
            className="text-xs font-semibold text-black underline hover:text-[#cda434] transition-colors"
          >
            info@sasabysakshi.com
          </a>
        </div>

        <div className="p-6 bg-[#faf9f6] border border-gray-200 text-center">
          <span className="text-2xl mb-2 block">📍</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-1">
            Kathmandu Atelier
          </h3>
          <p className="text-xs text-gray-500 font-light mb-1">Kathmandu, Nepal</p>
          <p className="text-[11px] text-gray-400">Sun - Fri: 10:00 AM - 7:00 PM</p>
        </div>
      </div>
    </div>
  )
}
