import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Logger, UseGuards } from '@nestjs/common'
import { Socket, Server } from 'socket.io'

import { TokenService } from './token.service'

import { UsersService } from '../users/users.service'
import {
  E_Emit,
  E_Subscribe,
  I_EmitPayload,
  I_SubscriptionData,
} from '../../models/shared/socket/auth'

import { WsThrottlerGuard } from '@app/common/guards/wsThrottler.guard'
import { T_SocketId } from '@app/common/models/shared/socket'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { generator } from '@app/common/utils/generators'
import { T_UserId } from '@app/common/models/shared/user'

@WebSocketGateway({ cors: true })
export class AuthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  codeSessions: Record<
    T_SocketId,
    { id: T_UserId; phone: string; code: string }
  > = {}

  @WebSocketServer()
  server: Server

  private logger: Logger = new Logger('AuthGateway')

  async afterInit() {
    this.logger.log('Init AuthGateway')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected AuthGateway: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)

    // Если пользователь запрашивал код восстановления
    if (this.codeSessions[client.id]) {
      // Удаляем его из списка сессий
      delete this.codeSessions[client.id]
    }
  }

  // Проверка номера телефона и отправка кода для входа
  @UseGuards(WsThrottlerGuard)
  @SubscribeMessage(E_Emit.checkPhone)
  async restoreCheckEmail(
    client: Socket,
    data: I_EmitPayload[E_Emit.checkPhone],
  ) {
    const payload: I_SubscriptionData[E_Subscribe.getCheckPhone] = {
      text: '',
      status: E_ServerMessageStatus.error,
    }

    const user = await this.usersService.getUniqueByPhone(data.phone)

    // Если пользователь не найден
    if (!user) {
      payload.text = 'Данный номер не зарегистрирован'
      client.emit(E_Subscribe.getCheckPhone, payload)
      return
    }

    // Генерируем код
    const code = generator.code()

    // Создаём|обновляем привязку
    this.codeSessions[client.id] = {
      id: user.id,
      phone: user.phone,
      code,
    }

    payload.status = E_ServerMessageStatus.success
    payload.text = `Код для входа: ${code}`
    client.emit(E_Subscribe.getCheckPhone, payload)
  }

  // Проверка кода, выдача токена, удаление сессии
  @SubscribeMessage(E_Emit.checkCode)
  async restoreCheckCode(
    client: Socket,
    data: I_EmitPayload[E_Emit.checkCode],
  ) {
    const payload: I_SubscriptionData[E_Subscribe.getCheckCode] = {
      text: '',
      status: E_ServerMessageStatus.error,
    }

    const clientSession = this.codeSessions[client.id]

    // Если сессия не найдена
    if (!clientSession) {
      payload.text = 'Сессия не найдена. Повторите попытку.'
      client.emit(E_Subscribe.getCheckCode, payload)
      return
    }

    // Если код не валидный
    if (clientSession.code !== data.code) {
      payload.text = 'Неверный код. Повторите попытку.'
      client.emit(E_Subscribe.getCheckCode, payload)
      return
    }

    // Генерируем токены
    const tokens = await this.tokenService.generateTokens({
      sub: clientSession.id,
      phone: clientSession.phone,
    })

    // Оповещаем юзера, что код верный
    payload.text = 'Вы успешно вошли в аккаунт'
    payload.status = E_ServerMessageStatus.success
    payload.accessToken = tokens.accessToken

    client.emit(E_Subscribe.getCheckCode, payload)
    delete this.codeSessions[client.id]
  }
}
