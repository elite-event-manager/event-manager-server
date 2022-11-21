import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { T_TokenData } from './models/token.model'

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async generateTokens(data: T_TokenData): Promise<{ accessToken: string }> {
    const at = await this.jwtService.signAsync(data, {
      secret: this.config.get('JWT_SECRET_MOBILE_AT'),
      expiresIn: 5 * 60,
    })

    return {
      accessToken: at,
    }
  }
}
