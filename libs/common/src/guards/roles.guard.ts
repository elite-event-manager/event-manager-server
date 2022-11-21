import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { E_AdminRole } from '../models/shared/admin'
import { E_ServerMessageStatus } from '../models/shared/app'

export const RolesGuard = (roles: E_AdminRole[]) => {
  class RolesGuardMixin implements CanActivate {
    constructor(public reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
      try {
        const req = context.switchToHttp().getRequest()

        return roles.includes(req.user.role)
      } catch (e) {
        throw new HttpException(
          {
            message: {
              text: 'Доступ запрещён',
              status: E_ServerMessageStatus.error,
            },
          },
          HttpStatus.FORBIDDEN,
        )
      }
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
