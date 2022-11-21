import { Injectable } from '@nestjs/common'

import { statusesData } from './data/statuses.data'
import { I_DictionaryUserStatusesResponse } from './models/response.model'

@Injectable()
export class DictionariesService {
  getStatuses(): I_DictionaryUserStatusesResponse {
    return { data: statusesData }
  }
}
