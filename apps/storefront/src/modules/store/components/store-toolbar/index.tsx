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
    <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-gray-200 py-3 mb-8">
      {/* Left: View As */}
      <div className="flex items-center gap-x-4 mb-4 md:mb-0">
        <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">
          View As
        </span>
        <div className="flex items-center gap-x-1">
          {/* 2 columns icon */}
          <button className="p-0.5 text-gray-400 hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="7" height="16" />
              <rect x="13" y="4" width="7" height="16" />
            </svg>
          </button>
          {/* 3 columns icon (active) */}
          <button className="p-0.5 text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="5" height="16" />
              <rect x="9.5" y="4" width="5" height="16" />
              <rect x="16" y="4" width="5" height="16" />
            </svg>
          </button>
          {/* 4 columns icon */}
          <button className="p-0.5 text-gray-400 hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="4" width="4" height="16" />
              <rect x="7.3" y="4" width="4" height="16" />
              <rect x="12.6" y="4" width="4" height="16" />
              <rect x="18" y="4" width="4" height="16" />
            </svg>
          </button>
          {/* List view icon */}
          <button className="p-0.5 text-gray-400 hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="5" width="18" height="3" />
              <rect x="3" y="10.5" width="18" height="3" />
              <rect x="3" y="16" width="18" height="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: Items Per Page & Sort By */}
      <div className="flex items-center gap-x-8">
        <div className="flex items-center gap-x-2">
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">
            Items Per Page
          </span>
          <select className="text-[11px] uppercase bg-transparent outline-none cursor-pointer">
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="48">48</option>
          </select>
        </div>

        <div className="flex items-center gap-x-2">
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">
            Sort By:
          </span>
          <select 
            value={sortBy} 
            onChange={(e) => setQueryParams("sortBy", e.target.value)}
            className="text-[11px] uppercase bg-transparent outline-none cursor-pointer"
          >
            <option value="created_at">Latest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
