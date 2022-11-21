import { PrismaClient } from '@prisma/client'

import { adminSeed } from './admin.seed'
import { roleSeed } from './role.seed'

const prisma = new PrismaClient()

async function main() {
  const roles = await roleSeed()
  await adminSeed(roles.superAdmin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
