import { LocalFile } from '@app/common/entities/localFile.entity'
import { Admin } from '@app/common/entities/admin.entity'
import { I_Response } from '@app/common/models/shared/response'
import { User } from '@app/common/entities/user.entity'

export type T_UserPreview = Pick<
  Admin,
  'phone' | 'role' | 'firstName' | 'lastName'
> & { avatar: LocalFile }

export type T_AuthResponse = I_Response<{
  accessToken?: string
  refreshToken?: string
  user: User
}>
