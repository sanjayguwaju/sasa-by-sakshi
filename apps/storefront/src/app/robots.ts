import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sasabysakshi.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/account", "/order/confirmed/*"],
      },
      // Explicitly allow AI Search bots to crawl and cite Sasa by Sakshi products & blogs
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/store", "/products/*", "/blog/*", "/categories/*"],
        disallow: ["/checkout", "/account"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
