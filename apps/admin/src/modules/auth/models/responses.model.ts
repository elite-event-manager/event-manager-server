import { Admin, AdminsOnRoles, Role } from '@prisma/client'

import { I_Response } from '@app/common/models/shared/response'

export type T_AdminPreview = Pick<Admin, 'firstName' | 'lastName' | 'email'> & {
  roles: (AdminsOnRoles & {
    role: Role
  })[]
}

export type T_AuthResponse = I_Response<{
  accessToken?: string
  refreshToken?: string
  admin: T_AdminPreview
}>

export type T_RefreshResponse = I_Response<{
  accessToken: string
  refreshToken: string
}>
