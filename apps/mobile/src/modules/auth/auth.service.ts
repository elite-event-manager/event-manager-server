import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon2 from 'argon2'
import { Repository } from 'typeorm'

import { SignInDto } from './dtos/signIn.dto'
import { TokenService } from './token.service'
import { T_AuthResponse } from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@app/common/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async signIn(dto: SignInDto): Promise<T_AuthResponse> {
    const user = await this.repository.findOne({
      where: { phone: dto.phone },
      relations: { avatar: true },
    })

    // Если пользователь не найден
    if (!user)
      throw new UnauthorizedException({
        message: {
          text: 'Пользователь не зарегистрирован',
          status: E_ServerMessageStatus.error,
        },
      })

    console.log('dto', dto, user)
    const passwordMatches = await argon2.verify(user.password, dto.password)

    // Если пароли не совпадают
    if (!passwordMatches)
      throw new UnauthorizedException({
        message: {
          text: 'Неверный пароль',
          status: E_ServerMessageStatus.error,
        },
      })

    const { accessToken } = await this.tokenService.generateTokens({
      sub: user.id,
      phone: user.phone,
    })

    return {
      data: {
        accessToken,
        user: user,
      },
    }
  }
}
