import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { CarMake } from './car-make.schema';

import { Document } from 'mongoose';

export type CarModelDocument = CarModel & Document;

@Schema()
export class CarModel {
  @Prop({ type: SchemaTypes.Number })
  _id: number;

  @Prop({ type: SchemaTypes.String })
  code: string;

  @Prop({ type: SchemaTypes.String })
  title: string;

  @Prop({ type: SchemaTypes.Number, ref: CarMake.name })
  make: number | CarMake;
}

export const CarModelSchema = SchemaFactory.createForClass(CarModel);
