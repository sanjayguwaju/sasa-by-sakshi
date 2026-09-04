import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Size & Fit Guide | Sasa by Sakshi",
  description: "Complete size and fit guide for Sasa by Sakshi Kurthas and ethnic wear.",
}

export default function SizingPage() {
  return (
    <div className="content-container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Measurements & Fit
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Size & Fit Guide
        </h1>
        <p className="text-xs text-gray-500 font-light mt-2 max-w-md mx-auto leading-relaxed">
          Find your perfect silhouette. All measurements are provided in inches for standard garment dimensions.
        </p>
      </div>

      {/* Kurtha Size Table */}
      <div className="overflow-x-auto mb-12 border border-gray-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black text-white text-[11px] uppercase tracking-wider">
              <th className="py-3.5 px-4 font-semibold">Size</th>
              <th className="py-3.5 px-4 font-semibold">Bust (Inches)</th>
              <th className="py-3.5 px-4 font-semibold">Waist (Inches)</th>
              <th className="py-3.5 px-4 font-semibold">Hips (Inches)</th>
              <th className="py-3.5 px-4 font-semibold">Kurtha Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-black">S (Small)</td>
              <td className="py-3 px-4 text-gray-600">36"</td>
              <td className="py-3 px-4 text-gray-600">32"</td>
              <td className="py-3 px-4 text-gray-600">38"</td>
              <td className="py-3 px-4 text-gray-600">42" - 44"</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-50/50">
              <td className="py-3 px-4 font-bold text-black">M (Medium)</td>
              <td className="py-3 px-4 text-gray-600">38"</td>
              <td className="py-3 px-4 text-gray-600">34"</td>
              <td className="py-3 px-4 text-gray-600">40"</td>
              <td className="py-3 px-4 text-gray-600">43" - 45"</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-black">L (Large)</td>
              <td className="py-3 px-4 text-gray-600">40"</td>
              <td className="py-3 px-4 text-gray-600">36"</td>
              <td className="py-3 px-4 text-gray-600">42"</td>
              <td className="py-3 px-4 text-gray-600">44" - 46"</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-50/50">
              <td className="py-3 px-4 font-bold text-black">XL (Extra Large)</td>
              <td className="py-3 px-4 text-gray-600">42"</td>
              <td className="py-3 px-4 text-gray-600">38"</td>
              <td className="py-3 px-4 text-gray-600">44"</td>
              <td className="py-3 px-4 text-gray-600">44" - 46"</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-black">XXL</td>
              <td className="py-3 px-4 text-gray-600">44"</td>
              <td className="py-3 px-4 text-gray-600">40"</td>
              <td className="py-3 px-4 text-gray-600">46"</td>
              <td className="py-3 px-4 text-gray-600">45" - 47"</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sizing Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#faf9f6] p-8 border border-gray-100 mb-12">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
            How to Measure
          </h3>
          <ul className="text-xs text-gray-600 space-y-2 font-light">
            <li><strong>Bust:</strong> Measure around the fullest part of your chest with a relaxed posture.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline, slightly above your navel.</li>
            <li><strong>Hips:</strong> Measure around the fullest part of your hips and seat.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
            Custom Alterations
          </h3>
          <p className="text-xs text-gray-600 font-light leading-relaxed">
            Need custom fitting or unstitched fabric tailoring? Reach out to our Kathmandu styling team on WhatsApp for bespoke sizing assistance before placing your order.
          </p>
        </div>
      </div>

      <div className="text-center">
        <LocalizedClientLink
          href="/store"
          className="inline-block px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
        >
          Explore All Kurthas
        </LocalizedClientLink>
      </div>
    </div>
  )
}
