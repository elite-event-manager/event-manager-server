import { Injectable } from '@nestjs/common'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUniqueByPhone(phone: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone },
    })

    return user
  }
}
