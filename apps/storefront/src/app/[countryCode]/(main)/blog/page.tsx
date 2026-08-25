import { getAllBlogPosts } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Boutique Journal & Styling Guides | Sasa by Sakshi",
  description:
    "Explore designer Kurtha styling tips, festive outfit guides for Dashain and Tihar, fabric care, and Nepali wedding guest fashion by Sasa by Sakshi.",
  openGraph: {
    title: "Boutique Journal & Styling Guides | Sasa by Sakshi",
    description:
      "Explore designer Kurtha styling tips, festive outfit guides for Dashain and Tihar, and Nepali wedding fashion.",
    type: "website",
  },
}

export default async function BlogPage() {
  const posts = getAllBlogPosts()
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div className="py-12 bg-[#fdfcfb]">
      <div className="content-container">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-primary mb-3">
            Editorial & Journal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-black tracking-tight mb-4">
            The Sasa Edit
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Curated styling masterclasses, festive lookbooks, and insider guides on traditional craftsmanship for modern Nepali women.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <LocalizedClientLink
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-10 border border-gray-100 rounded-none shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="lg:col-span-7 relative h-[300px] md:h-[450px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center gap-y-4">
                <div className="flex items-center gap-x-3 text-xs text-gray-500">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-medium tracking-wide uppercase text-[10px]">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-black group-hover:text-amber-800 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-x-3 pt-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-black">{featuredPost.author.name}</span>
                    <span className="text-[11px] text-gray-400">{featuredPost.author.role}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-black group-hover:translate-x-1 transition-transform">
                    Read Story →
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          </div>
        )}

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {otherPosts.map((post) => (
            <LocalizedClientLink
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-[250px] w-full overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex items-center gap-x-3 text-xs text-gray-500 mb-3">
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 font-medium tracking-wide uppercase text-[10px]">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-black group-hover:text-amber-800 transition-colors leading-snug mb-3">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">By {post.author.name}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}
