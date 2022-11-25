import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

import { LocalFilesInterceptor } from '@app/common/interceptors/localFiles.interceptor'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  // Загрузка картинки
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/uploads/avatars',
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Неверный формат картинки'),
            false,
          )
        }
        callback(null, true)
      },
      limits: {
        fileSize: 2048 ** 2, // 4MB
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { fileName: file.filename }
  }
}
