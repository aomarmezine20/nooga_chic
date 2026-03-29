import { PrismaClient } from '@prisma/client'

// Safely map Vercel-Supabase variables if standard ones are missing
if (!process.env.DATABASE_URL && process.env.DATABASE_POSTGRES_URL) {
  process.env.DATABASE_URL = process.env.DATABASE_POSTGRES_URL;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// For Prisma 7 on Vercel/Supabase
// We use the default constructor to avoid "Unknown property" errors with the new engine
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
