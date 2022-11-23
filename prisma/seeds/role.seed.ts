import { PrismaClient, Role } from '@prisma/client'

import { E_RolePermission as P } from '../../libs/common/src/models/shared/role'

const prisma = new PrismaClient()

export const roleSeed = async (): Promise<{
  superAdmin: Role
  admin: Role
  manager: Role
}> => {
  const superAdminPermissions = Object.keys(P)

  const managerPermissions = [
    P['users.create'],
    P['users.delete'],
    P['users.update'],
    P['users.view.all'],
    P['users.view.single'],
  ]

  const adminPermissions = [
    ...managerPermissions,
    P['admins.create'],
    P['admins.delete'],
    P['admins.update.general'],
    P['admins.update.roles'],
    P['admins.update.password'],
    P['admins.view.all'],
    P['admins.view.single'],
  ]

  const superAdmin = await prisma.role.upsert({
    where: { tag: 'SuperAdmin' },
    update: {},
    create: {
      tag: 'SuperAdmin',
      name: 'Главный Администратор',
      description: 'Разработчики RentaTeam',
      permissions: superAdminPermissions,
    },
  })

  const admin = await prisma.role.upsert({
    where: { tag: 'Admin' },
    update: {},
    create: {
      tag: 'Admin',
      name: 'Администратор',
      description: 'Руководители MDS',
      permissions: adminPermissions,
    },
  })

  const manager = await prisma.role.upsert({
    where: { tag: 'Manager' },
    update: {},
    create: {
      tag: 'Manager',
      name: 'Менеджер',
      description: 'Менеджеры MDS',
      permissions: managerPermissions,
      admins: {},
    },
  })

  return {
    superAdmin,
    admin,
    manager,
  }
}
