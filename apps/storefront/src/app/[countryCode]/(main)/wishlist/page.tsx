"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sasa_wishlist")
      if (saved) {
        setWishlist(JSON.parse(saved))
      }
    } catch (e) {
      // Ignored
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id)
    setWishlist(updated)
    try {
      localStorage.setItem("sasa_wishlist", JSON.stringify(updated))
    } catch (e) {
      // Ignored
    }
  }

  return (
    <div className="content-container max-w-7xl mx-auto py-12 px-4 min-h-[65vh]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Saved Pieces
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          My Wishlist
        </h1>
        <p className="text-xs text-gray-500 font-light mt-2">
          Save your favorite handcrafted Kurthas and festive edits for celebrations ahead.
        </p>
      </div>

      {!isLoaded ? (
        <div className="py-20 flex justify-center">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : wishlist.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-[#faf9f6] border border-gray-200 rounded-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#cda434]/10 text-[#cda434] flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-black uppercase tracking-wider mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
            Explore our curated collections of pure silk kurthas and daily essentials to find your favorites.
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-block px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-sm"
          >
            Explore Kurthas
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-white border border-gray-100 p-3 hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[3/4] w-full bg-[#f6f5f3] overflow-hidden mb-3">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from Wishlist"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-gray-500 hover:text-red-500 flex items-center justify-center shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <LocalizedClientLink href={`/products/${item.handle}`} className="flex-1">
                <h3 className="text-xs font-medium text-black line-clamp-1 group-hover:text-[#cda434] transition-colors">
                  {item.title}
                </h3>
                {item.price && (
                  <p className="text-xs font-bold text-black mt-1">{item.price}</p>
                )}
              </LocalizedClientLink>
              <LocalizedClientLink
                href={`/products/${item.handle}`}
                className="mt-3 w-full py-2 bg-black text-white text-center text-[10px] font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View Product
              </LocalizedClientLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
