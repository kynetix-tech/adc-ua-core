import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document } from 'mongoose';

export type CarMakeDocument = CarMake & Document;

@Schema()
export class CarMake {
  @Prop({ type: SchemaTypes.Number })
  _id: number;

  @Prop({ type: SchemaTypes.String })
  code: string;

  @Prop({
    type: SchemaTypes.String,
  })
  title: string;
}

export const CarMakeSchema = SchemaFactory.createForClass(CarMake);
