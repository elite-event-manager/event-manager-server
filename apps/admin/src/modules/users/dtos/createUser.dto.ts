import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsPhoneNumber, IsNumber } from 'class-validator'

import { E_UserStatus } from '@app/common/models/shared/user'

export class CreateUserDto {
  @ApiProperty({ default: '+7 (950) 000-00-00' })
  @IsPhoneNumber('RU')
  phone: string

  @ApiProperty()
  @IsString()
  avatar: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty({
    default: E_UserStatus.resident,
  })
  @IsEnum(E_UserStatus)
  status: E_UserStatus
}
