import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsPhoneNumber } from 'class-validator'

export class SignInDto {
  @ApiProperty({ default: '+7 (950) 000-00-00' })
  @IsPhoneNumber('RU')
  phone: string

  @ApiProperty()
  @IsString()
  password: string
}
