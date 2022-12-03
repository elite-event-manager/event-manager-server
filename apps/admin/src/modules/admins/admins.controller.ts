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

import {
  CreateAdminDto,
  UpdateAdminDto,
  ChangePasswordDto,
  ChangeRolesDto,
} from './dtos'
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

  @UseGuards(PermissionsGuard([E_RolePermission['admins.view']]))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetAdminsResponse> {
    return this.service.getAll()
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.view']]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetAdminResponse> {
    return this.service.getOne(+id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.create']]))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateAdminDto): Promise<T_CreateAdminResponse> {
    return this.service.createOne(dto)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.update.general']]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateAdminDto,
  ): Promise<T_UpdateAdminResponse> {
    return await this.service.updateOne(dto, +id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.delete']]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(+id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.update.password']]))
  @Patch('changePassword/:id')
  @HttpCode(HttpStatus.OK)
  changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.service.changePassword(dto, +id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['admins.update.roles']]))
  @Patch('changeRoles/:id')
  @HttpCode(HttpStatus.OK)
  changeRoles(@Param('id') id: string, @Body() dto: ChangeRolesDto) {
    return this.service.changeRoles(dto, +id)
  }
}
