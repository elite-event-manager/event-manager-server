import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon2 from 'argon2'

import { SignInDto } from './dtos/signIn.dto'
import { TokenService } from './token.service'
import { T_AuthResponse } from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { T_AdminId } from '@app/common/models/shared/admin'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async signIn(dto: SignInDto): Promise<T_AuthResponse> {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
      include: {
        roles: { include: { role: true } },
      },
    })

    // Если пользователь не найден
    if (!admin)
      throw new UnauthorizedException({
        message: {
          text: 'Пользователь не зарегистрирован',
          status: E_ServerMessageStatus.error,
        },
      })

    const passwordMatches = await argon2.verify(admin.password, dto.password)

    // Если пароли не совпадают
    if (!passwordMatches)
      throw new UnauthorizedException({
        message: {
          text: 'Неверный пароль',
          status: E_ServerMessageStatus.error,
        },
      })

    const { data: tokens } = await this.tokenService.generateTokens({
      sub: admin.id,
      email: admin.email,
      roles: admin.roles,
    })

    return {
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        admin: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          roles: admin.roles,
          avatar: admin.avatar,
        },
      },
    }
  }

  async check(userId: T_AdminId): Promise<T_AuthResponse> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: userId },
      include: {
        roles: { include: { role: true } },
      },
    })

    // Если пользователь не найден
    if (!admin) throw new UnauthorizedException()

    return {
      data: {
        admin: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          roles: admin.roles,
          avatar: admin.avatar,
        },
      },
    }
  }
}
