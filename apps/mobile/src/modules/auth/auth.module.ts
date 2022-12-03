import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthGateway } from './auth.gateway'
import { TokenService } from './token.service'
import { AccessTokenStrategy } from './strategies'

import { UsersService } from '../users/users.service'

@Module({
  imports: [JwtModule.register({})],
  providers: [TokenService, AccessTokenStrategy, UsersService, AuthGateway],
})
export class AuthModule {}
