import { I_Response } from '@app/common/models/shared/response'
import { User } from '@app/common/entities/user.entity'

export type T_GetProfile = I_Response<User>
