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

    // Clean up old auth identity so authModule.register creates a fresh scrypt KDF hash
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

    // Use official authModule.register to perform proper scrypt hashing
    const { authIdentity, error } = await authModule.register("emailpass", {
      body: {
        email,
        password,
      },
    })

    if (error) {
      console.error(`  ❌ Error registering auth:`, error)
      return
    }

    if (authIdentity) {
      await authModule.updateAuthIdentities({
        id: authIdentity.id,
        app_metadata: {
          user_id: user.id,
        },
      })
      console.log(`  🎉 Admin user ${email} successfully registered & linked to user profile!`)
    }
  } catch (error: any) {
    console.error(`  ❌ Error provisioning admin:`, error.message || error)
  }
}
