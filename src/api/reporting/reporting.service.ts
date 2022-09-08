import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/global/services/emails.service';
import { TemplateService } from '../rtemplates/template.service';
import { CreateReportRequest } from './dtos/reporting.request';
import { Report, ReportDocument } from './models/reporting.schema';

const TAG = 'report.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
    private readonly templateService: TemplateService,
    private readonly emailService: EmailService,
  ) {}

  async sendReport(
    authUserId: string,
    createReportRequest: CreateReportRequest,
  ): Promise<Report> {
    const report = await this.reportModel.create({
      ...createReportRequest,
      updatedBy: authUserId,
    });

    const template = await this.templateService.getTemplate(
      authUserId,
      report.templateId,
    );
    template.variables.forEach((variable) => {
      console.log(variable, report.variablesData);

      if (template.email.subject.includes(`{{${variable}}}`))
        template.email.subject = template.email.subject.replace(
          `{{${variable}}}`,
          report.variablesData[variable],
        );

      if (template.email.salutation.includes(`{{${variable}}}`))
        template.email.salutation = template.email.salutation.replace(
          `{{${variable}}}`,
          report.variablesData[variable],
        );

      if (template.email.bodyHtml.includes(`{{${variable}}}`))
        template.email.bodyHtml = template.email.bodyHtml.replace(
          `{{${variable}}}`,
          report.variablesData[variable],
        );
    });

    const sendResult = await this.emailService.send({
      to: template.email.to,
      subject: template.email.subject,
      cc: template.email.ccBcc,
      text: `${template.email.salutation},\n\n${template.email.bodyHtml}`,
      from: 'dayal.das@utkallabs.com',
    });
    console.log(`${TAG}.sendReport: `, template.email);

    return report;
  }

  async getReports(
    authUserId: string,
    offset: number,
    limit: number,
  ): Promise<Report[]> {
    return await this.reportModel
      .find({
        isActive: true,
      })
      .select('-password')
      .skip(offset)
      .limit(limit);
  }

  async getReport(reportId: string): Promise<Report> {
    return await this.reportModel.findById(reportId).select('-password');
  }
}
