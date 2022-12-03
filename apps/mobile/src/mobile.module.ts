import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthModule } from './modules/auth/auth.module'

import { PrismaModule } from '@app/common/modules/prisma/prisma.module'

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    AuthModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class MobileModule {}
