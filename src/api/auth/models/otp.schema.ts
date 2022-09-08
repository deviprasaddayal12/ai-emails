import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class Otp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @ApiProperty()
  @Prop()
  destination: string;

  @ApiProperty()
  @Prop()
  otp: string;
}

export type OtpDocument = Otp & mongoose.Document;

export const OtpSchema = SchemaFactory.createForClass(Otp);
