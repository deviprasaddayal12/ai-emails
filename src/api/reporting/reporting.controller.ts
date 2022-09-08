import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
  ApiParam,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Report } from './models/reporting.schema';
import { ReportService } from './reporting.service';
import { JwtGuard } from 'src/global/guards/jwt.guard';
import { AuthUserId } from '../common/decorators/user-id.decorator';
import { Response } from 'src/global/response/response.dto';
import {
  createDataResponse,
  createMessageResponse,
} from 'src/global/response/response.helper';
import { Messages } from 'src/global/config/consts.config';
import { CreateReportRequest } from './dtos/reporting.request';

const TAG = 'report.controller';

@ApiBearerAuth()
@ApiTags('reports')
@Controller('api/v1/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtGuard)
  @Post('/send')
  @ApiOperation({
    summary: 'send a new report',
  })
  @ApiOkResponse({
    description: Messages.Report.MSG_CREATED,
    type: Report,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiBody({ type: () => CreateReportRequest })
  async sendReport(
    @AuthUserId() authUserId: string,
    @Body() input: CreateReportRequest,
  ): Promise<Response<Report>> {
    const report = await this.reportService.sendReport(authUserId, input);

    if (!report) {
      return createMessageResponse(Messages.Report.ERR_NOT_EXIST);
    }
    return createDataResponse<Report>(Messages.Report.MSG_CREATED, report);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  @ApiOperation({
    summary: 'get a list of reports',
  })
  @ApiOkResponse({
    description: 'Reports successfully fetched',
    type: [Report],
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'offset', schema: { default: 0 } })
  @ApiQuery({ name: 'limit', schema: { default: 25 } })
  async getReports(
    @AuthUserId() authUserId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ): Promise<Response<Report[]>> {
    const reports = await this.reportService.getReports(
      authUserId,
      parseInt(offset),
      parseInt(limit),
    );
    if (reports.length == 0) {
      return createMessageResponse('No reports found!');
    }
    return createDataResponse<Report[]>(
      'Reports successfully fetched.',
      reports,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/:reportId')
  @ApiOperation({
    summary: 'get a specific report',
  })
  @ApiOkResponse({
    description: 'Report successfully fetched',
    type: Report,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiParam({ name: 'reportId', type: String })
  async getReport(
    @AuthUserId() authUserId: string,
    @Param('reportId') reportId: string,
  ): Promise<Response<Report>> {
    const report = await this.reportService.getReport(reportId);
    if (report === null) {
      return createMessageResponse('Reports not found!');
    }
    return createDataResponse<Report>('Report successfully fetched.', report);
  }
}
