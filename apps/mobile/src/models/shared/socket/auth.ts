import { T_ServerMessage } from '@app/common/models/shared/app'

export enum E_Subscribe {
  getCheckPhone = 'getCheckPhone',
  getCheckCode = 'getCheckCode',
}

export interface I_SubscriptionData {
  [E_Subscribe.getCheckPhone]: T_ServerMessage
  [E_Subscribe.getCheckCode]: T_ServerMessage & {
    accessToken?: string
  }
}

export enum E_Emit {
  checkPhone = 'restoreCheckPhone',
  checkCode = 'restoreCheckCode',
}

export interface I_EmitPayload {
  [E_Emit.checkPhone]: { phone: string }
  [E_Emit.checkCode]: { code: string }
}
