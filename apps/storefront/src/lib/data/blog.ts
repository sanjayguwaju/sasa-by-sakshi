export type BlogPost = {
  id: string
  slug: string
  title: string
  subtitle: string
  excerpt: string
  content: string
  coverImage: string
  author: {
    name: string
    role: string
    avatar: string
  }
  publishedAt: string
  readTime: string
  category: "Styling Guide" | "Festive Collection" | "Fabric Care" | "Bridal & Weddings"
  tags: string[]
  faqs?: { question: string; answer: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-style-silk-kurthas-for-nepali-festivals",
    title: "How to Style Silk Kurtha Sets for Nepali Festivals: Dashain, Tihar & Beyond",
    subtitle: "A complete styling masterclass on pairing modern silhouettes with traditional elegance.",
    excerpt: "Discover the ultimate guide to styling silk and georgette Kurthas for festive celebrations in Nepal. From dupatta draping techniques to statement jewelry.",
    coverImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Sakshi Guwaju",
      role: "Lead Designer & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "2026-08-20T00:00:00Z",
    readTime: "5 min read",
    category: "Festive Collection",
    tags: ["Silk Kurtha", "Dashain Fashion", "Tihar Styling", "Nepali Boutique", "Ethnic Wear"],
    faqs: [
      {
        question: "Which Kurtha fabric is best for Dashain and Tihar in Nepal?",
        answer: "Pure Raw Silk and Chanderi Silk are the most popular choices for Dashain and Tihar due to their rich natural luster, breathability in autumn weather, and celebratory elegance.",
      },
      {
        question: "How do you style a simple Kurtha set for festive family gatherings?",
        answer: "Elevate a solid silk Kurtha by pairing it with an embroidered Organza or Banarasi dupatta, traditional brass or gold jhumkas, and classic juttis.",
      },
      {
        question: "Does Sasa by Sakshi provide delivery across Nepal for festive orders?",
        answer: "Yes! Sasa by Sakshi delivers all across Nepal with Cash on Delivery (COD) in 24-48 hours inside Kathmandu Valley and 3-5 days outside the valley.",
      },
    ],
    content: `
## The Elegance of Festive Silk

Nepali festivals—from Dashain and Tihar to Chhath and Teej—are celebrations of tradition, family, and timeless grace. While trends come and go, nothing commands reverence and elegance quite like a meticulously tailored **Silk Kurtha Set**.

In this guide, we explore how to style your Kurtha sets to achieve an effortless balance between royal tradition and contemporary chic.

---

### 1. The Power of Rich Jewel Tones

For festive gatherings in Nepal, color sets the entire emotional tone. While pastels reign supreme for daytime pujas, deep **jewel tones** come alive during evening gatherings:

* **Royal Emerald Green:** Symbolizes prosperity and looks magnificent under warm evening lights.
* **Sindoor Crimson & Ruby Red:** Classic auspicious colors that pair exquisitely with antique gold jewelry.
* **Midnight Navy & Plum:** A modern, sophisticated twist for contemporary boutique lovers.

---

### 2. Dupatta Draping Techniques

The way you drape your dupatta can completely transform your silhouette:

1. **The Classic One-Shoulder Cascade:** Drape the dupatta over your left shoulder and let it fall freely down your back. Best for embroidered organza or Banarasi dupattas.
2. **The Front Pleated Royal Drape:** Pin neatly pressed pleats at both shoulders, letting the center drape gracefully across the chest.
3. **The Wrist Wrap:** Drape across the back of your shoulders and loop the edges loosely around your forearms for a regal, red-carpet look.

---

### 3. Accessorizing: The Rule of Balance

When wearing a heavily embroidered Kurtha set, let the outfit speak for itself:

* **Jewelry:** Choose between statement chandbali earrings OR a heavy choker—never overwhelm both.
* **Footwear:** Handcrafted velvet juttis or metallic block heels provide all-day comfort during long festival visits.
* **Handbags:** A compact velvet potli bag with gold tassel details completes the look without clutter.

---

### Summary Checklist for Festive Styling:
- [x] Choose a breathable yet luxurious fabric (Pure Silk / Chanderi / Organza)
- [x] Ensure tailoring fits your shoulder and bust measurements precisely
- [x] Pair with comfortable traditional footwear
- [x] Order early to avoid festive courier delays across Nepal
    `,
  },
  {
    id: "2",
    slug: "cotton-vs-silk-kurtha-fabric-guide-nepal",
    title: "Pure Cotton vs. Raw Silk: Choosing the Perfect Kurtha Fabric for Daily & Formal Wear",
    subtitle: "An insider's breakdown of breathability, drape, longevity, and maintenance for Nepali climates.",
    excerpt: "Understand the key differences between pure Mulmul cotton, Chanderi, Georgette, and Raw Silk so you can choose the ideal Kurtha for work, casual outings, or weddings.",
    coverImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Sakshi Guwaju",
      role: "Lead Designer & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "2026-08-15T00:00:00Z",
    readTime: "4 min read",
    category: "Fabric Care",
    tags: ["Fabric Guide", "Cotton Kurtha", "Silk Kurtha", "Textile Care", "Kathmandu Fashion"],
    faqs: [
      {
        question: "Is cotton better than silk for daily office wear in Kathmandu?",
        answer: "Yes, 100% breathable Mulmul and Cambric cotton are ideal for daily work and warm seasons, while silk is reserved for formal meetings, evenings, and celebrations.",
      },
      {
        question: "How should I wash and care for designer silk Kurthas?",
        answer: "Dry cleaning is recommended for the first 2-3 washes of pure silk garments. Store in breathable muslin cotton bags and never spray perfume directly onto silk fibers.",
      },
    ],
    content: `
## Understanding Fabric Types for Modern Kurthas

The foundation of any great designer outfit begins with the fabric. When you invest in a boutique piece from *Sasa by Sakshi*, understanding the drape, texture, and care requirements ensures your garment stays pristine for years.

---

### 1. Pure Mulmul & Cambric Cotton (Daily Ease & Workwear)

**Best for:** Daily wear, college, office, hot humid summer days in the Terai & Kathmandu.

* **Breathability:** Exceptional 100% natural air circulation.
* **Feel:** Ultra-soft, lightweight, and gentle on sensitive skin.
* **Care:** Easy gentle hand wash in cold water with mild detergent.

---

### 2. Pure Raw Silk & Chanderi (Royal Festive Elegance)

**Best for:** Weddings, receptions, festivals (Dashain/Tihar), and gala events.

* **Drape:** Structured, rich, with a natural sublte sheen.
* **Longevity:** Highly durable when stored correctly.
* **Care:** Dry clean only. Iron inside-out on low silk settings with a protective cotton cloth.

---

### 3. Georgette & Chiffon (Flowing Evening Silhouettes)

**Best for:** Casual brunch, evening dinners, layered anarkalis.

* **Drape:** Fluid, bouncy, and flattering for all body shapes.
* **Wrinkle Resistance:** High—virtually crease-free for travel.
    `,
  },
  {
    id: "3",
    slug: "nepali-wedding-guest-kurtha-lookbook",
    title: "The Ultimate Nepali Wedding Guest Lookbook: Sangeet, Mehendi, & Reception Outfits",
    subtitle: "What to wear for every ceremony of a Nepali wedding without outshining the bride.",
    excerpt: "Navigate the colorful events of a traditional Nepali wedding with our curated styling lookbook for Mehendi, Sangeet, Wedding Ceremony, and Reception.",
    coverImage: "https://images.unsplash.com/photo-1583391733975-0810787e9cf2?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Sakshi Guwaju",
      role: "Lead Designer & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    publishedAt: "2026-08-10T00:00:00Z",
    readTime: "6 min read",
    category: "Bridal & Weddings",
    tags: ["Nepali Wedding", "Wedding Guest Outfit", "Mehendi Dress", "Reception Kurtha", "Anarkali"],
    faqs: [
      {
        question: "What color should wedding guests avoid wearing at a Nepali wedding?",
        answer: "It is traditional etiquette to avoid wearing solid bridal crimson red on the main wedding day so the bride stands out. Instead, opt for mustard yellow for Mehendi, emerald or royal blue for Sangeet, and pastel or jewel tones for the Reception.",
      },
    ],
    content: `
## Decoding the Nepali Wedding Wardrobe

Attending a traditional Nepali wedding involves multiple vibrant ceremonies, each with its own mood, dress code, and color palette. Here is your fail-safe lookbook for the entire wedding week.

---

### 1. Mehendi Ceremony: Sunny Yellows & Lively Greens

Mehendi is a daytime, playful celebration. Choose an outfit that allows freedom of movement so henna can be applied comfortably.

* **Top Pick:** A lightweight Georgette Anarkali or short Kurti with breezy Palazzo pants.
* **Colors:** Mustard Yellow, Lime Green, Mango Peach.
* **Pro Tip:** Opt for sleeveless or 3/4th sleeve silhouettes so your wrists are free for Mehendi.

---

### 2. Sangeet & Music Night: Shimmer, Sequins & Flow

Sangeet is all about dancing, music, and glitz under party lights.

* **Top Pick:** Heavy Embroidered Silk Kurtha Set with Zari or mirror-work details.
* **Colors:** Royal Navy, Deep Wine, Teal, Metallic Silver.

---

### 3. The Reception: Regal Sophistication

The grand finale reception calls for polished, high-fashion elegance.

* **Top Pick:** Floor-length Raw Silk Kurtha with a heavy Banarasi silk dupatta and statement polki earrings.
* **Colors:** Dusty Rose, Champagne Gold, Plum, Peacock Blue.
    `,
  },
]

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
