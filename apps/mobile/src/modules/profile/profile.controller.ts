import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { T_GetProfile } from './models'
import { ProfileService } from './profile.service'

import { T_UserId } from '@app/common/models/shared/user'
import { GetUserId } from '@app/common/decorators/getUserId.decorator'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get(@GetUserId() userId: T_UserId): Promise<T_GetProfile> {
    return this.service.getOne(userId)
  }
}
