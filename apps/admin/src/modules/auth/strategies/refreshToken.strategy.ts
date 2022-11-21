import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common/decorators'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'

import { TokenService } from '../token.service'
import { HttpException, HttpStatus } from '@nestjs/common'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService, private tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET_ADMIN_RT'),
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: any) {
    const valid = await this.tokenService.checkRefreshTokenId(+payload.tokenId)

    if (!valid) {
      throw new HttpException(
        {
          message: {
            text: '1',
            status: E_ServerMessageStatus.error,
          },
        },
        HttpStatus.FORBIDDEN,
      )
    }

    return payload
  }
}
