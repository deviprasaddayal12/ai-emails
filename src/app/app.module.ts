import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AuthModule } from 'src/api/auth/auth.module';
import { ReportingModule } from 'src/api/reporting/reporting.module';
import { UserModule } from 'src/api/users/user.module';
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

        // Auth Configurations
        JWT_KEY: Joi.string().required(),
        JWT_PRIVATE_KEY_PATH: Joi.string().required(),
        JWT_PUBLIC_KEY_PATH: Joi.string().required(),
        JWT_EXPIRY: Joi.string().required(),

        // Email Configurations
        SENDGRID_API_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // useFindAndModify: false,
        // useCreateIndex: true,
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    GlobalModule,
    UserModule,
    AuthModule,
    ReportingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
