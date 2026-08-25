import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import WhatsAppWidget from "@modules/common/components/whatsapp-widget"
import SocialPixels from "@modules/common/components/analytics"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <SocialPixels />
      </head>
      <body>
        <main className="relative">{props.children}</main>
        <WhatsAppWidget />
      </body>
    </html>
  )
}
