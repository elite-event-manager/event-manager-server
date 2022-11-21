import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto } from './dtos'
import { T_AuthResponse } from './models'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // Аутентификация
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto): Promise<T_AuthResponse> {
    return this.service.signIn(dto)
  }
}
