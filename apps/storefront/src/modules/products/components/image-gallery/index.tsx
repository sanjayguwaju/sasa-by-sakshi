"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useRef } from "react"
import { clx } from "@modules/common/components/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full bg-[#f7f7f7] rounded-sm flex items-center justify-center text-gray-400 text-xs">
        No Image Available
      </div>
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Swipe gesture handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4 w-full select-none items-center lg:items-start">
      {/* Thumbnails list (Vertical on Desktop, Horizontal on Mobile) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 lg:gap-3 shrink-0 hide-scrollbar max-h-[500px] lg:max-h-[70vh] py-1 w-full lg:w-auto justify-center lg:justify-start">
          {images.map((image, index) => {
            const isActive = currentIndex === index
            return (
              <button
                key={image.id || index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={clx(
                  "relative w-14 sm:w-16 lg:w-18 aspect-[3/4] rounded-sm overflow-hidden bg-[#f5f5f3] transition-all duration-200 shrink-0",
                  {
                    "ring-2 ring-black opacity-100": isActive,
                    "opacity-60 hover:opacity-100": !isActive,
                  }
                )}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain object-center p-1"
                    sizes="80px"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Slider Viewport (Constrained to max viewport height and centered) */}
      <div 
        className="relative flex-1 aspect-[3/4] max-h-[55vh] sm:max-h-[65vh] lg:max-h-[75vh] w-full overflow-hidden bg-[#f7f7f7] rounded-sm group flex items-center justify-center p-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        {!!images[currentIndex]?.url && (
          <Image
            key={images[currentIndex].id || currentIndex}
            src={images[currentIndex].url}
            priority={true}
            className="object-contain object-center p-4 sm:p-8 animate-in fade-in duration-300"
            alt={`Product view ${currentIndex + 1}`}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        )}

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 z-20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Slide Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider z-20">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery

