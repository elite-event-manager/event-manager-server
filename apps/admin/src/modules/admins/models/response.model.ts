import { Admin } from '@prisma/client'

import { I_Response } from '@app/common/models/shared/response'

export type T_CreateAdminResponse = I_Response<Admin>

export type T_GetAdminsResponse = I_Response<Admin[]>

export type T_GetAdminResponse = I_Response<Admin>

export type T_UpdateAdminResponse = I_Response<Admin>
