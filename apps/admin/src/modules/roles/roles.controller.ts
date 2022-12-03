import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { PermissionsGuard } from '@app/common/guards/permissions.guard'

import { RolesService } from './roles.service'
import {
  T_GetRolesResponse,
  T_GetRoleResponse,
  T_CreateRoleResponse,
  T_UpdateRoleResponse,
} from './models'
import { CreateRoleDto, UpdateRoleDto } from './dtos'
import { E_RolePermission } from '@app/common/models/shared/role'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @UseGuards(PermissionsGuard([E_RolePermission['roles.view']]))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetRolesResponse> {
    return this.service.getAll()
  }

  @UseGuards(PermissionsGuard([E_RolePermission['roles.view']]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetRoleResponse> {
    return this.service.getOne(+id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['roles.create']]))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body() dto: CreateRoleDto): Promise<T_CreateRoleResponse> {
    return this.service.createOne(dto)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['roles.update']]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<T_UpdateRoleResponse> {
    return await this.service.updateOne(dto, +id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['roles.delete']]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(+id)
  }
}
