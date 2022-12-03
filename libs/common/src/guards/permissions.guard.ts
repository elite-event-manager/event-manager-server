import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  mixin,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { E_RolePermission } from '../models/shared/role'
import { E_ServerMessageStatus } from '../models/shared/app'
import { T_TokenData } from '../../../../apps/admin/src/modules/auth/models/token.model'
import { AdminsService } from 'apps/admin/src/modules/admins/admins.service'

export const PermissionsGuard = (scope: E_RolePermission[]) => {
  class PermissionsGuardMixin implements CanActivate {
    constructor(
      public reflector: Reflector,
      @Inject(AdminsService) public adminsService: AdminsService,
    ) {}

    async canActivate(context: ExecutionContext) {
      try {
        const req = context.switchToHttp().getRequest<{ user: T_TokenData }>()
        const isAccessible = await this.adminsService.checkPermissions(
          req.user.sub,
          scope,
        )
        if (isAccessible) return isAccessible
        throw 'У вас недостаточно прав'
      } catch (e) {
        throw new HttpException(
          {
            message: {
              text: 'У вас недостаточно прав',
              status: E_ServerMessageStatus.error,
            },
          },
          HttpStatus.FORBIDDEN,
        )
      }
    }
  }

  const guard = mixin(PermissionsGuardMixin)
  return guard
}
