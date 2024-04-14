import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CarMakeModel } from '../model/car-make.model';
import { CarMake, CarMakeDocument } from '../schema/car-make.schema';

@Injectable()
export class CarMakeRepository {
  @InjectModel(CarMake.name) private model: Model<CarMakeDocument>;

  public static toCarMakeModel(carMakeDocument: CarMakeDocument) {
    return new CarMakeModel(carMakeDocument._id, carMakeDocument.title);
  }

  public async getCarMakesLike(limit: number): Promise<CarMakeModel[]> {
    const carMakeDocs = await this.model.find().limit(limit);

    return carMakeDocs.map(CarMakeRepository.toCarMakeModel);
  }
}
