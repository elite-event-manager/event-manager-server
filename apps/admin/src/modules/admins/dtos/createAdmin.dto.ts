import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAdminDto {
  @ApiProperty({ default: 'test@mail.com' })
  email: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  avatar: string
}
