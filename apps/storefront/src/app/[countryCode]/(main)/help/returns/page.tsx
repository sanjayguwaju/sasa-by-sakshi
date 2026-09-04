import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Exchange & Returns | Sasa by Sakshi",
  description: "7-day hassle-free exchange policy for Sasa by Sakshi orders in Nepal.",
}

export default function ReturnsPage() {
  return (
    <div className="content-container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Hassle-Free Support
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Exchange & Return Policy
        </h1>
        <p className="text-xs text-gray-500 font-light mt-2 max-w-md mx-auto leading-relaxed">
          We want you to love your Sasa pieces. If sizing isn't quite right, we offer a 7-day easy exchange.
        </p>
      </div>

      <div className="space-y-6 text-xs text-gray-600 font-light leading-relaxed bg-[#faf9f6] border border-gray-200 p-8 rounded-sm">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
            7-Day Exchange Window
          </h3>
          <p>
            Items can be exchanged for size or another piece within 7 days of delivery. The item must be unused, unwashed, with all original brand tags and packaging intact.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
            How to Request an Exchange
          </h3>
          <p className="mb-2">
            To initiate an exchange, please message our support team on WhatsApp with your Order ID and preferred replacement size.
          </p>
          <p>
            Inside Kathmandu Valley, our rider will swap the piece directly at your doorstep. For outside valley orders, we will coordinate courier return.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
            Non-Exchangeable Items
          </h3>
          <p>
            Custom-stitched bespoke orders, personalized alterations, and clearance sale items marked as "Final Sale" cannot be returned.
          </p>
        </div>
      </div>
    </div>
  )
}
