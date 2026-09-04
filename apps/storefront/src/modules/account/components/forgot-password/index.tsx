"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { requestPasswordReset } from "@lib/data/customer"

const ForgotPassword = () => {
  const [state, formAction] = useActionState(requestPasswordReset, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center mx-auto"
      data-testid="forgot-password-page"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Account Recovery
          </span>
        </div>
        <h1
          className="text-2xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Forgot Password
        </h1>
        <p className="text-xs text-gray-500 font-light mt-1 max-w-xs mx-auto leading-relaxed">
          Enter the email address associated with your account, and we'll send you a link to reset your password.
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-1">
            Check Your Email
          </h2>
          <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
            {state.message}
          </p>
          <LocalizedClientLink
            href="/account"
            className="inline-block px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors"
          >
            Back to Sign In
          </LocalizedClientLink>
        </div>
      ) : (
        <form className="w-full" action={formAction}>
          <div className="flex flex-col w-full gap-y-3">
            <Input
              label="Email address"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
            />
          </div>

          <ErrorMessage
            error={state?.state === "error" ? state.error : null}
            data-testid="forgot-password-error"
          />

          <SubmitButton
            data-testid="reset-password-button"
            className="w-full mt-6 h-11 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-[0.15em] text-xs font-semibold"
          >
            Send Reset Link
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

export default ForgotPassword
