import { OmitType, PartialType } from '@nestjs/swagger';
import { Template } from '../models/template.schema';

export class CreateTemplateRequest extends OmitType(Template, []) {}

export class UpdateTemplateRequest extends PartialType(Template) {}
