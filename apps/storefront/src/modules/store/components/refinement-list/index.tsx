"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"
import OptionsPicker from "./options-picker"
import { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  hideOptionsPicker?: boolean
  "data-testid"?: string
}

// Helper Accordion Component
function FilterAccordion({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 py-4">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">{title}</span>
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}

const RefinementList = ({
  sortBy,
  hideOptionsPicker = false,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())
      updater(params)

      params.delete("page")

      const queryString = params.toString()
      const currentQuery = searchParams.toString()
      const nextPath = queryString ? `${pathname}?${queryString}` : pathname
      const currentPath = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname

      if (nextPath !== currentPath) {
        router.push(nextPath)
      }
    },
    [pathname, router, searchParams]
  )

  const setQueryParams = (name: string, value: string) =>
    updateQueryParams((params) => params.set(name, value))

  const selectedOptionValueIds = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams]
  )

  const setOptionValueIds = (valueIds: string[]) =>
    updateQueryParams((params) => {
      params.delete(OPTION_VALUE_QUERY_KEY)
      valueIds.forEach((valueId) =>
        params.append(OPTION_VALUE_QUERY_KEY, valueId)
      )
    })

  return (
    <div className="flex flex-col w-full pr-8" data-testid={dataTestId}>
      
      {/* Sidebar Navigation Links */}
      <div className="flex flex-col gap-y-4 mb-10">
        <LocalizedClientLink href="/collections" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Collections
        </LocalizedClientLink>
        <LocalizedClientLink href="/store" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Product
        </LocalizedClientLink>
        <LocalizedClientLink href="/blog" className="text-[11px] uppercase tracking-wide text-black font-semibold flex items-center">
          <span className="text-gray-400 mr-1">{">"}</span> Blog
        </LocalizedClientLink>
        <LocalizedClientLink href="/pages" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Pages
        </LocalizedClientLink>
        <LocalizedClientLink href="/categories" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          New In
        </LocalizedClientLink>
        <LocalizedClientLink href="/trend" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Trend
        </LocalizedClientLink>
        <LocalizedClientLink href="/store" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Shop
        </LocalizedClientLink>
        <LocalizedClientLink href="/buy" className="text-[11px] uppercase tracking-wide text-gray-600 hover:text-black">
          Buy SASA
        </LocalizedClientLink>
      </div>

      {/* Refined By (Mock) */}
      <div className="mb-6">
        <h3 className="text-[11px] font-bold tracking-[0.1em] uppercase text-black mb-1">
          Refined By:
        </h3>
        <p className="text-xs text-gray-500">22 products</p>
      </div>

      {/* Filters Accordions */}
      <div className="flex flex-col border-t border-gray-100">
        
        {/* Category Mock Filter */}
        <FilterAccordion title="Category" defaultOpen={true}>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-black transition-colors">
                {/* Checkmark icon for active state would go here */}
              </div>
              <span className="text-[11px] uppercase text-gray-700">Sweaters</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300 flex items-center justify-center group-hover:border-black transition-colors"></div>
              <span className="text-[11px] uppercase text-gray-700">Tops</span>
            </label>
          </div>
        </FilterAccordion>

        {/* Price Filter */}
        <FilterAccordion title="Price">
          <div className="text-xs text-gray-500 py-2">Price slider placeholder</div>
        </FilterAccordion>

        {/* Other Filters (using existing OptionsPicker if we want Medusa standard variants) */}
        {!hideOptionsPicker && (
          <FilterAccordion title="More Filters">
             <OptionsPicker
              selectedValueIds={selectedOptionValueIds}
              setOptionValueIds={setOptionValueIds}
            />
          </FilterAccordion>
        )}

        <FilterAccordion title="Brand">
          <div className="text-xs text-gray-500 py-2">Brand filters...</div>
        </FilterAccordion>
        
        <FilterAccordion title="Availability">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300"></div>
              <span className="text-[11px] uppercase text-gray-700">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300"></div>
              <span className="text-[11px] uppercase text-gray-700">Out of Stock</span>
            </label>
          </div>
        </FilterAccordion>
        
        <FilterAccordion title="Color">
          <div className="flex flex-wrap gap-2">
             <button className="w-6 h-6 rounded-full border border-gray-300 bg-black" title="Black"></button>
             <button className="w-6 h-6 rounded-full border border-gray-300 bg-white" title="White"></button>
             <button className="w-6 h-6 rounded-full border border-gray-300 bg-blue-500" title="Blue"></button>
          </div>
        </FilterAccordion>
        
        <FilterAccordion title="Size">
          <div className="flex flex-wrap gap-2">
             <button className="px-2 py-1 border border-gray-300 text-[10px] hover:border-black">S</button>
             <button className="px-2 py-1 border border-gray-300 text-[10px] hover:border-black">M</button>
             <button className="px-2 py-1 border border-gray-300 text-[10px] hover:border-black">L</button>
             <button className="px-2 py-1 border border-gray-300 text-[10px] hover:border-black">XL</button>
          </div>
        </FilterAccordion>

        {/* Featured Products Sidebar Widget */}
        <FilterAccordion title="Featured Products">
          <div className="flex items-center gap-4 py-2 group cursor-pointer">
            <div className="w-16 h-20 bg-gray-100 overflow-hidden relative">
              {/* Note: In a real app we'd map over products here. Hardcoding structural placeholder. */}
              <div className="absolute inset-0 bg-gray-200"></div>
            </div>
            <div className="flex flex-col">
               <span className="text-xs text-black font-medium">Sample Product</span>
               <span className="text-[11px] text-gray-500">$99.00</span>
            </div>
          </div>
        </FilterAccordion>

      </div>
    </div>
  )
}

export default RefinementList
