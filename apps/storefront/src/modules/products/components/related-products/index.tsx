import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"
import RelatedProductsSlider from "./slider"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint w-full">
      <div className="flex flex-col mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-black">
          Recently Viewed Products
        </h2>
      </div>

      <RelatedProductsSlider>
        {products.map((product) => (
          <li 
            key={product.id}
            className="w-[85vw] small:w-[calc(33.333%-16px)] medium:w-[calc(25%-18px)] flex-shrink-0 snap-start"
          >
            <Product region={region} product={product} />
          </li>
        ))}
      </RelatedProductsSlider>
    </div>
  )
}
