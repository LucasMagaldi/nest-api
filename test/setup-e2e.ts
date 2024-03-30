import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) throw new Error('Please proveide a DATABASE_URL environment variable.')

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    return url.toString()

}

const schema = randomUUID()

beforeAll(async () => {
    const dbURL = generateUniqueDatabaseURL(schema)
    process.env.DATABASE_URL = dbURL

    execSync('npx prisma migrate deploy')
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
    await prisma.$disconnect()
})