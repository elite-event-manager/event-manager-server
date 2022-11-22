import { Admin, Role } from '@prisma/client'

import { I_Response } from '@app/common/models/shared/response'

export type T_CreateAdminResponse = I_Response<Admin>

export type T_GetAdminsResponse = I_Response<
  (Omit<Admin, 'password'> & {
    roles: {
      role: Role
    }[]
  })[]
>

export type T_GetAdminResponse = I_Response<
  Omit<Admin, 'password'> & {
    roles: {
      role: Role
    }[]
  }
>

export type T_UpdateAdminResponse = I_Response<Admin>
