import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavSearch from "@modules/layout/components/nav-search"
import NavAccount from "@modules/layout/components/nav-account"
import AnnouncementTicker from "@modules/layout/components/announcement-ticker"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Animated Announcement Ticker (Desktop & Mobile) */}
      <AnnouncementTicker />

      <header className="relative bg-white border-b border-gray-100 shadow-sm">
        {/* ===== DESKTOP NAVBAR ===== */}
        <nav className="hidden small:flex items-center justify-between w-full h-16 content-container">

          {/* Left: Nav Links */}
          <div className="flex items-center gap-x-8 h-full">
            <NavLink href="/store" label="All Kurthas" />
            <NavLink href="/collections" label="Collections" />
            <NavLink href="/categories" label="Categories" />
            <NavLink href="/blog" label="Journal" />
          </div>


          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-[32px] font-black tracking-tighter text-black hover:opacity-75 transition-opacity duration-200 leading-none select-none"
              data-testid="nav-store-link"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              SASA
            </LocalizedClientLink>
          </div>

          {/* Right: Icon Actions */}
          <div className="flex items-center gap-x-5 h-full">
            <NavSearch />

            <NavAccount />

            <LocalizedClientLink
              href="/wishlist"
              className="text-gray-700 hover:text-black transition-colors duration-200"
              data-testid="nav-wishlist-link"
              aria-label="Wishlist"
            >
              <HeartIcon />
            </LocalizedClientLink>

            <Suspense fallback={<CartIconLink />}>
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* ===== MOBILE NAVBAR ===== */}
        <nav className="flex small:hidden items-center justify-between w-full h-14 px-4 relative">
          {/* Left: Hamburger + Search */}
          <div className="flex items-center gap-x-3 z-10">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            <NavSearch mobile />
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-0 right-0 flex items-center justify-center pointer-events-none">
            <LocalizedClientLink
              href="/"
              className="text-[22px] font-black tracking-tighter text-black leading-none select-none pointer-events-auto"
              data-testid="nav-store-link-mobile"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              SASA
            </LocalizedClientLink>
          </div>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-x-4 z-10">
            <NavAccount />
            <Suspense fallback={<CartIconLink />}>
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function NavLink({
  href,
  label,
  labelColor,
}: {
  href: string
  label: string
  labelColor?: string
}) {
  return (
    <LocalizedClientLink
      href={href}
      className="relative group h-full flex items-center"
    >
      <span
        className="text-[11px] tracking-[0.15em] uppercase font-semibold text-gray-700 group-hover:text-black transition-colors duration-200"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
    </LocalizedClientLink>
  )
}

function CartIconLink() {
  return (
    <LocalizedClientLink
      className="text-gray-700 hover:text-black transition-colors duration-200"
      href="/cart"
      data-testid="nav-cart-link"
      aria-label="Cart"
    >
      <BagIcon />
    </LocalizedClientLink>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-[18px] h-[18px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-[18px] h-[18px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-[18px] h-[18px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
      />
    </svg>
  )
}
