import { T_ServerMessage } from './app'

export interface I_Response<T> {
  data?: T
  message?: T_ServerMessage
}
