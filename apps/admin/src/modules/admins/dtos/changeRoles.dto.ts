import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'

export class ChangeRolesDto {
  @ApiProperty()
  @IsArray()
  rolesIds: number[]
}
