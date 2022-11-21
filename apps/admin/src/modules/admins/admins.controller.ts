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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { CreateAdminDto, UpdateAdminDto, ChangePasswordDto } from './dtos'
import {
  T_CreateAdminResponse,
  T_GetAdminsResponse,
  T_GetAdminResponse,
  T_UpdateAdminResponse,
} from './models'

import { AdminsService } from 'apps/admin/src/modules/admins/admins.service'
import { E_RolePermission } from '@app/common/models/shared/role'
import { PermissionsGuard } from '@app/common/guards/permissions.guard'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  @UseGuards(PermissionsGuard([E_RolePermission['admins.view.all']]))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetAdminsResponse> {
    return this.service.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetAdminResponse> {
    return this.service.getOne(+id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateAdminDto): Promise<T_CreateAdminResponse> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateAdminDto,
  ): Promise<T_UpdateAdminResponse> {
    return await this.service.updateOne(dto, +id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(+id)
  }

  @Patch('changePassword/:id')
  @HttpCode(HttpStatus.OK)
  changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.service.changePassword(dto, +id)
  }
}
