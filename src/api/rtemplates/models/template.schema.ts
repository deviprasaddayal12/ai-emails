import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Base } from 'src/api/common/schemas/base.schema';
import { Email, EmailSchema } from 'src/api/common/schemas/email.schema';

@Schema({
  timestamps: true,
})
export class Template extends Base {
  @ApiProperty({ required: true, description: 'purpose of template' })
  @Prop({ required: true })
  target: string;

  @ApiProperty({
    type: Email,
    required: true,
    description: 'email details for the said target',
  })
  @Prop({ type: EmailSchema, required: true })
  email: Email;

  @ApiProperty({
    type: [String],
    required: false,
    description: 'all the variable keys used in the email',
  })
  @Prop({ required: false, default: [] })
  variables: string[] = [];
}

export type TemplateDocument = Template & mongoose.Document;
export const TemplateSchema = SchemaFactory.createForClass(Template);
