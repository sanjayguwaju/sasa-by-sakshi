"use client"

import React, { useEffect, useState } from "react"

interface Announcement {
  id: string
  text: string
  highlight?: string
  code?: string
  icon: string
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "delivery",
    icon: "🚚",
    text: "Free Delivery inside Kathmandu Valley on orders over Rs. 3,000",
    highlight: "Free Delivery",
  },
  {
    id: "coupon",
    icon: "✨",
    text: "Special Welcome Offer: Use coupon",
    highlight: "FESTIVE10",
    code: "FESTIVE10",
  },
  {
    id: "payments",
    icon: "🇳🇵",
    text: "Cash on Delivery (COD) & eSewa accepted nationwide across Nepal",
    highlight: "Cash on Delivery",
  },
  {
    id: "tailoring",
    icon: "👗",
    text: "Custom Stitching & Tailoring available for all Kurtha sets",
    highlight: "Custom Stitching",
  },
]

export default function AnnouncementTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPaused])

  const current = ANNOUNCEMENTS[currentIndex]

  const handleCopy = (code?: string) => {
    if (!code) return
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="bg-black text-white relative z-40 overflow-hidden select-none border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="content-container flex items-center justify-between h-8 text-[11px] font-medium tracking-wide">
        {/* Navigation arrows (Previous) */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
          }
          className="text-white/40 hover:text-white transition-colors p-1"
          aria-label="Previous announcement"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Active Announcement Content */}
        <div className="flex-1 flex items-center justify-center text-center px-3 truncate">
          <div
            key={current.id}
            className="flex items-center justify-center gap-2 animate-fadeIn transition-all duration-300"
          >
            <span className="text-xs">{current.icon}</span>
            <span className="text-white/90">
              {current.text}{" "}
              {current.code ? (
                <button
                  type="button"
                  onClick={() => handleCopy(current.code)}
                  className="inline-flex items-center gap-1 font-bold text-[#f5d061] hover:text-[#ffe28a] underline underline-offset-2 ml-1 cursor-pointer transition-colors"
                  title="Click to copy code"
                >
                  <span>{current.code}</span>
                  <span className="text-[9px] bg-white/10 px-1 py-0.2 rounded text-white/80">
                    {copied ? "✓ Copied!" : "Copy"}
                  </span>
                </button>
              ) : current.highlight ? (
                <strong className="text-[#f5d061] font-semibold">{current.highlight}</strong>
              ) : null}
            </span>
          </div>
        </div>

        {/* Navigation arrows (Next) */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
          className="text-white/40 hover:text-white transition-colors p-1"
          aria-label="Next announcement"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
