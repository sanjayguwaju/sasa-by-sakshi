"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef } from "react"

type HeroSlide = {
  id: string
  badge: string
  title: string
  titleHighlight: string
  description: string
  desktopImage: string
  mobileImage: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
}

const heroSlides: HeroSlide[] = [
  {
    id: "festive-2026",
    badge: "New Season 2026 Collection",
    title: "Timeless Elegance.",
    titleHighlight: "Handcrafted in Nepal.",
    description:
      "Discover exclusive festive kurthas, pure silk sets, and contemporary ethnic silhouettes designed with exquisite detail.",
    desktopImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=85&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1080&h=1440&q=85&fit=crop",
    primaryCta: {
      label: "Explore All Kurthas",
      href: "/store",
    },
    secondaryCta: {
      label: "View Collections",
      href: "/collections",
    },
  },
  {
    id: "royal-silk",
    badge: "Festive Couture Edit",
    title: "Pure Silk & Chanderi.",
    titleHighlight: "Artisanal Luxury.",
    description:
      "Intricately woven traditional motifs meet modern tailoring for weddings, festive pujas, and gala celebrations.",
    desktopImage:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=85&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1080&h=1440&q=85&fit=crop",
    primaryCta: {
      label: "Shop Festive Edit",
      href: "/collections/festive-collection",
    },
    secondaryCta: {
      label: "Explore Categories",
      href: "/categories",
    },
  },
  {
    id: "everyday-grace",
    badge: "Everyday Grace",
    title: "Effortless Comfort.",
    titleHighlight: "Handcrafted Daily Wear.",
    description:
      "Breathable organic cottons and relaxed ethnic fits designed for comfort, poise, and daily elegance.",
    desktopImage:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1920&q=85&fit=crop",
    mobileImage:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1080&h=1440&q=85&fit=crop",
    primaryCta: {
      label: "Shop Essentials",
      href: "/collections/everyday-essentials",
    },
    secondaryCta: {
      label: "Read Journal",
      href: "/blog",
    },
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Auto-slide every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused])

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) handleNext()
    else if (distance < -50) handlePrev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div
      className="relative w-full min-h-[80vh] md:min-h-[85vh] flex flex-col justify-between bg-[#0a0a0a] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Banner Billboard Images (Separate Desktop & Mobile Images) */}
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Desktop Banner Image (Hidden on Mobile) */}
            <img
              src={slide.desktopImage}
              alt={slide.title}
              className="hidden sm:block w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-[6000ms] ease-out"
            />

            {/* Mobile Banner Image (Hidden on Desktop) */}
            <img
              src={slide.mobileImage}
              alt={slide.title}
              className="block sm:hidden w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-[6000ms] ease-out"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </div>
        )
      })}

      {/* Main Content Area */}
      <div className="relative z-10 content-container text-center pt-20 pb-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Animated Slide Content */}
        {heroSlides.map((slide, index) => {
          if (index !== currentSlide) return null
          return (
            <div
              key={slide.id}
              className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-700"
            >
              {/* Collection Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cda434] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/90 font-medium">
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.08] mb-6"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                {slide.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#cda434]/90">
                  {slide.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                {slide.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <LocalizedClientLink
                  href={slide.primaryCta.href}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-[#cda434] hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>{slide.primaryCta.label}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href={slide.secondaryCta.href}
                  className="w-full sm:w-auto px-8 py-4 border border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm flex items-center justify-center"
                >
                  {slide.secondaryCta.label}
                </LocalizedClientLink>
              </div>
            </div>
          )
        })}

        {/* Carousel Navigation Controls */}
        <div className="mt-8 flex items-center gap-4 z-20">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-8 h-1.5 bg-[#cda434]"
                    : "w-2 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Nepal Trust Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-4">
        <div className="content-container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              Cash on Delivery
            </span>
            <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wide">
              Available across Nepal
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              Fast Delivery
            </span>
            <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wide">
              Inside & Outside Valley
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              100% Pure Fabric
            </span>
            <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wide">
              Premium Handcrafted Quality
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              Easy Exchange
            </span>
            <span className="text-gray-400 text-[9px] sm:text-[10px] tracking-wide">
              Hassle-free 7-day Support
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

