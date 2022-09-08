import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Report } from '../models/reporting.schema';

export class CreateReportRequest extends OmitType(Report, []) {}

export class UpdateReporRequest extends PartialType(Report) {}
