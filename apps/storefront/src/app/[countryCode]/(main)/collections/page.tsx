import { Metadata } from "next"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Collections — Sasa by Sakshi",
  description:
    "Explore curated collections of handcrafted festive kurthas, pure fabrics, and contemporary ethnic wear designed in Nepal.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CollectionsPage(props: Props) {
  const params = await props.params
  const { countryCode } = params

  const [region, { collections }] = await Promise.all([
    getRegion(countryCode),
    listCollections({ fields: "*products, *products.thumbnail, *products.images" }),
  ])

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-gray-200 bg-gray-50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gray-700 font-semibold">
              Curated Edits & Themes
            </span>
          </div>
          <h1 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Collections
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Immerse yourself in our thoughtfully curated themes — blending traditional Nepali craftsmanship with contemporary luxury.
          </p>
        </div>

        {/* Real Collections from Medusa Database */}
        {collections && collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {collections.map((col) => {
              const previewImage =
                col.products?.find((p) => p.thumbnail)?.thumbnail ||
                col.products?.find((p) => p.images && p.images.length > 0)?.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fit=crop"

              return (
                <LocalizedClientLink
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  className="group block relative overflow-hidden bg-[#fafafa] border border-gray-100 rounded-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <img
                      src={previewImage}
                      alt={col.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">
                      {col.products?.length || 0} {col.products?.length === 1 ? "Product" : "Products"}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h2 
                        className="text-2xl font-bold tracking-tight mb-2 group-hover:text-[#cda434] transition-colors"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        {col.title}
                      </h2>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90 group-hover:translate-x-1 transition-transform">
                        <span>Explore Collection</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-[#faf9f6] rounded-sm border border-gray-100 p-8 mb-16">
            <span className="text-3xl mb-3">✨</span>
            <h3 
              className="text-xl font-bold tracking-tight text-black mb-2"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              No Collections Found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6 font-light">
              Collections created in the Medusa Admin panel will automatically appear here.
            </p>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="border border-gray-200 bg-[#0a0a0a] text-white p-8 sm:p-12 text-center rounded-sm">
          <h3 
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Looking for something specific?
          </h3>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mb-8 font-light">
            Browse our full catalog with advanced filters for sizes, colors, and prices in Nepalese Rupees (NPR).
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-[#cda434] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <span>Browse All Kurthas</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

