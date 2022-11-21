import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { TokenService } from './token.service'
import { AuthController } from './auth.controller'
import { AccessTokenStrategy } from './strategies'

import { User } from '@app/common/entities/user.entity'

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AccessTokenStrategy],
})
export class AuthModule {}
