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

import { CreateUserDto, UpdateUserDto } from './dtos'
import {
  T_CreateUserResponse,
  T_GetUsersResponse,
  T_GetUserResponse,
  T_UpdateUserResponse,
} from './models'
import { UsersService } from './users.service'
import { PermissionsGuard } from '@app/common/guards/permissions.guard'
import { E_RolePermission } from '@app/common/models/shared/role'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(PermissionsGuard([E_RolePermission['users.view']]))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetUsersResponse> {
    return this.service.getAll()
  }

  @UseGuards(PermissionsGuard([E_RolePermission['users.view']]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetUserResponse> {
    return this.service.getOne(+id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['users.create']]))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateUserDto): Promise<T_CreateUserResponse> {
    return this.service.create(dto)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['users.update']]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<T_UpdateUserResponse> {
    return await this.service.updateOne(dto, +id)
  }

  @UseGuards(PermissionsGuard([E_RolePermission['users.delete']]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(+id)
  }
}
