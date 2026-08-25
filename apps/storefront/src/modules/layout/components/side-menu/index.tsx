"use client"

import { Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment, useState } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

type MenuItem = {
  name: string
  href: string
  thumbnail: string | null
  hasArrow?: boolean
}

// Menu items with optional thumbnail and arrow indicator
const menuItems: MenuItem[] = [
  { name: "Home", href: "/", thumbnail: null },
  { name: "Shop Kurthas", href: "/store", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop&crop=center" },
  { name: "New In", href: "/categories", thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=60&h=60&fit=crop&crop=face" },
  { name: "Journal & Styling Guide", href: "/blog", thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=60&h=60&fit=crop&crop=center" },
  { name: "My Wish List", href: "/wishlist", thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&h=60&fit=crop&crop=face" },
  { name: "My Account", href: "/account", thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face" },
]

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subPage, setSubPage] = useState<string | null>(null)
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setSubPage(null)
  }

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={open}
        aria-label="Open menu"
        data-testid="nav-menu-button"
        className="flex flex-col gap-[5px] justify-center items-center w-6 h-6 text-gray-700 hover:text-black transition-colors"
      >
        <span className="block w-5 h-[1.5px] bg-current" />
        <span className="block w-5 h-[1.5px] bg-current" />
        <span className="block w-5 h-[1.5px] bg-current" />
      </button>

      {/* Backdrop */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={close}
          data-testid="side-menu-backdrop"
        />
      </Transition>

      {/* Drawer Panel */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-250 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div
          className="fixed inset-y-0 left-0 z-[70] w-[320px] max-w-[85vw] bg-white flex flex-col shadow-2xl"
          data-testid="nav-menu-popup"
        >
          {/* Drawer Header */}
          <div className="flex items-stretch border-b border-gray-100">
            <div className="bg-black text-white flex items-center px-5 py-4">
              <span className="font-bold text-sm tracking-wide">Menu</span>
            </div>
            <div className="flex items-center px-5 py-4 flex-1">
              <span className="text-sm text-gray-600 font-medium">
                {subPage ?? "Demo"}
              </span>
            </div>
            <button
              onClick={close}
              data-testid="close-menu-button"
              aria-label="Close menu"
              className="flex items-center px-4 text-gray-400 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            {!subPage ? (
              <ul className="divide-y divide-gray-100">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-center px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                      {/* Circular Thumbnail */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mr-4">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-gray-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {item.hasArrow ? (
                        <button
                          className="flex-1 flex items-center justify-between text-left"
                          onClick={() => setSubPage(item.name)}
                        >
                          <span className="text-sm text-gray-800 font-medium group-hover:text-black transition-colors">
                            {item.name}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-400"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      ) : (
                        <LocalizedClientLink
                          href={item.href}
                          className="flex-1 text-sm text-gray-800 font-medium group-hover:text-black transition-colors"
                          onClick={close}
                          data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, "-")}-link`}
                        >
                          {item.name}
                        </LocalizedClientLink>
                      )}
                    </div>
                  </li>
                ))}

                {/* Wishlist row with heart icon */}
                <li>
                  <div className="flex items-center px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mr-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </div>
                    <LocalizedClientLink
                      href="/wishlist"
                      className="flex-1 text-sm text-gray-800 font-medium"
                      onClick={close}
                    >
                      Wish lists
                    </LocalizedClientLink>
                  </div>
                </li>
              </ul>
            ) : (
              /* Sub-page view */
              <div className="p-4">
                <button
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition-colors"
                  onClick={() => setSubPage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  {subPage}
                </button>
                <p className="text-xs text-gray-400 mt-8 text-center">No sub-categories found.</p>
              </div>
            )}
          </div>

          {/* Region & Language Section at Bottom */}
          <div className="border-t border-gray-100">
            <div className="px-4 py-3 bg-gray-50">
              <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-gray-500">
                Region and Language
              </span>
            </div>

            {!!locales?.length && (
              <div
                className="flex items-center justify-between px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onMouseEnter={languageToggleState.open}
                onMouseLeave={languageToggleState.close}
              >
                <LanguageSelect
                  toggleState={languageToggleState}
                  locales={locales}
                  currentLocale={currentLocale}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            )}

            {regions && (
              <div
                className="flex items-center justify-between px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onMouseEnter={countryToggleState.open}
                onMouseLeave={countryToggleState.close}
              >
                <CountrySelect
                  toggleState={countryToggleState}
                  regions={regions}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default SideMenu
