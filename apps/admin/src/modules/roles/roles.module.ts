import { Module } from '@nestjs/common'

import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'

import { AdminsService } from '../admins/admins.service'

@Module({
  controllers: [RolesController],
  providers: [RolesService, AdminsService],
})
export class RolesModule {}
