import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('[v0] Initializing database...')
    
    // Create default admin if it doesn't exist
    const adminExists = await prisma.admin.findUnique({
      where: { email: 'admin@nooga.com' }
    })
    
    if (!adminExists) {
      await prisma.admin.create({
        data: {
          email: 'admin@nooga.com',
          password: 'admin123' // Change this in production!
        }
      })
      console.log('[v0] Default admin created: admin@nooga.com / admin123')
    } else {
      console.log('[v0] Admin user already exists')
    }
    
    console.log('[v0] Database initialized successfully')
  } catch (error) {
    console.error('[v0] Database initialization error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
