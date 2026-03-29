import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "prisma+postgres://noogachic.dummy.url",
  },
})
