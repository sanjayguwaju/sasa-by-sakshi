"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { SortOptions } from "../refinement-list/sort-products"

export default function StoreToolbar({ sortBy }: { sortBy: SortOptions }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setQueryParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete("page")
      
      const queryString = params.toString()
      router.push(queryString ? `${pathname}?${queryString}` : pathname)
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
      {/* Left: Product summary label */}
      <div className="flex items-center gap-x-2">
        <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
          Handcrafted Silhouettes
        </span>
      </div>

      {/* Right: Sort By */}
      <div className="flex items-center gap-x-3">
        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-black">
          Sort:
        </span>
        <div className="relative">
          <select 
            value={sortBy || "created_at"} 
            onChange={(e) => setQueryParams("sortBy", e.target.value)}
            className="text-xs uppercase tracking-wider bg-[#fafafa] border border-gray-200 rounded-sm py-1.5 pl-3 pr-8 text-black outline-none cursor-pointer hover:border-black transition-colors appearance-none"
          >
            <option value="created_at">Latest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

