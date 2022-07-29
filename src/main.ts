import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = await app.get(ConfigService);

  app.enableCors();

  await app.listen(configService.get('PORT') || 3010);
  console.log(`ai-emails is running on: ${await app.getUrl()}`);
}

bootstrap();
