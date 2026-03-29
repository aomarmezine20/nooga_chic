import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Fallback for build phase on Vercel if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || "prisma+postgres://noogachic.dummy.url";

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: databaseUrl,
    log: ['query'],
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
