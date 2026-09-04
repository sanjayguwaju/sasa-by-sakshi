"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center mx-auto"
      data-testid="register-page"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cda434]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
            Sasa Membership
          </span>
        </div>
        <h1 
          className="text-2xl font-bold uppercase tracking-tight text-black"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Create an Account
        </h1>
        <p className="text-xs text-gray-500 font-light mt-1 max-w-xs mx-auto leading-relaxed">
          Join Sasa by Sakshi to track your orders, save wishlists, and enjoy seamless checkout across Nepal.
        </p>
      </div>

      {message?.state === "verification_required" && (
        <div
          className="w-full mb-4 text-center text-xs text-black bg-[#faf9f6] border border-[#cda434]/40 rounded-sm p-4"
          data-testid="register-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please check your inbox to verify your email, then sign in.
        </div>
      )}

      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Email address"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone (Nepal)"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />

        <SubmitButton 
          className="w-full mt-6 h-11 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-[0.15em] text-xs font-semibold" 
          data-testid="register-button"
        >
          Create Account
        </SubmitButton>
      </form>

      {/* Google OAuth Register */}
      <div className="w-full my-6 flex items-center gap-x-3">
        <div className="flex-1 h-[1px] bg-gray-200" />
        <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Or</span>
        <div className="flex-1 h-[1px] bg-gray-200" />
      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/auth/customer/google`}
        className="w-full h-11 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-x-3 text-xs font-medium text-gray-700 transition-colors shadow-sm uppercase tracking-wider"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign up with Google</span>
      </a>

      <div className="text-center text-xs text-gray-500 mt-6">
        Already have an account?{" "}
        {setCurrentView ? (
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-black font-semibold underline hover:text-[#cda434] transition-colors"
          >
            Sign in
          </button>
        ) : (
          <LocalizedClientLink
            href="/account"
            className="text-black font-semibold underline hover:text-[#cda434] transition-colors"
          >
            Sign in
          </LocalizedClientLink>
        )}
      </div>
    </div>
  )
}

export default Register

