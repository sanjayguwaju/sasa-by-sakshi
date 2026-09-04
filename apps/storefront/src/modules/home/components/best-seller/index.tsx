"use client"

import { useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import Image from "next/image"

type BestSellerProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function BestSeller({ products, region }: BestSellerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="w-full py-16 bg-white relative group" id="best-seller">
      <div className="content-container max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
                Trending Right Now
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-black uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-x-6">
            <LocalizedClientLink
              href="/store"
              className="text-xs tracking-[0.15em] uppercase font-semibold text-black hover:text-[#cda434] transition-colors duration-200 border-b border-black pb-0.5"
            >
              Explore All Kurthas
            </LocalizedClientLink>
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-6 pb-4"
          >
            {products.map((product) => {
              const { cheapestPrice } = getProductPrice({ product })
              const isSale = cheapestPrice && cheapestPrice.price_type === "sale"
              const hoverImage = product.images?.find((img) => img.url !== product.thumbnail)?.url
              const sizeOption = product.options?.find((o) => o.title?.toLowerCase() === "size")

              return (
                <div 
                  key={product.id}
                  className="w-[75vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group/card relative"
                >
                  {/* Product Image Container */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f7f7f7] rounded-sm mb-3">
                    <LocalizedClientLink 
                      href={`/products/${product.handle}`} 
                      className="absolute inset-0 z-0 block"
                    >
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          className={`object-cover object-top transition-all duration-700 ease-out ${
                            hoverImage ? "group-hover/card:opacity-0 group-hover/card:scale-105" : "group-hover/card:scale-105"
                          }`}
                          sizes="(max-width: 576px) 75vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                          No Image Available
                        </div>
                      )}

                      {hoverImage && (
                        <Image
                          src={hoverImage}
                          alt={`${product.title} alternate view`}
                          fill
                          className="object-cover object-top absolute inset-0 opacity-0 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700 ease-out"
                          sizes="(max-width: 576px) 75vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      )}
                    </LocalizedClientLink>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                      {isSale ? (
                        <span className="bg-[#cc2127] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
                          Sale
                        </span>
                      ) : (
                        <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
                          Best Seller
                        </span>
                      )}
                    </div>

                    {/* Quick Choose Options Button on hover */}
                    <div className="absolute inset-x-3 bottom-3 z-10 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
                      <LocalizedClientLink
                        href={`/products/${product.handle}`}
                        className="w-full py-2.5 bg-white/95 backdrop-blur-md text-black hover:bg-black hover:text-white transition-colors duration-200 text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 shadow-md rounded-sm border border-gray-100"
                      >
                        <span>Choose Options</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </LocalizedClientLink>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-1">
                    {sizeOption && sizeOption.values && sizeOption.values.length > 0 && (
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                        {sizeOption.values.map((v) => v.value).join(" · ")}
                      </span>
                    )}

                    <LocalizedClientLink 
                      href={`/products/${product.handle}`}
                      className="hover:text-[#cda434] transition-colors"
                    >
                      <h3 className="text-sm font-medium text-black leading-snug line-clamp-1">
                        {product.title}
                      </h3>
                    </LocalizedClientLink>

                    {cheapestPrice && (
                      <div className="flex items-center gap-2 pt-0.5">
                        {isSale && (
                          <span className="text-xs text-gray-400 line-through">
                            {cheapestPrice.original_price}
                          </span>
                        )}
                        <span className={`text-sm font-semibold ${isSale ? "text-[#cc2127]" : "text-gray-900"}`}>
                          {cheapestPrice.calculated_price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button 
            type="button"
            onClick={scrollLeft}
            aria-label="Previous products"
            className="absolute -left-3 top-1/3 -translate-y-1/2 w-10 h-10 bg-white/95 shadow-md border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex hover:bg-black hover:text-white z-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            type="button"
            onClick={scrollRight}
            aria-label="Next products"
            className="absolute -right-3 top-1/3 -translate-y-1/2 w-10 h-10 bg-white/95 shadow-md border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex hover:bg-black hover:text-white z-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

