import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function createAdminUser({ container }: ExecArgs) {
  const userModule = container.resolve(Modules.USER)
  const authModule = container.resolve(Modules.AUTH)

  const email = (process.env.MEDUSA_ADMIN_EMAIL || "admin@sasabysakshi.com").toLowerCase().trim()
  const password = process.env.MEDUSA_ADMIN_PASSWORD || "AdminPassword123!"

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`  👤 Configuring Admin User: ${email}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

  try {
    // 1. Ensure user profile exists
    let user: any
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

    // 2. Ensure auth identity exists and password is synchronized
    let authIdentity: any

    const registerRes = await authModule.register("emailpass", {
      body: {
        email,
        password,
      },
    })

    if (registerRes.success && registerRes.authIdentity) {
      authIdentity = registerRes.authIdentity
      console.log(`  ✅ Registered new auth identity: ${authIdentity.id}`)
    } else {
      // Auth identity already existed -> update password
      console.log(`  ℹ️ Auth identity exists, updating password hash...`)
      const updateRes = await authModule.updateProvider("emailpass", {
        entity_id: email,
        password,
      })

      if (updateRes.error) {
        console.warn(`  ⚠️ updateProvider notice: ${updateRes.error}`)
      } else {
        console.log(`  ✅ Password synchronized successfully for ${email}`)
      }

      // Retrieve identity to link app_metadata
      try {
        const authProviderService = (authModule as any).getAuthIdentityProviderService("emailpass")
        authIdentity = await authProviderService.retrieve({ entity_id: email })
      } catch (err: any) {
        console.warn(`  ⚠️ Could not retrieve auth identity via provider service:`, err.message || err)
      }
    }

    // 3. Link authIdentity to user profile via app_metadata.user_id
    if (authIdentity && authIdentity.id) {
      await authModule.updateAuthIdentities({
        id: authIdentity.id,
        app_metadata: {
          user_id: user.id,
        },
      })
      console.log(`  🎉 Admin user ${email} successfully linked to user profile (${user.id})!`)
    } else {
      console.error(`  ❌ Failed to resolve authIdentity for ${email}`)
    }
  } catch (error: any) {
    console.error(`  ❌ Error provisioning admin:`, error.message || error)
  }
}
