import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthModule } from './modules/auth/auth.module'
import { ProfileModule } from './modules/profile/profile.module'

import { PrismaModule } from '@app/common/modules/prisma/prisma.module'

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ProfileModule,
  ],
  controllers: [],
})
export class MobileModule {}
