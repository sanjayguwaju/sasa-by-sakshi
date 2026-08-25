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
            test_mode: true,
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

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  modules.push({
    resolve: '@medusajs/medusa/auth',
    options: {
      providers: [
        {
          resolve: '@medusajs/medusa/auth-emailpass',
          id: 'emailpass',
        },
        {
          resolve: '@medusajs/medusa/auth-google',
          id: 'google',
          options: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sasabysakshi.com'}/auth/google/callback`,
          },
        },
      ],
    },
  })
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    // Limit pool size per-connection so 25+ parallel module migrations
    // don't exhaust PostgreSQL's max_connections during startup.
    databaseDriverOptions: {
      pool: { min: 1, max: 5 },
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  modules,
})
