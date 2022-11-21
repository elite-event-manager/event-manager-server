import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AuthModule } from './modules/auth/auth.module'
import { AdminsModule } from './modules/admins/admins.module'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'

import { UploadModule } from '@app/common/modules/upload/upload.module'
import { DictionariesModule } from '@app/common/modules/dictionaries/dictionaries.module'
import { PrismaModule } from '@app/common/modules/prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'static'),
    }),
    PrismaModule,
    AuthModule,
    AdminsModule,
    RolesModule,
    UsersModule,
    UploadModule,
    DictionariesModule,
  ],
  controllers: [],
})
export class AdminModule {}
