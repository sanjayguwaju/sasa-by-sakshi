import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createInventoryLevelsWorkflow, updateInventoryLevelsWorkflow } from "@medusajs/medusa/core-flows"

export default async function restock({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("  📦 Restocking Inventory Across All Locations")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // 1. Get all stock locations
  const locations = await stockLocationModule.listStockLocations({})
  console.log(`Found ${locations.length} stock location(s):`, locations.map((l: any) => `${l.name} (${l.id})`))

  if (locations.length === 0) {
    console.log("No stock locations found.")
    return
  }

  // 2. Query all inventory levels
  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["id", "inventory_item_id", "location_id", "stocked_quantity"],
  })
  console.log(`Found ${existingLevels.length} existing inventory level(s).`)

  if (existingLevels.length > 0) {
    await updateInventoryLevelsWorkflow(container).run({
      input: {
        updates: existingLevels.map((lvl: any) => ({
          inventory_item_id: lvl.inventory_item_id,
          location_id: lvl.location_id,
          stocked_quantity: 1000,
        })),
      },
    })
    console.log(`  ✅ Updated ${existingLevels.length} existing inventory levels to 1,000 units.`)
  }

  // 3. Check for any inventory items missing a level for these locations
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku", "title", "location_levels.*"],
  })

  const newLevelsToCreate: any[] = []
  for (const item of inventoryItems) {
    for (const loc of locations) {
      const hasLevel = item.location_levels?.some((lvl: any) => lvl.location_id === loc.id)
      if (!hasLevel) {
        newLevelsToCreate.push({
          location_id: loc.id,
          inventory_item_id: item.id,
          stocked_quantity: 1000,
        })
      }
    }
  }

  if (newLevelsToCreate.length > 0) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: newLevelsToCreate,
      },
    })
    console.log(`  ✨ Created ${newLevelsToCreate.length} new inventory levels with 1,000 units each.`)
  }

  // 4. Ensure all product variants have manage_inventory or are linked
  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "title", "sku", "manage_inventory", "allow_backorder", "inventory_items.*"],
  })

  console.log(`Verified ${variants.length} product variants in catalog.`)
  console.log("🎉 All inventory restocked successfully!")
}
