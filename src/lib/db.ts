import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

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
    adapter: new PrismaPg({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    }),
  })

if (process.env.NODE_ENV !== 'production') 
  globalForPrisma.prisma = prisma
