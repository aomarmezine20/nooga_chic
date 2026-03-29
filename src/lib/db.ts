import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const databaseUrl = process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/db";

// For Prisma 7 on Supabase (standard postgres)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // If using Supabase directly, we use the standard datasource
    // If using Prisma Accelerate (prisma+postgres://), we use accelerateUrl
    ...(databaseUrl.startsWith('prisma') 
      ? { accelerateUrl: databaseUrl } 
      : { datasources: { db: { url: databaseUrl } } }),
    log: ['query'],
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
