import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsArray } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ default: 'seo' })
  @IsString()
  tag: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsArray()
  permissions: string[]
}
