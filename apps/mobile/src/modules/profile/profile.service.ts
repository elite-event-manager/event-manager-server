import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { T_GetProfile } from './models'
import { User } from '@app/common/entities/user.entity'
import { T_UserId } from '@app/common/models/shared/user'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async getOne(userId: T_UserId): Promise<T_GetProfile> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: { avatar: true },
    })

    return { data: user }
  }
}
