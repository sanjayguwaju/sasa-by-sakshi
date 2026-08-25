"use client"

import React from "react"

export default function WhatsAppWidget() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  if (!whatsappNumber) {
    return null
  }

  // Clean phone number (strip spaces, dashes, +)
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "")
  const defaultMessage = encodeURIComponent(
    "Namaste! 🙏 I'm visiting the Sasa by Sakshi store and have an inquiry about your Kurtha collection."
  )
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden md:block mr-3 px-3 py-1.5 bg-black/90 text-white text-xs rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with us on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none"
      >
        {/* Subtle pulsing ping effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.78 11.66c-.2-.1-.7-1.19-.77-1.3-.07-.11-.12-.17-.18-.08-.06.09-.23.29-.28.35-.05.06-.11.07-.31-.03-.2-.1-.85-.31-1.61-.99-.6-.53-1-1.19-1.12-1.39-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.11.13-.19.2-.31.07-.12.03-.23-.02-.33-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34h-.39c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67 0 .98.72 1.93.82 2.06.1.13 1.41 2.15 3.42 3.01.48.21.85.33 1.14.42.48.15.92.13 1.27.08.39-.06 1.19-.49 1.36-.96.17-.47.17-.88.12-.96-.05-.08-.18-.13-.38-.23z" />
        </svg>
      </a>
    </div>
  )
}
