import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_POSTGRES_URL || "postgresql://postgres:[PASSWORD]@db.clsecoiilkypshqoyppt.supabase.co:6543/postgres?pgbouncer=true",
  },
})
