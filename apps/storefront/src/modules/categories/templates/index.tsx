import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreToolbar from "@modules/store/components/store-toolbar"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="bg-white min-h-screen" data-testid="category-container">
      {/* Editorial Header Banner */}
      <div className="border-b border-gray-100 bg-[#faf9f6] py-10">
        <div className="content-container max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500 mb-3">
            <LocalizedClientLink href="/" className="hover:text-black transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/categories" className="hover:text-black transition-colors">
              Categories
            </LocalizedClientLink>
            {parents.map((parent) => (
              <span key={parent.id} className="flex items-center gap-2">
                <span>/</span>
                <LocalizedClientLink
                  href={`/categories/${parent.handle}`}
                  className="hover:text-black transition-colors"
                >
                  {parent.name}
                </LocalizedClientLink>
              </span>
            ))}
            <span>/</span>
            <span className="text-black font-semibold">{category.name}</span>
          </div>

          <div className="max-w-3xl">
            <h1 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase mb-3"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              data-testid="category-page-title"
            >
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              {category.description || "Discover handcrafted pieces tailored with traditional artisanal techniques and contemporary finesse."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="content-container max-w-7xl mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-x-10 gap-y-8">
          {/* Compact Left Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <RefinementList
              sortBy={sort}
              data-testid="sort-by-container"
            />
          </aside>

          {/* Product Grid Area */}
          <main className="w-full flex-1">
            <StoreToolbar sortBy={sort} />

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={category.products?.length ?? 6}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
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

