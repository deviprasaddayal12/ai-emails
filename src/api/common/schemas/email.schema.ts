import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Base } from './base.schema';

@Schema()
export class Email extends Base {
  @ApiProperty({
    required: true,
    description: 'receiver of the email',
  })
  @Prop({ required: true })
  to: string;

  @ApiProperty({ required: false, default: 'Hello' })
  @Prop({ required: false, default: 'Hello' })
  salutation?: string = 'Hello';

  @ApiProperty({
    type: [String],
    required: false,
    description: 'all other copy receivers',
    default: [],
  })
  @Prop({ type: [String], required: false, default: [] })
  ccBcc?: string[];

  @ApiProperty({ required: true, description: 'subject of the email' })
  @Prop({ required: true, default: '' })
  subject: string;

  @ApiProperty({
    required: true,
    description: 'content(html formatting based) of the email',
    default: '',
  })
  @Prop({
    required: true,
  })
  bodyHtml: string;
}

export type EmailDocument = Email & mongoose.Document;
export const EmailSchema = SchemaFactory.createForClass(Email);
