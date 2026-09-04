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

const mainNavItems = [
  { name: "Home", href: "/", icon: "home" },
  { name: "All Kurthas", href: "/store", icon: "sparkles" },
  { name: "Collections", href: "/collections", icon: "collection" },
  { name: "Categories", href: "/categories", icon: "grid" },
  { name: "Journal", href: "/blog", icon: "book" },
]

const utilityItems = [
  { name: "My Wishlist", href: "/wishlist", icon: "heart" },
  { name: "My Account", href: "/account", icon: "user" },
  { name: "Shopping Bag", href: "/cart", icon: "bag" },
]

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={open}
        aria-label="Open menu"
        data-testid="nav-menu-button"
        className="flex flex-col gap-[5px] justify-center items-center w-7 h-7 text-gray-800 hover:text-black transition-colors"
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
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
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
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#faf9f6]">
            <div>
              <span 
                className="text-xl font-bold tracking-tight text-black block leading-none"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                SASA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#cda434] font-semibold mt-1 block">
                Sasa by Sakshi
              </span>
            </div>
            <button
              onClick={close}
              data-testid="close-menu-button"
              aria-label="Close menu"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="mb-6">
              <span className="px-3 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">
                Explore Sasa
              </span>
              <ul className="space-y-1">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <LocalizedClientLink
                      href={item.href}
                      className="flex items-center justify-between px-3 py-3 rounded-sm text-sm font-medium text-gray-800 hover:bg-[#faf9f6] hover:text-black transition-colors group"
                      onClick={close}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 group-hover:text-[#cda434] transition-colors">
                          {renderIcon(item.icon)}
                        </span>
                        <span className="uppercase tracking-[0.08em] text-[13px] font-semibold">
                          {item.name}
                        </span>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account & Utility Links */}
            <div className="pt-4 border-t border-gray-100 mb-6">
              <span className="px-3 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">
                Account & Bag
              </span>
              <ul className="space-y-1">
                {utilityItems.map((item) => (
                  <li key={item.name}>
                    <LocalizedClientLink
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-black transition-colors group"
                      onClick={close}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 group-hover:text-black transition-colors">
                          {renderIcon(item.icon)}
                        </span>
                        <span className="tracking-wider uppercase text-[11px] font-medium">
                          {item.name}
                        </span>
                      </div>
                      <svg
                        className="w-3 h-3 text-gray-300 group-hover:text-black transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Nepal Trust Banner */}
            <div className="mx-2 p-3 bg-[#faf9f6] border border-gray-100 rounded-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🇳🇵</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black">
                  Cash on Delivery
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                Available across Kathmandu Valley and all major cities in Nepal.
              </p>
            </div>
          </div>

          {/* Region & Language Section at Bottom */}
          <div className="border-t border-gray-100 bg-[#fafafa]">
            <div className="px-5 py-2.5">
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400">
                Region & Currency
              </span>
            </div>

            {regions && (
              <div
                className="flex items-center justify-between px-5 py-3 border-t border-gray-100 hover:bg-white transition-colors cursor-pointer"
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

function renderIcon(name: string) {
  switch (name) {
    case "home":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    case "sparkles":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      )
    case "collection":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m-15 0a2.246 2.246 0 0 0-.75.128m16.5 0c-.235-.083-.487-.128-.75-.128m-15 0A2.25 2.25 0 0 0 3 12v6.75A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V12a2.25 2.25 0 0 0-2.25-2.25m-15 0h16.5" />
        </svg>
      )
    case "grid":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
    case "book":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      )
    case "heart":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      )
    case "user":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    case "bag":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
        </svg>
      )
    default:
      return null
  }
}

export default SideMenu

