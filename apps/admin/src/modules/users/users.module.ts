import { Module } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { AdminsService } from '../admins/admins.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, AdminsService],
})
export class UsersModule {}
