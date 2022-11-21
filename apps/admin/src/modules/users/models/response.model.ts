import { User } from '@prisma/client'

import { I_Response } from '@app/common/models/shared/response'

export type T_CreateUserResponse = I_Response<User>

export type T_GetUsersResponse = I_Response<User[]>

export type T_GetUserResponse = I_Response<User>

export type T_UpdateUserResponse = I_Response<User>
