import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, SchemaTypes } from 'mongoose';

import { CarMake, CarMakeDocument } from './car-make.schema';
import { CarModel, CarModelDocument } from './car-model.schema';
import { User, UserDocument } from './user.schema';

export enum ContentItemType {
  text = 'text',
  img = 'img',
}

export interface ContentItem {
  type: ContentItemType;
  content: string;
}

import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop(
    // raw({
    //   type: { enum: ContentItemType, type: SchemaTypes.String },
    //   content: { type: SchemaTypes.String },
    // }),
    { type: SchemaTypes.Mixed },
  )
  content: Array<ContentItem>;

  @Prop({ type: SchemaTypes.Number })
  carYear: number;

  @Prop({ type: SchemaTypes.String })
  _id: string;

  @Prop({ type: SchemaTypes.Number, ref: CarModel.name })
  carModel: number | CarModelDocument;

  @Prop({ type: SchemaTypes.Number, ref: CarMake.name })
  carMake: number | CarMakeDocument;

  @Prop({ type: SchemaTypes.String, ref: User.name })
  user: string | UserDocument;
}

export const PostSchema = SchemaFactory.createForClass(Post);
