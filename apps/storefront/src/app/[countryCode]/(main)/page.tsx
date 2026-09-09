import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BestSeller from "@modules/home/components/best-seller"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Sasa by Sakshi — Handcrafted Kurthas & Contemporary Ethnic Wear",
  description:
    "Discover exclusive festive kurthas, pure fabrics, and contemporary ethnic silhouettes designed in Nepal.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  let region: any = null
  try {
    region = await getRegion(countryCode)
  } catch (err) {
    console.warn("Home page: getRegion error", err)
  }

  let collections: any[] = []
  let products: any[] = []

  try {
    const [collectionsRes, productsRes] = await Promise.all([
      listCollections({
        fields: "id, handle, title",
      }).catch(() => ({ collections: [], count: 0 })),
      listProducts({
        countryCode,
        queryParams: {
          limit: 8,
        },
      }).catch(() => ({ response: { products: [], count: 0 } })),
    ])

    collections = collectionsRes?.collections || []
    products = productsRes?.response?.products || []
  } catch (err) {
    console.warn("Home page: data fetch error", err)
  }

  return (
    <>
      <Hero />
      {region && products.length > 0 && (
        <BestSeller products={products} region={region} />
      )}
      {region && collections.length > 0 && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </>
  )
}

