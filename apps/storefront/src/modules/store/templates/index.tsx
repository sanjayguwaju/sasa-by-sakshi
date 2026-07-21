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
    <div className="flex flex-col md:flex-row py-10 content-container gap-x-8">
      {/* 25% Left Sidebar */}
      <div className="w-full md:w-[25%] flex-shrink-0">
        <RefinementList sortBy={sort} />
      </div>
      
      {/* 75% Right Main Content */}
      <div className="w-full md:w-[75%]">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black mb-4">
            Classic - All
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
            The Classic Collection celebrates timeless silhouettes and refined simplicity. Each piece is designed to blend effortlessly into modern life — from tailored essentials to soft everyday layers. Discover minimal fashion that never fades, where comfort meets enduring elegance.
          </p>
        </div>

        {/* View Controls Toolbar */}
        <StoreToolbar sortBy={sort} />

        {/* Product Grid */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
