"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function NavSearch({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const closePanel = () => {
    setOpen(false)
    setQuery("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/store?q=${encodeURIComponent(query.trim())}`)
      closePanel()
    }
  }

  return (
    <>
      {/* Search Icon Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center"
        aria-label="Open search"
        data-testid="nav-search-button"
      >
        <SearchIcon />
      </button>

      {/* Backdrop */}
      <Transition
        show={open}
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
          onClick={closePanel}
          aria-hidden="true"
        />
      </Transition>

      {/* Search Panel – slides in from left */}
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in duration-250 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div
          className="fixed inset-y-0 left-0 z-[70] w-[420px] max-w-[90vw] bg-white flex flex-col shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          data-testid="nav-search-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h2 className="text-xl font-bold text-black tracking-tight">Search</h2>
            <button
              onClick={closePanel}
              aria-label="Close search"
              className="text-gray-400 hover:text-black transition-colors duration-150"
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

          {/* Search Input — underline style */}
          <div className="px-6">
            <form onSubmit={handleSubmit} className="relative flex items-center border-b border-gray-800 pb-2">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent pr-8"
                data-testid="nav-search-input"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-0 text-gray-500 hover:text-black transition-colors duration-150"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Results area (empty state) */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Future: render search results here */}
          </div>
        </div>
      </Transition>
    </>
  )
}

function SearchIcon() {
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
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  )
}
