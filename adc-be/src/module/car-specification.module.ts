import { Module } from '@nestjs/common';
import { CarSpecificationController } from '../controller/car-specification.controller';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { CarMakeRepository } from '../repository/car-make.repository';
import { CarModelRepository } from '../repository/car-model.repository';

@Module({
  imports: [],
  controllers: [CarSpecificationController],
  providers: [CarSpecificationFormatter, CarMakeRepository, CarModelRepository],
})
export class CarSpecificationModule {}
