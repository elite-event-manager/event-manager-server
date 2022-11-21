import { ForbiddenException, Injectable } from '@nestjs/common'

import {
  T_CreateRoleResponse,
  T_GetRoleResponse,
  T_GetRolesResponse,
} from './models'
import { CreateRoleDto, UpdateRoleDto } from './dtos'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { T_RoleId } from '@app/common/models/shared/role'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<T_GetRolesResponse> {
    const roles = await this.prisma.role.findMany()

    return { data: roles }
  }

  async getOne(roleId: T_RoleId): Promise<T_GetRoleResponse> {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } })

    return { data: role }
  }

  async createOne(dto: CreateRoleDto): Promise<T_CreateRoleResponse> {
    try {
      const role = await this.prisma.role.create({
        data: dto,
      })
      return { data: role }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }

  async updateOne(
    dto: UpdateRoleDto,
    roleId: T_RoleId,
  ): Promise<T_CreateRoleResponse> {
    try {
      const role = await this.prisma.role.update({
        data: dto,
        where: { id: roleId },
      })
      return { data: role }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }
}
