import { PrismaClient } from '@prisma/client'

// Map environment variables for Supabase compatibility
if (!process.env.DATABASE_URL && process.env.DATABASE_POSTGRES_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_POSTGRES_URL;
}

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.warn('[v0] DATABASE_URL not set. Database operations will fail until environment is configured.')
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    errorFormat: 'pretty'
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
