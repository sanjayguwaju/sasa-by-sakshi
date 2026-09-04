"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { verifyEsewaPayment, verifyKhaltiPayment } from "@lib/data/nepal-payment"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const countryCode = (params.countryCode as string) || "np"

  const [statusText, setStatusText] = useState("Verifying payment with gateway...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function processCallback() {
      const provider = searchParams.get("provider")
      const esewaData = searchParams.get("data")
      const pidx = searchParams.get("pidx")

      try {
        if (provider === "esewa" || esewaData) {
          setStatusText("Authorizing eSewa payment signature...")
          if (!esewaData) {
            throw new Error("No payment verification data received from eSewa.")
          }
          await verifyEsewaPayment(esewaData)
        } else if (provider === "khalti" || pidx) {
          setStatusText("Performing server-to-server Khalti transaction lookup...")
          if (!pidx) {
            throw new Error("No Khalti transaction token (pidx) found in return parameters.")
          }
          await verifyKhaltiPayment(pidx)
        } else {
          throw new Error("Unrecognized payment provider callback.")
        }
      } catch (err: any) {
        // If Next.js redirect was triggered, it throws an internal digest - don't intercept it
        if (err?.digest?.startsWith("NEXT_REDIRECT")) {
          return
        }
        console.error("Payment verification callback error:", err)
        setError(err.message || "Failed to verify transaction with payment provider.")
      }
    }

    processCallback()
  }, [searchParams])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {!error ? (
          <div className="flex flex-col items-center gap-4">
            {/* Animated Spinner */}
            <div className="w-12 h-12 border-4 border-[#cda434]/20 border-t-[#cda434] rounded-full animate-spin" />
            <h2 className="text-xl font-serif font-bold text-gray-900 mt-2">
              Payment Processing
            </h2>
            <p className="text-xs text-gray-500 max-w-xs">{statusText}</p>
            <p className="text-[11px] text-gray-400 mt-2">
              Please do not close or refresh this window.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl font-bold">
              ✕
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Payment Verification Failed
            </h2>
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded border border-red-100 max-w-xs">
              {error}
            </p>
            <button
              onClick={() => router.push(`/${countryCode}/checkout?step=payment`)}
              className="mt-4 w-full py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors"
            >
              Return to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
