import { MetadataRoute } from "next"
import { getAllBlogPosts } from "@lib/data/blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sasabysakshi.com"
  const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION || "np"

  const blogPosts = getAllBlogPosts()

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/${defaultRegion}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${defaultRegion}/store`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${defaultRegion}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${defaultRegion}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  // Blog article pages
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/${defaultRegion}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}
