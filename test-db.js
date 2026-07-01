// test-db.js
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

async function test() {
  try {
    console.log('Testing database connection...')
    
    const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
    
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false }
    })
    
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })
    
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connected!', result)
    
    await prisma.$disconnect()
    await pool.end()
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
  }
}

test()