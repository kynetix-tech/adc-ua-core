import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

import { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: SchemaTypes.String })
  _id: string;

  @Prop({ type: SchemaTypes.String, ref: User.name })
  user: string;

  @Prop({ type: SchemaTypes.String, ref: Post.name })
  post: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
