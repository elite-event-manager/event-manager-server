import { AuthGuard } from '@nestjs/passport'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto } from './dtos'
import { T_AuthResponse, T_RefreshResponse } from './models'
import { TokenService } from './token.service'
import { GetCurrentTokenData } from './decorators/getCurrentTokenData.decorator'

import { GetUserId } from '@app/common/decorators/getUserId.decorator'
import JwtRefreshGuard from '@app/common/guards/jwtRefresh.guard'
import { T_AdminId } from '@app/common/models/shared/admin'
import { T_TokenData } from 'apps/admin/src/modules/auth/models/token.model'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private tokenService: TokenService,
  ) {}

  // Аутентификация
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto): Promise<T_AuthResponse> {
    return this.service.signIn(dto)
  }

  // Первоначальная проверка авторизации
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  @HttpCode(HttpStatus.OK)
  checkAuth(@GetUserId() adminId: T_AdminId): Promise<T_AuthResponse> {
    return this.service.check(adminId)
  }

  // Обновление пары токенов
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(
    @GetCurrentTokenData() token: T_TokenData,
  ): Promise<T_RefreshResponse> {
    // Получаем юзера и формируем новый токен
    return this.tokenService.generateTokens(token)
  }
}
