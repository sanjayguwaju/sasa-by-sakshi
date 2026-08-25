import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function createAdminUser({ container }: ExecArgs) {
  const userModule = container.resolve(Modules.USER)
  const authModule = container.resolve(Modules.AUTH)

  const email = (process.env.MEDUSA_ADMIN_EMAIL || "admin@sasabysakshi.com").toLowerCase().trim()
  const password = process.env.MEDUSA_ADMIN_PASSWORD || "password123"

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`  👤 Configuring Admin User: ${email}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

  let user: any
  try {
    const existingUsers = await userModule.listUsers({ email })
    if (existingUsers && existingUsers.length > 0) {
      user = existingUsers[0]
      console.log(`  ℹ️ Found existing user profile: ${user.id}`)
    } else {
      user = await userModule.createUsers({
        email,
        first_name: "Sakshi",
        last_name: "Admin",
      })
      console.log(`  ✅ Created user profile: ${user.id}`)
    }

    // Reset auth identity for clean login
    try {
      const identities = await authModule.listAuthIdentities({
        provider_identities: {
          entity_id: email,
          provider: "emailpass",
        },
      } as any)

      if (identities && identities.length > 0) {
        await authModule.deleteAuthIdentities(identities.map((i: any) => i.id))
        console.log(`  🔄 Reset existing auth identity`)
      }
    } catch (err: any) {
      // Ignore if not found
    }

    // Register fresh emailpass credentials
    await authModule.createAuthIdentities({
      provider_identities: [
        {
          provider: "emailpass",
          entity_id: email,
          provider_metadata: {
            password,
          },
        },
      ],
      app_metadata: {
        user_id: user.id,
      },
    })

    console.log(`  🎉 Admin user ${email} successfully provisioned!`)
  } catch (error: any) {
    console.error(`  ❌ Error provisioning admin:`, error.message || error)
  }
}
