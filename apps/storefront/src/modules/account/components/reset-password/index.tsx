"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { resetCustomerPassword } from "@lib/data/customer"

const ResetPassword = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [state, formAction] = useActionState(resetCustomerPassword, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center mx-auto"
      data-testid="reset-password-page"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Security Update
          </span>
        </div>
        <h1
          className="text-2xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Reset Password
        </h1>
        <p className="text-xs text-gray-500 font-light mt-1 max-w-xs mx-auto leading-relaxed">
          Please enter your new password below.
        </p>
      </div>

      {state?.state === "success" ? (
        <div className="w-full text-center py-6 px-4 bg-[#faf9f6] border border-[#cda434]/30 rounded-sm">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#cda434]/10 text-[#cda434] flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-1">
            Password Reset Successful
          </h2>
          <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
            {state.message}
          </p>
          <LocalizedClientLink
            href="/account"
            className="inline-block px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
          >
            Sign In Now
          </LocalizedClientLink>
        </div>
      ) : !token ? (
        <div className="w-full text-center py-6 px-4 bg-[#faf9f6] border border-gray-200 rounded-sm">
          <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-2">
            Missing Reset Token
          </h2>
          <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
            The password reset link is invalid or incomplete. Please request a new password reset link.
          </p>
          <LocalizedClientLink
            href="/account/forgot-password"
            className="inline-block px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
          >
            Request New Link
          </LocalizedClientLink>
        </div>
      ) : (
        <form className="w-full" action={formAction}>
          <input type="hidden" name="token" value={token} />
          <div className="flex flex-col w-full gap-y-3">
            <Input
              label="New password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              data-testid="new-password-input"
            />
            <Input
              label="Confirm new password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              data-testid="confirm-password-input"
            />
          </div>

          <ErrorMessage
            error={state?.state === "error" ? state.error : null}
            data-testid="reset-password-error"
          />

          <SubmitButton
            data-testid="save-password-button"
            className="w-full mt-6 h-11 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-[0.15em] text-xs font-semibold"
          >
            Update Password
          </SubmitButton>

          <div className="text-center text-xs text-gray-500 mt-6">
            Remember your password?{" "}
            <LocalizedClientLink
              href="/account"
              className="text-black font-semibold underline hover:text-[#cda434] transition-colors"
            >
              Sign in
            </LocalizedClientLink>
          </div>
        </form>
      )}
    </div>
  )
}

export default ResetPassword
