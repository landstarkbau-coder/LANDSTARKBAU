// scripts/create-admin.ts
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = 'admin@example.com'
  const password = 'admin123' // ЗМІНІТЬ ЦЕ!
  
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    console.log('Адмін вже існує')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN'
    }
  })
  
  console.log('Адміна створено! Email:', email, 'Пароль:', password)
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())