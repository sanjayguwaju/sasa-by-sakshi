import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import Image from "next/image"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isSale =
    product.tags?.some((t) => t.value.toLowerCase() === "sale") ||
    (cheapestPrice && cheapestPrice.price_type === "sale")
  const isFestive =
    product.tags?.some((t) => t.value.toLowerCase() === "festive") ||
    product.collection?.title?.toLowerCase().includes("festive") ||
    product.title?.toLowerCase().includes("kurtha")
  const isNew =
    product.tags?.some((t) => t.value.toLowerCase() === "new")

  const hoverImage = product.images?.find((img) => img.url !== product.thumbnail)?.url

  // Extract size/color options if present
  const sizeOption = product.options?.find((o) => o.title?.toLowerCase() === "size")
  const colorOption = product.options?.find((o) => o.title?.toLowerCase() === "color")

  return (
    <div className="group block w-full relative bg-white transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f7f7f7] rounded-sm mb-3">
        {/* Clickable Image Link */}
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
                hoverImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
              }`}
              sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
              className="object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </LocalizedClientLink>

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {cheapestPrice?.percentage_diff && Number(cheapestPrice.percentage_diff) > 0 ? (
            <span className="bg-[#cc2127] text-white text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm flex items-center gap-0.5">
              <span>-{cheapestPrice.percentage_diff}%</span>
              <span>OFF</span>
            </span>
          ) : isSale ? (
            <span className="bg-[#cc2127] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
              Sale
            </span>
          ) : isFestive ? (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
              Festive
            </span>
          ) : isNew ? (
            <span className="bg-white border border-black text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[2px] shadow-sm">
              New
            </span>
          ) : null}
        </div>


        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          aria-label="Add to Wishlist"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-[#cc2127] hover:bg-white transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Quick Add / Select Options Action (Slides up on Hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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

      {/* Product Information */}
      <div className="flex flex-col gap-1">
        {/* Available sizes or subtitle */}
        {sizeOption && sizeOption.values && sizeOption.values.length > 0 ? (
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            {sizeOption.values.map((v) => v.value).join(" · ")}
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            Handcrafted Kurtha
          </span>
        )}

        {/* Title */}
        <LocalizedClientLink 
          href={`/products/${product.handle}`}
          className="group-hover:text-[#cda434] transition-colors"
        >
          <h3 
            className="text-sm font-medium text-black leading-snug line-clamp-1"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </LocalizedClientLink>

        {/* Price Row */}
        <div className="flex items-center gap-2 pt-0.5">
          {cheapestPrice && (
            <div className="text-sm font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
              <PreviewPrice price={cheapestPrice} />
              {cheapestPrice.percentage_diff && Number(cheapestPrice.percentage_diff) > 0 ? (
                <span className="text-[11px] font-bold text-[#cc2127]">
                  Save {cheapestPrice.percentage_diff}%
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

