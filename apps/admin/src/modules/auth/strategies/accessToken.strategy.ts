import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common/decorators'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET_ADMIN_AT'),
    })
  }

  validate(payload: any) {
    return payload
  }
}
