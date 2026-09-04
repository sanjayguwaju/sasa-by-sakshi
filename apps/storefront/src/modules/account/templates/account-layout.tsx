import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 py-8 sm:py-12 bg-white" data-testid="account-page">
      <div className="content-container max-w-5xl mx-auto flex flex-col min-h-[60vh]">
        {customer ? (
          <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-8 py-8">
            <div>
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-6 w-full">
            <div className="w-full max-w-md">{children}</div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between border-t border-gray-100 py-10 gap-6 mt-auto">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
              Need assistance?
            </h3>
            <span className="text-xs text-gray-500 font-light">
              Our Kathmandu concierge team is available to assist with sizing, orders, and delivery across Nepal.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Care
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
