import { ApiProperty } from '@nestjs/swagger'

export class LocalFileDto {
  @ApiProperty()
  filename: string

  @ApiProperty()
  url: string

  @ApiProperty()
  mimetype: string
}
