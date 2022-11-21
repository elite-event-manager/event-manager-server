import { T_UserId } from '@app/common/models/shared/user'

export type T_TokenData = {
  sub: T_UserId
  phone: string
}
