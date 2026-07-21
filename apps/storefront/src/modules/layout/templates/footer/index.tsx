import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  return (
    <footer className="w-full bg-[#fafafa] pt-16 pb-8 border-t border-gray-200">
      <div className="content-container w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12 mb-16">
          
          {/* Newsletter Section */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col">
            <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-4">
              Newsletter Sign Up
            </h3>
            <p className="text-[12px] text-gray-600 mb-6">
              Sign up for new arrivals, offers, and more!
            </p>
            <form className="relative flex items-center border border-gray-300 bg-white mb-6 w-full max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
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
            
            {/* Social Icons */}
            <div className="flex items-center gap-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M12 2.04c-5.5 0-10 4.48-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.85 6.35 9.31c-.09-.79-.17-2.01.04-2.88c.19-.82 1.22-5.18 1.22-5.18s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52c.88 0 1.31.66 1.31 1.45c0 .89-.57 2.22-.86 3.45c-.24 1.03.52 1.87 1.53 1.87c1.84 0 3.26-1.94 3.26-4.74c0-2.47-1.78-4.2-4.32-4.2c-2.94 0-4.66 2.21-4.66 4.48c0 .89.34 1.85.77 2.37c.07.09.08.16.06.25c-.06.25-.2.83-.23.95c-.04.16-.14.19-.3.12c-1.12-.53-1.82-2.18-1.82-3.51c0-2.86 2.08-5.49 6.01-5.49c3.15 0 5.6 2.24 5.6 5.24c0 3.13-1.97 5.65-4.71 5.65c-.92 0-1.79-.48-2.08-1.04l-.57 2.16c-.2.78-.76 1.76-1.13 2.35A9.957 9.957 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm3.98-10.395a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.13 0 12 0 12s0 3.87.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.87 24 12 24 12s0-3.87-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            
            {/* SHOP */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Shop
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/categories" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    New In
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store?gender=women" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Women
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store?gender=men" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Men
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/store?category=shoes" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Shoes
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* ABOUT */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                About
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/about" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/careers" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Careers
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/press" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Press
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/blog" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Blog
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* HELP */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Help
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <LocalizedClientLink href="/help/sizing" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Sizing Help
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/help/returns" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Returns & Exchanges
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/help/shipping" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Shipping
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/help/faq" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    Theme FAQs
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* CONTACT US */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-black mb-5">
                Contact Us
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-[12px] text-gray-500">
                  EXT: (091)-123-ELLA
                </li>
                <li>
                  <a href="mailto:mail@domain.com" className="text-[12px] text-gray-500 hover:text-black transition-colors">
                    mail@domain.com
                  </a>
                </li>
                <li className="text-[12px] text-gray-500 leading-relaxed">
                  685 Market Street<br />
                  San Francisco, CA 94105.
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-end justify-between border-t border-gray-200 pt-10 pb-8 mt-4 gap-y-6">
          <div className="flex-1">
            <h2 className="text-[100px] md:text-[140px] font-black tracking-tighter text-black leading-[0.8] select-none" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              SASA
            </h2>
          </div>
          <div className="flex flex-col items-end gap-y-3">
            {/* Payment Icons */}
            <div className="flex items-center gap-x-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 object-contain opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-4 object-contain opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 object-contain opacity-80" />
            </div>
            <p className="text-[9px] uppercase tracking-[0.05em] text-gray-500">
              © {new Date().getFullYear()}, SASA. POWERED BY SHOPIFY. SHOPIFY THEMES BY HALOTHEMES.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
