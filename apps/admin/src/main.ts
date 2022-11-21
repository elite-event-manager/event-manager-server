import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AdminModule } from './admin.module'

async function bootstrap() {
  const whitelist = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost:5000',
  ]

  const app = await NestFactory.create(AdminModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    },
  })

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Event Manager Admin')
    .setDescription('Event Manager')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(5000)
}
bootstrap()
