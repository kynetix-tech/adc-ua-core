import { Module } from '@nestjs/common';
import { CarSpecificationController } from '../controller/car-specification.controller';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { CarMakeRepository } from '../repository/car-make.repository';
import { CarModelRepository } from '../repository/car-model.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModel, CarModelSchema } from '../schema/car-model.schema';
import { CarMake, CarMakeSchema } from '../schema/car-make.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarMake.name, schema: CarMakeSchema },
      { name: CarModel.name, schema: CarModelSchema },
    ]),
  ],
  controllers: [CarSpecificationController],
  providers: [CarSpecificationFormatter, CarMakeRepository, CarModelRepository],
})
export class CarSpecificationModule {}
