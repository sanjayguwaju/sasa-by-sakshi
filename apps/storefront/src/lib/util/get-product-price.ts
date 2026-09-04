import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-percentage-diff"
import { convertToLocale } from "./money"

type VariantWithPrice = HttpTypes.StoreProductVariant & {
  calculated_price?: {
    calculated_amount: number
    original_amount: number
    currency_code: string
    calculated_price: {
      price_list_type: string
    }
  }
}

export const getPricesForVariant = (variant: any) => {
  if (!variant) {
    return null
  }

  const calcAmount =
    variant.calculated_price?.calculated_amount ??
    variant.calculated_price?.amount ??
    variant.prices?.[0]?.amount

  if (calcAmount === undefined || calcAmount === null) {
    return null
  }

  const currencyCode =
    variant.calculated_price?.currency_code ??
    variant.prices?.[0]?.currency_code ??
    "npr"

  const origAmount =
    variant.calculated_price?.original_amount ??
    variant.prices?.[0]?.amount ??
    calcAmount

  return {
    calculated_price_number: calcAmount,
    calculated_price: convertToLocale({
      amount: calcAmount,
      currency_code: currencyCode,
    }),
    original_price_number: origAmount,
    original_price: convertToLocale({
      amount: origAmount,
      currency_code: currencyCode,
    }),
    currency_code: currencyCode,
    price_type: variant.calculated_price?.calculated_price?.price_list_type ?? "default",
    percentage_diff: getPercentageDiff(origAmount, calcAmount),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const pricedVariants = (product.variants as any[])
      .map((v) => ({ variant: v, price: getPricesForVariant(v) }))
      .filter((item) => !!item.price)

    if (pricedVariants.length === 0) {
      return null
    }

    pricedVariants.sort(
      (a, b) => (a.price?.calculated_price_number ?? 0) - (b.price?.calculated_price_number ?? 0)
    )

    return pricedVariants[0].price
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    ) as VariantWithPrice | undefined

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
