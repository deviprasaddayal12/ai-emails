import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './models/template.schema';
import {
  CreateTemplateRequest,
  UpdateTemplateRequest,
} from './dtos/template.request';

const TAG = 'template.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name)
    private templateModel: Model<TemplateDocument>,
  ) {}

  /**
   * @name doesTemplateExist
   * @description Method to check if asked template exists
   * @param target asked template to check for
   * @returns true if template exists false if not
   */
  async doesTemplateExist(target: string): Promise<boolean> {
    const template = await this.templateModel
      .findOne({
        target: { $regex: '.*' + target + '.*' },
      })
      .select('-password');
    return template !== null;
  }

  /**
   * @name addTemplate (meant for internal use only)
   * @description Method to create a new template document in templates collection
   * @param createTemplateRequest all required/optional template details
   * @returns newly created template
   */
  async addTemplate(
    authUserId: string,
    createTemplateRequest: CreateTemplateRequest,
  ): Promise<Template> {
    return await this.templateModel.create({
      ...createTemplateRequest,
      updatedBy: authUserId,
    });
  }

  /**
   * @name updateTemplate
   * @description Method to update a template
   * @param templateId id of the template to update for
   * @param updateTemplateRequest all updatable fields for the template
   * @returns updated template
   */
  async updateTemplate(
    authUserId: string,
    templateId: string,
    updateTemplateRequest: UpdateTemplateRequest,
  ): Promise<Template> {
    updateTemplateRequest.updatedBy = authUserId;

    return await this.templateModel.findByIdAndUpdate(
      templateId,
      {
        ...updateTemplateRequest,
        updatedBy: authUserId,
      },
      {
        new: true,
      },
    );
  }

  async getTemplates(offset: number, limit: number): Promise<Template[]> {
    return await this.templateModel
      .find({
        isActive: true,
      })
      .skip(offset)
      .limit(limit);
  }

  async getInactiveTemplates(): Promise<Template[]> {
    return await this.templateModel.find({
      isActive: false,
    });
  }

  async getTemplate(authUserId: string, templateId: string): Promise<Template> {
    return await this.templateModel.findById(templateId);
  }

  async findTemplateByTarget(
    authUserId: string,
    target: string,
  ): Promise<Template[]> {
    return await this.templateModel.find({
      isActive: true,
      // target: new RegExp(target),
    });
  }

  async deactivateTemplate(
    authUserId: string,
    templateId: string,
  ): Promise<Template> {
    return await this.templateModel.findByIdAndUpdate(
      templateId,
      {
        isActive: false,
      },
      {
        new: true,
      },
    );
  }

  /**
   * @name delete
   * @description Method to delete a template
   * @param templateId id of the template to look for
   * @returns deleted template
   */
  async deleteTemplate(
    authUserId: string,
    templateId: string,
  ): Promise<Template> {
    return await this.templateModel.findByIdAndDelete(templateId, {
      new: true,
    });
  }
}
