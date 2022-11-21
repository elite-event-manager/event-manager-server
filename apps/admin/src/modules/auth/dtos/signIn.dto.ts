import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ default: 'test@mail.com' })
  email: string

  @ApiProperty({ default: 'test1' })
  @IsString()
  password: string
}
