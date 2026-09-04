import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Our Story | Sasa by Sakshi",
  description: "Discover the craftsmanship and story behind Sasa by Sakshi, handcrafted in Kathmandu, Nepal.",
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative py-24 bg-[#0a0a0a] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=80"
            alt="Atelier Sasa by Sakshi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-medium">
              Handcrafted in Nepal
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            The Art of Modern Nepali Couture
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Where rich Himalayan artisanal heritage meets contemporary silhouettes, designed for life's celebratory moments.
          </p>
        </div>
      </div>

      {/* Main Story Content */}
      <div className="content-container max-w-4xl mx-auto py-16 sm:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#cda434] font-semibold block mb-2">
              Our Heritage
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-black uppercase mb-4 leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Born from a Love of Timeless Silhouettes
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-4">
              Founded with the vision to celebrate the finesse of traditional textiles, Sasa by Sakshi curates premium Kurtha sets, festive ensembles, and daily essentials crafted with meticulous attention to detail.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Every garment is designed in Kathmandu, blending luxurious fabrics—from chanderi silks and organza to pure hand-spun cottons—with intricate threadwork and bespoke cuts.
            </p>
          </div>
          <div className="aspect-[4/5] bg-[#f6f5f3] overflow-hidden rounded-sm shadow-md">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&q=85"
              alt="Nepali Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Pillars of Sasa */}
        <div className="border-t border-b border-gray-100 py-16 mb-20">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold block mb-1">
              Our Core Philosophy
            </span>
            <h3
              className="text-2xl font-bold text-black uppercase"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Crafted with Purpose
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-[#faf9f6] border border-gray-100">
              <span className="text-3xl mb-3 block">🪡</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                Artisanal Tailoring
              </h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Empowering local master tailors and artisans in Kathmandu through fair ethical craftsmanship.
              </p>
            </div>
            <div className="p-6 bg-[#faf9f6] border border-gray-100">
              <span className="text-3xl mb-3 block">🌿</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                Pure Natural Fabrics
              </h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Hand-picked mulberry silks, breathable pure cottons, and rich georgettes selected for exceptional comfort.
              </p>
            </div>
            <div className="p-6 bg-[#faf9f6] border border-gray-100">
              <span className="text-3xl mb-3 block">✨</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                Timeless Elegance
              </h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Garments that transcend seasonal trends, creating lasting heirloom pieces you cherish for years.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-[#0a0a0a] text-white p-12 rounded-sm">
          <h3
            className="text-2xl sm:text-3xl font-bold uppercase mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Experience Sasa by Sakshi
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto mb-8 leading-relaxed">
            Explore our latest festive arrivals, everyday sets, and limited artisanal drops.
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-block px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#cda434] hover:text-white transition-all shadow-lg"
          >
            Shop the Collection
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
