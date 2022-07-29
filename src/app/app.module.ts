import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { GlobalModule } from 'src/global/global.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string().valid('dev', 'qa', 'prod').default('dev'),
        PORT: Joi.number().default(3010),
        MONGODB_URI: Joi.string().required(),

        SENDGRID_API_KEY: Joi.string().required(),
      }),
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
