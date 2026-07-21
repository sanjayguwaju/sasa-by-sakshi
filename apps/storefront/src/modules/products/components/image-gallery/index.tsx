"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"
import { clx } from "@modules/common/components/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col w-full relative">
      
      {/* Mobile Slider / Desktop Grid Container */}
      <div className="w-full">
        {/* DESKTOP GRID (Hidden on mobile) */}
        <div className="hidden md:grid grid-cols-2 gap-2 w-full">
          {images.map((image, index) => {
            return (
              <div
                key={image.id}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f3]"
                id={image.id}
              >
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white border border-black text-black text-[10px] px-3 py-1 tracking-wider uppercase">
                      New
                    </span>
                  </div>
                )}
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="absolute inset-0 object-cover object-top"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* MOBILE SLIDER (Hidden on desktop) */}
        <div className="md:hidden flex flex-col w-full relative">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f3]">
            {/* NEW Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white border border-black text-black text-[10px] px-3 py-1 tracking-wider uppercase">
                New
              </span>
            </div>

            {/* Main Image */}
            {!!images[currentIndex]?.url && (
              <Image
                src={images[currentIndex].url}
                priority={true}
                className="absolute inset-0 object-cover object-top"
                alt={`Product image ${currentIndex + 1}`}
                fill
                sizes="100vw"
              />
            )}

            {/* Slider Navigation Arrows */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-x-2 z-10">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50"
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c4e43" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50"
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c4e43" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Thumbnails */}
          {images.length > 1 && (
            <div className="flex overflow-x-auto gap-2 mt-2 snap-x snap-mandatory hide-scrollbar">
              {images.map((img, idx) => (
                <button 
                  key={img.id} 
                  onClick={() => setCurrentIndex(idx)}
                  className={clx(
                    "relative w-20 aspect-[3/4] flex-shrink-0 snap-start overflow-hidden bg-[#f5f5f3] transition-opacity",
                    {
                      "opacity-100 border border-black": currentIndex === idx,
                      "opacity-70": currentIndex !== idx
                    }
                  )}
                >
                  {!!img.url && (
                    <Image
                      src={img.url}
                      className="absolute inset-0 object-cover object-top"
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
