import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUserId = createParamDecorator(
  (_, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    return request.user['sub']
  },
)
