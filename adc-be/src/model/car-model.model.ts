import { CarMakeModel } from './car-make.model';

export class CarModelModel {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly title: string,
    public readonly make: CarMakeModel,
  ) {}
}
