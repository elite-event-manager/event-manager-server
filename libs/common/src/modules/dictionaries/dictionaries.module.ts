import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { DictionariesController } from './dictionaries.controller'
import { DictionariesService } from './dictionaries.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [DictionariesController],
  providers: [DictionariesService],
})
export class DictionariesModule {}
