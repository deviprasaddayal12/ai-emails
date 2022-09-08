import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from './base.schema';
import { GenderEnum } from 'src/global/config/enum.config';
import { Address, AddressSchema } from './address.schema';

@Schema()
export class Person extends Base {
  @ApiProperty()
  @IsOptional()
  @Prop()
  imageUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Prop()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @Prop()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop()
  middleName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.Date })
  dateOfBirth: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(GenderEnum, {
    message: `Gender should be one of ${Object.keys(GenderEnum)}`,
  })
  @Prop()
  gender: GenderEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Prop()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone()
  @Prop()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsMobilePhone()
  @Prop()
  altPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: AddressSchema })
  commAddress?: Address;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: AddressSchema })
  perAddress?: Address;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Prop()
  enabled?: boolean = true;
}
