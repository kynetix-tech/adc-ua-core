import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CarMakeEntity } from '../entity/car-make.entity';
import { CarMakeModel } from '../model/car-make.model';

@Injectable()
export class CarMakeRepository {
  constructor(private manager: EntityManager) {}

  public static toCarMakeModel(carMakeEntity?: CarMakeEntity) {
    return new CarMakeModel(carMakeEntity.id, carMakeEntity.title);
  }

  public async getCarMakesLike(
    likeStr: string,
    limit: number,
  ): Promise<CarMakeModel[]> {
    const carMakesEntity = await this.manager
      .getRepository(CarMakeEntity)
      .createQueryBuilder()
      .where(`UPPER(title) like UPPER('${likeStr}%')`, { likeStr })
      .limit(limit)
      .getMany();

    return carMakesEntity.map(CarMakeRepository.toCarMakeModel);
  }
}
