import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreToolbar from "@modules/store/components/store-toolbar"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header Banner */}
      <div className="border-b border-gray-100 bg-[#faf9f6] py-12">
        <div className="content-container max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-gray-200 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gray-700 font-semibold">
                Sasa Exclusive Catalogue
              </span>
            </div>
            <h1 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase mb-3"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              All Kurthas & Attire
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Explore handcrafted festive kurthas, pure silk sets, and contemporary ethnic wear designed in Nepal. Cash on delivery available across all major cities.
            </p>
          </div>
        </div>
      </div>

      <div className="content-container max-w-7xl mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8">
          {/* 25% Left Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <RefinementList sortBy={sort} />
          </aside>
          
          {/* Right Main Content */}
          <main className="w-full flex-1">
            <StoreToolbar sortBy={sort} />

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
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

export default StoreTemplate

