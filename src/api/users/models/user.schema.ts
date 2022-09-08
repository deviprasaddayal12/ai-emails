import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Person } from 'src/api/common/schemas/person.schema';

@Schema({
  timestamps: true,
})
export class User extends Person {
  @ApiProperty()
  @Prop({})
  fcmToken?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Prop()
  organisation: string;

  // @IsOptional()
  // @Prop({ type: [RoleSchema] })
  // roles?: Role[];

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @Prop()
  password: string;

  @ApiProperty()
  @IsOptional()
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  })
  userLocation?: Object;

  @ApiProperty()
  @IsBoolean()
  @Prop()
  isVerified: boolean = false;

  @ApiProperty()
  @IsBoolean()
  @Prop()
  is2FAEnabled: boolean = false;

  @ApiProperty()
  @IsBoolean()
  @Prop()
  isActive: boolean = true;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
