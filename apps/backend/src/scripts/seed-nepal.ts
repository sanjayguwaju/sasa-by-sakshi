import { ExecArgs } from "@medusajs/framework/types"

export default async function seedNepal({ container }: ExecArgs) {
  const regionModule = container.resolve("region")
  const storeModule = container.resolve("store")
  const productModule = container.resolve("product")
  const fulfillmentModule = container.resolve("fulfillment")
  
  console.log("Region Module:", !!regionModule)
  console.log("Store Module:", !!storeModule)
  console.log("Product Module:", !!productModule)
  console.log("Fulfillment Module:", !!fulfillmentModule)

  const stores = await storeModule.listStores()
  console.log("Stores:", stores)
}
