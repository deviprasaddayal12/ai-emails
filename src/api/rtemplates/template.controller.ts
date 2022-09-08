import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { JwtGuard } from 'src/global/guards/jwt.guard';
import { AuthUserId } from '../common/decorators/user-id.decorator';
import { Response } from 'src/global/response/response.dto';
import {
  createDataResponse,
  createMessageResponse,
} from 'src/global/response/response.helper';
import { TemplateService } from './template.service';
import { Template } from './models/template.schema';
import { Messages } from 'src/global/config/consts.config';
import {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from './dtos/template.request';

const TAG = 'template.controller';

@ApiBearerAuth()
@ApiTags('templates')
@Controller('api/v1/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @UseGuards(JwtGuard)
  @Post('/')
  @ApiOperation({
    summary: 'add a new template',
  })
  @ApiOkResponse({
    description: Messages.Template.MSG_CREATED,
    type: Template,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiBody({ type: () => CreateTemplateRequest })
  async addTemplates(
    @AuthUserId() authUserId: string,
    @Body() input: CreateTemplateRequest,
  ): Promise<Response<Template>> {
    const template = await this.templateService.addTemplate(authUserId, input);

    if (!template) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template>(
      Messages.Template.MSG_CREATED,
      template,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/search')
  @ApiOperation({
    summary: 'search for templates',
  })
  @ApiOkResponse({
    description: Messages.Template.MSG_ALL_FOUND,
    type: [Template],
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'target', schema: { default: 0 } })
  async findTemplates(
    @AuthUserId() authUserId: string,
    @Query('target') target: string,
  ): Promise<Response<Template[]>> {
    const templates = await this.templateService.findTemplateByTarget(
      authUserId,
      target,
    );
    if (!templates) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template[]>(
      'Templates successfully fetched.',
      templates,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/')
  @ApiOperation({
    summary: 'get a list of templates',
  })
  @ApiOkResponse({
    description: Messages.Template.MSG_CREATED,
    type: [Template],
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'offset', schema: { default: 0 } })
  @ApiQuery({ name: 'limit', schema: { default: 25 } })
  async getTemplates(
    @AuthUserId() authUserId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ): Promise<Response<Template[]>> {
    const templates = await this.templateService.getTemplates(
      parseInt(offset),
      parseInt(limit),
    );

    if (!templates) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    3;
    return createDataResponse<Template[]>(
      'Templates successfully fetched.',
      templates,
    );
  }

  @UseGuards(JwtGuard)
  @Get('/:templateId')
  @ApiOperation({
    summary: 'Get a specific template',
  })
  @ApiOkResponse({
    description: 'Template successfully fetched',
    type: Template,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiParam({ name: 'templateId', type: String })
  async getTemplate(
    @AuthUserId() authUserId: string,
    @Param('templateId') templateId: string,
  ): Promise<Response<Template>> {
    const template = await this.templateService.getTemplate(
      authUserId,
      templateId,
    );
    if (!template) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template>(
      'Templates successfully fetched.',
      template,
    );
  }

  @UseGuards(JwtGuard)
  @Put('/:templateId')
  @ApiOperation({
    summary: 'update a template',
  })
  @ApiOkResponse({
    description: Messages.Template.MSG_UPDATED,
    type: Template,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiQuery({ name: 'offset', schema: { default: 0 } })
  @ApiQuery({ name: 'limit', schema: { default: 25 } })
  async updateTemplate(
    @AuthUserId() authUserId: string,
    @Param('templateId') templateId: string,
    @Body() updateBody: UpdateTemplateRequest,
  ): Promise<Response<Template>> {
    const template = await this.templateService.updateTemplate(
      authUserId,
      templateId,
      updateBody,
    );
    if (!template) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template>(
      'Templates successfully fetched.',
      template,
    );
  }

  @UseGuards(JwtGuard)
  @Put('/:templateId/deactivate')
  @ApiOperation({
    summary: 'deactivate a template',
  })
  @ApiOkResponse({
    description: 'Template successfully deactivated',
    type: Template,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiParam({ name: 'templateId' })
  async deactivateTemplate(
    @AuthUserId() authUserId: string,
    @Param('templateId') templateId: string,
  ): Promise<Response<Template>> {
    const template = await this.templateService.deactivateTemplate(
      authUserId,
      templateId,
    );
    if (!template) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template>(
      'Templates successfully fetched.',
      template,
    );
  }

  @UseGuards(JwtGuard)
  @Delete('/:templateId')
  @ApiOperation({
    summary: 'delete a template',
  })
  @ApiOkResponse({
    description: 'Template successfully deleted',
    type: Template,
  })
  @ApiForbiddenResponse({
    description: 'Use a valid token to get result',
  })
  @ApiParam({ name: 'templateId' })
  async deleteTemplate(
    @AuthUserId() authUserId: string,
    @Param('templateId') templateId: string,
  ): Promise<Response<Template>> {
    const template = await this.templateService.deleteTemplate(
      authUserId,
      templateId,
    );
    if (!template) {
      return createMessageResponse(Messages.Template.ERR_NOT_EXIST);
    }
    return createDataResponse<Template>(
      'Templates successfully deleted.',
      template,
    );
  }
}
