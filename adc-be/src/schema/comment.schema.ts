import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, SchemaTypes } from 'mongoose';

import { Post, PostDocument } from './post.schema';
import { User, UserDocument } from './user.schema';

import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: SchemaTypes.Number })
  _id: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ type: SchemaTypes.String })
  text: string;

  // @Prop({ type: SchemaTypes.String })
  // postId: number;
  //
  // @Prop({ type: SchemaTypes.String })
  // userId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: UserDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: Post.name })
  post: PostDocument;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
