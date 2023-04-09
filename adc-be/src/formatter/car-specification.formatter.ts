import { Injectable } from '@nestjs/common';
import { CarMakeModel } from '../model/car-make.model';
import { CarMakeResponse, CarModelResponse } from '../dto/responce.dto';
import { CarModelModel } from '../model/car-model.model';

@Injectable()
export class CarSpecificationFormatter {
  public toCarMakeResponse(carMakeModel: CarMakeModel): CarMakeResponse {
    return {
      id: carMakeModel.id,
      title: carMakeModel.title,
    };
  }

  public toCarMakesResponse(carMakes: CarMakeModel[]): Array<CarMakeResponse> {
    return carMakes.map(this.toCarMakeResponse);
  }

  public toCarModelResponse(carModelModel: CarModelModel): CarModelResponse {
    return {
      id: carModelModel.id,
      title: carModelModel.title,
    };
  }

  public toCarModelsResponce(
    carModels: CarModelModel[],
  ): Array<CarModelResponse> {
    return carModels.map(this.toCarModelResponse);
  }
}
