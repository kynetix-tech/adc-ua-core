import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { User } from './user.schema';

import { Document } from 'mongoose';

export type ChecksumDocument = Checksum & Document;

@Schema()
export class Checksum {
  @Prop({ type: SchemaTypes.Number })
  _id: number;

  @Prop({ type: SchemaTypes.String })
  checkSum: string;

  @Prop({ type: SchemaTypes.String })
  fileName: string;

  // @Prop({ type: SchemaTypes.String })
  // userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;
}

export const ChecksumSchema = SchemaFactory.createForClass(Checksum);
