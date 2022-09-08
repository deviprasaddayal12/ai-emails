import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Address {
  @ApiProperty()
  @IsOptional()
  @Prop()
  careOf?: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  houseNo: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  locality?: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  streetOrArea: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  postOffice?: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  policeStation?: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  cityOrVillage?: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  district: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  state: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  pincode: string;

  @ApiProperty()
  @IsOptional()
  @Prop()
  country: string;
}

export type AddressDocument = Address & mongoose.Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
