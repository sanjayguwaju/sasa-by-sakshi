"use client"

import { useRef } from "react"

export default function RelatedProductsSlider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative group/slider w-full">
      <ul 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 w-full pb-4"
      >
        {children}
      </ul>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute -left-4 top-1/3 -translate-y-1/2 w-10 h-10 bg-white shadow-md border border-gray-100 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hidden small:flex hover:bg-black hover:text-white z-10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <button 
        onClick={scrollRight}
        className="absolute -right-4 top-1/3 -translate-y-1/2 w-10 h-10 bg-white shadow-md border border-gray-100 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hidden small:flex hover:bg-black hover:text-white z-10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  )
}
