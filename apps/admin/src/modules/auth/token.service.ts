import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { T_RefreshResponse } from './models'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { T_TokenData } from '@app/common/models/shared/token.model'

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async generateTokens(data: T_TokenData): Promise<T_RefreshResponse> {
    let refreshTokenItem = await this.prisma.refreshToken.findUnique({
      where: { userId: data.sub },
    })

    if (!refreshTokenItem) {
      refreshTokenItem = await this.prisma.refreshToken.create({
        data: {
          userId: data.sub,
          expireDate: this.generateExpireDate(),
        },
      })
    } else if (refreshTokenItem.expireDate < new Date()) {
      await this.prisma.refreshToken.delete({
        where: { id: refreshTokenItem.id },
      })
      refreshTokenItem = await this.prisma.refreshToken.create({
        data: {
          userId: data.sub,
          expireDate: this.generateExpireDate(),
        },
      })
    } else {
      refreshTokenItem.expireDate = this.generateExpireDate()
      await this.prisma.refreshToken.update({
        where: { id: refreshTokenItem.id },
        data: refreshTokenItem,
      })
    }

    const at = await this.jwtService.signAsync(data, {
      secret: this.config.get('JWT_SECRET_ADMIN_AT'),
      expiresIn: 60 * 60,
    })

    const rt = await this.jwtService.signAsync(
      { ...data, tokenId: refreshTokenItem.id },
      {
        secret: this.config.get('JWT_SECRET_ADMIN_RT'),
        expiresIn: 7 * 24 * 60 * 60,
      },
    )

    return {
      data: {
        accessToken: at,
        refreshToken: rt,
      },
    }
  }

  async checkRefreshTokenId(tokenId: number): Promise<boolean> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { id: tokenId },
    })
    return token && token.expireDate > new Date()
  }

  generateExpireDate(): Date {
    const now = new Date()
    now.setDate(now.getDate() + 60)
    return now
  }
}
