import {
  T_DictionaryAdminRole,
  T_DictionaryUserStatus,
} from '@app/common/models/shared/dictionaries'

export type I_DictionaryUserRolesResponse = {
  data: T_DictionaryAdminRole[]
}

export type I_DictionaryUserStatusesResponse = {
  data: T_DictionaryUserStatus[]
}
