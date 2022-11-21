import {
  Body,
  Controller,
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

import { RolesService } from './roles.service'
import {
  T_GetRolesResponse,
  T_GetRoleResponse,
  T_CreateRoleResponse,
  T_UpdateRoleResponse,
} from './models'
import { CreateRoleDto, UpdateRoleDto } from './dtos'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetRolesResponse> {
    return this.service.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetRoleResponse> {
    return this.service.getOne(+id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body() dto: CreateRoleDto): Promise<T_CreateRoleResponse> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<T_UpdateRoleResponse> {
    return await this.service.updateOne(dto, +id)
  }
}
