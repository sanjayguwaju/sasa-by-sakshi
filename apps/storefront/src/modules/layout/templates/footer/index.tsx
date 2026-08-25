import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/sasabysakshi"
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@sasabysakshi"
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/sasabysakshi"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`
    : null

  return (
    <footer className="w-full bg-[#fafafa] pt-16 pb-8 border-t border-gray-200">
      <div className="content-container w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12 mb-16">
          {/* Newsletter & Social Section */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col">
            <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-4">
              Join Our VIP Circle
            </h3>
            <p className="text-[12px] text-gray-600 mb-6">
              Be the first to see our newest Kurtha collections, festive drops, and exclusive offers.
            </p>
            <form className="relative flex items-center border border-gray-300 bg-white mb-6 w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-3 px-4 text-xs outline-none text-gray-800 placeholder-gray-500 bg-transparent"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 text-gray-600 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>

            {/* Social Media Links */}
            <div className="flex items-center gap-x-4">
              {/* Instagram */}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm3.98-10.395a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
                  </svg>
                </a>
              )}

              {/* TikTok */}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.03 3.29-1.49 3.32-3.3.05-3.89.02-7.78.02-11.67-.01-2.02-.01-4.04-.01-6.06z" />
                  </svg>
                </a>
              )}

              {/* Facebook */}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                    <path d="M12 2.04c-5.5 0-10 4.48-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
              )}

              {/* WhatsApp */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#25D366] transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.78 11.66c-.2-.1-.7-1.19-.77-1.3-.07-.11-.12-.17-.18-.08-.06.09-.23.29-.28.35-.05.06-.11.07-.31-.03-.2-.1-.85-.31-1.61-.99-.6-.53-1-1.19-1.12-1.39-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.11.13-.19.2-.31.07-.12.03-.23-.02-.33-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34h-.39c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67 0 .98.72 1.93.82 2.06.1.13 1.41 2.15 3.42 3.01.48.21.85.33 1.14.42.48.15.92.13 1.27.08.39-.06 1.19-.49 1.36-.96.17-.47.17-.88.12-.96-.05-.08-.18-.13-.38-.23z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            {/* SHOP */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Collections
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/store" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    All Kurthas
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/categories" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    New Arrivals
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Silk Sets
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Daily Cotton
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* ABOUT */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Brand
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/about" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/about" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Craftsmanship
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/about" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Ethical Fashion
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* CUSTOMER CARE */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Customer Care
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/help/sizing" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Size Guide
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/help/shipping" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Delivery in Nepal
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/help/returns" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Exchange Policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* CONTACT US */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Visit & Contact
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-[12px] text-gray-500 leading-relaxed">
                  Kathmandu, Nepal
                </li>
                {whatsappNumber && (
                  <li>
                    <a href={whatsappUrl!} target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-500 hover:text-[#25D366] transition-colors">
                      WhatsApp: {whatsappNumber}
                    </a>
                  </li>
                )}
                <li>
                  <a href="mailto:info@sasabysakshi.com" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    info@sasabysakshi.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-end justify-between border-t border-gray-200 pt-10 pb-8 mt-4 gap-y-6">
          <div className="flex-1">
            <h2 className="text-[60px] md:text-[100px] font-black tracking-tighter text-black leading-[0.8] select-none font-serif">
              SASA BY SAKSHI
            </h2>
          </div>
          <div className="flex flex-col items-end gap-y-3">
            <p className="text-[9px] uppercase tracking-[0.08em] text-gray-500">
              © {new Date().getFullYear()} SASA BY SAKSHI. ALL RIGHTS RESERVED. KATHMANDU, NEPAL.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
