"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRef } from "react"

const bestSellers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=800&fit=crop&crop=top",
    name: "Quarter-Zip Camel Sweater",
    price: "$89.00",
    badge: null,
    href: "/store",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&crop=top",
    name: "Contrast Stitch Utility Jacket",
    price: "$169.00",
    badge: "NEW",
    href: "/store",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&h=800&fit=crop&crop=top",
    name: "Graphic Logo Cotton Tee",
    price: "$49.00",
    oldPrice: "$59.00",
    badge: null,
    href: "/store",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&h=800&fit=crop&crop=top",
    name: "Minimalist Beige Coat",
    price: "$210.00",
    badge: "SALE",
    href: "/store",
  }
]

export default function BestSeller() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full py-12 bg-white relative group">
      <div className="content-container">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight text-black uppercase">
            Best Seller
          </h2>
          <div className="hidden small:flex items-center gap-x-6">
            <LocalizedClientLink
              href="/store?gender=men"
              className="text-[11px] tracking-[0.15em] uppercase font-medium text-gray-700 hover:text-black border-b border-gray-700 hover:border-black transition-colors duration-200 pb-0.5"
            >
              Shop for Men
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store?gender=women"
              className="text-[11px] tracking-[0.15em] uppercase font-medium text-gray-700 hover:text-black border-b border-gray-700 hover:border-black transition-colors duration-200 pb-0.5"
            >
              Shop for Women
            </LocalizedClientLink>
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 small:gap-6 pb-4"
          >
            {bestSellers.map((product) => (
              <div 
                key={product.id}
                className="w-[85vw] small:w-[calc(33.333%-16px)] medium:w-[calc(25%-18px)] flex-shrink-0 snap-start group/card relative"
              >
                {/* Invisible overlay link that covers the entire card so the whole card is clickable */}
                <LocalizedClientLink href={product.href} className="absolute inset-0 z-10">
                  <span className="sr-only">Go to {product.name}</span>
                </LocalizedClientLink>

                <div className="block relative bg-[#f5f5f3] mb-4 aspect-[3/4] overflow-hidden pointer-events-none">
                  {/* Badges (z-20 to be above the overlay link, pointer-events-auto to be clickable) */}
                  <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-auto">
                    {product.badge === "NEW" && (
                      <LocalizedClientLink 
                        href="/store"
                        className="bg-white border border-black text-black text-[10px] px-2 py-0.5 tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
                      >
                        New
                      </LocalizedClientLink>
                    )}
                    {product.badge === "SALE" && (
                      <LocalizedClientLink 
                        href="/store" 
                        className="bg-[#cc2127] border border-[#cc2127] text-white text-[10px] px-2 py-0.5 tracking-wider uppercase hover:bg-white hover:text-[#cc2127] transition-colors"
                      >
                        Sale
                      </LocalizedClientLink>
                    )}
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105 pointer-events-none"
                  />
                </div>

                {/* Info matching the new product preview style */}
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm text-black font-medium leading-tight truncate flex-1">
                    {product.name}
                  </h3>
                  <div className="text-xs flex gap-x-2 relative z-20 pointer-events-auto">
                    {product.oldPrice && <span className="text-gray-400 line-through">{product.oldPrice}</span>}
                    <span className={product.oldPrice ? "text-red-500" : "text-gray-700"}>{product.price}</span>
                  </div>
                </div>
                <div className="mt-2 relative z-20 pointer-events-auto w-fit">
                  <LocalizedClientLink href={product.href} className="text-[10px] tracking-[0.05em] text-gray-500 uppercase border-b border-gray-500 hover:text-black hover:border-black transition-colors cursor-pointer">
                    Choose Options
                  </LocalizedClientLink>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-4 top-1/3 -translate-y-1/2 w-10 h-10 bg-white shadow-md border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden small:flex hover:bg-black hover:text-white z-20 pointer-events-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className="absolute -right-4 top-1/3 -translate-y-1/2 w-10 h-10 bg-white shadow-md border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden small:flex hover:bg-black hover:text-white z-20 pointer-events-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile Shop Links */}
        <div className="flex items-center justify-center gap-x-6 mt-6 small:hidden">
          <LocalizedClientLink
            href="/store?gender=men"
            className="text-[11px] tracking-[0.15em] uppercase font-medium text-gray-700 hover:text-black border-b border-gray-700 hover:border-black transition-colors duration-200 pb-0.5"
          >
            Shop for Men
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store?gender=women"
            className="text-[11px] tracking-[0.15em] uppercase font-medium text-gray-700 hover:text-black border-b border-gray-700 hover:border-black transition-colors duration-200 pb-0.5"
          >
            Shop for Women
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
