import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { E_RolePermission } from '../models/shared/role'
import { E_ServerMessageStatus } from '../models/shared/app'
import { T_TokenData } from '../models/shared/token'

export const PermissionsGuard = (permissions: E_RolePermission[]) => {
  class PermissionsGuardMixin implements CanActivate {
    constructor(public reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
      try {
        const req = context.switchToHttp().getRequest<{ user: T_TokenData }>()
        return req.user.roles.reduce((acc, cur) => {
          if (!acc) {
            acc = cur.role.permissions.some((permission: E_RolePermission) =>
              permissions.includes(permission),
            )
          }
          return acc
        }, false)
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
