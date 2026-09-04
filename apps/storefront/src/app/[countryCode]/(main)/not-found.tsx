import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Sasa by Sakshi",
  description: "The page you requested could not be found.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
      <div className="inline-flex items-center gap-1.5 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
        <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-semibold">
          Error 404
        </span>
      </div>
      <h1
        className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-black mb-4"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 font-light max-w-sm mx-auto mb-8 leading-relaxed">
        The page you are looking for might have been moved or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <LocalizedClientLink
          href="/"
          className="px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors shadow-sm"
        >
          Return to Home
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/store"
          className="px-8 py-3.5 border border-gray-300 text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors"
        >
          Explore All Kurthas
        </LocalizedClientLink>
      </div>
    </div>
  )
}
