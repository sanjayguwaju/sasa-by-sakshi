import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      limit: 8,
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 border-t border-gray-100 bg-white">
      <div className="content-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
                Curated Collection
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-black uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {collection.title}
            </h2>
          </div>

          <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-black hover:text-[#cda434] border-b border-black pb-0.5 transition-colors duration-200 group w-fit"
          >
            <span>View All {collection.title}</span>
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </LocalizedClientLink>
        </div>

        {/* Product Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

