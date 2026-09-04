"use client"

import React, { useEffect, useState } from "react"

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const PROMO_CODE = "WELCOME10"

  useEffect(() => {
    // Only show if not dismissed before
    const isDismissed = localStorage.getItem("sasa_welcome_popup_dismissed")
    if (isDismissed) return

    // Show popup after 5 seconds delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("sasa_welcome_popup_dismissed", "true")
  }

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROMO_CODE)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9779800000000"
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "")
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Namaste Sakshi! 🙏 I'm visiting the website and would like styling assistance with Kurtha sets."
  )}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-amber-100 p-6 md:p-8 text-center animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Boutique Accent Header */}
        <div className="flex justify-center mb-2">
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Exclusive Welcome Offer
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif font-bold text-gray-900 mt-2">
          10% Off Your First Order
        </h3>
        <p className="text-xs text-gray-600 mt-2 leading-relaxed max-w-xs mx-auto">
          Experience timeless handcrafted Nepali Kurthas. Use your personal welcome code at checkout for 10% off.
        </p>

        {/* Promo Code Box */}
        <div className="mt-5 p-4 bg-stone-50 rounded-lg border border-dashed border-amber-300 flex flex-col items-center justify-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            Use Promo Code At Checkout
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-extrabold tracking-widest text-black select-all">
              {PROMO_CODE}
            </span>
            <button
              onClick={handleCopy}
              className="bg-black hover:bg-neutral-800 text-white text-xs font-semibold px-3 py-1.5 rounded transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <span>Copy Code</span>
              )}
            </button>
          </div>
        </div>

        {/* Perks Checklist */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span> COD in Nepal
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span> Free Valley Delivery &gt; 3k
          </span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span> Custom Sizing
          </span>
        </div>

        {/* Action Button: Shop Now */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleClose}
            className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-medium text-xs tracking-wider uppercase rounded-md transition-colors shadow-md"
          >
            Explore Kurtha Collection
          </button>

          {/* WhatsApp Stylist link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="text-[11px] text-[#25D366] hover:underline flex items-center justify-center gap-1 font-medium mt-1"
          >
            <span>💬 Need sizing help? Chat with Sakshi on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
