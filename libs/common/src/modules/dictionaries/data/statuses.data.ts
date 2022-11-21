import { E_UserStatus } from '@app/common/models/shared/user'
import { T_DictionaryUserStatus } from '@app/common/models/shared/dictionaries'

export const statusesData: T_DictionaryUserStatus[] = [
  { id: E_UserStatus.resident, name: 'Резидент' },
  { id: E_UserStatus.president, name: 'Президент' },
  { id: E_UserStatus.vicePresident, name: 'Вице-президент' },
  { id: E_UserStatus.assemblyCouncilMember, name: 'Член совета собраний' },
]
