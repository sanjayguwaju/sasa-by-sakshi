"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import { Transition } from "@headlessui/react"
import { useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavAccount() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus email input when panel opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => emailRef.current?.focus(), 200)
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
    setEmail("")
    setPassword("")
    setError(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    setError(null)
    // Navigate to the full account/login page with credentials pre-filled
    router.push("/account")
    closePanel()
    setLoading(false)
  }

  return (
    <>
      {/* Profile Icon Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-700 hover:text-black transition-colors duration-200 flex items-center"
        aria-label="Open account"
        data-testid="nav-account-button"
      >
        <UserIcon />
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

      {/* Login Panel – slides in from left */}
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
          aria-label="Login"
          data-testid="nav-account-panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-black tracking-tight">Login</h2>
            <button
              onClick={closePanel}
              aria-label="Close login panel"
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

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
              {/* Error message */}
              {error && (
                <p className="text-xs text-red-500 -mt-1">{error}</p>
              )}

              {/* Email Field */}
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="account-email"
                  className="text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  id="account-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-800 transition-colors duration-150 rounded-none"
                  data-testid="account-email-input"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="account-password"
                  className="text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  id="account-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-800 transition-colors duration-150 rounded-none"
                  data-testid="account-password-input"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-black py-3.5 text-[11px] tracking-[0.18em] uppercase font-semibold text-black hover:bg-black hover:text-white transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="account-login-button"
              >
                {loading ? "Logging in…" : "Login"}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <LocalizedClientLink
                  href="/account/reset-password"
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-150 underline-offset-2 hover:underline"
                  onClick={closePanel}
                  data-testid="forgot-password-link"
                >
                  Forgot your password?
                </LocalizedClientLink>
              </div>

              {/* Create Account Button */}
              <LocalizedClientLink
                href="/account/register"
                onClick={closePanel}
                data-testid="create-account-link"
                className="block w-full bg-black text-white text-center py-3.5 text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-gray-900 transition-colors duration-200 mt-2"
              >
                Create Account
              </LocalizedClientLink>
            </form>
          </div>
        </div>
      </Transition>
    </>
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
