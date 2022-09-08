import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Base } from 'src/api/common/schemas/base.schema';

export class VariableData {
  variable: string;
  data: string;
}

@Schema({
  timestamps: true,
})
export class Report extends Base {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'templates' })
  templateId: string;

  @ApiProperty({
    type: Object,
    required: false,
    description: 'variable key-value pairs for the selected template',
  })
  @Prop({ type: Object, required: false })
  variablesData: Object = {};

  @ApiProperty()
  @Prop()
  status?: string;
}

export type ReportDocument = Report & mongoose.Document;
export const ReportSchema = SchemaFactory.createForClass(Report);
