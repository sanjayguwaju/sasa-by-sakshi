import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreToolbar from "@modules/store/components/store-toolbar"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header Banner */}
      <div className="border-b border-gray-100 bg-[#faf9f6] py-10">
        <div className="content-container max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500 mb-3">
            <LocalizedClientLink href="/" className="hover:text-black transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/collections" className="hover:text-black transition-colors">
              Collections
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-black font-semibold">{collection.title}</span>
          </div>

          <div className="max-w-3xl">
            <h1 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase mb-3"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {collection.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Explore curated pieces crafted specifically for this collection — hand-selected fabrics and timeless silhouettes.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="content-container max-w-7xl mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8">
          {/* Compact Left Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <RefinementList sortBy={sort} />
          </aside>

          {/* Product Grid Area */}
          <main className="w-full flex-1">
            <StoreToolbar sortBy={sort} />

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length ?? 6}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

