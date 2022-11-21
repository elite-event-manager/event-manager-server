import { Admin, PrismaClient, Role } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

export const adminSeed = async (role: Role): Promise<Admin> => {
  const hashedPassword = await argon2.hash('test1')

  return await prisma.admin.upsert({
    where: { email: 'test@mail.com' },
    update: {},
    create: {
      email: 'test@mail.com',
      firstName: 'Yaroslav',
      lastName: 'Slave',
      description: 'Разработчик RentaTeam',
      password: hashedPassword,
      roles: { create: { roleId: role.id } },
    },
  })
}
