import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { DictionariesService } from './dictionaries.service'
import {
  I_DictionaryUserStatusesResponse,
} from './models/response.model'

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Dictionaries')
@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly service: DictionariesService) {}

  @Get('statuses')
  @HttpCode(HttpStatus.OK)
  getStatuses(): I_DictionaryUserStatusesResponse {
    return this.service.getStatuses()
  }
}
