import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalModule } from '../../global/global.module';
import { TemplateModule } from '../rtemplates/template.module';
import { ReportService } from './reporting.service';
import { ReportController } from './reporting.controller';
import { Report, ReportSchema } from './models/reporting.schema';

@Module({
  imports: [
    GlobalModule,
    TemplateModule,
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportingModule {}
