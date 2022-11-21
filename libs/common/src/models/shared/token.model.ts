import { T_AdminId } from '@app/common/models/shared/admin'
import { AdminsOnRoles, Role } from '@prisma/client'

export type T_TokenData = {
  sub: T_AdminId
  email: string
  roles: (AdminsOnRoles & {
    role: Role
  })[]
}
