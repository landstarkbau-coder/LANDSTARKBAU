// prisma.config.ts
import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    // Для команд Prisma CLI (міграції, генерація) використовуємо прямий URL
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
})