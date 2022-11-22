import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { T_TokenData } from '@app/common/models/shared/token'

export const GetCurrentTokenData = createParamDecorator(
  (_, context: ExecutionContext): T_TokenData => {
    const request = context.switchToHttp().getRequest()
    return {
      sub: request.user.sub,
      roles: request.user.roles,
      email: request.user.email,
    }
  },
)
