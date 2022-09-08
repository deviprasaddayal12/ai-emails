import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './global/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = await app.get(ConfigService);

  app.enableCors();
  await app.useGlobalPipes(new ValidationPipe());
  // await app.useGlobalFilters(new GlobalExceptionFilter(configService));

  SwaggerModule.setup(
    'api-doc',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addServer('http://localhost:3010', 'Local Server')
        .addServer('https://ai-emails.herokuapp.com', 'Dev Server')
        .addBearerAuth()
        .setTitle('Welcom to AI-Emails by DDD')
        .setDescription(
          'This is a email sending open-api documentation created and managed by DDD.',
        )
        .setVersion('v1.0')
        .build(),
      {
        deepScanRoutes: true,
        ignoreGlobalPrefix: false,
      },
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await app.listen(configService.get('PORT') || 3010);
  console.log(`ai-emails is running on: ${await app.getUrl()}`);
}

bootstrap();
