import { PrismaClient } from '@prisma/client'

// Safely map Vercel-Supabase variables if standard ones are missing
if (!process.env.DATABASE_URL && process.env.DATABASE_POSTGRES_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_POSTGRES_URL;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Removed all custom datasource/accelerate overrides for Prisma 7 standard Node.js runtime
  })

if (process.env.NODE_ENV !== 'production') 
  globalForPrisma.prisma = prisma
