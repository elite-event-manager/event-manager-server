import { I_Response } from '@app/common/models/shared/response'
import { Role } from '@prisma/client'

export type T_GetRolesResponse = I_Response<Role[]>

export type T_GetRoleResponse = I_Response<Role>

export type T_CreateRoleResponse = I_Response<Role>

export type T_UpdateRoleResponse = I_Response<Role>
