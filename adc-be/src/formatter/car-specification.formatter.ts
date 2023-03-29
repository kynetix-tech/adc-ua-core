import { Injectable } from '@nestjs/common';
import { CarMakeModel } from '../model/car-make.model';
import { CarMakeResponse } from '../dto/responce.dto';

@Injectable()
export class CarSpecificationFormatter {
  public toCarMakeResponce(carMakeModel: CarMakeModel): CarMakeResponse {
    return {
      id: carMakeModel.id,
      title: carMakeModel.title,
    };
  }

  public toCarMakesResponce(carMakes: CarMakeModel[]): Array<CarMakeResponse> {
    return carMakes.map(this.toCarMakeResponce);
  }
}
