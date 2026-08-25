import { getBlogPostBySlug, getAllBlogPosts } from "@lib/data/blog"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    countryCode: string
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Story Not Found | Sasa by Sakshi",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sasabysakshi.com"
  const url = `${baseUrl}/blog/${post.slug}`

  return {
    title: `${post.title} | Sasa by Sakshi Journal`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Sasa by Sakshi",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sasabysakshi.com"
  const articleUrl = `${baseUrl}/blog/${post.slug}`

  // ─── JSON-LD Structured Schema for Google & AI Engines (ChatGPT / Gemini / Perplexity)
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Sasa by Sakshi",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  const jsonLdFaq = post.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null

  const otherPosts = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <>
      {/* Inject Structured Data for SEO & LLM Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      <article className="py-12 md:py-16 bg-[#fdfcfb]">
        <div className="content-container max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-x-2 text-xs text-gray-500 mb-8">
            <LocalizedClientLink href="/" className="hover:text-black transition-colors">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/blog" className="hover:text-black transition-colors">
              Journal
            </LocalizedClientLink>
            <span>/</span>
            <span className="text-black font-medium truncate max-w-[200px] md:max-w-none">
              {post.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-x-3 text-xs text-gray-500 mb-4">
              <span className="px-3 py-1 bg-amber-50 text-amber-900 font-semibold tracking-wide uppercase text-[10px]">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-black leading-tight tracking-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
              {post.subtitle}
            </p>

            {/* Author Profile */}
            <div className="flex items-center gap-x-4 py-4 border-y border-gray-200">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black">{post.author.name}</span>
                <span className="text-xs text-gray-500">{post.author.role}</span>
              </div>
            </div>
          </header>

          {/* Cover Hero Image */}
          <div className="relative h-[320px] md:h-[520px] w-full overflow-hidden bg-gray-100 mb-12 shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
            />
          </div>

          {/* Article Body Content */}
          <div className="prose prose-neutral max-w-none text-gray-800 leading-relaxed space-y-6 text-base md:text-lg">
            {post.content.split("\n\n").map((paragraph, index) => {
              const trimmed = paragraph.trim()
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-serif font-bold text-black pt-6 pb-2 border-b border-gray-100">
                    {trimmed.replace("## ", "")}
                  </h2>
                )
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-serif font-semibold text-black pt-4">
                    {trimmed.replace("### ", "")}
                  </h3>
                )
              }
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").map((item) => item.replace(/^[\*\-]\s+/, ""))
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 text-gray-700">
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                )
              }
              if (trimmed === "---") {
                return <hr key={index} className="my-8 border-gray-200" />
              }
              return (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {trimmed}
                </p>
              )
            })}
          </div>

          {/* FAQ Section (Crucial for Google Rich Snippets & AI Knowledge Queries) */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200 bg-white p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-black mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="text-base font-bold text-black mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-2">Topics:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 p-8 bg-black text-white text-center flex flex-col items-center gap-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold">
              Shop The New Festive Kurtha Collection
            </h3>
            <p className="text-sm text-gray-300 max-w-lg leading-relaxed">
              Handcrafted pure silk, georgette, and cotton sets tailored to perfection with Cash on Delivery across Nepal.
            </p>
            <LocalizedClientLink
              href="/store"
              className="mt-2 px-8 py-3 bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-gray-200 transition-colors"
            >
              Explore Collection
            </LocalizedClientLink>
          </div>

          {/* Read Next Section */}
          {otherPosts.length > 0 && (
            <div className="mt-20">
              <h3 className="text-2xl font-serif font-bold text-black mb-8">
                Read Next
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map((op) => (
                  <LocalizedClientLink
                    key={op.id}
                    href={`/blog/${op.slug}`}
                    className="group bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={op.coverImage}
                        alt={op.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-800">
                      {op.category}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-black group-hover:text-amber-800 transition-colors leading-snug mt-1 mb-2">
                      {op.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {op.excerpt}
                    </p>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
