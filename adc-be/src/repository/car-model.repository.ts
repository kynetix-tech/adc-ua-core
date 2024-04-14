import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CarModelModel } from '../model/car-model.model';
import { CarModel, CarModelDocument } from '../schema/car-model.schema';

@Injectable()
export class CarModelRepository {
  @InjectModel(CarModel.name) private model: Model<CarModelDocument>;

  public static toCarModelModel(carModelEntity: CarModelDocument) {
    return new CarModelModel(carModelEntity._id, carModelEntity.title);
  }

  public async getAllModelsByMake(makeId: number): Promise<CarModelModel[]> {
    const carModelDocs = await this.model.find({
      make: makeId,
    });
    console.log(carModelDocs);

    return carModelDocs.map(CarModelRepository.toCarModelModel);
  }
}
