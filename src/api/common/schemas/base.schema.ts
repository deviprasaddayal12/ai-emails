import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Base {
  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id?: string;

  @ApiProperty()
  @IsBoolean()
  @Prop()
  isActive: boolean = true;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  updatedBy?: string;
}
