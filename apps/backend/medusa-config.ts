import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const modules: any = [
  {
    resolve: '@medusajs/medusa/payment',
    options: {
      providers: [
        {
          resolve: './src/modules/esewa-payment',
          id: 'esewa',
          options: {
            merchant_id: process.env.ESEWA_MERCHANT_ID || 'EPAYTEST',
            secret_key: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q',
            test_mode: process.env.ESEWA_TEST_MODE !== 'false',
          },
        },
        {
          resolve: './src/modules/khalti-payment',
          id: 'khalti',
          options: {
            secret_key: process.env.KHALTI_SECRET_KEY || 'live_secret_key_68622e030cdd42129e92b3438a0f9b6b',
            test_mode: process.env.KHALTI_TEST_MODE !== 'false',
          },
        },
      ],
    },
  },
]

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  modules.push({
    resolve: '@medusajs/medusa/file',
    options: {
      providers: [
        {
          resolve: '@jaykanjia/medusa-file-cloudinary',
          id: 'cloudinary',
          options: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
          },
        },
      ],
    },
  })
}

if (process.env.RESEND_API_KEY) {
  modules.push({
    resolve: '@medusajs/medusa/notification',
    options: {
      providers: [
        {
          resolve: '@typed-dev/medusa-notification-resend',
          id: 'resend',
          options: {
            channels: ['email'],
            api_key: process.env.RESEND_API_KEY,
            from: process.env.RESEND_FROM_EMAIL,
          },
        },
      ],
    },
  })
}

const authProviders: any[] = [
  {
    resolve: '@medusajs/medusa/auth-emailpass',
    id: 'emailpass',
  },
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  authProviders.push({
    resolve: '@medusajs/medusa/auth-google',
    id: 'google',
    options: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sasabysakshi.com'}/auth/google/callback`,
    },
  })
}

modules.push({
  resolve: '@medusajs/medusa/auth',
  options: {
    providers: authProviders,
  },
})

const defaultStoreCors = "http://localhost:8000,http://localhost:8001,http://localhost:5173,http://localhost:3000,https://sasabysakshi.com,https://www.sasabysakshi.com,http://vqppdqpuaq9szvbwx6ahiapw.200.141.14.52.sslip.io,https://vqppdqpuaq9szvbwx6ahiapw.200.141.14.52.sslip.io"
const defaultAdminCors = "http://localhost:9000,http://localhost:5173,http://localhost:8000,http://localhost:3000,http://127.0.0.1:9000,http://127.0.0.1:5173,https://sasabysakshi.com,https://api.sasabysakshi.com,http://m3l4rslizswez4jgdlzyx4dz.200.141.14.52.sslip.io,https://m3l4rslizswez4jgdlzyx4dz.200.141.14.52.sslip.io"
const defaultAuthCors = `${defaultAdminCors},${defaultStoreCors}`

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    databaseDriverOptions: {
      connection: { ssl: false },
    },
    cookieOptions: {
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
    },
    http: {
      storeCors: process.env.STORE_CORS || defaultStoreCors,
      adminCors: process.env.ADMIN_CORS || defaultAdminCors,
      authCors: process.env.AUTH_CORS || defaultAuthCors,
      jwtSecret: process.env.JWT_SECRET || "supersecret_jwt_key_sasa_12345",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret_cookie_key_sasa_12345",
    },
  },
  modules,
})
