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

  // Mock badge logic: random sale or new tag for presentation, or check tags.
  // In a real scenario, this would use product tags or metadata.
  const isNew = product.tags?.some((t) => t.value.toLowerCase() === "new")
  const isSale = product.tags?.some((t) => t.value.toLowerCase() === "sale") || (cheapestPrice && cheapestPrice.price_type === "sale")

  // Find a secondary image to show on hover
  const hoverImage = product.images?.find((img) => img.url !== product.thumbnail)?.url

  return (
    <div className="group/link block w-full relative">
      {/* Invisible overlay link that covers the entire card so the whole card is clickable */}
      <LocalizedClientLink href={`/products/${product.handle}`} className="absolute inset-0 z-10">
        <span className="sr-only">Go to {product.title}</span>
      </LocalizedClientLink>

      <div data-testid="product-wrapper" className="flex flex-col relative w-full group/card pointer-events-none">
        {/* Product Image Container (3:4 aspect ratio) */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f5f5f3] mb-4 pointer-events-auto">
          
          {/* Badges (z-20 to be above the overlay link, pointer-events-auto to be clickable) */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
            {isNew && (
              <LocalizedClientLink 
                href="/store"
                className="bg-white border border-black text-black text-[10px] px-2 py-0.5 tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
              >
                New
              </LocalizedClientLink>
            )}
            {isSale && (
              <LocalizedClientLink 
                href="/store" 
                className="bg-[#cc2127] border border-[#cc2127] text-white text-[10px] px-2 py-0.5 tracking-wider uppercase hover:bg-white hover:text-[#cc2127] transition-colors"
              >
                Sale
              </LocalizedClientLink>
            )}
          </div>

          {/* Primary Product Image (Thumbnail) */}
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className={`object-cover object-top transition-all duration-700 ease-in-out z-0 ${hoverImage ? 'group-hover/card:opacity-0' : 'group-hover/card:scale-105'}`}
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          )}

          {/* Secondary Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.title} alternate view`}
              fill
              className="object-cover object-top absolute inset-0 -z-10 scale-105 group-hover/card:scale-100 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          )}
        </div>

        {/* Color Swatches (Mock implementation below the image) */}
        <div className="flex gap-1.5 mb-2 relative z-20 pointer-events-auto">
           <span className="w-4 h-4 border border-black block cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: "#ffffff" }} title="White"></span>
           <span className="w-4 h-4 border border-gray-300 block cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: "#361c77" }} title="Purple"></span>
           <span className="w-4 h-4 border border-gray-300 block cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: "#000000" }} title="Black"></span>
        </div>

        {/* Product Details Row */}
        <div className="flex justify-between items-start gap-2">
          {/* Title */}
          <h3 className="text-sm text-black font-medium leading-tight line-clamp-2 pr-4 flex-1" data-testid="product-title">
            {product.title}
          </h3>
          
          {/* Price */}
          <div className="text-xs text-gray-700 whitespace-nowrap pt-0.5">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>

        {/* Choose Options Link */}
        <div className="mt-2 relative z-20 pointer-events-auto w-fit">
          <LocalizedClientLink href={`/products/${product.handle}`} className="text-[10px] tracking-[0.05em] text-gray-500 uppercase border-b border-gray-500 hover:text-black hover:border-black transition-colors">
            Choose Options
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
