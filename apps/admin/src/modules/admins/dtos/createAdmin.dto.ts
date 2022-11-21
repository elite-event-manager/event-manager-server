import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsArray, IsNumber } from 'class-validator'

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
  @IsArray()
  roleIds: number[]

  @ApiProperty()
  @IsNumber()
  avatarId: number
}
