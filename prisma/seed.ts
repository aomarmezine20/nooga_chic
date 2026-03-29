import { PrismaClient } from '@prisma/client'
import { MOCK_PRODUCTS } from '../src/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')

  // Create categories
  await prisma.category.upsert({
    where: { id: 'heels' },
    update: {},
    create: { id: 'heels', nameFr: 'Talons', nameEn: 'Heels', nameAr: 'Talons' }
  })

  await prisma.category.upsert({
    where: { id: 'bags' },
    update: {},
    create: { id: 'bags', nameFr: 'Sacs', nameEn: 'Bags', nameAr: 'Sacs' }
  })

  // Create products
  for (const p of MOCK_PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        nameFr: p.name.fr,
        nameEn: p.name.en,
        nameAr: p.name.ar,
        descriptionFr: p.description.fr,
        descriptionEn: p.description.en,
        descriptionAr: p.description.ar,
        price: p.price,
        discountPrice: p.discountPrice,
        images: p.images,
        isFeatured: p.featured || false,
        isBestSeller: false,
        isTrending: false,
        categoryId: p.category,
        isPromo: p.isPromo || false,
        tags: [p.isNew ? 'New' : '', p.isHot ? 'Hot' : ''].filter(Boolean)
      }
    })
  }

  // Create Admin
  await prisma.admin.upsert({
    where: { email: 'admin@noogachic.com' },
    update: {},
    create: {
      email: 'admin@noogachic.com',
      password: 'Larlanco12face@@**' // Robust password
    }
  })

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
