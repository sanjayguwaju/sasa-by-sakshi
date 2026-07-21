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

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        
        {/* Title, Vendor, Availability */}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-black">{product.title}</h1>
          <div className="text-sm text-gray-700">
            <p>Vendor: <span className="font-medium">Hugo Streetwear</span></p>
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

        {/* Scarcity Bar Mock */}
        <div className="flex flex-col gap-y-1">
          <span className="text-red-500 text-sm font-medium">Hurry up! Only 2 left</span>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 w-[15%] h-full rounded-full"></div>
          </div>
        </div>

        {/* Countdown Timer Mock */}
        <div className="bg-gray-100 rounded-full px-8 py-3 flex items-center justify-center gap-x-4 max-w-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light">163</span>
            <span className="text-[10px] uppercase tracking-wide">Days</span>
          </div>
          <span className="text-2xl font-light mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light">10</span>
            <span className="text-[10px] uppercase tracking-wide">Hours</span>
          </div>
          <span className="text-2xl font-light mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light">36</span>
            <span className="text-[10px] uppercase tracking-wide">Mins</span>
          </div>
          <span className="text-2xl font-light mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-light">41</span>
            <span className="text-[10px] uppercase tracking-wide">Secs</span>
          </div>
        </div>

        {/* Custom Inputs Mock */}
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label className="text-sm font-medium">Input text</label>
            <input type="text" className="border border-gray-300 h-10 px-3 w-full max-w-sm focus:outline-none focus:border-black" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-sm font-medium">Input file</label>
            <input type="file" className="border border-gray-300 h-10 w-full max-w-sm p-1 text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
          </div>
        </div>

        {/* Utilities Links */}
        <div className="flex items-center gap-x-6 text-sm text-black font-medium">
          <button className="flex items-center gap-x-2 hover:opacity-70"><span className="text-lg">📏</span> Size chart</button>
          <button className="flex items-center gap-x-2 hover:opacity-70"><span className="text-lg">🎨</span> Compare color</button>
          <button className="flex items-center gap-x-2 hover:opacity-70"><span className="text-lg">🙋</span> Ask an expert</button>
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
        <div className="flex items-center gap-x-4">
          <button
            onClick={handleAddToCart}
            disabled={!inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant || !agreed}
            className={`flex-1 h-12 bg-black text-white font-bold tracking-widest text-xs uppercase hover:bg-gray-800 transition-colors ${(!inStock || !isValidVariant || !agreed) ? "opacity-50 cursor-not-allowed" : ""}`}
            data-testid="add-product-button"
          >
            {!selectedVariant && !options ? "Select variant" : !inStock || !isValidVariant ? "Out of stock" : "Add to cart"}
          </button>
          
          <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-black transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-black transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </button>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-center gap-x-2 cursor-pointer text-sm">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 border-gray-300 cursor-pointer" />
          <span>I agree with the <Link href="#" className="underline">Terms & Conditions</Link></span>
        </label>

        {/* Buy It Now */}
        <button 
          disabled={!agreed}
          className={`w-full h-12 border border-gray-300 bg-white text-black font-bold tracking-widest text-xs uppercase hover:border-black transition-colors ${!agreed ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Buy It Now
        </button>

        {/* Pickup Info */}
        <div className="flex flex-col gap-y-1 text-xs mt-2">
          <p className="flex items-center gap-x-1 font-medium"><span className="text-green-600">✓</span> Pickup available at 2630 Airport Road</p>
          <p className="text-gray-500 pl-4">Usually ready in 24 hours</p>
          <button className="text-gray-500 underline pl-4 text-left hover:text-black">View store information</button>
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
