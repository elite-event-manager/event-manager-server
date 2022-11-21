export enum E_ServerMessageStatus {
  success = 'success',
  error = 'error',
  info = 'info',
}

export type T_ServerMessage = {
  text: string
  status: E_ServerMessageStatus
}

export type T_Tokens = {
  accessToken: string
  refreshToken: string
}
