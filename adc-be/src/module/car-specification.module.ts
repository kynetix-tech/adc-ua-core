import { Module } from '@nestjs/common';
import { CarSpecificationController } from '../controller/car-specification.controller';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { CarMakeRepository } from '../repository/car-make.repository';

@Module({
  imports: [],
  controllers: [CarSpecificationController],
  providers: [CarSpecificationFormatter, CarMakeRepository],
})
export class CarSpecificationModule {}
