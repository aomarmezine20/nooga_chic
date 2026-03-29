import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const databaseUrl = process.env.DATABASE_POSTGRES_URL || "postgresql://postgres:[PASSWORD]@db.clsecoiilkypshqoyppt.supabase.co:6543/postgres?pgbouncer=true";

// For Prisma 7 on Supabase (standard postgres)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // In Prisma 7, we either use accelerateUrl or the singular 'datasource' property
    ...(databaseUrl.startsWith('prisma') 
      ? { accelerateUrl: databaseUrl } 
      : { datasource: { url: databaseUrl } }),
    log: ['query'],
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
