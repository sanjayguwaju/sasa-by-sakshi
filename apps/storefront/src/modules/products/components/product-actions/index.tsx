"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"
import Link from "next/link"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [qty, setQty] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) return

    if (value) params.set("v_id", value)
    else params.delete("v_id")

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (selectedVariant?.manage_inventory && (selectedVariant?.inventory_quantity || 0) > 0) return true
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || !agreed) return null
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity: qty,
      countryCode,
    })
    setIsAdding(false)
  }

  // Calculate Mock Subtotal
  // We use calculated_price if available. For true subtotal, we need the numeric price.
  // We'll let the user see the visual update from standard ProductPrice and mock subtotal with plain text.

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappInquiryUrl = useMemo(() => {
    if (!whatsappNumber) return null
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "")
    const variantText = selectedVariant?.title ? ` (Variant: ${selectedVariant.title})` : ""
    const message = encodeURIComponent(
      `Namaste Sasa by Sakshi! 🙏 I'm interested in ordering/inquiring about: "${product.title}"${variantText}.\nProduct Link: ${typeof window !== "undefined" ? window.location.href : ""}`
    )
    return `https://wa.me/${cleanNumber}?text=${message}`
  }, [whatsappNumber, product.title, selectedVariant])

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        
        {/* Title, Vendor, Availability */}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-black">{product.title}</h1>
          <div className="text-sm text-gray-700">
            <p>Vendor: <span className="font-medium">Sasa by Sakshi</span></p>
            <p className="mt-1">Availability: <span className="font-medium">{inStock ? "In stock" : "Out of stock"}</span></p>
          </div>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-black">
          <ProductPrice product={product} variant={selectedVariant} />
        </div>

        {/* Options (Color, Size, etc.) */}
        <div className="flex flex-col gap-y-6">
          {(product.options || []).map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              disabled={!!disabled || isAdding}
            />
          ))}
        </div>

        {/* Quantity & Subtotal */}
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border border-gray-300 w-fit h-10">
              <button className="px-4 text-lg hover:bg-gray-50" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button className="px-4 text-lg hover:bg-gray-50" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <div className="text-sm">
            Product subtotal: <span className="font-bold"><ProductPrice product={product} variant={selectedVariant} /></span>
          </div>
        </div>

        {/* Add to Cart row */}
        <div className="flex flex-col gap-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant}
            className={`w-full h-12 bg-black text-white font-bold tracking-widest text-xs uppercase hover:bg-gray-800 transition-colors ${(!inStock || !isValidVariant) ? "opacity-50 cursor-not-allowed" : ""}`}
            data-testid="add-product-button"
          >
            {!selectedVariant && !options ? "Select variant" : !inStock || !isValidVariant ? "Out of stock" : "Add to cart"}
          </button>

          {/* WhatsApp Direct Order / Inquiry Button */}
          {whatsappInquiryUrl && (
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 flex items-center justify-center gap-x-2 border border-[#25D366] bg-emerald-50/60 text-[#128C7E] hover:bg-[#25D366] hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-200 rounded-none shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.78 11.66c-.2-.1-.7-1.19-.77-1.3-.07-.11-.12-.17-.18-.08-.06.09-.23.29-.28.35-.05.06-.11.07-.31-.03-.2-.1-.85-.31-1.61-.99-.6-.53-1-1.19-1.12-1.39-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.11.13-.19.2-.31.07-.12.03-.23-.02-.33-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34h-.39c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67 0 .98.72 1.93.82 2.06.1.13 1.41 2.15 3.42 3.01.48.21.85.33 1.14.42.48.15.92.13 1.27.08.39-.06 1.19-.49 1.36-.96.17-.47.17-.88.12-.96-.05-.08-.18-.13-.38-.23z" />
              </svg>
              <span>Inquire / Order on WhatsApp</span>
            </a>
          )}
        </div>

        {/* Delivery & Assurance Info */}
        <div className="flex flex-col gap-y-1 text-xs mt-2 border-t border-gray-100 pt-4">
          <p className="flex items-center gap-x-1 font-medium text-gray-800"><span className="text-green-600">✓</span> Cash on Delivery Available across Nepal</p>
          <p className="text-gray-500 pl-4">Delivery in 24-48 hours inside Kathmandu Valley</p>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding || !agreed}
        />
      </div>
    </>
  )
}
