import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

import {
  ChangePasswordDto,
  ChangeRolesDto,
  CreateAdminDto,
  UpdateAdminDto,
} from './dtos'
import {
  T_CreateAdminResponse,
  T_GetAdminsResponse,
  T_UpdateAdminResponse,
  T_GetAdminResponse,
} from './models'

import { T_AdminId } from '@app/common/models/shared/admin'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { E_RolePermission } from '@app/common/models/shared/role'

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<T_GetAdminsResponse> {
    const admins = await this.prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        description: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        roles: { include: { role: true } },
      },
    })

    return { data: admins }
  }

  async getOne(adminId: T_AdminId): Promise<T_GetAdminResponse> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        description: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        roles: { include: { role: true } },
      },
    })

    return { data: admin }
  }

  async createOne(dto: CreateAdminDto): Promise<T_CreateAdminResponse> {
    const { password, ...rest } = dto
    try {
      const hashedPassword = await argon2.hash(password)
      const user = await this.prisma.admin.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      })
      return { data: user }
    } catch (error) {
      console.log(error)
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }

  async updateOne(
    dto: UpdateAdminDto,
    adminId: T_AdminId,
  ): Promise<T_UpdateAdminResponse> {
    try {
      const admin = await this.prisma.admin.update({
        where: { id: adminId },
        data: dto,
      })

      return { data: admin }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }

  async deleteOne(adminId: T_AdminId) {
    await this.prisma.adminsOnRoles.deleteMany({
      where: {
        adminId,
      },
    })

    await this.prisma.admin.delete({
      where: { id: adminId },
    })
  }

  async changePassword(dto: ChangePasswordDto, adminId: T_AdminId) {
    const password = await argon2.hash(dto.password)
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password },
    })
  }

  async changeRoles(dto: ChangeRolesDto, adminId: T_AdminId) {
    await this.prisma.admin.update({
      where: { id: adminId },
      data: {
        roles: {
          deleteMany: {},
          create: dto.rolesIds.map((roleId) => ({
            role: { connect: { id: roleId } },
          })),
        },
      },
    })
  }

  async checkPermissions(
    adminId: T_AdminId,
    scope: E_RolePermission[],
  ): Promise<boolean> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      include: { roles: { include: { role: true } } },
    })

    return admin.roles.reduce((previousValue, currentValue) => {
      if (!previousValue) {
        previousValue = currentValue.role.permissions.some(
          (permission: E_RolePermission) => scope.includes(permission),
        )
      }
      return previousValue
    }, false)
  }
}
