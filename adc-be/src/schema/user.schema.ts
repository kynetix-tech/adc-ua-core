import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

export enum Role {
  User = 'User',
  PostEditor = 'PostEditor',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.String })
  _id: string;

  @Prop({ type: SchemaTypes.String })
  auth0Id: string;

  @Prop({ type: SchemaTypes.String })
  email: string;

  @Prop({ type: SchemaTypes.String })
  firstName: string;

  @Prop({ type: SchemaTypes.String })
  lastName: string;

  @Prop({ type: SchemaTypes.String, enum: Gender })
  gender: Gender;

  @Prop({ type: SchemaTypes.String, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
