import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Categories — Sasa by Sakshi",
  description:
    "Explore categories of handcrafted kurthas, sets, and contemporary ethnic wear designed in Nepal.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CategoriesPage(props: Props) {
  const params = await props.params
  const { countryCode } = params

  const [region, categories] = await Promise.all([
    getRegion(countryCode),
    listCategories({ fields: "*products, *products.thumbnail, *products.images" }),
  ])

  // Filter top-level categories
  const topLevelCategories = categories?.filter((c) => !c.parent_category_id) || []

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="content-container max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-gray-200 bg-gray-50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gray-700 font-semibold">
              Browse By Category
            </span>
          </div>
          <h1 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Categories
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Find the perfect silhouette for every occasion — handcrafted with premium materials and timeless aesthetics.
          </p>
        </div>

        {/* Real Categories from Medusa Database */}
        {topLevelCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {topLevelCategories.map((category) => {
              const previewImage =
                category.products?.find((p) => p.thumbnail)?.thumbnail ||
                category.products?.find((p) => p.images && p.images.length > 0)?.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&fit=crop"

              return (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="group block relative overflow-hidden bg-[#fafafa] border border-gray-100 rounded-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <img
                      src={previewImage}
                      alt={category.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">
                      {category.products?.length || 0} {category.products?.length === 1 ? "Product" : "Products"}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h2 
                        className="text-2xl font-bold tracking-tight mb-2 group-hover:text-[#cda434] transition-colors"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-xs text-gray-300 font-light line-clamp-2 mb-3">
                          {category.description}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                        <span>View Products</span>
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
              No Categories Found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6 font-light">
              Categories created in the Medusa Admin panel will automatically appear here.
            </p>
          </div>
        )}

        {/* Explore All CTA */}
        <div className="border border-gray-200 bg-[#fafafa] p-8 sm:p-12 text-center rounded-sm">
          <h3 
            className="text-2xl font-bold tracking-tight text-black mb-3"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            All Kurthas & Silhouettes
          </h3>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6 font-light">
            Looking for something else? Explore our full collection of styles and festive essentials.
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white hover:bg-[#cda434] transition-all text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <span>Explore All Products</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

