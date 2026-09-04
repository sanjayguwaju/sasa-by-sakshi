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

function FilterSection({ 
  title, 
  defaultOpen = true, 
  children 
}: { 
  title: string
  defaultOpen?: boolean
  children: React.ReactNode 
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 py-4">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left py-1 group"
      >
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-black group-hover:text-[#cda434] transition-colors">
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}

const categoriesList = [
  { name: "All Products", handle: "" },
  { name: "Kurthas", handle: "kurthas" },
  { name: "Silk Sets", handle: "sweatshirts" },
  { name: "Shirts", handle: "shirts" },
  { name: "Pants & Trousers", handle: "pants" },
]

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

  const clearAllFilters = () => {
    router.push(pathname)
  }

  const hasActiveFilters = selectedOptionValueIds.length > 0 || searchParams.get("sortBy")

  return (
    <div className="flex flex-col w-full" data-testid={dataTestId}>
      {/* Filters Title & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-black">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">
          Refine By
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-black transition-colors underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Links */}
      <FilterSection title="Categories" defaultOpen={true}>
        <div className="flex flex-col gap-y-2.5">
          {categoriesList.map((cat) => {
            const href = cat.handle ? `/categories/${cat.handle}` : "/store"
            const isActive = cat.handle ? pathname.includes(cat.handle) : pathname.endsWith("/store")

            return (
              <LocalizedClientLink
                key={cat.name}
                href={href}
                className={`text-xs uppercase tracking-wider transition-colors flex items-center justify-between ${
                  isActive
                    ? "font-bold text-black"
                    : "text-gray-600 hover:text-black font-normal"
                }`}
              >
                <span>{cat.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />}
              </LocalizedClientLink>
            )
          })}
        </div>
      </FilterSection>

      {/* Dynamic Variant Options Filter (Sizes, Colors) */}
      {!hideOptionsPicker && (
        <FilterSection title="Sizes & Variants" defaultOpen={true}>
          <OptionsPicker
            selectedValueIds={selectedOptionValueIds}
            setOptionValueIds={setOptionValueIds}
          />
        </FilterSection>
      )}

      {/* Sort By Filter */}
      <FilterSection title="Sort Order" defaultOpen={false}>
        <div className="flex flex-col gap-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="sort_sidebar"
              checked={sortBy === "created_at" || !sortBy}
              onChange={() => setQueryParams("sortBy", "created_at")}
              className="accent-black w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs text-gray-700 uppercase tracking-wide group-hover:text-black">
              Latest Arrivals
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="sort_sidebar"
              checked={sortBy === "price_asc"}
              onChange={() => setQueryParams("sortBy", "price_asc")}
              className="accent-black w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs text-gray-700 uppercase tracking-wide group-hover:text-black">
              Price: Low to High
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="sort_sidebar"
              checked={sortBy === "price_desc"}
              onChange={() => setQueryParams("sortBy", "price_desc")}
              className="accent-black w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs text-gray-700 uppercase tracking-wide group-hover:text-black">
              Price: High to Low
            </span>
          </label>
        </div>
      </FilterSection>

      {/* Delivery Help Card */}
      <div className="mt-8 p-4 bg-[#faf9f6] border border-gray-100 rounded-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-black block mb-1">
          🇳🇵 Nationwide Delivery
        </span>
        <p className="text-[11px] text-gray-600 leading-relaxed font-light">
          Enjoy Cash on Delivery and prompt dispatch inside Kathmandu Valley and major hubs across Nepal.
        </p>
      </div>
    </div>
  )
}

export default RefinementList
